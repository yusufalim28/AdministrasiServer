import Link from 'next/link';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar glass-panel">
        <h2 className="text-gradient" style={{ marginBottom: '2rem' }}>Admin Panel</h2>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-link">Dashboard</Link>
          <Link href="/admin/posters" className="admin-link">Kelola Poster</Link>
          <Link href="/" className="admin-link" style={{ marginTop: 'auto', color: 'var(--primary-blue)' }}>← Kembali ke Galeri</Link>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
