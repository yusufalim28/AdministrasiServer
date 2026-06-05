export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-gradient">Dashboard Admin</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Selamat datang di panel admin. Pilih menu di sidebar untuk mengelola konten.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="glass-panel">
          <h3>Kelola Poster</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Kelola daftar desain poster yang tampil di galeri utama, termasuk fitur upload gambar.</p>
          <a href="/admin/posters" className="btn-primary" style={{ display: 'inline-block' }}>Masuk Manajemen Poster</a>
        </div>
      </div>
    </div>
  );
}
