'use client';

import { useState } from 'react';

import AIInput from '@/components/AIInput';
import Header from '@/components/Header';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { mergeInvoiceData } from '@/lib/invoice';
import { defaultInvoiceData, InvoiceData } from '@/types/invoice';

export default function HomePageClient() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleAIData = (aiData: any) => {
    setHasGenerated(true);
    setInvoiceData((currentData) => mergeInvoiceData(currentData, aiData));
  };

  const handleNewInvoice = () => {
    setInvoiceData(defaultInvoiceData);
    setHasGenerated(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header onNewInvoice={handleNewInvoice} />

      <main
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 72px)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', flex: 1, overflow: 'hidden' }}>
          <div className="scroll-area" style={{ borderRight: '1px solid var(--border)', backgroundColor: 'white' }}>
            <div className="animate-fade-in" style={{ margin: '0 auto', padding: '2rem' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <h1 className="font-outfit" style={{ fontSize: '1.85rem', fontWeight: 700, color: '#1e293b' }}>
                  Invoice Builder
                </h1>
                <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  {hasGenerated ? `Drafting #${invoiceData.invoiceNumber}` : 'Ready to create a new invoice'}
                </p>
              </div>

              <AIInput onDataGenerated={handleAIData} />

              <div style={{ padding: '0.5rem' }}>
                <InvoiceForm
                  data={invoiceData}
                  onChange={(data) => {
                    setInvoiceData(data);
                    if (!hasGenerated && (data.toName || data.fromName)) setHasGenerated(true);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="scroll-area" style={{ backgroundColor: '#f8fafc' }}>
            <InvoicePreview data={invoiceData} hasGenerated={hasGenerated} />
          </div>
        </div>
      </main>
    </div>
  );
}
