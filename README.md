# 🎂 Happy Birthday

Kado ulang tahun interaktif berbentuk web: serangkaian langkah interaktif yang berakhir di galeri 3D berisi foto-foto kenangan.

## ✨ Fitur

- **Party Mode Toggle**: saklar glassmorphic untuk membuka suasana pesta.
- **Tic-Tac-Toe**: game "curang" — saat menang, kotak berubah jadi hadiah 🎁.
- **Happiness Meter**: gauge SVG yang terisi sampai 100%.
- **Tiup Lilin & Make a Wish**: kue dengan lilin yang bisa dipadamkan satu per satu, lalu confetti.
- **Typewriter**: ucapan "Happy Birthday" dengan animasi mesin ketik dan hujan confetti.
- **3D Dome Gallery**: galeri foto berbentuk bola 3D interaktif dengan banner Happy Birthday, balon, dan confetti.
- **Musik latar**: `public/pretty.mp3` diputar otomatis dan berulang.

## 🚀 Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📸 Kustomisasi

- **Nama penerima**: ubah `RECIPIENT_NAME` di bagian atas `components/InteractionFlow.tsx` (kosongkan jika tidak ingin menampilkan nama).
- **Foto**: taruh di `public/` dengan nama `1.jpeg` s/d `15.jpeg`, atau ubah array `userImages` di `app/page.tsx`.
- **Musik**: ganti `public/pretty.mp3` dengan lagu favoritmu (atau ubah path-nya di `app/page.tsx`).
- **Ucapan**: ubah teks di komponen `TypewriterStep` pada `components/InteractionFlow.tsx`.

## 🛠️ Tech Stack

Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React.
