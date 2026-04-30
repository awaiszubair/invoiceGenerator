'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      alert('Settings saved!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>Loading settings...</div>;

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>SEO & General Settings</h1>
      
      <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Site Name</label>
          <input 
            value={settings.siteName} 
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Default Meta Title</label>
          <input 
            value={settings.defaultMetaTitle} 
            onChange={(e) => setSettings({...settings, defaultMetaTitle: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Default Meta Description</label>
          <textarea 
            value={settings.defaultMetaDescription} 
            onChange={(e) => setSettings({...settings, defaultMetaDescription: e.target.value})}
            style={{ ...inputStyle, minHeight: '100px' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Google Analytics ID</label>
          <input 
            value={settings.googleAnalyticsId || ''} 
            onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})}
            style={inputStyle}
            placeholder="G-XXXXXXXXXX"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
            width: 'fit-content'
          }}
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Settings
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: 'var(--secondary)'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  fontSize: '1rem',
  outline: 'none'
};
