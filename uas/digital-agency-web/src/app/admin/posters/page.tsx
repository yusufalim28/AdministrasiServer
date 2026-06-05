'use client';
import { useState, useEffect, useRef } from 'react';

type Poster = { id: number, judul: string, deskripsi: string, gambar: string };

export default function AdminPosters() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: 0, judul: '', deskripsi: '' });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchPosters(); }, []);

  async function fetchPosters() {
    setLoading(true);
    const res = await fetch('/api/posters');
    if (res.ok) setPosters(await res.json());
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEditing && !file) {
      alert("Harap pilih gambar untuk diupload!");
      return;
    }

    const formData = new FormData();
    formData.append('judul', form.judul);
    formData.append('deskripsi', form.deskripsi);
    if (file) formData.append('file', file);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/posters/${form.id}` : '/api/posters';
    
    await fetch(url, {
      method,
      body: formData // Jangan set Content-Type agar browser otomatis set boundaries
    });
    
    setForm({ id: 0, judul: '', deskripsi: '' });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsEditing(false);
    fetchPosters();
  }

  async function handleDelete(id: number) {
    if (!confirm('Apakah Anda yakin ingin menghapus poster ini?')) return;
    await fetch(`/api/posters/${id}`, { method: 'DELETE' });
    fetchPosters();
  }

  function handleEdit(p: Poster) {
    setForm({ id: p.id, judul: p.judul, deskripsi: p.deskripsi });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-gradient">Kelola Poster</h1>
      
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h3>{isEditing ? 'Edit Poster' : 'Tambah Poster Baru'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Judul Poster</label>
            <input required className="form-input" value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} placeholder="Masukkan judul..." />
          </div>
          <div className="form-group">
            <label className="form-label">Deskripsi</label>
            <textarea required className="form-input" value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} rows={3} placeholder="Deskripsi poster..."></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Upload Gambar {isEditing && "(Biarkan kosong jika tidak ingin mengubah gambar)"}</label>
            <input 
              type="file" 
              accept="image/*"
              className="form-input" 
              onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
              ref={fileInputRef} 
            />
          </div>
          <button type="submit" className="btn-primary">{isEditing ? 'Update Poster' : 'Simpan Poster'}</button>
          {isEditing && <button type="button" className="btn-secondary" style={{ marginLeft: '1rem' }} onClick={() => { setIsEditing(false); setForm({ id: 0, judul: '', deskripsi: '' }); }}>Batal</button>}
        </form>
      </div>

      <h2>Daftar Poster</h2>
      {loading ? <p>Memuat data...</p> : (
        <div className="admin-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {posters.map(p => (
            <div key={p.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={p.gambar} alt={p.judul} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>{p.judul}</h3>
              <p style={{ color: 'var(--text-secondary)', flexGrow: 1 }}>{p.deskripsi}</p>
              <div className="admin-actions" style={{ marginTop: '1rem' }}>
                <button className="btn-secondary" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(p.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
