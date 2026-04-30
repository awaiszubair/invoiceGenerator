'use client';

import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
}

const templates = [
  { id: 'modern', name: 'Modern Clean', color: '#2563eb' },
  { id: 'professional', name: 'Professional', color: '#1a1a1a' },
  { id: 'creative', name: 'Creative', color: '#db2777' },
  { id: 'minimal', name: 'Minimalist', color: '#64748b' },
];

export default function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Select Template</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius)',
              border: `2px solid ${selectedTemplate === template.id ? template.color : 'var(--border)'}`,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              fontWeight: 500,
              color: selectedTemplate === template.id ? template.color : 'var(--foreground)',
              boxShadow: selectedTemplate === template.id ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
            }}
          >
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: template.color 
            }} />
            {template.name}
            {selectedTemplate === template.id && <Check size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
}
