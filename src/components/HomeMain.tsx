'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AIInput from '@/components/AIInput';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { defaultInvoiceData, InvoiceData } from '@/types/invoice';
import { mergeInvoiceData } from '@/lib/invoice';

export default function HomeMain() {
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
      
      <main style={{ maxWidth: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', flex: 1, overflow: 'hidden' }}>
          {/* Left Panel: Builder */}
          <div className="scroll-area" style={{ borderRight: '1px solid var(--border)', backgroundColor: 'white' }}>
            <div className="animate-fade-in" style={{ margin: '0 auto', padding: '2rem' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <h1 className="font-outfit" style={{ fontSize: '1.85rem', fontWeight: 700, color: '#1e293b' }}>Invoice Builder</h1>
                <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  {hasGenerated ? `Drafting #${invoiceData.invoiceNumber}` : 'Ready to create a new invoice'}
                </p>
              </div>

              <AIInput onDataGenerated={handleAIData} />

              <div style={{ padding: '0.5rem' }}>
                <InvoiceForm 
                  data={invoiceData} 
                  onChange={(d) => {
                    setInvoiceData(d);
                    if (!hasGenerated && (d.toName || d.fromName)) setHasGenerated(true);
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Preview */}
          <div className="scroll-area" style={{ backgroundColor: '#f8fafc' }}>
            <InvoicePreview data={invoiceData} hasGenerated={hasGenerated} />
          </div>
        </div>
      </main>
    </div>
  );
}
