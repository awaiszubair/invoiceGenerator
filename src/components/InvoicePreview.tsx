'use client';

import { InvoiceData } from '@/types/invoice';
import { formatCurrency } from '@/lib/invoice';
import { Download, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoicePreviewProps {
  data: InvoiceData;
  hasGenerated?: boolean;
}

const PDF_EXPORT_WIDTH = 794;
const PDF_EXPORT_MARGIN_MM = 10;

export default function InvoicePreview({ data, hasGenerated = false }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const discountedSubtotal = data.subtotal - data.discountAmount;
  const detailColumnWidth = isExporting ? '280px' : '200px';
  const titleFontSize = isExporting ? '2.2rem' : '2.5rem';
  const sectionValueFontSize = isExporting ? '0.95rem' : '1rem';
  const itemFontSize = isExporting ? '0.84rem' : '0.9rem';
  const totalFontSize = isExporting ? '1rem' : '1.1rem';

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;
    setIsDownloading(true);
    setIsExporting(true);

    try {
      await document.fonts.ready;
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)))
      );

      const exportWidth = invoiceRef.current.scrollWidth;
      const exportHeight = invoiceRef.current.scrollHeight;
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: exportWidth,
        height: exportHeight,
        windowWidth: exportWidth,
        windowHeight: exportHeight,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const printableWidth = pageWidth - PDF_EXPORT_MARGIN_MM * 2;
      const printableHeight = pageHeight - PDF_EXPORT_MARGIN_MM * 2;
      const pagePixelHeight = Math.max(
        1,
        Math.floor((canvas.width * printableHeight) / printableWidth)
      );

      let offsetY = 0;
      let isFirstPage = true;

      while (offsetY < canvas.height) {
        const sliceHeight = Math.min(pagePixelHeight, canvas.height - offsetY);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const pageContext = pageCanvas.getContext('2d');

        if (!pageContext) {
          throw new Error('Unable to prepare PDF page canvas');
        }

        pageContext.fillStyle = '#ffffff';
        pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageContext.drawImage(
          canvas,
          0,
          offsetY,
          canvas.width,
          sliceHeight,
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        if (!isFirstPage) {
          pdf.addPage();
        }

        pdf.addImage(
          pageCanvas.toDataURL('image/png'),
          'PNG',
          PDF_EXPORT_MARGIN_MM,
          PDF_EXPORT_MARGIN_MM,
          printableWidth,
          (pageCanvas.height * printableWidth) / pageCanvas.width,
          undefined,
          'FAST'
        );

        offsetY += sliceHeight;
        isFirstPage = false;
      }

      pdf.save(`${data.type}-${data.invoiceNumber || 'invoice'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
      setIsDownloading(false);
    }
  };

  const getVal = (val: string | undefined, placeholder: string) => {
    if (val && val.trim()) return val;
    return hasGenerated ? '' : placeholder;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flex: 1,
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'auto',
        }}
      >
        <div
          ref={invoiceRef}
          style={{
            width: isExporting ? `${PDF_EXPORT_WIDTH}px` : '100%',
            maxWidth: isExporting ? `${PDF_EXPORT_WIDTH}px` : '800px',
            backgroundColor: 'white',
            padding: isExporting ? '2.25rem' : '3rem',
            boxShadow: isExporting ? 'none' : '0 20px 50px rgba(0,0,0,0.1)',
            minHeight: isExporting ? 'auto' : '800px',
            height: 'fit-content',
            flexShrink: 0,
            color: '#1e293b',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: isExporting ? '2.5rem' : '4rem',
            marginBottom: isExporting ? 0 : '4rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
            <div>
              {data.logo ? (
                <img
                  src={data.logo}
                  alt="Logo"
                  style={{ maxHeight: '50px', maxWidth: '180px', objectFit: 'contain', marginBottom: '0.75rem' }}
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'black',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    marginBottom: '0.75rem',
                  }}
                >
                  <Check size={24} strokeWidth={3} />
                </div>
              )}
              <h2 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {getVal(data.fromName, 'FinFlow Studio')}
              </h2>
              <div
                style={{
                  color: '#64748b',
                  fontSize: '0.8rem',
                  marginTop: '0.15rem',
                  width: detailColumnWidth,
                  whiteSpace: 'pre-line',
                  lineHeight: 1.5,
                }}
              >
                {getVal(data.fromAddress, '128 Innovation Way\nPalo Alto, CA 94301')}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h1
                className="font-outfit"
                style={{
                  fontSize: titleFontSize,
                  fontWeight: 300,
                  color: '#e2e8f0',
                  letterSpacing: '0.15rem',
                  marginBottom: '0.5rem',
                }}
              >
                {data.type?.toUpperCase() || 'INVOICE'}
              </h1>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>#{data.invoiceNumber || 'INV-2024-0012'}</div>
              <div
                style={{
                  color: '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                ISSUED {data.date || '2024-05-30'}
              </div>
              <div
                style={{
                  color: '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                DUE {data.dueDate || '2024-06-20'}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: isExporting ? '2.5rem' : '2rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#94a3b8',
                  letterSpacing: '0.05rem',
                  marginBottom: '0.5rem',
                }}
              >
                BILLED TO
              </div>
              <div style={{ fontWeight: 700, fontSize: sectionValueFontSize, lineHeight: 1.45 }}>
                {getVal(data.toName, 'Ahmed Khan')}
              </div>
              <div
                style={{
                  color: '#64748b',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                  width: detailColumnWidth,
                  whiteSpace: 'pre-line',
                  lineHeight: 1.5,
                }}
              >
                {getVal(data.toAddress, '452 Market Street, Floor 12\nSan Francisco, CA 94105')}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#94a3b8',
                  letterSpacing: '0.05rem',
                  marginBottom: '0.5rem',
                }}
              >
                PROJECT
              </div>
              <div style={{ fontWeight: 700, fontSize: sectionValueFontSize, lineHeight: 1.45 }}>
                {getVal(data.projectName, 'Fintech App UX Transformation')}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {data.invoiceNumber || 'INV-001'}
              </div>
            </div>
          </div>

          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid black' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0', fontSize: '0.7rem', fontWeight: 700, color: '#1e293b' }}>DESCRIPTION</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 0', fontSize: '0.7rem', fontWeight: 700, color: '#1e293b' }}>QTY</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem 0', fontSize: '0.7rem', fontWeight: 700, color: '#1e293b' }}>RATE</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem 0', fontSize: '0.7rem', fontWeight: 700, color: '#1e293b' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: index === data.items.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem 0' }}>
                      <div style={{ fontWeight: 700, fontSize: itemFontSize, lineHeight: 1.45 }}>
                        {item.description.split('\n')[0]}
                      </div>
                      {item.description.split('\n').slice(1).join(' ').trim() ? (
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.15rem', lineHeight: 1.45 }}>
                          {item.description.split('\n').slice(1).join(' ').trim()}
                        </div>
                      ) : null}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: itemFontSize }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600, fontSize: itemFontSize }}>
                      {formatCurrency(item.price, data.currency)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, fontSize: itemFontSize }}>
                      {formatCurrency(item.total, data.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              borderTop: '2px solid #e2e8f0',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '2rem',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ maxWidth: isExporting ? '340px' : '320px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05rem', marginBottom: '0.5rem' }}>
                PAYMENT NOTE
              </div>
              <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {getVal(data.notes, 'Bank transfer only')}
              </div>
            </div>
            <div style={{ width: isExporting ? '235px' : '220px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem' }}>Subtotal</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{formatCurrency(data.subtotal, data.currency)}</span>
              </div>
              {data.discountRate > 0 ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem' }}>
                      Discount ({data.discountRate}%)
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      - {formatCurrency(data.discountAmount, data.currency)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem' }}>After discount</span>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      {formatCurrency(discountedSubtotal, data.currency)}
                    </span>
                  </div>
                </>
              ) : null}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem' }}>GST ({data.taxRate}%)</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{formatCurrency(data.taxAmount, data.currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid black', paddingTop: '1rem' }}>
                <span style={{ fontWeight: 800, fontSize: totalFontSize }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: totalFontSize }}>{formatCurrency(data.total, data.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '50px',
          fontWeight: 700,
          boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 100,
        }}
      >
        <Download size={20} />
        {isDownloading ? 'Generating PDF...' : 'Download Invoice'}
      </button>
    </div>
  );
}
