import { InvoiceData, InvoiceItem } from '@/types/invoice';

const normalizeNumber = (value: number | undefined) => (Number.isFinite(value) ? Number(value) : 0);

const truncateCurrencyAmount = (value: number) => Math.trunc(value);

export function normalizeCurrency(currency?: string) {
  if (!currency) return 'Rs.';

  const trimmedCurrency = currency.trim();

  if (/^(?:rs\.?|pkr|rupees?|pakistani rupees?)$/i.test(trimmedCurrency)) {
    return 'Rs.';
  }

  return trimmedCurrency;
}

export function normalizeInvoiceItems(items: InvoiceItem[]) {
  return items.map((item, index) => {
    const quantity = normalizeNumber(item.quantity);
    const price = normalizeNumber(item.price);
    const total = normalizeNumber(item.total) || quantity * price;

    return {
      ...item,
      id: item.id || `item-${index + 1}`,
      description: item.description || '',
      quantity,
      price,
      total,
    };
  });
}

export function calculateInvoiceTotals(items: InvoiceItem[], taxRate: number, discountRate: number) {
  const normalizedItems = normalizeInvoiceItems(items).map((item) => ({
    ...item,
    total: item.quantity * item.price,
  }));

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.total, 0);
  const normalizedDiscountRate = normalizeNumber(discountRate);
  const normalizedTaxRate = normalizeNumber(taxRate);
  const discountAmount = truncateCurrencyAmount((subtotal * normalizedDiscountRate) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const taxAmount = truncateCurrencyAmount((discountedSubtotal * normalizedTaxRate) / 100);
  const total = truncateCurrencyAmount(discountedSubtotal + taxAmount);

  return {
    items: normalizedItems,
    subtotal,
    discountRate: normalizedDiscountRate,
    discountAmount,
    discountedSubtotal,
    taxRate: normalizedTaxRate,
    taxAmount,
    total,
  };
}

export function mergeInvoiceData(current: InvoiceData, updates: Partial<InvoiceData>) {
  const taxRate = typeof updates.taxRate === 'number' ? updates.taxRate : current.taxRate;
  const discountRate = typeof updates.discountRate === 'number' ? updates.discountRate : current.discountRate;
  const items = updates.items ?? current.items;
  const totals = calculateInvoiceTotals(items, taxRate, discountRate);

  return {
    ...current,
    ...updates,
    currency: normalizeCurrency(updates.currency ?? current.currency),
    items: totals.items,
    subtotal: totals.subtotal,
    discountRate: totals.discountRate,
    discountAmount: totals.discountAmount,
    taxRate: totals.taxRate,
    taxAmount: totals.taxAmount,
    total: totals.total,
  };
}

export function formatCurrency(amount: number, currency: string) {
  const normalized = normalizeCurrency(currency);
  const isWholeAmount = Math.abs(amount - Math.trunc(amount)) < 0.000001;
  const formattedAmount = amount.toLocaleString(
    'en-PK',
    isWholeAmount
      ? undefined
      : {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
  );

  return `${normalized} ${formattedAmount}`;
}
