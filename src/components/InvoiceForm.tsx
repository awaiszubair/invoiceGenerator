'use client';

import { InvoiceData, InvoiceItem } from '@/types/invoice';
import { mergeInvoiceData } from '@/lib/invoice';
import { Plus, Trash2, Upload, Calendar } from 'lucide-react';
import { ChangeEvent } from 'react';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const handleChange = (field: keyof InvoiceData, value: any) => {
    onChange(mergeInvoiceData(data, { [field]: value }));
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    const newItems = data.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    });
    handleChange('items', newItems);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    handleChange('items', [...data.items, newItem]);
  };

  const removeItem = (id: string) => {
    if (data.items.length === 1) return;
    handleChange('items', data.items.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: 'grid', gap: '2.5rem' }}>
      {/* Logo & Basic Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>LOGO</label>
          <div style={{
            width: '100px',
            height: '100px',
            border: '2px dashed #475569',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#f8fafc',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {data.logo ? (
              <img src={data.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <Upload size={20} color="#94a3b8" />
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>YOUR NAME / BUSINESS</label>
          <input 
            value={data.fromName} 
            onChange={(e) => handleChange('fromName', e.target.value)}
            style={inputStyle}
            placeholder="e.g. FinFlow Studio"
          />
        </div>

        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>YOUR ADDRESS</label>
          <textarea
            value={data.fromAddress} 
            onChange={(e) => handleChange('fromAddress', e.target.value)}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            placeholder="e.g. Gulshan-e-Iqbal, Karachi"
          />
        </div>
      </div>

      {/* Client Info Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>CLIENT NAME</label>
          <input 
            value={data.toName} 
            onChange={(e) => handleChange('toName', e.target.value)}
            style={inputStyle}
            placeholder="e.g. Acme Dynamics Corp"
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>CLIENT ADDRESS</label>
          <textarea
            value={data.toAddress}
            onChange={(e) => handleChange('toAddress', e.target.value)}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            placeholder={'e.g. RetailPro Systems\nOffice 5B, Business Avenue, Lahore'}
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>INVOICE NUMBER</label>
          <input 
            value={data.invoiceNumber} 
            onChange={(e) => handleChange('invoiceNumber', e.target.value)}
            style={inputStyle}
            placeholder="e.g. INV-2026-047"
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>PROJECT NAME</label>
          <input
            value={data.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            style={inputStyle}
            placeholder="e.g. E-commerce website development"
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>ISSUE DATE</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="date" 
              value={data.date} 
              onChange={(e) => handleChange('date', e.target.value)}
              style={{ ...inputStyle, paddingRight: '2.5rem' }}
            />
            <Calendar size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>DUE DATE</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="date" 
              value={data.dueDate} 
              onChange={(e) => handleChange('dueDate', e.target.value)}
              style={{ ...inputStyle, paddingRight: '2.5rem' }}
            />
            <Calendar size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>DISCOUNT %</label>
          <input
            type="number"
            value={data.discountRate}
            onChange={(e) => handleChange('discountRate', parseFloat(e.target.value) || 0)}
            style={inputStyle}
            placeholder="0"
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>GST / TAX %</label>
          <input
            type="number"
            value={data.taxRate}
            onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) || 0)}
            style={inputStyle}
            placeholder="0"
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={labelStyle}>PAYMENT NOTE</label>
          <textarea
            value={data.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            placeholder="e.g. Bank transfer only - HBL 1234-5678-9012"
          />
        </div>
      </div>

      {/* Items Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="font-outfit" style={{ fontSize: '1rem', fontWeight: 700, color: '#334155' }}>Line Items</h3>
          <button 
            onClick={addItem}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: 'var(--primary)', 
              fontSize: '0.85rem', 
              fontWeight: 700 
            }}
          >
            <Plus size={16} /> Add Row
          </button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2.5fr 0.8fr 1.2fr 1.2fr 40px', 
          gap: '1rem', 
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '1rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--secondary)',
          letterSpacing: '0.05rem'
        }}>
          <div>DESCRIPTION</div>
          <div style={{ textAlign: 'center' }}>QTY</div>
          <div>RATE</div>
          <div style={{ textAlign: 'right' }}>AMOUNT</div>
          <div></div>
        </div>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {data.items.map((item) => (
            <div key={item.id} style={{ 
              display: 'grid', 
              gridTemplateColumns: '2.5fr 0.8fr 1.2fr 1.2fr 40px', 
              gap: '1rem', 
              alignItems: 'start',
              paddingBottom: '1rem',
              borderBottom: '1px solid #f8fafc'
            }}>
              <textarea 
                value={item.description} 
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                placeholder="Work description..."
                style={{ ...inputStyle, minHeight: '60px', resize: 'none', padding: '0.75rem' }}
              />
              <input 
                type="number"
                value={item.quantity} 
                onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                style={{ ...inputStyle, textAlign: 'center' }}
              />
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)', fontSize: '0.9rem' }}>{data.currency}</span>
                <input 
                  type="number"
                  value={item.price} 
                  onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                  style={{ ...inputStyle, paddingLeft: '3rem' }}
                />
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, textAlign: 'right', padding: '0.75rem 0' }}>
                {data.currency} {item.total.toLocaleString('en-PK')}
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                style={{ color: '#cbd5e1', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 800,
  color: '#334155',
  letterSpacing: '0.05rem',
  textTransform: 'uppercase'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '8px',
  border: '2px solid #475569',
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#0f172a',
  outline: 'none',
  backgroundColor: '#ffffff',
  transition: 'all 0.2s ease',
};
