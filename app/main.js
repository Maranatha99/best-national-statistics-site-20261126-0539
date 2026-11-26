// ARUNIKA — Indonesia dalam Angka.
// Router hash + interaksi: pencarian dan pengurutan tabel provinsi,
// tab grafik, dan perincian perdagangan per tahun.
// Rute: #/ (beranda), #/penduduk, #/ekonomi, #/kerja, #/dagang, #/pembangunan.

import { PROVINCES, TRADE } from './data.js';
import { home, penduduk, ekonomi, kerja, dagang, pembangunan, missing, provinceRows } from './views.js';
import { fmt } from './charts.js';

const app = document.getElementById('app');
const TOTAL_POP = PROVINCES.reduce((a, p) => a + p.pop, 0);

const ROUTES = {
  '': home,
  penduduk,
  ekonomi,
  kerja,
  dagang,
  pembangunan,
};

const TITLES = {
  '': 'ARUNIKA — Indonesia dalam Angka',
  penduduk: 'Penduduk | ARUNIKA',
  ekonomi: 'Ekonomi | ARUNIKA',
  kerja: 'Ketenagakerjaan & Kemiskinan | ARUNIKA',
  dagang: 'Perdagangan | ARUNIKA',
  pembangunan: 'Pembangunan | ARUNIKA',
};

// Tabel provinsi: saring berdasarkan pencarian + pulau, lalu urutkan.
function applyProvinceFilter() {
  const search = document.getElementById('prov-search');
  const island = document.getElementById('prov-island');
  const sort = document.getElementById('prov-sort');
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  if (!search || !body) return;
  const q = search.value.trim().toLowerCase();
  let list = PROVINCES.filter(
    (p) => (island.value === 'Semua' || p.island === island.value) && p.name.toLowerCase().includes(q),
  );
  if (sort.value === 'pop-desc') list.sort((a, b) => b.pop - a.pop);
  else if (sort.value === 'pop-asc') list.sort((a, b) => a.pop - b.pop);
  else if (sort.value === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  else if (sort.value === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name, 'id'));
  body.innerHTML = list.length
    ? provinceRows(list, TOTAL_POP)
    : '<tr><td colspan="5">Tidak ada provinsi yang cocok. Coba kata kunci atau pulau lain.</td></tr>';
  count.textContent = `Menampilkan ${list.length} dari 38 provinsi.`;
}

function initProvinceControls() {
  const search = document.getElementById('prov-search');
  if (!search) return;
  search.addEventListener('input', applyProvinceFilter);
  document.getElementById('prov-island').addEventListener('change', applyProvinceFilter);
  document.getElementById('prov-sort').addEventListener('change', applyProvinceFilter);
}

// Tab: satu tombol aktif, satu panel terlihat.
function initTabs() {
  const tabs = app.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.panel');
      group.querySelectorAll('.tab').forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      group.querySelectorAll('.tab-panel').forEach((panel) => {
        panel.classList.toggle('hidden', panel.id !== `tab-${tab.dataset.tab}`);
      });
    });
  });
}

// Perincian perdagangan untuk tahun yang dipilih.
function tradeDetail(year) {
  const t = TRADE.find((row) => row.year === year);
  if (!t) return '';
  const surplus = (t.exports - t.imports).toFixed(1).replace('.', ',');
  const status = t.exports >= t.imports ? 'surplus' : 'defisit';
  return `<p><strong>${t.year}:</strong> ekspor US$${fmt(t.exports, 1)} miliar, impor US$${fmt(t.imports, 1)} miliar — <strong>${status} US$${surplus.replace('-', '')} miliar</strong>.</p>`;
}

function initTradeControls() {
  const select = document.getElementById('trade-year');
  const detail = document.getElementById('trade-detail');
  if (!select || !detail) return;
  const update = () => {
    detail.innerHTML = tradeDetail(Number(select.value));
  };
  select.addEventListener('change', update);
  update();
}

function render() {
  window.__shotReady = false;
  const route = (location.hash.match(/^#\/([^/?]+)/) || [null, ''])[1];
  const view = ROUTES[route];
  document.title = TITLES[route] ?? 'ARUNIKA — Indonesia dalam Angka';
  app.innerHTML = view ? view() : missing();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#/${route}`);
  });
  initProvinceControls();
  initTabs();
  initTradeControls();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
