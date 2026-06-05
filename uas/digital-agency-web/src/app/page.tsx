import Link from 'next/link';
export const dynamic = 'force-dynamic';
import db from '@/lib/db';

export default async function Home() {
  const [rows] = await db.query('SELECT * FROM Poster ORDER BY createdAt DESC');
  const posters = rows as any[];

  return (
    <div>
      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, width: '100%', zIndex: 10 }}>
        <h2 className="text-gradient">Galeri Poster</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#gallery" className="admin-link">Karya Kami</a>
          <Link href="/admin" className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Login Admin</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', backgroundColor: 'var(--card-hover-bg)' }}>
        <div className="container" style={{ textAlign: 'center', zIndex: 2 }}>
          <h1 className="animate-fade-in" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
            Temukan <span className="text-gradient">Inspirasi Visual</span>
          </h1>
          <p className="animate-fade-in delay-1" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Kumpulan karya desain poster terbaik yang diciptakan dengan kreativitas dan estetika tinggi.
          </p>
          <div className="animate-fade-in delay-2">
            <a href="#gallery" className="btn-primary" style={{ marginRight: '1rem' }}>Lihat Galeri</a>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section id="gallery" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-gradient">Koleksi Poster</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Eksplorasi mahakarya visual kami</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {posters.length === 0 ? (
              <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>Belum ada poster di galeri.</p>
            ) : (
              posters.map(p => (
                <div key={p.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <img src={p.gambar} alt={p.judul} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{p.judul}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{p.deskripsi}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--card-border)', padding: '3rem 0', textAlign: 'center', backgroundColor: 'var(--card-hover-bg)' }}>
        <div className="container">
          <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Galeri Poster</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Kreativitas tanpa batas.</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>© {new Date().getFullYear()} Galeri Desain Poster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
