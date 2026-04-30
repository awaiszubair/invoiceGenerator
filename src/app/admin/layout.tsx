import Sidebar from '@/components/Navbar';
import Header from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="scroll-area">
          <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '3rem' }}>
              <aside style={{ width: '240px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'sticky', top: '2rem' }}>
                  <a href="/admin" style={{ 
                    padding: '0.85rem 1rem', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: 'white', 
                    fontWeight: 700, 
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    color: 'var(--primary)'
                  }}>
                    SEO Settings
                  </a>
                  <a href="/admin/posts" style={{ 
                    padding: '0.85rem 1rem', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: 'transparent', 
                    fontWeight: 600,
                    color: 'var(--secondary)'
                  }}>
                    Blog Posts
                  </a>
                </nav>
              </aside>
              <main style={{ flex: 1 }}>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
