// Pembangun grafik SVG dari data.js. Tanpa library, tanpa network:
// semua grafik digambar sebagai elemen <svg> dari angka di data.js.

const fmt = (n, d = 2) =>
  n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Grafik batang vertikal. points: [{label, value}], unit: teks satuan di sumbu.
export function barChart(points, { width = 640, height = 300, unit = '', decimals = 2, color = '#0e7a5f', negativeColor = '#b3402a' } = {}) {
  const padL = 52;
  const padR = 12;
  const padT = 28;
  const padB = 34;
  const w = width;
  const h = height;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const values = points.map((p) => p.value);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const y = (v) => padT + ih - ((v - min) / span) * ih;
  const bw = iw / points.length;
  const zeroY = y(0);
  const ticks = 4;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = min + (span * i) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmt(v, decimals)}</text>`;
  }
  const bars = points
    .map((p, i) => {
      const x = padL + i * bw + bw * 0.18;
      const bw2 = bw * 0.64;
      const top = Math.min(y(p.value), zeroY);
      const bh = Math.abs(y(p.value) - zeroY);
      const fill = p.value < 0 ? negativeColor : color;
      const labelY = p.value < 0 ? top + 16 : y(p.value) - 6;
      const labelFill = p.value < 0 ? '#ffffff' : '#1c2420';
      return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw2.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}"/><text x="${(x + bw2 / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${labelFill}">${fmt(p.value, decimals)}</text><text x="${(x + bw2 / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="#4a443c">${esc(p.label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik batang ${esc(unit)}">${grid}<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="#b9b2a4" stroke-width="1.5"/>${bars}</svg>`;
}

// Grafik batang horizontal, cocok untuk peringkat provinsi dan pangsa sektor.
export function hbarChart(points, { width = 640, rowH = 34, unit = '', decimals = 1, color = '#0e7a5f', maxValue = null } = {}) {
  const padL = 168;
  const padR = 112; // ruang untuk label nilai di ujung batang terpanjang
  const padT = 8;
  const h = padT + points.length * rowH + 8;
  const iw = width - padL - padR;
  const max = maxValue ?? Math.max(...points.map((p) => p.value));
  const rows = points
    .map((p, i) => {
      const y = padT + i * rowH;
      const bw = (p.value / max) * iw;
      return `<text x="${padL - 10}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="13" fill="#1c2420">${esc(p.label)}</text><rect x="${padL}" y="${y + 6}" width="${Math.max(bw, 2).toFixed(1)}" height="${rowH - 12}" rx="3" fill="${color}"/><text x="${padL + bw + 8}" y="${y + rowH / 2 + 4}" font-size="13" font-weight="700" fill="#1c2420">${fmt(p.value, decimals)}${unit ? ' ' + esc(unit) : ''}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${h}" width="100%" role="img" aria-label="Grafik batang horizontal ${esc(unit)}">${rows}</svg>`;
}

// Grafik garis dengan titik dan label nilai.
export function lineChart(points, { width = 640, height = 300, unit = '', decimals = 2, color = '#0e7a5f' } = {}) {
  const padL = 52;
  const padR = 16;
  const padT = 28;
  const padB = 34;
  const w = width;
  const h = height;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const values = points.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const pad = span * 0.15;
  const lo = min - pad;
  const hi = max + pad;
  const x = (i) => padL + (i / (points.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const ticks = 4;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = lo + ((hi - lo) * i) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmt(v, decimals)}</text>`;
  }
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = points
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="2"/><text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2420">${fmt(p.value, decimals)}</text><text x="${x(i).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="#4a443c">${esc(p.label)}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik garis ${esc(unit)}">${grid}<path d="${line}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Grafik batang ganda (dua seri per tahun), untuk ekspor vs impor.
export function groupedBarChart(points, { width = 640, height = 300, decimals = 1, colors = ['#0e7a5f', '#c97b1e'] } = {}) {
  const padL = 52;
  const padR = 12;
  const padT = 28;
  const padB = 34;
  const w = width;
  const h = height;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const all = points.flatMap((p) => [p.a, p.b]);
  const max = Math.max(...all, 0);
  const y = (v) => padT + ih - (v / max) * ih;
  const ticks = 4;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = (max * i) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmt(v, 0)}</text>`;
  }
  const bw = iw / points.length;
  const bars = points
    .map((p, i) => {
      const x0 = padL + i * bw + bw * 0.14;
      const w2 = bw * 0.32;
      return `<rect x="${x0.toFixed(1)}" y="${y(p.a).toFixed(1)}" width="${w2.toFixed(1)}" height="${(padT + ih - y(p.a)).toFixed(1)}" rx="3" fill="${colors[0]}"/><rect x="${(x0 + w2 + 3).toFixed(1)}" y="${y(p.b).toFixed(1)}" width="${w2.toFixed(1)}" height="${(padT + ih - y(p.b)).toFixed(1)}" rx="3" fill="${colors[1]}"/><text x="${(x0 + w2 + 1.5).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="#4a443c">${esc(p.label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik batang ekspor dan impor">${grid}${bars}</svg>`;
}

export { fmt };
