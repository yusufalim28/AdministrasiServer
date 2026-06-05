import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM Poster ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data poster' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const file = formData.get('file') as File | null;

    if (!judul || !deskripsi || !file) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Simpan file ke public/uploads
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '-');
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const gambarUrl = `/uploads/${filename}`;

    const [result] = await db.execute(
      'INSERT INTO Poster (judul, deskripsi, gambar) VALUES (?, ?, ?)',
      [judul, deskripsi, gambarUrl]
    ) as any[];

    // Return the inserted poster data (we simulate finding it by the insertId)
    const insertedId = result.insertId;
    const [rows] = await db.execute('SELECT * FROM Poster WHERE id = ?', [insertedId]) as any[];
    const poster = rows[0];

    return NextResponse.json(poster, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menambah poster' }, { status: 500 });
  }
}
