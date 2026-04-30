import { NextResponse } from 'next/server';

import { normalizeCurrency } from '@/lib/invoice';

type ParsedInvoiceItem = {
  description: string;
  quantity: number;
  price: number;
};

type ParsedInvoicePayload = {
  type: 'invoice' | 'quote';
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  fromName?: string;
  fromAddress?: string;
  toName?: string;
  toAddress?: string;
  projectName?: string;
  currency?: string;
  discountRate?: number;
  taxRate?: number;
  items?: ParsedInvoiceItem[];
  notes?: string;
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const fallbackData = extractInvoiceDataFromPrompt(prompt);
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      console.warn('GROQ_API_KEY is not defined. Falling back to prompt parsing.');
      return NextResponse.json(finalizeParsedInvoice({}, fallbackData));
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.DEFAULT_LLM_MODEL || 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You extract invoice data from natural language.
Return ONLY valid JSON that matches this structure:
{
  "type": "invoice" | "quote",
  "invoiceNumber": string,
  "date": "YYYY-MM-DD",
  "dueDate": "YYYY-MM-DD",
  "fromName": string,
  "fromAddress": string,
  "toName": string,
  "toAddress": string,
  "projectName": string,
  "currency": string,
  "discountRate": number,
  "taxRate": number,
  "items": [
    { "description": string, "quantity": number, "price": number }
  ],
  "notes": string
}
Use percentage values like 17 for 17%, not decimals like 0.17.
If a value is missing, use a reasonable default. Do not include any text outside the JSON.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API Error:', response.status, errorData);
      return NextResponse.json(finalizeParsedInvoice({}, fallbackData));
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      console.error('Groq API Error: No choices returned', data);
      return NextResponse.json(finalizeParsedInvoice({}, fallbackData));
    }

    const content = data.choices[0].message.content;

    try {
      return NextResponse.json(finalizeParsedInvoice(JSON.parse(content), fallbackData));
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', content, error);
      return NextResponse.json(finalizeParsedInvoice({}, fallbackData));
    }
  } catch (error) {
    console.error('AI Parse Error:', error);
    return NextResponse.json({ error: 'Failed to parse prompt' }, { status: 500 });
  }
}

function finalizeParsedInvoice(aiData: Partial<ParsedInvoicePayload>, extractedData: Partial<ParsedInvoicePayload>) {
  const mergedData = {
    ...sanitizeParsedInvoice(aiData),
    ...pickExplicitValues(extractedData),
  };

  return {
    type: mergedData.type === 'quote' ? 'quote' : 'invoice',
    invoiceNumber: mergedData.invoiceNumber || '',
    date: mergedData.date || '',
    dueDate: mergedData.dueDate || '',
    fromName: mergedData.fromName || '',
    fromAddress: mergedData.fromAddress || '',
    toName: mergedData.toName || '',
    toAddress: mergedData.toAddress || '',
    projectName: mergedData.projectName || '',
    currency: normalizeCurrency(mergedData.currency || 'Rs.'),
    discountRate: coerceNumber(mergedData.discountRate),
    taxRate: coerceNumber(mergedData.taxRate),
    items: sanitizeItems(mergedData.items),
    notes: mergedData.notes || '',
  };
}

function sanitizeParsedInvoice(data: Partial<ParsedInvoicePayload>): Partial<ParsedInvoicePayload> {
  return {
    ...data,
    type: data.type === 'quote' ? 'quote' : 'invoice',
    currency: data.currency ? normalizeCurrency(data.currency) : undefined,
    discountRate: coerceNumber(data.discountRate),
    taxRate: coerceNumber(data.taxRate),
    items: sanitizeItems(data.items),
  };
}

function pickExplicitValues(data: Partial<ParsedInvoicePayload>) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    })
  );
}

function sanitizeItems(items: ParsedInvoicePayload['items']) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => ({
      description: typeof item.description === 'string' ? item.description.trim() : '',
      quantity: coerceNumber(item.quantity) || 1,
      price: coerceNumber(item.price),
    }))
    .filter((item) => item.description);
}

function extractInvoiceDataFromPrompt(prompt: string): Partial<ParsedInvoicePayload> {
  const type = /\bquote\b/i.test(prompt) ? 'quote' : 'invoice';
  const currency = extractCurrency(prompt);
  const date = /\binvoice date today\b/i.test(prompt) ? getTodayISODate('Asia/Karachi') : undefined;
  const dueDaysMatch = prompt.match(/\bdue in\s+(\d+)\s+days?\b/i);
  const dueDate =
    date && dueDaysMatch ? addDaysToISODate(date, Number.parseInt(dueDaysMatch[1], 10)) : undefined;

  const senderDetails = extractSenderDetails(prompt);
  const clientDetails = extractClientDetails(prompt);
  const projectName = extractProjectName(prompt);
  const items = extractLineItems(prompt);
  const discountRate = extractRate(prompt, /\b(\d+(?:\.\d+)?)%\s+discount\b/i);
  const taxRate = extractRate(prompt, /\b(?:add\s+)?(\d+(?:\.\d+)?)%\s*(?:gst|tax)\b/i);
  const notes = extractPaymentNote(prompt);
  const invoiceNumberMatch = prompt.match(/\binvoice number\s+([A-Z0-9-]+)\b/i);

  return {
    type,
    invoiceNumber: invoiceNumberMatch?.[1] || undefined,
    date,
    dueDate,
    fromName: senderDetails.fromName,
    fromAddress: senderDetails.fromAddress,
    toName: clientDetails.toName,
    toAddress: clientDetails.toAddress,
    projectName,
    currency,
    discountRate,
    taxRate,
    items,
    notes,
  };
}

function extractSenderDetails(prompt: string) {
  const senderMatch = prompt.match(/my name is\s+(.+?)(?=\.\s*invoice my client\b)/i);

  if (!senderMatch) {
    return {};
  }

  const senderText = cleanText(senderMatch[1]);
  const name = senderText.split(',')[0]?.trim();
  const companyMatch = senderText.match(/\bat\s+([^,]+)/i);
  const company = companyMatch?.[1]?.trim();
  const addressMatch = senderText.match(/\bat\s+[^,]+,\s*(.+)$/i);
  const address = addressMatch?.[1]?.trim();

  return {
    fromName: [name, company].filter(Boolean).join(' / '),
    fromAddress: address,
  };
}

function extractClientDetails(prompt: string) {
  const clientMatch = prompt.match(/invoice my client\s+(.+?)(?=\.\s*project:|\.\s*line items:|\.$)/i);

  if (!clientMatch) {
    return {};
  }

  const parts = clientMatch[1]
    .split(',')
    .map((part) => cleanText(part))
    .filter(Boolean);

  if (parts.length === 0) {
    return {};
  }

  const [toName, heading, ...addressParts] = parts;
  const addressLines = [heading, addressParts.join(', ')].filter(Boolean);

  return {
    toName,
    toAddress: addressLines.join('\n'),
  };
}

function extractProjectName(prompt: string) {
  const projectMatch = prompt.match(
    /\bproject:\s*(.+?)(?=\.\s*line items:|\.\s*apply\b|\.\s*invoice date\b|\.\s*due in\b|\.\s*add payment note\b|\.\s*invoice number\b|$)/i
  );

  return projectMatch ? cleanText(projectMatch[1]) : undefined;
}

function extractLineItems(prompt: string) {
  const lineItemsMatch = prompt.match(
    /\bline items:\s*(.+?)(?=\.\s*apply\b|\.\s*then add\b|\.\s*invoice date\b|\.\s*due in\b|\.\s*add payment note\b|\.\s*invoice number\b|$)/i
  );

  if (!lineItemsMatch) {
    return [];
  }

  return lineItemsMatch[1]
    .split(/,(?=\s*[A-Z])/)
    .map((rawItem) => parseLineItem(cleanText(rawItem)))
    .filter((item): item is ParsedInvoiceItem => Boolean(item));
}

function parseLineItem(itemText: string) {
  const hourlyMatch = itemText.match(
    /^(.*?)\s+(\d+(?:\.\d+)?)\s+hours?\s+at\s+(?:rs\.?|pkr|PKR|Rs\.?)?\s*([\d,]+(?:\.\d+)?)\s*(?:\/hour|per\s*hour)?$/i
  );

  if (hourlyMatch) {
    return {
      description: cleanText(hourlyMatch[1]),
      quantity: coerceNumber(hourlyMatch[2]),
      price: parseCurrencyAmount(hourlyMatch[3]),
    };
  }

  const flatMatch = itemText.match(/^(.*?)\s+(?:rs\.?|pkr|PKR|Rs\.?)\s*([\d,]+(?:\.\d+)?)\s*(?:flat)?$/i);

  if (flatMatch) {
    return {
      description: cleanText(flatMatch[1]),
      quantity: 1,
      price: parseCurrencyAmount(flatMatch[2]),
    };
  }

  return undefined;
}

function extractPaymentNote(prompt: string) {
  const quotedMatch = prompt.match(/\bpayment note:\s*"([^"]+)"/i);
  if (quotedMatch) return cleanText(quotedMatch[1]);

  const plainMatch = prompt.match(/\bpayment note:\s*(.+?)(?=\.\s*invoice number\b|$)/i);
  return plainMatch ? cleanText(plainMatch[1]) : undefined;
}

function extractCurrency(prompt: string) {
  if (/\b(?:rs\.?|pkr|pakistani rupees?)\b/i.test(prompt)) return 'Rs.';
  if (/\$/i.test(prompt) || /\b(?:usd|dollars?)\b/i.test(prompt)) return '$';
  return undefined;
}

function extractRate(prompt: string, pattern: RegExp) {
  const match = prompt.match(pattern);
  return match ? coerceNumber(match[1]) : undefined;
}

function parseCurrencyAmount(value: string) {
  return coerceNumber(value.replace(/,/g, ''));
}

function coerceNumber(value: unknown) {
  const parsedValue =
    typeof value === 'string' ? Number.parseFloat(value.replace(/,/g, '')) : Number(value ?? 0);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function cleanText(value: string) {
  return value.trim().replace(/^[\s"'`]+|[\s"'`.,]+$/g, '');
}

function getTodayISODate(timeZone: string) {
  const dateParts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(new Date())
    .reduce<Record<string, string>>((parts, part) => {
      if (part.type !== 'literal') {
        parts[part.type] = part.value;
      }
      return parts;
    }, {});

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

function addDaysToISODate(isoDate: string, days: number) {
  const baseDate = new Date(`${isoDate}T00:00:00Z`);
  baseDate.setUTCDate(baseDate.getUTCDate() + days);
  return baseDate.toISOString().split('T')[0];
}
