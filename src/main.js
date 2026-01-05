/* ===== 電子業 ESG 形象網站（內容加強版｜Samsung Electronics 案例） ===== */

const $ = (s) => document.querySelector(s);
const root = $("#root");

/* ---------- 樣式（維持你原本喜歡的那版） ---------- */
const css = `
:root{--bg:#0b1020;--card:#101a33;--text:#eaf0ff;--muted:#a9b5d6;--border:rgba(255,255,255,.12);--accent:#6ee7ff;--accent2:#a78bfa}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system}
.container{max-width:1100px;margin:auto;padding:24px}
.header{position:sticky;top:0;background:#0b1020;border-bottom:1px solid var(--border)}
.brand{display:flex;gap:12px;align-items:center}
.logo{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent2))}
.nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.nav button{background:none;border:1px solid var(--border);color:var(--muted);padding:8px 14px;border-radius:999px;cursor:pointer}
.nav button.active{color:var(--text);border-color:var(--accent)}
.card{background:var(--card);border-radius:16px;padding:20px;margin-bottom:16px}
h1{margin:0 0 8px}
h2{margin:0 0 12px}
h3{margin:0 0 6px}
p,li{color:var(--muted);line-height:1.7}
.grid{display:grid;gap:16px}
.grid-3{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.badge{display:inline-block;font-size:12px;padding:4px 10px;border-radius:999px;border:1px solid var(--border);margin-bottom:6px}
.footer{font-size:12px;color:var(--muted);padding:24px}
`;

/* ---------- 資料（電子業真實 ESG 公開方向整理） ---------- */
const COMPANY = "Samsung Electronics";

const ESG_OVERVIEW = `
<p>${COMPANY} 為全球主要電子製造商之一，長期公開揭露其永續發展與 ESG 策略。
電子業因高能耗、高供應鏈複雜度與快速產品汰換，被視為 ESG 管理高度關鍵的產業。</p >
`;

const ENV = `
<ul>
<li>設定 Scope 1 與 Scope 2 溫室氣體減量與淨零目標。</li>
<li>大幅提升再生能源使用比例，包含太陽能與購電協議（PPA）。</li>
<li>推動循環經濟，提升再生塑膠與回收材料於電子產品中的使用率。</li>
<li>建立全球電子廢棄物回收計畫，減少環境衝擊。</li>
</ul>
`;

const SOC = `
<ul>
<li>建立職業安全與健康管理系統，目標降低重大工安事故。</li>
<li>進行供應鏈人權風險評估，符合國際人權準則。</li>
<li>投資青年教育與科技人才培育計畫，強化社會影響力。</li>
</ul>
`;

const GOV = `
<ul>
<li>董事會層級納入 ESG 風險與永續策略監督。</li>
<li>建立供應商行為準則，實施第三方稽核。</li>
<li>強化資訊揭露透明度，對齊國際永續揭露標準。</li>
</ul>
`;

/* ---------- 各頁 ---------- */
function home(){
return `
<div class="card">
  <h1>電子業 ESG 發展趨勢</h1>
  <p class="badge">企業案例：${COMPANY}</p >
  ${ESG_OVERVIEW}
</div>
<div class="grid grid-3">
  <div class="card"><h3>Environment</h3>${ENV}</div>
  <div class="card"><h3>Social</h3>${SOC}</div>
  <div class="card"><h3>Governance</h3>${GOV}</div>
</div>
`;
}

function req(){
return `
<div class="card">
<h2>需求分析</h2>
<ul>
<li>清楚呈現電子業 ESG 發展方向與企業實際作為。</li>
<li>提供非專業使用者可快速理解的結構化內容。</li>
<li>作為課程作業與企業形象展示用途。</li>
</ul>
</div>
<div class="card">
<h3>利害關係人</h3>
<ul>
<li>投資人與研究人員</li>
<li>學生與教育單位</li>
<li>企業管理與永續團隊</li>
</ul>
</div>
`;
}

function ana(){
return `
<div class="card">
<h2>系統分析</h2>
<ul>
<li>資訊架構：首頁 → ESG 三面向 → 分析與規格</li>
<li>資料來源：企業公開永續報告與官方揭露資料</li>
<li>限制條件：靜態網站、不涉及即時後端資料</li>
</ul>
</div>
`;
}

function spec(){
return `
<div class="card">
<h2>系統設計（規格書）</h2>
<ul>
<li>模組：ESG 內容展示、導覽切換、版本足跡</li>
<li>輸入：靜態 ESG 資料</li>
<li>輸出：網頁視覺化內容</li>
<li>驗收：可清楚辨識 E / S / G 與案例來源</li>
</ul>
</div>
`;
}

function impl(){
return `
<div class="card">
<h2>系統實作（版本數位足跡）</h2>
<ul>
<li>平台：GitHub Pages</li>
<li>產業：電子業</li>
<li>案例來源：${COMPANY} 公開永續資訊</li>
<li>版本型態：靜態形象網站</li>
</ul>
</div>
`;
}

/* ---------- Router ---------- */
const html = `
<style>${css}</style>
<div class="header">
  <div class="container">
    <div class="brand"><div class="logo"></div><b>電子業 ESG 形象網站</b></div>
    <div class="nav">
      <button data-p="home" class="active">首頁</button>
      <button data-p="req">需求分析</button>
      <button data-p="ana">系統分析</button>
      <button data-p="spec">規格書</button>
      <button data-p="impl">系統實作</button>
    </div>
  </div>
</div>
<main class="container" id="view"></main>
<div class="footer container">資料來源：${COMPANY} 公開 ESG 永續資訊（教學展示用途）</div>
`;

root.innerHTML = html;
const view = $("#view");
const nav = document.querySelectorAll(".nav button");

function render(p){
  nav.forEach(b=>b.classList.toggle("active",b.dataset.p===p));
  view.innerHTML = {home,req,ana,spec,impl}[p]();
}
nav.forEach(b=>b.onclick=()=>render(b.dataset.p));
render("home");
