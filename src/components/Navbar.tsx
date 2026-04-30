import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  BarChart3, 
  Settings, 
  Zap,
  PenLine
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: PenLine, label: 'Invoice Builder', href: '/', active: true },
    { icon: Settings, label: 'Admin Panel', href: '/admin', active: false },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1rem',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
        <h1 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
            <Zap size={20} fill="white" />
          </div>
          InvoiceQuick
        </h1>
        <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '0.1rem', fontWeight: 700, marginTop: '0.25rem', display: 'block' }}>SMART GENERATOR</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: item.active ? 'var(--primary)' : 'var(--secondary)',
              backgroundColor: item.active ? 'var(--primary-light)' : 'transparent',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.2s',
              borderLeft: item.active ? '4px solid var(--primary)' : '4px solid transparent',
            }}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: '1rem' }}>
        <button style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
        }}>
          <Zap size={18} fill="white" />
          Generate Quote
        </button>
      </div>
    </aside>
  );
}
