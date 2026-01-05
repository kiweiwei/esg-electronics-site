// ====== A版：電子業 ESG 形象網站（免build、可直接 GitHub Pages 顯示） ======
const $ = (sel) => document.querySelector(sel);

const SITE_VERSION = {
  app: "A-ESG-Electronics",
  version: "1.0.0",
  // 你可以把下面兩行改成你要交作業用的資訊
  buildTime: new Date().toISOString(),
  note: "GitHub Pages 靜態版（免build）"
};

// --- Footprint（版本數位足跡：本機記錄） ---
const FP_KEY = "esg_site_footprint_v1";
function getFootprint() {
  try {
    const raw = localStorage.getItem(FP_KEY);
    if (!raw) return { pageviews: [] };
    const data = JSON.parse(raw);
    return data && Array.isArray(data.pageviews) ? data : { pageviews: [] };
  } catch {
    return { pageviews: [] };
  }
}
function trackPage(path) {
  const fp = getFootprint();
  fp.pageviews.unshift({ path, at: new Date().toISOString() });
  fp.pageviews = fp.pageviews.slice(0, 200);
  localStorage.setItem(FP_KEY, JSON.stringify(fp));
}
function clearFootprint() {
  localStorage.removeItem(FP_KEY);
}
function exportFootprint() {
  const fp = getFootprint();
  const blob = new Blob([JSON.stringify(fp, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "esg_site_footprint.json";
  a.click();
  URL.revokeObjectURL(url);
}

// --- 資料（可自行換成報告書真實數字） ---
const KPIS = [
  { title: "產業別", value: "電子業", caption: "以永續經營報告書常見揭露架構整理" },
  { title: "重點趨勢", value: "淨零/水/供應鏈/資安", caption: "E/S/G 典型重大議題聚焦" },
  { title: "版本足跡", value: "可匯出JSON", caption: "本機記錄瀏覽足跡＋版本資訊" }
];

const MATERIALITY = [
  { name: "氣候變遷與淨零（含 Scope 1-3）", impact: 5.0, concern: 4.9, cat: "E" },
  { name: "再生能源（綠電/PPA/RECs）", impact: 4.8, concern: 4.6, cat: "E" },
  { name: "水資源韌性（再生水/回收/抗旱）", impact: 4.7, concern: 4.3, cat: "E" },
  { name: "循環資源（減量/回收）", impact: 4.3, concern: 4.0, cat: "E" },
  { name: "供應鏈責任（碳/人權/稽核）", impact: 4.8, concern: 4.4, cat: "G" },
  { name: "資安與個資保護", impact: 4.2, concern: 4.7, cat: "G" },
  { name: "資訊揭露與公司治理", impact: 4.1, concern: 4.1, cat: "G" },
  { name: "人才留任與多元共融（DEI）", impact: 3.9, concern: 4.2, cat: "S" },
  { name: "職安衛與承攬管理", impact: 4.0, concern: 4.1, cat: "S" }
];

const SPEC_ROWS = [
  { module: "導覽", item: "頁面切換", spec: "單頁網站以分頁區塊呈現：首頁/需求/分析/規格/實作", accept: "點導覽可切換，且標題正確" },
  { module: "首頁", item: "KPI＋材料性矩陣", spec: "顯示 KPI 卡片＋材料性議題列表（可視覺化）", accept: "KPI 3 張卡、矩陣/列表存在" },
  { module: "需求分析", item: "需求條列", spec: "含目標、利害關係人、使用情境、功能/非功能需求", accept: "四大段齊全且可讀" },
  { module: "系統分析", item: "IA/資料流/風險", spec: "含資訊架構、資料流、風險與假設、追蹤指標", accept: "至少 4 區塊內容完整" },
  { module: "系統實作", item: "版本數位足跡", spec: "顯示版本資訊＋記錄 pageviews＋可匯出 JSON", accept: "能匯出 JSON 且含 pageviews" }
];

// --- UI ---
const css = `
:root{--bg:#0b1020;--card:#101a33;--text:#eaf0ff;--muted:#a9b5d6;--border:rgba(255,255,255,.12);--accent:#6ee7ff;--accent2:#a78bfa}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(1000px 600px at 10% 0%, rgba(110,231,255,.18), transparent 60%),radial-gradient(900px 600px at 90% 10%, rgba(167,139,250,.14), transparent 55%),var(--bg);color:var(--text);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
a{color:inherit;text-decoration:none}
.container{max-width:1120px;margin:0 auto;padding:20px}
.header{position:sticky;top:0;z-index:10;backdrop-filter:blur(14px);background:rgba(11,16,32,.65);border-bottom:1px solid var(--border)}
.brand{display:flex;gap:12px;align-items:center;padding:14px 0}
.logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent2))}
.title{font-weight:800}
.subtitle{color:var(--muted);font-size:12px}
.nav{display:flex;gap:10px;flex-wrap:wrap;padding:10px 0 16px}
.nav button{border:1px solid var(--border);background:rgba(16,26,51,.55);color:var(--muted);padding:10px 12px;border-radius:999px;cursor:pointer}
.nav button.active{color:var(--text);border-color:rgba(110,231,255,.35)}
.hero{padding:26px 0 12px}
.h1{font-size:34px;line-height:1.1;margin:0 0 8px}
.lead{color:var(--muted);max-width:72ch;margin:0}
.grid{display:grid;gap:14px}
.grid.cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.grid.cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(max-width:900px){.grid.cols-3,.grid.cols-2{grid-template-columns:1fr}}
.card{border:1px solid var(--border);background:rgba(16,26,51,.55);border-radius:16px;padding:16px}
.card h3{margin:0 0 8px;font-size:16px}
.card p,li{color:var(--muted);line-height:1.65}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border);padding:6px 10px;border-radius:999px;color:var(--muted);font-size:12px}
.kpi{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.kpi .num{font-size:26px;font-weight:800}
.kpi .cap{color:var(--muted);font-size:12px}
.divider{height:1px;background:var(--border);margin:14px 0}
.table{width:100%;border-collapse:collapse;font-size:13px}
.table th,.table td{padding:10px;border-bottom:1px solid var(--border);vertical-align:top}
.table th{text-align:left}
.btn{cursor:pointer;border:1px solid var(--border);background:rgba(16,26,51,.55);color:var(--text);padding:10px 12px;border-radius:12px}
.small{font-size:12px;color:var(--muted)}
.footer{padding:22px 0 40px;color:var(--muted);font-size:12px}
.tagE{color:#6ee7ff}.tagS{color:#34d399}.tagG{color:#a78bfa}
`;

const html = `
  <style>${css}</style>
  <div class="header">
    <div class="container">
      <div class="brand">
        <div class="logo"></div>
        <div>
          <div class="title">電子業 ESG 發展趨勢｜永續經營形象網站</div>
          <div class="subtitle">需求分析 / 系統分析 / 系統設計（規格書） / 系統實作（版本數位足跡）</div>
        </div>
      </div>

      <div class="nav" id="nav">
        <button data-page="home" class="active">首頁</button>
        <button data-page="req">需求分析</button>
        <button data-page="ana">系統分析</button>
        <button data-page="spec">系統設計（規格書）</button>
        <button data-page="impl">系統實作（版本數位足跡）</button>
      </div>
    </div>
  </div>

  <main class="container" id="view"></main>

  <footer class="container footer">
    <div class="divider"></div>
    <div>本網站為作業展示用途；足跡僅記錄於本機（localStorage）。</div>
  </footer>
`;

$("#root").innerHTML = html;

function kpiCards() {
  return `
    <div class="grid cols-3">
      ${KPIS.map(k => `
        <div class="card">
          <div class="kpi">
            <div>
              <div class="cap">${k.title}</div>
              <div class="num">${k.value}</div>
            </div>
            <span class="badge">KPI</span>
          </div>
          <p style=" correlation"> ${k.caption}</p >
        </div>
      `).join("")}
    </div>
  `;
}

function materialityList() {
  return `
    <div class="card">
      <h3>材料性議題（Impact × Concern）</h3>
      <p>右上象限（雙高）代表優先投入的重大議題（電子業常見：淨零、綠電、水、供應鏈、資安）。</p >
      <div class="divider"></div>
      <ul>
        ${MATERIALITY.map(m => `
          <li>
            <span class="${m.cat==="E"?"tagE":m.cat==="S"?"tagS":"tagG"}">● ${m.cat}</span>
            &nbsp;${m.name}
            <span class="small">（衝擊 ${m.impact} / 關注 ${m.concern}）</span>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function pageHome() {
  return `
    <div class="hero">
      <h1 class="h1">電子業 ESG 發展趨勢 × 永續經營報告書</h1>
      <p class="lead">A 版完整版：包含需求分析、系統分析、規格書、以及「版本數位足跡」（可匯出 JSON）。</p >
    </div>
    ${kpiCards()}
    <div style="height:14px"></div>
    ${materialityList()}
  `;
}

function pageReq() {
  return `
    <div class="hero">
      <h1 class="h1">需求分析</h1>
      <p class="lead">定義網站目標、受眾、使用情境，以及功能/非功能需求（可驗收）。</p >
    </div>

    <div class="card">
      <h3>1) 目標（Goals）</h3>
      <ul>
        <li>以形象網站清楚傳達：電子業 ESG 發展趨勢與永續經營報告重點。</li>
        <li>用材料性議題整理，快速定位關鍵議題與投入方向。</li>
        <li>提供需求/分析/規格/實作與版本足跡，便於作業驗收與追溯。</li>
      </ul>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>2) 利害關係人（Stakeholders）</h3>
      <ul>
        <li>老師/助教：驗收規格與版本足跡</li>
        <li>同學：展示與參考</li>
        <li>企業情境：投資人、客戶、供應商、員工、社區與政府</li>
      </ul>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>3) 使用情境（User Stories）</h3>
      <ul>
        <li>3 分鐘看懂電子業 ESG → 首頁 KPI + 材料性議題</li>
        <li>了解系統怎麼做 → 規格書（驗收條件）</li>
        <li>追溯版本 → 版本資訊 + 使用足跡（可匯出 JSON）</li>
      </ul>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>4) 功能需求（Functional Requirements）</h3>
      <ul>
        <li>顯示：ESG 議題與分類（E/S/G）</li>
        <li>提供：需求分析、系統分析、規格書、實作足跡頁</li>
        <li>足跡：顯示版本資訊、記錄瀏覽、匯出 JSON</li>
      </ul>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>5) 非功能需求（Non-functional Requirements）</h3>
      <ul>
        <li>可用性：手機/桌機皆可讀（RWD）</li>
        <li>效能：靜態頁面快速載入</li>
        <li>可維護性：內容模組化（分頁區塊）</li>
        <li>隱私：足跡只存在本機，不上傳個資</li>
      </ul>
    </div>
  `;
}

function pageAna() {
  return `
    <div class="hero">
      <h1 class="h1">系統分析</h1>
      <p class="lead">描述資訊架構、資料流、風險假設與追蹤指標。</p >
    </div>

    <div class="card">
      <h3>1) 資訊架構（IA）</h3>
      <ul>
        <li>首頁：KPI + 材料性議題（E/S/G）</li>
        <li>需求分析：目標/受眾/需求清單</li>
        <li>系統分析：資料流、風險、KPI</li>
        <li>規格書：規格表與驗收條件</li>
        <li>版本足跡：版本資訊 + 使用足跡 + JSON 匯出</li>
      </ul>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>2) 資料流（Data Flow）</h3>
      <ol>
        <li>資料：以靜態資料（本檔內）呈現，可替換為報告書真實數據。</li>
        <li>導覽：點分頁 → 更新畫面內容。</li>
        <li>足跡：每次切換分頁 → 記錄 pageview 到 localStorage。</li>
        <li>匯出：下載 JSON 作為作業驗收證據。</li>
      </ol>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>3) 風險與假設（Risks & Assumptions）</h3>
      <ul>
        <li>若引用真實報告書：需標註章節/頁碼，確保可追溯。</li>
        <li>本站無後端：跨裝置追蹤需要後端與個資合規。</li>
        <li>GitHub Pages 靜態：適合形象展示與作業驗收。</li>
      </ul>
    </div>

    <div class="card" style="margin-top:14px">
      <h3>4) 追蹤指標（KPI）</h3>
      <ul>
        <li>內容 KPI：重大議題數、分類占比、議題優先順序。</li>
        <li>產品 KPI：頁面瀏覽紀錄數、JSON 匯出（可擴充）。</li>
        <li>品質 KPI：規格條目覆蓋率、驗收通過率。</li>
      </ul>
    </div>
  `;
}

function pageSpec() {
  return `
    <div class="hero">
      <h1 class="h1">系統設計（規格書）</h1>
      <p class="lead">用「可驗收」方式寫規格：模組、描述、驗收條件。</p >
    </div>

    <div class="card">
      <h3>規格表（Functional Spec）</h3>
      <div class="divider"></div>
      <table class="table">
        <thead>
          <tr>
            <th style="width:140px">模組</th>
            <th style="width:180px">項目</th>
            <th>規格描述</th>
            <th>驗收條件</th>
          </tr>
        </thead>
        <tbody>
          ${SPEC_ROWS.map(r => `
            <tr>
              <td>${r.module}</td>
              <td>${r.item}</td>
              <td>${r.spec}</td>
              <td>${r.accept}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <p class="small">* 若你要更高分：可補 Wireframe、測試案例、資料來源頁。</p >
    </div>
  `;
}

function pageImpl() {
  const fp = getFootprint();
  return `
    <div class="hero">
      <h1 class="h1">系統實作（版本數位足跡）</h1>
      <p class="lead">顯示版本資訊 + 記錄瀏覽足跡 + 匯出 JSON（作業加分點）。</p >
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>版本資訊（Version / Build）</h3>
        <p>此版本為靜態頁面免 build 版，仍提供版本資訊供驗收追溯。</p >
        <div class="divider"></div>
        <div class="small"><b>app</b>：${SITE_VERSION.app}</div>
        <div class="small"><b>version</b>：${SITE_VERSION.version}</div>
        <div class="small"><b>buildTime</b>：${SITE_VERSION.buildTime}</div>
        <div class="small"><b>note</b>：${SITE_VERSION.note}</div>
      </div>

      <div class="card">
        <h3>使用足跡（Pageviews）</h3>
        <p>僅記錄分頁名稱與時間（localStorage），不包含個資。</p >
        <div class="divider"></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <button class="btn" id="btnExport">匯出 JSON</button>
          <button class="btn" id="btnClear">清除足跡</button>
          <span class="badge">已記錄 ${fp.pageviews.length} 筆</span>
        </div>
        <div style="max-height:220px;overflow:auto;border:1px solid var(--border);border-radius:12px;padding:10px">
          ${fp.pageviews.length ? fp.pageviews.slice(0,30).map(p=>`
            <div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)">
              <div style="color:var(--text)">${p.path}</div>
              <div class="small">${p.at}</div>
            </div>
          `).join("") : `<div class="small">尚無紀錄。請切換幾個分頁後再回來看。</div>`}
        </div>
      </div>
    </div>
  `;
}

// --- Router（單頁分頁） ---
const VIEW = $("#view");
const NAV = $("#nav");

function render(page) {
  if (page === "home") VIEW.innerHTML = pageHome();
  else if (page === "req") VIEW.innerHTML = pageReq();
  else if (page === "ana") VIEW.innerHTML = pageAna();
  else if (page === "spec") VIEW.innerHTML = pageSpec();
  else if (page === "impl") VIEW.innerHTML = pageImpl();
  else VIEW.innerHTML = pageHome();

  // 版本足跡：記錄分頁
  trackPage(page);

  // 綁按鈕（只有 impl 需要）
  const ex = $("#btnExport");
  const cl = $("#btnClear");
  if (ex) ex.onclick = exportFootprint;
  if (cl) cl.onclick = () => { clearFootprint(); render("impl"); };

  // 更新 active 樣式
  [...NAV.querySelectorAll("button")].forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
}

NAV.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  render(btn.dataset.page);
});

// 初始頁
render("home");
