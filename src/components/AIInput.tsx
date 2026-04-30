'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';

interface AIInputProps {
  onDataGenerated: (data: any) => void;
}

export default function AIInput({ onDataGenerated }: AIInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to generate invoice');
      }
      
      onDataGenerated(data);
      setPrompt('');
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#eef2ff',
      borderRadius: 'var(--radius-lg)',
      marginBottom: '2.5rem',
      border: '1px solid #c7d2fe',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative sparkles */}
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
        <Sparkles size={120} color="var(--primary)" />
      </div>

      <h2 className="font-outfit" style={{ 
        fontSize: '1rem', 
        marginBottom: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem',
        color: 'var(--primary)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05rem'
      }}>
        <div style={{ padding: '0.4rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)' }}>
          <Wand2 size={18} color="var(--primary)" />
        </div>
        Magic AI Generator
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Describe the project... (e.g., "3 weeks of UI design for a fintech mobile app including 12 high-fidelity screens and a design system component library")'
            style={{
              width: '100%',
              padding: '1.5rem',
              paddingBottom: '4rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              minHeight: '160px',
              fontSize: '1rem',
              color: '#4b5563',
              lineHeight: '1.6',
              resize: 'none',
              outline: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02) inset',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          
          <div style={{ 
            position: 'absolute', 
            right: '1rem', 
            bottom: '1rem',
          }}>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                opacity: isLoading || !prompt.trim() ? 0.6 : 1,
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Line Items
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
