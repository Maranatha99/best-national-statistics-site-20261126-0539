// Data ARUNIKA — Indonesia dalam Angka.
// Semua angka dari Badan Pusat Statistik (BPS), berbagai publikasi 2019–2025.
// Nilai dibulatkan seperlunya; tahun dan sumber dicantumkan di tiap tampilan.

export const META = {
  name: 'ARUNIKA',
  tagline: 'Indonesia dalam Angka',
  country: 'Indonesia',
  source: 'Badan Pusat Statistik (BPS)',
  updated: 'November 2026',
};

// Angka kunci nasional, 2024 (kecuali disebut lain).
export const KEY_FIGURES = [
  { label: 'Penduduk', value: '281,6 jt', note: 'jiwa, 2024', source: 'BPS' },
  { label: 'PDB nominal', value: 'Rp22.139 T', note: 'harga berlaku, 2024', source: 'BPS' },
  { label: 'Pertumbuhan ekonomi', value: '5,03%', note: 'yoy, 2024', source: 'BPS' },
  { label: 'Inflasi', value: '1,57%', note: 'yoy Desember 2024', source: 'BPS' },
  { label: 'Kemiskinan', value: '9,03%', note: 'Maret 2024', source: 'BPS' },
  { label: 'Indeks Pembangunan Manusia', value: '75,02', note: 'IPM, 2024', source: 'BPS' },
  { label: 'Pengangguran terbuka', value: '4,91%', note: 'Agustus 2024', source: 'BPS' },
  { label: 'Ekspor', value: 'US$264,7 M', note: 'miliar, 2024', source: 'BPS' },
];

// Penduduk per provinsi, estimasi pertengahan tahun 2024 (juta jiwa, BPS).
// Jumlah kolom dibulatkan ke 0,1 juta; total 281,6 juta jiwa.
export const PROVINCES = [
  { name: 'Aceh', island: 'Sumatera', pop: 5.6 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15.5 },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 6.0 },
  { name: 'Riau', island: 'Sumatera', pop: 6.9 },
  { name: 'Kepulauan Riau', island: 'Sumatera', pop: 2.2 },
  { name: 'Jambi', island: 'Sumatera', pop: 3.7 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 9.0 },
  { name: 'Kepulauan Bangka Belitung', island: 'Sumatera', pop: 1.5 },
  { name: 'Bengkulu', island: 'Sumatera', pop: 2.1 },
  { name: 'Lampung', island: 'Sumatera', pop: 9.4 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.6 },
  { name: 'Jawa Barat', island: 'Jawa', pop: 49.8 },
  { name: 'Banten', island: 'Jawa', pop: 12.4 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.8 },
  { name: 'DI Yogyakarta', island: 'Jawa', pop: 3.8 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.7 },
  { name: 'Bali', island: 'Bali & Nusa Tenggara', pop: 4.4 },
  { name: 'Nusa Tenggara Barat', island: 'Bali & Nusa Tenggara', pop: 5.6 },
  { name: 'Nusa Tenggara Timur', island: 'Bali & Nusa Tenggara', pop: 5.7 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5.8 },
  { name: 'Kalimantan Tengah', island: 'Kalimantan', pop: 2.8 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4.4 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', pop: 4.1 },
  { name: 'Kalimantan Utara', island: 'Kalimantan', pop: 0.7 },
  { name: 'Sulawesi Utara', island: 'Sulawesi', pop: 2.7 },
  { name: 'Gorontalo', island: 'Sulawesi', pop: 1.3 },
  { name: 'Sulawesi Tengah', island: 'Sulawesi', pop: 3.1 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.5 },
  { name: 'Sulawesi Tenggara', island: 'Sulawesi', pop: 2.8 },
  { name: 'Sulawesi Barat', island: 'Sulawesi', pop: 1.6 },
  { name: 'Maluku', island: 'Maluku & Papua', pop: 2.0 },
  { name: 'Maluku Utara', island: 'Maluku & Papua', pop: 1.4 },
  { name: 'Papua', island: 'Maluku & Papua', pop: 1.1 },
  { name: 'Papua Barat', island: 'Maluku & Papua', pop: 0.6 },
  { name: 'Papua Selatan', island: 'Maluku & Papua', pop: 0.5 },
  { name: 'Papua Tengah', island: 'Maluku & Papua', pop: 1.4 },
  { name: 'Papua Pegunungan', island: 'Maluku & Papua', pop: 1.5 },
  { name: 'Papua Barat Daya', island: 'Maluku & Papua', pop: 0.6 },
];

export const ISLANDS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku & Papua'];

// Pertumbuhan ekonomi, % yoy (BPS).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// PDB harga berlaku, Rp triliun (BPS).
export const GDP_NOMINAL = [
  { year: 2019, value: 15834 },
  { year: 2020, value: 15443 },
  { year: 2021, value: 16971 },
  { year: 2022, value: 19588 },
  { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

// Pangsa sektor terhadap PDB, 2024, % (BPS).
export const GDP_SECTORS = [
  { sector: 'Industri pengolahan', share: 18.7 },
  { sector: 'Perdagangan besar & eceran', share: 13.0 },
  { sector: 'Pertanian, kehutanan & perikanan', share: 12.5 },
  { sector: 'Konstruksi', share: 9.9 },
  { sector: 'Pertambangan & penggalian', share: 8.6 },
  { sector: 'Sektor lainnya', share: 37.3 },
];

// Tingkat kemiskinan, % penduduk, Maret tiap tahun (BPS).
export const POVERTY = [
  { year: 2019, value: 9.22 },
  { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
];

// Tingkat pengangguran terbuka, % (BPS).
export const UNEMPLOYMENT = [
  { label: 'Agu 2022', value: 5.86 },
  { label: 'Feb 2023', value: 5.45 },
  { label: 'Agu 2023', value: 5.32 },
  { label: 'Feb 2024', value: 4.82 },
  { label: 'Agu 2024', value: 4.91 },
  { label: 'Feb 2025', value: 4.76 },
];

// Perdagangan luar negeri, US$ miliar (BPS).
export const TRADE = [
  { year: 2019, exports: 167.7, imports: 171.3 },
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.6, imports: 196.2 },
  { year: 2022, exports: 291.9, imports: 237.4 },
  { year: 2023, exports: 258.8, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 },
];

// Indeks Pembangunan Manusia (BPS).
export const HDI = [
  { year: 2019, value: 71.92 },
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 72.91 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Inflasi, % yoy Desember (BPS).
export const INFLATION = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const LABOUR_FACTS = [
  { label: 'Angkatan kerja', value: '150,0 jt', note: 'orang, Agustus 2024' },
  { label: 'Bekerja', value: '142,6 jt', note: 'orang, Agustus 2024' },
  { label: 'Pekerja informal', value: '±59%', note: 'dari yang bekerja, Agustus 2024' },
  { label: 'Pekerja formal', value: '±41%', note: 'dari yang bekerja, Agustus 2024' },
];

export const TRADE_FACTS = [
  { label: 'Ekspor 2024', value: 'US$264,7 M', note: 'miliar dolar AS' },
  { label: 'Impor 2024', value: 'US$233,7 M', note: 'miliar dolar AS' },
  { label: 'Surplus neraca dagang 2024', value: 'US$31,0 M', note: 'miliar dolar AS' },
  { label: 'Tujuan ekspor terbesar', value: 'Tiongkok, AS, Jepang', note: '2024' },
];

export const DEV_FACTS = [
  { label: 'Harapan hidup', value: '±74 tahun', note: '2024' },
  { label: 'Rasio gini', value: '0,379', note: 'Maret 2024' },
  { label: 'Kemiskinan ekstrem', value: '0,83%', note: 'Maret 2024' },
  { label: 'IPM tertinggi', value: 'DKI Jakarta', note: '84,15 pada 2024' },
];
