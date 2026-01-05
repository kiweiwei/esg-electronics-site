/* ===== ESG 形象網站（電子業）｜A-LongContent｜純前端、可直接 GitHub Pages =====
   - 含：重大性分析（多維度）、需求分析、系統分析（流程/角色/例外/矩陣）、規格書、版本數位足跡
   - 特色：不依賴框架，不會因為 React/Vite 沒 build 而空白
   - 注意：index.html 需有 <div id="root"></div> 並載入 /src/main.js
*/

const $ = (sel) => document.querySelector(sel);

/* ==================== 版本資訊 ==================== */
const SITE_VERSION = {
  app: "ESG-Electronics-Site",
  variant: "A-LongContent",
  version: "1.4.0",
  buildTime: new Date().toISOString(),
  note: "GitHub Pages 靜態版：多維度重大性分析 + 系統分析/設計 + 版本數位足跡",
};

/* ==================== 公開資料（示意） ==================== */
/* 你要再加內容，就擴充這些資料陣列即可 */
const MATERIALITY = [
  { name: "再生能源使用與用電管理", impact: 4.8, concern: 4.6, cat: "E" },
  { name: "溫室氣體排放（範疇 1/2/3）與淨零路徑", impact: 4.9, concern: 4.7, cat: "E" },
  { name: "水資源使用與回收再利用", impact: 4.4, concern: 4.1, cat: "E" },
  { name: "廢棄物/電子廢棄物與循環經濟", impact: 4.3, concern: 4.0, cat: "E" },
  { name: "供應鏈管理與責任採購（RBA/人權）", impact: 4.7, concern: 4.5, cat: "S" },
  { name: "職業安全衛生（OHS）與員工健康", impact: 4.1, concern: 4.2, cat: "S" },
  { name: "多元共融、人才培育與留任", impact: 3.9, concern: 4.0, cat: "S" },
  { name: "資安與隱私保護（Cybersecurity/Privacy）", impact: 4.6, concern: 4.8, cat: "G" },
  { name: "公司治理、法遵與商業倫理", impact: 4.2, concern: 4.3, cat: "G" },
];

const DATA_SCHEMA = [
  { field: "company", type: "string", desc: "公司名稱（例：Samsung Electronics）" },
  { field: "year", type: "number", desc: "年度（例：2024）" },
  { field: "source_url", type: "string", desc: "公開來源 URL（報告/官網頁）" },
  { field: "doc_type", type: "string", desc: "文件類型（PDF/HTML/News/Policy）" },
  { field: "esg_cat", type: "string", desc: "E / S / G 分類" },
  { field: "topic", type: "string", desc: "主題標籤（淨零/綠電/水/供應鏈/資安…）" },
  { field: "kpi_name", type: "string", desc: "KPI 名稱（例：Renewable Energy %）" },
  { field: "target", type: "string", desc: "目標（例：2030 RE 100%）" },
  { field: "progress", type: "string", desc: "進度描述（文字或數值）" },
  { field: "standard_map", type: "object", desc: "對應框架（GRI/SDGs/ISSB）" },
  { field: "evidence_snippet", type: "string", desc: "可追溯證據片段（原文摘要）" },
  { field: "confidence", type: "number", desc: "AI/NLP 抽取信心分數 0~1（低分→待複核）" },
];

const SPEC_ROWS = [
  {
    module: "M1 重大性分析",
    item: "多維度架構",
    spec: "需清楚列出產業/公司/年度/指標/法規與外部評等等分析維度，並解釋用途。",
    accept: "至少 5 個維度皆有具體條列與用途。",
  },
  {
    module: "M1 重大性分析",
    item: "議題清單",
    spec: "列出電子業常見重大議題（E/S/G）並含 Impact×Concern 示意值。",
    accept: "至少 8 個議題，含 E/S/G 分布。",
  },
  {
    module: "M2 系統分析",
    item: "流程分解（文字版 BPMN/IDEF）",
    spec: "流程需含輸入/輸出/角色/控制與例外；至少涵蓋資料蒐集→解析→分類→對齊→比較→展示。",
    accept: "至少 6 個 step，且包含例外處理。",
  },
  {
    module: "M3 規格書",
    item: "資料規格",
    spec: "定義最小可用 schema（欄位/型別/說明）以支援可追溯性。",
    accept: "至少 10 個欄位，含 source_url、evidence_snippet。",
  },
  {
    module: "M4 來源",
    item: "可追溯引用",
    spec: "每份主要資料須可點擊開啟，並說明使用目的（報告/政策/標準）。",
    accept: "至少 4 條來源，皆可開啟。",
  },
  {
    module: "M5 足跡",
    item: "版本數位足跡",
    spec: "記錄 pageviews/actions，支援匯出 JSON 與清除。",
    accept: "可下載 JSON，內容含 meta/pageviews/actions。",
  },
];

const SOURCES = [
  {
    title: "Samsung Electronics Sustainability (公開永續資訊入口)",
    url: "https://www.samsung.com/global/sustainability/",
    note: "作為電子業公司公開 ESG 資料入口（政策/目標/報告）。",
  },
  {
    title: "Samsung Electronics Sustainability Reports（報告清單頁）",
    url: "https://www.samsung.com/global/sustainability/report/",
    note: "可取得年度永續報告（PDF）作為揭露內容來源。",
  },
  {
    title: "RBA (Responsible Business Alliance) 行為準則",
    url: "https://www.responsiblebusiness.org/",
    note: "電子供應鏈常用責任採購/人權/勞動標準參考。",
  },
  {
    title: "ISSB（IFRS S1/S2）永續揭露準則入口",
    url: "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/",
    note: "用於對齊揭露框架（S1 一般揭露、S2 氣候相關揭露）。",
  },
  {
    title: "GRI Standards",
    url: "https://www.globalreporting.org/standards/",
    note: "常見永續報告準則，用於指標對照。",
  },
  {
    title: "UN SDGs",
    url: "https://sdgs.un.org/goals",
    note: "可將企業措施與 SDGs 對齊，做主題分類。",
  },
];

/* ==================== 足跡（localStorage） ==================== */
const FP_KEY = "esg_site_footprint_v2";

function getFootprint() {
  try {
    const raw = localStorage.getItem(FP_KEY);
    if (!raw) return { pageviews: [], actions: [], meta: {} };
    const data = JSON.parse(raw);
    if (!data.pageviews) data.pageviews = [];
    if (!data.actions) data.actions = [];
    if (!data.meta) data.meta = {};
    return data;
  } catch {
    return { pageviews: [], actions: [], meta: {} };
  }
}

function saveFootprint(fp) {
  localStorage.setItem(FP_KEY, JSON.stringify(fp, null, 2));
}

function trackPageView(page) {
  const fp = getFootprint();
  fp.pageviews.push({
    page,
    ts: new Date().toISOString(),
    ua: navigator.userAgent,
  });
  fp.meta = { ...SITE_VERSION, savedAt: new Date().toISOString() };
  saveFootprint(fp);
}

function trackAction(type, detail = "") {
  const fp = getFootprint();
  fp.actions.push({
    type,
    detail,
    ts: new Date().toISOString(),
  });
  fp.meta = { ...SITE_VERSION, savedAt: new Date().toISOString() };
  saveFootprint(fp);
}

function downloadJSON(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 500);
}

/* ==================== UI：樣式（內嵌，避免白頁） ==================== */
function injectStyles() {
  const css = `
    :root{--bg:#0b1020;--card:#111a33;--card2:#0e1630;--txt:#e8eeff;--muted:#b7c1e6;--line:rgba(255,255,255,.12);--acc:#67e8f9;--acc2:#a78bfa;}
    *{box-sizing:border-box}
    body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Noto Sans",sans-serif;background:linear-gradient(180deg,#060815,#0b1020);color:var(--txt)}
    a{color:var(--acc);text-decoration:none} a:hover{text-decoration:underline}
    .wrap{max-width:1100px;margin:0 auto;padding:22px}
    .topbar{position:sticky;top:0;background:rgba(6,8,21,.78);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);z-index:10}
    .topbar .wrap{display:flex;gap:14px;align-items:center;justify-content:space-between}
    .brand{display:flex;flex-direction:column;gap:2px}
    .brand b{font-size:14px;letter-spacing:.4px}
    .brand span{font-size:12px;color:var(--muted)}
    .nav{display:flex;gap:8px;flex-wrap:wrap}
    .btn{border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--txt);padding:8px 10px;border-radius:10px;cursor:pointer;font-size:13px}
    .btn:hover{background:rgba(255,255,255,.07)}
    .btn.primary{border-color:rgba(103,232,249,.35);box-shadow:0 0 0 1px rgba(103,232,249,.12) inset}
    .hero{padding:18px 18px 10px;border:1px solid var(--line);border-radius:16px;background:linear-gradient(135deg,rgba(103,232,249,.10),rgba(167,139,250,.08));margin-bottom:14px}
    .h1{margin:0 0 6px;font-size:24px}
    .lead{margin:0;color:var(--muted);line-height:1.55}
    .grid{display:grid;gap:12px}
    .cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
    @media (max-width:880px){.cols-2{grid-template-columns:1fr}}
    .card{border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.03);padding:14px}
    .card h3{margin:0 0 10px;font-size:16px}
    .small{font-size:12px;color:var(--muted)}
    ul{margin:8px 0 0 18px;color:var(--txt);line-height:1.6}
    li{margin:6px 0}
    .divider{height:1px;background:var(--line);margin:12px 0}
    .kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:12px 0 14px}
    @media (max-width:920px){.kpi{grid-template-columns:repeat(2,minmax(0,1fr))}}
    .pill{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:rgba(255,255,255,.03)}
    .pill b{display:block;font-size:13px}
    .pill span{display:block;margin-top:4px;color:var(--muted);font-size:12px;line-height:1.35}
    .table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid var(--line);border-radius:14px}
    .table th,.table td{padding:10px;border-bottom:1px solid var(--line);vertical-align:top}
    .table th{background:rgba(255,255,255,.05);text-align:left;font-size:13px}
    .table td{font-size:13px;color:var(--txt)}
    .table tr:last-child td{border-bottom:none}
    details{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:rgba(255,255,255,.03)}
    summary{cursor:pointer;font-weight:700}
    code{background:rgba(0,0,0,.25);padding:2px 6px;border-radius:8px}
    .footer{color:var(--muted);font-size:12px;margin-top:16px}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

/* ==================== Shell（固定框架） ==================== */
function shell(active) {
  return `
    <div class="topbar">
      <div class="wrap">
        <div class="brand">
          <b>ESG 形象網站（電子業）</b>
          <span>${SITE_VERSION.app} · ${SITE_VERSION.variant} · v${SITE_VERSION.version}</span>
        </div>
        <div class="nav">
          ${navBtn("home", "重大性分析", active)}
          ${navBtn("req", "需求分析", active)}
          ${navBtn("ana", "系統分析", active)}
          ${navBtn("spec", "規格書", active)}
          ${navBtn("fp", "版本足跡", active)}
        </div>
      </div>
    </div>

    <div class="wrap" id="page"></div>
    <div class="wrap footer">
      <div>Build: ${SITE_VERSION.buildTime}</div>
      <div>Note: ${SITE_VERSION.note}</div>
    </div>
  `;
}

function navBtn(key, label, active) {
  const cls = key === active ? "btn primary" : "btn";
  return `<button class="${cls}" data-nav="${key}">${label}</button>`;
}

/* ==================== 公用區塊 ==================== */
function kpiCards() {
  return `
    <div class="kpi">
      <div class="pill">
        <b>分析對象</b>
        <span>電子業（公開 ESG 資料）<br/>公司示例：Samsung Electronics</span>
      </div>
      <div class="pill">
        <b>核心方法</b>
        <span>Materiality（Impact×Concern）<br/>多維度（產業/公司/年度/指標/法規）</span>
      </div>
      <div class="pill">
        <b>對齊框架</b>
        <span>GRI · SDGs · ISSB（IFRS S1/S2）<br/>供應鏈參考：RBA</span>
      </div>
      <div class="pill">
        <b>可追溯性</b>
        <span>公開來源連結 + 版本足跡（JSON）<br/>本機儲存、無個資</span>
      </div>
    </div>
  `;
}

function sourcesBlock() {
  return `
    <div class="card">
      <h3>公開資料來源（可追溯）</h3>
      <ul>
        ${SOURCES.map(
          (s) =>
            `<li><b>${escapeHtml(s.title)}</b><br/><a href="${s.url}" target="_blank" rel="noreferrer">${s.url}</a><br/><span class="small">${escapeHtml(
              s.note
            )}</span></li>`
        ).join("")}
      </ul>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ==================== Pages ==================== */
function pageHome() {
  return `
    <div class="hero">
      <h1 class="h1">電子業 ESG 重大性分析（Materiality Analysis）</h1>
      <p class="lead">
        以「電子業」為產業背景，整合企業公開 ESG 永續資訊，建立可支援多維度洞察與決策的重大性分析架構。
        分析維度涵蓋：產業、公司、年度、指標框架（GRI/SDGs/ISSB）、法規與外部評等等。
      </p>
    </div>

    ${kpiCards()}

    <div class="grid cols-2">
      <div class="card">
        <h3>一、重大性分析目的與核心問題</h3>
        <ul>
          <li>電子業在高能耗與高供應鏈複雜度下，哪些 ESG 議題最關鍵？</li>
          <li>重大性排序是否會因公司、年度、揭露框架或法規而改變？</li>
          <li>如何讓 ESG 資訊可比較、可追溯，支援管理/投資/研究決策？</li>
        </ul>

        <div class="divider"></div>

        <h3>二、多維度分析架構（對齊課程重點）</h3>
        <ul>
          <li><b>產業維度：</b>電子業特性（能耗/碳排/供應鏈/資安/電子廢棄物）。</li>
          <li><b>公司維度：</b>比較不同公司揭露深度與策略定位。</li>
          <li><b>年度維度：</b>追蹤目標、承諾與進度，做趨勢/差距分析。</li>
          <li><b>指標維度：</b>對齊 GRI、SDGs、ISSB（IFRS S1/S2）提升可比性。</li>
          <li><b>法規/市場：</b>納入 ISSB、CSRD 與投資人/ESG rating 關注焦點。</li>
        </ul>
      </div>

      <div class="card">
        <h3>三、電子業常見重大性議題（示意）</h3>
        <p class="small">
          以「企業衝擊程度（Impact）」與「利害關係人關注度（Concern）」為雙軸，辨識重大議題。
        </p>
        <ul>
          ${MATERIALITY.map(
            (m) =>
              `<li><b>${escapeHtml(m.name)}</b> <span class="small">（${m.cat}｜Impact ${m.impact} × Concern ${m.concern}）</span></li>`
          ).join("")}
        </ul>

        <div class="divider"></div>

        <h3>四、成熟度分級與差距分析</h3>
        <ul>
          <li><b>領先（Leader）：</b>有量化目標、年度追蹤與第三方驗證/保證。</li>
          <li><b>成長（Follower）：</b>有政策與方向，但量化與追蹤仍在建立。</li>
          <li><b>起步（Starter）：</b>多為定性揭露，尚未系統化管理。</li>
          <li>可比較不同公司/年度在相同議題上的成熟度差距與原因。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>五、AI / NLP 輔助重大性分析（系統規劃概念）</h3>
      <ul>
        <li>自動蒐集 ESG 報告（PDF/HTML）與政策/新聞資料，保留來源與下載時間（可追溯）。</li>
        <li>NLP 抽取：目標、KPI、措施、風險與治理文字，並分類 E/S/G 與主題標籤。</li>
        <li>建立 mapping：主題標籤 ↔ GRI/SDGs/ISSB，支援跨框架比較。</li>
        <li>輸出洞察：重大性排序、成熟度分級、趨勢追蹤、缺口與改善建議。</li>
      </ul>
    </div>

    ${sourcesBlock()}
  `;
}

function pageReq() {
  return `
    <div class="hero">
      <h1 class="h1">需求分析（Requirements Analysis）</h1>
      <p class="lead">
        目標：將分散、非結構化的公開 ESG 資料，轉化為可比較、可追溯、可支援決策的重大性分析成果，
        並用形象網站方式呈現（符合期末作業要求）。
      </p>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>一、背景與痛點</h3>
        <ul>
          <li>ESG 報告多為 PDF/文字，人工閱讀成本高。</li>
          <li>不同公司/年度揭露格式不同，難以直接比較。</li>
          <li>需要明確方法論：材料性（Impact×Concern）＋ 多維度對照。</li>
          <li>新法規（ISSB/CSRD）提升可追溯/一致揭露的需求。</li>
        </ul>
      </div>

      <div class="card">
        <h3>二、利害關係人與使用情境</h3>
        <ul>
          <li><b>企業管理者：</b>判斷重大議題優先順序、資源配置。</li>
          <li><b>投資人/分析師：</b>掌握永續風險與長期價值。</li>
          <li><b>研究者/學生：</b>做產業 ESG 趨勢與比較分析。</li>
          <li><b>一般大眾：</b>快速理解電子業永續重點。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>三、功能性需求（Functional）</h3>
      <ul>
        <li>顯示重大性分析架構（產業/公司/年度/指標/法規/市場）。</li>
        <li>列出重大議題清單與 Impact×Concern 示意值。</li>
        <li>呈現系統分析流程（自動化蒐集→AI/NLP→對齊→比較→展示）。</li>
        <li>提供公開資料來源連結。</li>
        <li>版本數位足跡：記錄瀏覽/操作並可匯出 JSON。</li>
      </ul>
    </div>

    <div class="card">
      <h3>四、非功能性需求（Non-Functional）</h3>
      <ul>
        <li><b>可讀性：</b>手機/電腦皆可閱讀，段落清楚。</li>
        <li><b>可追溯性：</b>重要敘述能回到公開來源。</li>
        <li><b>一致性：</b>分類與用語一致（E/S/G、主題）。</li>
        <li><b>隱私：</b>足跡僅存本機 localStorage，不含個資。</li>
      </ul>
    </div>

    <div class="card">
      <h3>五、成功準則（驗收）</h3>
      <ul>
        <li>網站可在 GitHub Pages 正常開啟、導覽正常。</li>
        <li>每個章節清楚對應期末要求：需求/分析/設計/實作。</li>
        <li>足跡可匯出 JSON 作為版本數位足跡證據。</li>
      </ul>
    </div>

    ${sourcesBlock()}
  `;
}

function pageAnalysis() {
  return `
    <div class="hero">
      <h1 class="h1">系統分析（System Analysis）</h1>
      <p class="lead">
        依課程方向：「自動化蒐集公開 ESG 資料 → AI/NLP 結構化 → 多維度比較 → 視覺化呈現」。
        下列以文字版 BPMN/IDEF 呈現流程分解、角色、資料流與例外控制。
      </p>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>一、系統目標（Input / Process / Output）</h3>
        <ul>
          <li><b>Input：</b>永續報告（PDF）、官網 ESG 頁面、政策/供應鏈文件、新聞稿。</li>
          <li><b>Process：</b>解析抽取 → NLP 分類/標籤 → 指標對齊（GRI/SDGs/ISSB）→ 比較分析。</li>
          <li><b>Output：</b>重大性洞察頁、流程/規格展示頁、足跡 JSON。</li>
        </ul>

        <div class="divider"></div>
        <h3>二、角色設計（Actors）</h3>
        <ul>
          <li><b>資料管理者：</b>維護來源清單、版本控管。</li>
          <li><b>分析者：</b>定義標籤、mapping、抽樣驗證。</li>
          <li><b>使用者：</b>瀏覽洞察、查核來源、下載足跡。</li>
          <li><b>系統：</b>排程、解析、分類、輸出。</li>
        </ul>
      </div>

      <div class="card">
        <h3>三、分析維度矩陣（多維度洞察核心）</h3>
        <table class="table">
          <thead><tr><th style="width:160px">維度</th><th>內容</th><th>洞察輸出</th></tr></thead>
          <tbody>
            <tr><td>產業</td><td>電子業：能耗/碳排/供應鏈/資安/電子廢棄物</td><td>產業關鍵風險與差異</td></tr>
            <tr><td>公司</td><td>策略、政策、目標、揭露深度</td><td>企業定位與策略差異</td></tr>
            <tr><td>年度</td><td>歷年目標/進度/成效</td><td>趨勢追蹤、落差原因</td></tr>
            <tr><td>指標</td><td>GRI/SDGs/ISSB 對照</td><td>一致性/缺口/可比性</td></tr>
            <tr><td>法規/市場</td><td>ISSB/CSRD、ESG rating、投資人關注</td><td>合規風險與回應策略</td></tr>
          </tbody>
        </table>

        <div class="divider"></div>
        <h3>四、控制/例外（Exceptions）</h3>
        <ul>
          <li>下載失敗：重試、記錄錯誤碼、切換備援來源。</li>
          <li>解析失敗：標記待人工校正，保留原檔。</li>
          <li>分類不確定：信心分數低 → 進入人工複核。</li>
          <li>資料衝突：保留 evidence_snippet + 優先序規則。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>五、文字版 BPMN / IDEF 流程分解（Main Flow）</h3>

      <details open>
        <summary>Step 1：資料蒐集（Crawler / Connector）</summary>
        <ul>
          <li>建立來源清單（報告頁、PDF、政策頁、新聞稿）。</li>
          <li>保存 metadata：公司/年度/來源/下載時間/檔案雜湊（可追溯）。</li>
          <li>輸出 Raw：PDF/HTML 原始檔。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 2：解析抽取（Parser）</summary>
        <ul>
          <li>抽取章節/表格/文字段落（目標、KPI、措施、風險、治理）。</li>
          <li>輸出 Parsed：結構化片段 + evidence_snippet。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 3：AI/NLP 分類與標籤（Classification / Tagging）</summary>
        <ul>
          <li>分類：E/S/G；主題：淨零/綠電/水/循環/供應鏈/資安/職安/治理。</li>
          <li>抽取：kpi_name、target、progress、year、region 等欄位。</li>
          <li>信心分數：低分 → 待複核清單。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 4：標準對齊（GRI / SDGs / ISSB mapping）</summary>
        <ul>
          <li>建立 mapping 表（主題 ↔ GRI/SDGs/ISSB）。</li>
          <li>輸出 standard_map，提升跨公司/跨年度可比性。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 5：多維度比較分析（Industry / Company / Year / Indicator）</summary>
        <ul>
          <li>產出：重大性排序、成熟度分級、趨勢追蹤與缺口摘要。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 6：視覺化展示（Website / Dashboard）</summary>
        <ul>
          <li>在網站上呈現洞察、流程、規格、來源與足跡。</li>
        </ul>
      </details>
    </div>

    ${sourcesBlock()}
  `;
}

function pageSpec() {
  return `
    <div class="hero">
      <h1 class="h1">系統設計（規格書｜Spec）</h1>
      <p class="lead">
        以「可驗收」為核心：定義模組、資料規格、功能規格、驗收條件與測試案例，
        讓期末作業具備完整專案文件格式。
      </p>
    </div>

    <div class="card">
      <h3>一、系統模組（Modules）</h3>
      <ul>
        <li><b>M1 重大性分析展示：</b>多維度架構、議題清單、成熟度分級。</li>
        <li><b>M2 系統分析展示：</b>流程分解、角色設計、例外控制、維度矩陣。</li>
        <li><b>M3 規格書：</b>資料 schema、功能規格、驗收與測試。</li>
        <li><b>M4 公開資料來源：</b>可點擊連結與用途說明。</li>
        <li><b>M5 版本數位足跡：</b>pageviews/actions 匯出 JSON。</li>
      </ul>
    </div>

    <div class="card">
      <h3>二、資料規格（Data Schema）</h3>
      <table class="table">
        <thead><tr><th style="width:160px">欄位</th><th style="width:110px">型別</th><th>說明</th></tr></thead>
        <tbody>
          ${DATA_SCHEMA.map((r) => `<tr><td>${escapeHtml(r.field)}</td><td>${escapeHtml(r.type)}</td><td>${escapeHtml(r.desc)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>三、功能規格與驗收（Functional Spec & Acceptance）</h3>
      <table class="table">
        <thead><tr><th style="width:160px">模組</th><th style="width:170px">項目</th><th>規格</th><th>驗收</th></tr></thead>
        <tbody>
          ${SPEC_ROWS.map(
            (r) => `<tr><td>${escapeHtml(r.module)}</td><td>${escapeHtml(r.item)}</td><td>${escapeHtml(r.spec)}</td><td>${escapeHtml(r.accept)}</td></tr>`
          ).join("")}
        </tbody>
      </table>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>四、測試案例（Test Cases）</h3>
        <ul>
          <li><b>TC-01</b>：導覽可切換到所有分頁且不白屏。</li>
          <li><b>TC-02</b>：公開來源連結可開啟（新分頁）。</li>
          <li><b>TC-03</b>：足跡可下載 JSON，含 meta/pageviews/actions。</li>
          <li><b>TC-04</b>：清除足跡後重新計數。</li>
          <li><b>TC-05</b>：內容在手機可閱讀、條列完整。</li>
        </ul>
      </div>

      <div class="card">
        <h3>五、系統品質（Quality）</h3>
        <ul>
          <li><b>可讀性：</b>段落分區、條列清楚。</li>
          <li><b>可追溯性：</b>來源 URL 可點擊，敘述可回溯。</li>
          <li><b>一致性：</b>E/S/G 與主題標籤一致。</li>
          <li><b>可維護性：</b>資料集中在陣列（MATERIALITY/SOURCES）便於擴充。</li>
          <li><b>隱私：</b>足跡只存本機。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>六、延伸功能（加分但不必實作）</h3>
      <ul>
        <li>加入互動散點圖（Impact × Concern）。</li>
        <li>加入多公司切換（Samsung/TSMC/Intel）做 benchmark。</li>
        <li>加入 ISSB/CSRD 對照表（站內欄位 ↔ 條文 ↔ 證據片段）。</li>
      </ul>
    </div>
  `;
}

function pageFootprint() {
  const fp = getFootprint();
  return `
    <div class="hero">
      <h1 class="h1">系統實作（版本數位足跡）</h1>
      <p class="lead">
        本頁記錄使用者在網站中的瀏覽與操作（本機 localStorage），可匯出 JSON 作為「版本數位足跡」證據。
      </p>
    </div>

    <div class="card">
      <h3>一、版本資訊（meta）</h3>
      <div class="small">（每次瀏覽/操作都會更新 savedAt）</div>
      <pre style="white-space:pre-wrap;margin:10px 0 0;line-height:1.5">${escapeHtml(
        JSON.stringify(fp.meta || {}, null, 2)
      )}</pre>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>二、Pageviews（瀏覽紀錄）</h3>
        <div class="small">共 ${fp.pageviews?.length || 0} 筆</div>
        <pre style="white-space:pre-wrap;margin:10px 0 0;line-height:1.5;max-height:320px;overflow:auto">${escapeHtml(
          JSON.stringify(fp.pageviews || [], null, 2)
        )}</pre>
      </div>
      <div class="card">
        <h3>三、Actions（操作紀錄）</h3>
        <div class="small">共 ${fp.actions?.length || 0} 筆</div>
        <pre style="white-space:pre-wrap;margin:10px 0 0;line-height:1.5;max-height:320px;overflow:auto">${escapeHtml(
          JSON.stringify(fp.actions || [], null, 2)
        )}</pre>
      </div>
    </div>

    <div class="card">
      <h3>四、匯出/清除</h3>
      <button class="btn primary" id="btnExport">下載 footprint.json</button>
      <button class="btn" id="btnClear" style="margin-left:8px">清除足跡</button>
      <div class="small" style="margin-top:10px">
        匯出內容包含 <code>meta</code>、<code>pageviews</code>、<code>actions</code>，可作為版本數位足跡佐證。
      </div>
    </div>
  `;
}

/* ==================== Router / Render ==================== */
const PAGES = {
  home: pageHome,
  req: pageReq,
  ana: pageAnalysis,
  spec: pageSpec,
  fp: pageFootprint,
};

function render(pageKey) {
  const root = $("#root");
  if (!root) {
    // 你若看到這段，表示 index.html 少了 <div id="root"></div>
    document.body.innerHTML = `<div style="padding:20px;font-family:system-ui">Missing <b>#root</b> in index.html</div>`;
    return;
  }

  const key = PAGES[pageKey] ? pageKey : "home";
  root.innerHTML = shell(key);

  const pageEl = $("#page");
  pageEl.innerHTML = PAGES[key]();

  // 綁定 nav
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-nav");
      trackAction("navigate", k);
      location.hash = `#${k}`;
      render(k);
    });
  });

  // 足跡頁按鈕
  if (key === "fp") {
    const exportBtn = $("#btnExport");
    const clearBtn = $("#btnClear");
    exportBtn?.addEventListener("click", () => {
      trackAction("export", "footprint.json");
      downloadJSON("footprint.json", getFootprint());
    });
    clearBtn?.addEventListener("click", () => {
      trackAction("clear", "footprint");
      localStorage.removeItem(FP_KEY);
      render("fp");
    });
  }

  trackPageView(key);
}

/* ==================== Boot ==================== */
(function boot() {
  injectStyles();

  const keyFromHash = (location.hash || "").replace("#", "").trim();
  const start = PAGES[keyFromHash] ? keyFromHash : "home";
  render(start);

  window.addEventListener("hashchange", () => {
    const k = (location.hash || "").replace("#", "").trim();
    render(k);
  });
})();
