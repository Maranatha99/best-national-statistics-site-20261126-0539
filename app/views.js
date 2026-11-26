// HTML tiap halaman ARUNIKA, dibangun dari data.js dan grafik charts.js.
// Semua nilai di-escape sebelum masuk ke halaman.

import { KEY_FIGURES, PROVINCES, GDP_GROWTH, GDP_NOMINAL, GDP_SECTORS, POVERTY, UNEMPLOYMENT, TRADE, HDI, INFLATION, LABOUR_FACTS, TRADE_FACTS, DEV_FACTS, ISLANDS } from './data.js';
import { barChart, hbarChart, lineChart, groupedBarChart, fmt } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function sourceNote(text) {
  return `<p class="source">Sumber: ${esc(text)}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${KEY_FIGURES.map(
    (k) => `<article class="kpi"><p class="kpi-label">${esc(k.label)}</p><p class="kpi-value">${esc(k.value)}</p><p class="kpi-note">${esc(k.note)} · ${esc(k.source)}</p></article>`,
  ).join('')}</div>`;
}

function sectionLinks() {
  const links = [
    ['#/penduduk', 'Penduduk', '38 provinsi, dicari dan diurutkan'],
    ['#/ekonomi', 'Ekonomi', 'PDB, pertumbuhan, dan sektor'],
    ['#/kerja', 'Ketenagakerjaan', 'Pengangguran dan kemiskinan'],
    ['#/dagang', 'Perdagangan', 'Ekspor, impor, dan neraca'],
    ['#/pembangunan', 'Pembangunan', 'IPM, inflasi, dan gini'],
  ];
  return `<div class="link-grid">${links.map(
    ([href, title, desc]) => `<a class="section-card" href="${href}"><strong>${esc(title)}</strong><span>${esc(desc)}</span><span class="go">Buka →</span></a>`,
  ).join('')}</div>`;
}

export function home() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `
<section class="hero">
  <p class="hero-eyebrow">Statistik nasional · Indonesia</p>
  <h1>Indonesia dalam Angka</h1>
  <p class="hero-lede">Penduduk, ekonomi, pekerjaan, perdagangan, dan pembangunan — angka resmi Badan Pusat Statistik, diringkas agar cepat dibaca di desktop maupun di ponsel.</p>
  <p class="hero-meta">Data terakhir: 2024–2025 · Diperbarui November 2026</p>
</section>
${kpiCards()}
${sourceNote('Badan Pusat Statistik (BPS), berbagai publikasi 2019–2025.')}
<section class="panel">
  <h2>Pertumbuhan ekonomi 2019–2024</h2>
  <p class="panel-sub">PDB tumbuh 5,03% pada 2024, setelah sempat minus pada 2020.</p>
  ${barChart(GDP_GROWTH.map((g) => ({ label: String(g.year), value: g.value })), { unit: '%', decimals: 2 })}
  ${sourceNote('BPS, Pertumbuhan Ekonomi Indonesia 2024.')}
  <p><a href="#/ekonomi">Lihat halaman Ekonomi →</a></p>
</section>
<section class="panel">
  <h2>Provinsi terpadat</h2>
  <p class="panel-sub">Jawa Barat, Jawa Timur, dan Jawa Tengah menampung lebih dari separuh penduduk Indonesia.</p>
  ${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop })), { unit: 'jt jiwa', decimals: 1 })}
  ${sourceNote('BPS, estimasi penduduk pertengahan 2024.')}
  <p><a href="#/penduduk">Lihat semua 38 provinsi →</a></p>
</section>
<section>
  <h2>Jelajahi statistiknya</h2>
  ${sectionLinks()}
</section>`;
}

export function provinceRows(list, total) {
  return list
    .map((p, i) => {
      const share = ((p.pop / total) * 100).toFixed(1).replace('.', ',');
      return `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.island)}</td><td class="num">${fmt(p.pop, 1)}</td><td class="num">${share}%</td></tr>`;
    })
    .join('');
}

export function penduduk() {
  const total = PROVINCES.reduce((a, p) => a + p.pop, 0);
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const jawa = PROVINCES.filter((p) => p.island === 'Jawa').reduce((a, p) => a + p.pop, 0);
  return `
<section class="page-head">
  <p class="crumb"><a href="#/">Beranda</a> / Penduduk</p>
  <h1>Penduduk</h1>
  <p class="lede">Indonesia berpenduduk <strong>281,6 juta jiwa</strong> pada 2024. Sekitar <strong>55,4%</strong> tinggal di Pulau Jawa (${fmt(jawa, 1)} juta jiwa), sisanya tersebar di lima pulau besar dan ribuan pulau lainnya.</p>
</section>
<section class="panel">
  <h2>Sepuluh provinsi terpadat</h2>
  ${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop })), { unit: 'jt jiwa', decimals: 1 })}
  ${sourceNote('BPS, estimasi penduduk pertengahan 2024.')}
</section>
<section class="panel">
  <h2>Semua 38 provinsi</h2>
  <div class="controls">
    <label>Cari provinsi <input id="prov-search" type="search" placeholder="Ketik nama provinsi…" autocomplete="off"></label>
    <label>Pulau
      <select id="prov-island">${ISLANDS.map((is) => `<option value="${esc(is)}">${esc(is)}</option>`).join('')}</select>
    </label>
    <label>Urutkan
      <select id="prov-sort">
        <option value="pop-desc">Penduduk terbanyak</option>
        <option value="pop-asc">Penduduk tersedikit</option>
        <option value="name-asc">Nama A–Z</option>
        <option value="name-desc">Nama Z–A</option>
      </select>
    </label>
  </div>
  <p id="prov-count" class="count" aria-live="polite">Menampilkan 38 dari 38 provinsi.</p>
  <div class="table-wrap">
    <table id="prov-table">
      <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (jt)</th><th class="num">Pangsa</th></tr></thead>
      <tbody id="prov-body">${provinceRows([...PROVINCES].sort((a, b) => b.pop - a.pop), total)}</tbody>
      <tfoot><tr><td></td><td><strong>Indonesia</strong></td><td></td><td class="num"><strong>${fmt(total, 1)}</strong></td><td class="num"><strong>100,0%</strong></td></tr></tfoot>
    </table>
  </div>
  ${sourceNote('BPS, estimasi penduduk pertengahan 2024. Angka per provinsi dibulatkan ke 0,1 juta jiwa.')}
</section>`;
}

export function ekonomi() {
  return `
<section class="page-head">
  <p class="crumb"><a href="#/">Beranda</a> / Ekonomi</p>
  <h1>Ekonomi</h1>
  <p class="lede">PDB Indonesia mencapai <strong>Rp22.139 triliun</strong> pada 2024 dan tumbuh <strong>5,03%</strong>. Industri pengolahan tetap menjadi penyumbang terbesar.</p>
</section>
<section class="panel">
  <div class="tabs" role="tablist">
    <button class="tab active" data-tab="growth" role="tab">Pertumbuhan</button>
    <button class="tab" data-tab="nominal" role="tab">PDB nominal</button>
    <button class="tab" data-tab="sectors" role="tab">Pangsa sektor</button>
  </div>
  <div class="tab-panel" id="tab-growth">
    <h2>Pertumbuhan ekonomi 2019–2024</h2>
    <p class="panel-sub">Persen per tahun. Kontraksi 2020 adalah dampak pandemi COVID-19.</p>
    ${barChart(GDP_GROWTH.map((g) => ({ label: String(g.year), value: g.value })), { unit: '%', decimals: 2 })}
    ${sourceNote('BPS, Pertumbuhan Ekonomi Indonesia.')}
  </div>
  <div class="tab-panel hidden" id="tab-nominal">
    <h2>PDB harga berlaku 2019–2024</h2>
    <p class="panel-sub">Rupiah triliun. PDB 2024 naik sekitar 6% dari 2023 dalam harga berlaku.</p>
    ${barChart(GDP_NOMINAL.map((g) => ({ label: String(g.year), value: g.value })), { unit: 'Rp T', decimals: 0, color: '#c97b1e' })}
    ${sourceNote('BPS, Produk Domestik Bruto Indonesia.')}
  </div>
  <div class="tab-panel hidden" id="tab-sectors">
    <h2>Pangsa sektor terhadap PDB, 2024</h2>
    <p class="panel-sub">Lima sektor terbesar menyumbang 62,7% PDB; sisanya 37,3% dari sektor lain.</p>
    ${hbarChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share })), { unit: '%', decimals: 1, color: '#c97b1e' })}
    ${sourceNote('BPS, Produk Domestik Bruto Indonesia 2024.')}
  </div>
</section>
<section class="panel">
  <h2>Yang perlu diketahui</h2>
  <ul class="facts">
    <li><strong>Konsumsi rumah tangga</strong> adalah penopang utama pertumbuhan, sekitar separuh PDB dari sisi pengeluaran.</li>
    <li><strong>Investasi (PMTB)</strong> tumbuh stabil di atas 4% per tahun sejak 2022.</li>
    <li><strong>Inflasi 2024 sebesar 1,57%</strong> — terendah dalam enam tahun — menjaga daya beli tetap terjaga.</li>
  </ul>
</section>`;
}

export function kerja() {
  return `
<section class="page-head">
  <p class="crumb"><a href="#/">Beranda</a> / Ketenagakerjaan</p>
  <h1>Ketenagakerjaan &amp; Kemiskinan</h1>
  <p class="lede">Pengangguran terbuka turun ke <strong>4,76%</strong> pada Februari 2025 dan kemiskinan ke <strong>9,03%</strong> pada Maret 2024 — terendah dalam satu dekade.</p>
</section>
<div class="fact-grid">${LABOUR_FACTS.map((f) => `<article class="fact"><p class="fact-value">${esc(f.value)}</p><p class="fact-label">${esc(f.label)}</p><p class="fact-note">${esc(f.note)}</p></article>`).join('')}</div>
${sourceNote('BPS, Keadaan Ketenagakerjaan Indonesia, Agustus 2024.')}
<section class="panel">
  <div class="tabs" role="tablist">
    <button class="tab active" data-tab="poverty" role="tab">Kemiskinan</button>
    <button class="tab" data-tab="unemp" role="tab">Pengangguran</button>
  </div>
  <div class="tab-panel" id="tab-poverty">
    <h2>Tingkat kemiskinan 2019–2024</h2>
    <p class="panel-sub">Persen penduduk miskin, Maret tiap tahun. Naik saat pandemi 2021, lalu turun lima tahun berturut-turut.</p>
    ${lineChart(POVERTY.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2, color: '#b3402a' })}
    ${sourceNote('BPS, Profil Kemiskinan di Indonesia. September 2024: 8,57%.')}
  </div>
  <div class="tab-panel hidden" id="tab-unemp">
    <h2>Tingkat pengangguran terbuka</h2>
    <p class="panel-sub">Persen angkatan kerja. Terendah sejak 2019.</p>
    ${barChart(UNEMPLOYMENT.map((u) => ({ label: u.label, value: u.value })), { unit: '%', decimals: 2, color: '#0e7a5f' })}
    ${sourceNote('BPS, Keadaan Ketenagakerjaan Indonesia.')}
  </div>
</section>`;
}

export function dagang() {
  const latest = TRADE[TRADE.length - 1];
  const surplus = (latest.exports - latest.imports).toFixed(1).replace('.', ',');
  return `
<section class="page-head">
  <p class="crumb"><a href="#/">Beranda</a> / Perdagangan</p>
  <h1>Perdagangan</h1>
  <p class="lede">Indonesia mencatat surplus neraca dagang <strong>US$${surplus} miliar</strong> pada 2024 — ekspor US$264,7 miliar melawan impor US$233,7 miliar.</p>
</section>
<div class="fact-grid">${TRADE_FACTS.map((f) => `<article class="fact"><p class="fact-value">${esc(f.value)}</p><p class="fact-label">${esc(f.label)}</p><p class="fact-note">${esc(f.note)}</p></article>`).join('')}</div>
${sourceNote('BPS, Statistik Perdagangan Luar Negeri Indonesia 2024.')}
<section class="panel">
  <h2>Ekspor vs impor, 2019–2024</h2>
  <p class="panel-sub">Miliar dolar AS. Hijau: ekspor. Kuning: impor. Pilih tahun untuk melihat rinciannya.</p>
  ${groupedBarChart(TRADE.map((t) => ({ label: String(t.year), a: t.exports, b: t.imports })), {})}
  <p class="legend"><span class="swatch" style="background:#0e7a5f"></span> Ekspor &nbsp; <span class="swatch" style="background:#c97b1e"></span> Impor</p>
  <div class="controls">
    <label>Lihat tahun
      <select id="trade-year">${TRADE.map((t) => `<option value="${t.year}"${t.year === 2024 ? ' selected' : ''}>${t.year}</option>`).join('')}</select>
    </label>
  </div>
  <div id="trade-detail" class="trade-detail" aria-live="polite"></div>
  ${sourceNote('BPS, Statistik Perdagangan Luar Negeri Indonesia.')}
</section>
<section class="panel">
  <h2>Apa yang diperdagangkan</h2>
  <ul class="facts">
    <li><strong>Ekspor utama:</strong> batu bara, minyak kelapa sawit (CPO), besi-baja dan nikel, karet, serta kopi.</li>
    <li><strong>Impor utama:</strong> mesin dan peralatan, bahan bakar minyak, bahan kimia, serta bahan baku industri.</li>
    <li><strong>Tujuan ekspor terbesar:</strong> Tiongkok, Amerika Serikat, dan Jepang.</li>
  </ul>
</section>`;
}

export function pembangunan() {
  return `
<section class="page-head">
  <p class="crumb"><a href="#/">Beranda</a> / Pembangunan</p>
  <h1>Pembangunan</h1>
  <p class="lede">Indeks Pembangunan Manusia mencapai <strong>75,02</strong> pada 2024 — kategori tinggi — sementara inflasi turun ke <strong>1,57%</strong>.</p>
</section>
<div class="fact-grid">${DEV_FACTS.map((f) => `<article class="fact"><p class="fact-value">${esc(f.value)}</p><p class="fact-label">${esc(f.label)}</p><p class="fact-note">${esc(f.note)}</p></article>`).join('')}</div>
${sourceNote('BPS, Indeks Pembangunan Manusia 2024 dan Statistik Indonesia.')}
<section class="panel">
  <div class="tabs" role="tablist">
    <button class="tab active" data-tab="hdi" role="tab">IPM</button>
    <button class="tab" data-tab="inflation" role="tab">Inflasi</button>
  </div>
  <div class="tab-panel" id="tab-hdi">
    <h2>Indeks Pembangunan Manusia 2019–2024</h2>
    <p class="panel-sub">IPM mengukur umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak. Di atas 70 berarti kategori tinggi.</p>
    ${lineChart(HDI.map((h) => ({ label: String(h.year), value: h.value })), { unit: 'IPM', decimals: 2, color: '#0e7a5f' })}
    ${sourceNote('BPS, Indeks Pembangunan Manusia.')}
  </div>
  <div class="tab-panel hidden" id="tab-inflation">
    <h2>Inflasi 2019–2024</h2>
    <p class="panel-sub">Persen, year-on-year Desember. Lonjakan 2022 mengikuti kenaikan harga BBM bersubsidi; 2024 terendah dalam enam tahun.</p>
    ${barChart(INFLATION.map((i) => ({ label: String(i.year), value: i.value })), { unit: '%', decimals: 2, color: '#c97b1e' })}
    ${sourceNote('BPS, Berita Resmi Statistik — Inflasi.')}
  </div>
</section>`;
}

export function missing() {
  return `<section class="page-head"><h1>Halaman tidak ditemukan</h1><p class="lede">Tidak ada halaman di alamat ini. <a href="#/">Kembali ke Beranda</a>.</p></section>`;
}
