/* ========= ESG 企業形象網站（電子業案例：Samsung Electronics） ========= */

const root = document.getElementById("root");

/* ---------- 基本樣式（企業官網感） ---------- */
const style = `
<style>
body{
  margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto;
  background:#0b1020;color:#eaf0ff;
}
header{
  padding:80px 24px;
  background:linear-gradient(120deg,#0b1020,#101a33);
}
section{padding:60px 24px;max-width:1100px;margin:auto}
h1{font-size:42px;margin:0 0 16px}
h2{font-size:28px;margin:0 0 12px}
h3{font-size:18px;margin:0 0 8px}
p{color:#b6c2ff;line-height:1.7}
.grid{display:grid;gap:24px}
.grid-3{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{
  background:#101a33;border-radius:16px;padding:24px;
  box-shadow:0 10px 40px rgba(0,0,0,.3)
}
.badge{display:inline-block;padding:6px 12px;border-radius:999px;
  background:#1f2a55;color:#9cc3ff;font-size:12px;margin-bottom:8px}
footer{
  padding:40px 24px;color:#8892c7;font-size:13px;
  border-top:1px solid rgba(255,255,255,.1)
}
</style>
`;

/* ---------- 首頁 ---------- */
const hero = `
<header>
  <span class="badge">Electronic Industry ESG</span>
  <h1>電子業 ESG 發展趨勢</h1>
  <p>以 Samsung Electronics 公開永續資料為案例，呈現電子產業在環境、社會與公司治理（ESG）上的實際作為與趨勢。</p >
</header>
`;

/* ---------- ESG KPI ---------- */
const kpi = `
<section>
  <div class="grid grid-3">
    <div class="card">
      <h3>Environment</h3>
      <p>擴大再生能源使用，設定 Scope 1 & 2 淨零目標，推動循環材料與電子廢棄物回收。</p >
    </div>
    <div class="card">
      <h3>Social</h3>
      <p>強化人權與職業安全管理，投入青年教育與科技人才培育計畫。</p >
    </div>
    <div class="card">
      <h3>Governance</h3>
      <p>建立供應鏈責任制度，導入第三方稽核與董事會 ESG 風險監督。</p >
    </div>
  </div>
</section>
`;

/* ---------- 需求分析 ---------- */
const requirements = `
<section>
  <h2>需求分析（Requirements Analysis）</h2>
  <div class="card">
    <h3>網站目標</h3>
    <p>以形象網站方式呈現電子業 ESG 發展趨勢，讓非專業使用者能在短時間內理解企業永續策略。</p >
  </div>
  <div class="card">
    <h3>利害關係人</h3>
    <p>投資人、學生、研究人員、一般大眾、企業管理階層。</p >
  </div>
  <div class="card">
    <h3>功能需求</h3>
    <p>呈現 ESG 架構、企業案例、產業趨勢與永續績效摘要。</p >
  </div>
</section>
`;

/* ---------- 系統分析 ---------- */
const analysis = `
<section>
  <h2>系統分析（System Analysis）</h2>
  <div class="card">
    <h3>資訊架構</h3>
    <p>首頁 → ESG 三大面向 → 企業案例 → 永續策略說明。</p >
  </div>
  <div class="card">
    <h3>資料來源</h3>
    <p>企業公開永續報告、官方新聞稿與國際 ESG 準則。</p >
  </div>
</section>
`;

/* ---------- 規格書 ---------- */
const spec = `
<section>
  <h2>系統設計（規格書）</h2>
  <div class="card">
    <p><b>模組：</b> ESG 資訊展示</p >
    <p><b>輸入：</b> 公開永續資料（文字/數據）</p >
    <p><b>輸出：</b> 圖文化 ESG 內容</p >
    <p><b>驗收條件：</b> 使用者可清楚分辨 E / S / G 內容</p >
  </div>
</section>
`;

/* ---------- 系統實作 ---------- */
const implementation = `
<section>
  <h2>系統實作（Implementation & Footprint）</h2>
  <div class="card">
    <p>本網站為 GitHub Pages 靜態實作版本，適合用於 ESG 形象展示與教學示範。</p >
    <p>版本資訊：</p >
    <ul>
      <li>Platform：GitHub Pages</li>
      <li>Industry：Electronics</li>
      <li>Case：Samsung Electronics</li>
    </ul>
  </div>
</section>
`;

/* ---------- 組合 ---------- */
root.innerHTML = `
${style}
${hero}
${kpi}
${requirements}
${analysis}
${spec}
${implementation}
<footer>
  資料來源：Samsung Electronics 公開永續資訊（教育展示用途）
</footer>
`;
