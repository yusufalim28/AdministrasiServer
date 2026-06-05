import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const file = formData.get('file') as File | null;

    let updateData: any = { judul, deskripsi };

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = Date.now() + '-' + file.name.replace(/\s+/g, '-');
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);
      updateData.gambar = `/uploads/${filename}`;
    }

    if (updateData.gambar) {
      await db.execute('UPDATE Poster SET judul = ?, deskripsi = ?, gambar = ? WHERE id = ?', [judul, deskripsi, updateData.gambar, Number(id)]);
    } else {
      await db.execute('UPDATE Poster SET judul = ?, deskripsi = ? WHERE id = ?', [judul, deskripsi, Number(id)]);
    }

    const [rows] = await db.execute('SELECT * FROM Poster WHERE id = ?', [Number(id)]) as any[];
    const poster = rows[0];

    return NextResponse.json(poster);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [rows] = await db.execute('SELECT * FROM Poster WHERE id = ?', [Number(id)]) as any[];
    const poster = rows[0];
    
    if (poster && poster.gambar) {
      // Hapus file fisik
      try {
        const filepath = path.join(process.cwd(), 'public', poster.gambar);
        await unlink(filepath);
      } catch (e) {
        // Abaikan error jika file tidak ada
      }
    }

    await db.execute('DELETE FROM Poster WHERE id = ?', [Number(id)]);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal hapus' }, { status: 500 });
  }
}
