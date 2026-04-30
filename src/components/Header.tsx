import { Search, Bell, HelpCircle, Plus, Zap } from 'lucide-react';

export default function Header({ onNewInvoice }: { onNewInvoice?: () => void }) {
  return (
    <header style={{
      height: '72px',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
          <Zap size={20} fill="white" />
        </div>
        <span className="font-outfit" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)' }}>InvoiceQuick</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="/about" style={{ color: 'var(--secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>About</a>
      </div>
    </header>
  );
}
