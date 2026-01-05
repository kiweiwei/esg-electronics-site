/* ===== ESG 形象網站（電子業｜內容加長版｜保留原版UI + 足跡匯出） =====
   案例公司：Samsung Electronics（公開永續報告/官方揭露/供應鏈稽核說明/ISSB標準）
   內容定位：像 Padlet 那種「期末作業規劃書」密度：多維度洞察 + 流程/角色/例外 + 規格書
*/

const $ = (sel) => document.querySelector(sel);

/* ========== 版本資訊（可交作業用） ========== */
const SITE_VERSION = {
  app: "ESG-Electronics-Site",
  variant: "A-LongContent",
  version: "1.3.0",
  buildTime: new Date().toISOString(),
  note:
    "GitHub Pages 靜態版；內容以公開資料彙整 + 方法論設計（爬蟲/AI/NLP流程為系統規劃，本站呈現為展示用）",
};

/* ========== 足跡（localStorage） ========== */
const FP_KEY = "esg_site_footprint_v2";
function getFootprint() {
  try {
    const raw = localStorage.getItem(FP_KEY);
    if (!raw) return { pageviews: [], actions: [] };
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.pageviews)) return { pageviews: [], actions: [] };
    if (!Array.isArray(data.actions)) data.actions = [];
    return data;
  } catch {
    return { pageviews: [], actions: [] };
  }
}
function trackPage(path) {
  const fp = getFootprint();
  fp.pageviews.unshift({ path, at: new Date().toISOString() });
  fp.pageviews = fp.pageviews.slice(0, 200);
  localStorage.setItem(FP_KEY, JSON.stringify(fp));
}
function trackAction(type, payload = {}) {
  const fp = getFootprint();
  fp.actions.unshift({ type, payload, at: new Date().toISOString() });
  fp.actions = fp.actions.slice(0, 200);
  localStorage.setItem(FP_KEY, JSON.stringify(fp));
}
function clearFootprint() {
  localStorage.removeItem(FP_KEY);
}
function exportFootprint() {
  const fp = getFootprint();
  const blob = new Blob([JSON.stringify({ meta: SITE_VERSION, ...fp }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "esg_site_footprint.json";
  a.click();
  URL.revokeObjectURL(url);
}

/* ========== 公開資料來源（放在網站內部，老師可追溯） ========== */
const SOURCES = [
  {
    title: "Samsung Electronics Sustainability Report 2025 (PDF)",
    note:
      "官方永續報告：包含淨零、再生能源、循環經濟、供應鏈等章節（本站內容以此為案例方向，不硬塞未核實數字）",
    url: "https://www.samsung.com/global/sustainability/media/pdf/Samsung_Electronics_Sustainability_Report_2025_ENG.pdf",
  },
  {
    title: "Samsung Newsroom：Releases 2025 Sustainability Report",
    note:
      "官方新聞稿：摘要重點（如 2030 Scope1/2 目標、再生能源轉換等方向）",
    url: "https://news.samsung.com/global/samsung-electronics-releases-2025-sustainability-report",
  },
  {
    title: "Samsung：Third-Party Audit（供應商第三方稽核說明）",
    note:
      "供應鏈盡職調查：依 RBA 標準做第三方稽核、改善與追蹤（用於G面/供應鏈章節）",
    url: "https://www.samsung.com/global/sustainability/popup/popup_doc/AY5k3BUa1nsAIx-T/",
  },
  {
    title: "Samsung Electronics Supplier Code of Conduct (PDF)",
    note:
      "供應商行為準則：環境/職安/人權/道德等要求（用於供應鏈治理）",
    url: "https://www.samsung.com/global/sustainability/policy-file/AYVhO1mqBKQAIx95/Samsung_Electronics_Supplier_Code_of_Conduct_en.pdf",
  },
  {
    title: "IFRS/ISSB：IFRS S1 General Requirements（標準概述）",
    note:
      "國際永續揭露基準（2024起適用）：一般永續風險/機會揭露要求",
    url: "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/ifrs-s1-general-requirements/",
  },
  {
    title: "IFRS/ISSB：IFRS S2 Climate-related Disclosures（標準概述）",
    note:
      "國際氣候揭露基準（2024起適用）：氣候風險/機會揭露要求",
    url: "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/ifrs-s2-climate-related-disclosures/",
  },
];

/* ========== 內容資料（「多」+「像Padlet」：可直接交） ========== */
const INDUSTRY = {
  name: "電子業（Electronics Industry）",
  typicalRisks: [
    "高能耗（製造/資料中心/供應鏈能源）",
    "高供應鏈複雜度（多階供應商、人權/勞動風險、稽核成本）",
    "材料與化學品管理（RoHS/REACH、溶劑、廢棄物、回收處理）",
    "產品生命週期短（電子廢棄物、循環設計、回收系統）",
    "資安與隱私（智慧裝置、資料處理、供應鏈資安）",
  ],
  typicalTrends: [
    "淨零/減碳：Scope 1-3 管理、能源效率、再生能源、情境分析",
    "水資源韌性：用水效率、再生水、供應鏈缺水風險",
    "循環經濟：再生材料、可修復設計、回收與再利用",
    "供應鏈盡職調查：RBA 稽核、供應商行為準則、整改與追蹤",
    "揭露標準接軌：ISSB/IFRS S1/S2、TCFD/GRI/CSRD 等（依課程要求）",
  ],
};

const MATERIALITY = [
  { name: "氣候變遷與淨零（含 Scope 1-3）", impact: 5.0, concern: 4.9, cat: "E" },
  { name: "再生能源（PPA/RECs/自建綠能）", impact: 4.8, concern: 4.6, cat: "E" },
  { name: "循環經濟（回收、再生材料、電子廢棄物）", impact: 4.6, concern: 4.4, cat: "E" },
  { name: "水資源韌性（缺水/再生水/回收）", impact: 4.5, concern: 4.1, cat: "E" },
  { name: "供應鏈責任（人權/稽核/碳管理）", impact: 4.8, concern: 4.5, cat: "G" },
  { name: "資安與隱私（IoT/資料治理）", impact: 4.3, concern: 4.7, cat: "G" },
  { name: "資訊揭露與治理（董事會監督/風險管理）", impact: 4.2, concern: 4.2, cat: "G" },
  { name: "職安衛與承攬管理", impact: 4.1, concern: 4.2, cat: "S" },
  { name: "人才培育與DEI", impact: 3.9, concern: 4.0, cat: "S" },
];

const MULTI_DIM_INSIGHTS = [
  "產業別 ESG 發展趨勢比較（電子/鋼鐵/水泥…）→ 本站聚焦電子業",
  "公司歷年 ESG 揭露重點與目標追蹤（年度/部門/區域）",
  "各項 ESG 指標（GRI/SDGs/ISSB/TCFD）揭露完整度與一致性檢查",
  "ESG 指標與主題（創新、碳中和、職安、治理、資安）之關聯性分析",
  "業界 ESG 成熟度分級（領先/成長/起步）與差距成因探究",
  "永續目標/專案/計畫落實率（里程碑、成果、下一步）",
  "第三方驗證/保證（Assurance）與外部意見/重大事件整理",
  "新法規/新標準（ISSB/IFRS S1 S2、CSRD 等）應對措施彙整",
  "投資人/ESG rating/永續指數市場回饋特點（可做延伸研究）",
  "ESG 教育推廣/內部訓練/供應商培力案例彙整",
  "用戶可自定義關鍵字/主題分類 → 自動歸類分析（系統規劃）",
];

const PIPELINE = [
  {
    step: "1. 自動化蒐集（Crawler/Connector）",
    detail: [
      "批量收集公開 ESG 永續報告（PDF/HTML/Word）與官方新聞稿",
      "建立資料來源清單（公司官網/證交所/永續平台）與下載規則",
      "版控：保存原始檔 hash、下載時間、來源URL（可追溯）",
    ],
  },
  {
    step: "2. 解析與抽取（Parser + OCR/LLM）",
    detail: [
      "PDF 文字抽取 + 圖表/表格辨識（必要時 OCR）",
      "抽取：章節、指標表、目標承諾、專案內容、時間範圍",
      "正規化：單位、年份、範圍（Scope 1/2/3）、地區/事業部",
    ],
  },
  {
    step: "3. AI/NLP 結構化（Classifier/Entity/Schema）",
    detail: [
      "分類：E/S/G、主題（淨零/水/循環/供應鏈/資安/人權/治理）",
      "抽取：KPI 指標、目標值、進度敘述、風險與回應措施",
      "對齊：GRI/SDGs/ISSB 對應（建立 mapping 表）",
    ],
  },
  {
    step: "4. 比較分析（Benchmark/Trend）",
    detail: [
      "跨年度：同公司不同年度目標/進度變化（trend）",
      "跨公司：同產業不同公司揭露深度與策略比較（benchmark）",
      "跨指標：議題與指標間關聯（例如：綠電→減排、循環→廢棄物）",
    ],
  },
  {
    step: "5. 視覺化與洞察輸出（Dashboard/Story）",
    detail: [
      "材料性矩陣、趨勢卡、KPI 卡、供應鏈稽核流程圖",
      "洞察摘要（給老師/投資人/一般讀者不同版本）",
      "輸出：網頁、PDF 摘要、JSON/CSV（可做進一步分析）",
    ],
  },
];

const BPMN = {
  title: "BPMN/IDEF（文字版流程分解）",
  blocks: [
    {
      name: "流程分解（Main Flow）",
      items: [
        "資料來源盤點 → 下載/更新 → 解析 → AI 抽取/分類 → 視覺化 → 洞察輸出",
        "每一步都有：輸入/輸出/紀錄（log）/錯誤處理（exception）",
      ],
    },
    {
      name: "角色設計（Actors）",
      items: [
        "資料管理者：維護來源清單、版控規則",
        "分析者：定義分類標籤、指標對齊、驗證結果",
        "使用者（老師/同學/一般讀者）：瀏覽、下載、查詢",
        "系統：排程、抽取、評估、輸出",
      ],
    },
    {
      name: "資料流呈現（Data Flow）",
      items: [
        "Raw（PDF/HTML）→ Parsed（文字/表格）→ Structured（JSON schema）→ Insight（摘要/圖表）",
        "每層保存：來源、時間、版本、可追溯欄位",
      ],
    },
    {
      name: "控制/例外設計（Controls & Exceptions）",
      items: [
        "下載失敗：重試/備援來源/告警",
        "解析失敗：OCR fallback/人工校正",
        "分類不確定：信心分數/人工複核",
        "資料衝突：保留原文片段 + 規則優先序",
      ],
    },
  ],
};

const DATA_SCHEMA = [
  { field: "doc_id", type: "string", desc: "文件唯一ID（hash/UUID）" },
  { field: "company", type: "string", desc: "公司名稱（例：Samsung Electronics）" },
  { field: "year", type: "number", desc: "報告年度" },
  { field: "source_url", type: "string", desc: "來源連結（可追溯）" },
  { field: "section", type: "string", desc: "章節（E/S/G/治理/供應鏈…）" },
  { field: "topic_tags", type: "string[]", desc: "主題標籤（淨零/綠電/循環/資安…）" },
  { field: "kpi_name", type: "string", desc: "KPI 名稱（若有）" },
  { field: "kpi_value", type: "string", desc: "KPI 值（保留原單位/原文）" },
  { field: "target", type: "string", desc: "目標/承諾（文字）" },
  { field: "progress", type: "string", desc: "進度/措施（文字）" },
  { field: "assurance", type: "string", desc: "第三方驗證/保證（如有）" },
  { field: "evidence_snippet", type: "string", desc: "原文摘要（可追溯用）" },
];

const SPEC_ROWS = [
  {
    module: "導覽/資訊架構",
    item: "分頁與長文呈現",
    spec: "首頁/需求/分析/規格/實作分頁；每頁至少含多區塊卡片與條列（像Padlet密度）",
    accept: "每頁≥4個卡片區塊，且可切換",
  },
  {
    module: "內容模組",
    item: "多維度洞察清單",
    spec: "提供多維度洞察（產業/公司/年度/指標/法規/評等）列表與可讀結構",
    accept: "洞察清單≥10條且分類清楚",
  },
  {
    module: "流程設計",
    item: "AI/NLP 管線 + BPMN/IDEF",
    spec: "提供步驟分解、角色設計、資料流、例外控制（文字版）",
    accept: "4大流程區塊齊全，且有條列",
  },
  {
    module: "資料設計",
    item: "結構化 Schema",
    spec: "提供欄位、型別、用途（可做JSON輸出/資料庫）",
    accept: "schema 欄位≥10個",
  },
  {
    module: "版本足跡",
    item: "pageviews + actions",
    spec: "記錄分頁瀏覽與操作；支援匯出 JSON / 清除",
    accept: "可下載JSON，且含 meta/pageviews/actions",
  },
  {
    module: "可追溯",
    item: "公開資料來源列表",
    spec: "列出官方來源（報告PDF/官方頁面/標準頁）供查核",
    accept: "來源≥4條，含連結",
  },
];

const NONFUNC = [
  { k: "可用性", v: "手機/桌機皆可讀（RWD）" },
  { k: "效能", v: "靜態頁，首次載入快；無後端依賴" },
  { k: "可維護性", v: "內容以資料物件集中管理，分頁模板化" },
  { k: "隱私", v: "足跡僅存在本機 localStorage，不蒐集個資" },
  { k: "可追溯", v: "每個洞察可對應來源清單（URL/報告）" },
];

/* ========== UI ========== */
const css = `
:root{--bg:#0b1020;--card:#101a33;--text:#eaf0ff;--muted:#a9b5d6;--border:rgba(255,255,255,.12);--accent:#6ee7ff;--accent2:#a78bfa}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(1000px 600px at 10% 0%, rgba(110,231,255,.18), transparent 60%),radial-gradient(900px 600px at 90% 10%, rgba(167,139,250,.14), transparent 55%),var(--bg);color:var(--text);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
a{color:inherit}
.container{max-width:1120px;margin:0 auto;padding:20px}
.header{position:sticky;top:0;z-index:10;backdrop-filter:blur(14px);background:rgba(11,16,32,.70);border-bottom:1px solid var(--border)}
.brand{display:flex;gap:12px;align-items:center;padding:14px 0}
.logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent2))}
.title{font-weight:800}
.subtitle{color:var(--muted);font-size:12px}
.nav{display:flex;gap:10px;flex-wrap:wrap;padding:10px 0 16px}
.nav button{border:1px solid var(--border);background:rgba(16,26,51,.55);color:var(--muted);padding:10px 12px;border-radius:999px;cursor:pointer}
.nav button.active{color:var(--text);border-color:rgba(110,231,255,.35)}
.hero{padding:26px 0 12px}
.h1{font-size:34px;line-height:1.1;margin:0 0 8px}
.lead{color:var(--muted);max-width:78ch;margin:0}
.grid{display:grid;gap:14px}
.grid.cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.grid.cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(max-width:900px){.grid.cols-3,.grid.cols-2{grid-template-columns:1fr}}
.card{border:1px solid var(--border);background:rgba(16,26,51,.55);border-radius:16px;padding:16px}
.card h3{margin:0 0 8px;font-size:16px}
.card p,li{color:var(--muted);line-height:1.65}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border);padding:6px 10px;border-radius:999px;color:var(--muted);font-size:12px}
.kpi{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.kpi .num{font-size:22px;font-weight:800}
.kpi .cap{color:var(--muted);font-size:12px}
.divider{height:1px;background:var(--border);margin:14px 0}
.table{width:100%;border-collapse:collapse;font-size:13px}
.table th,.table td{padding:10px;border-bottom:1px solid var(--border);vertical-align:top}
.table th{text-align:left}
.btn{cursor:pointer;border:1px solid var(--border);background:rgba(16,26,51,.55);color:var(--text);padding:10px 12px;border-radius:12px}
.small{font-size:12px;color:var(--muted)}
.tagE{color:#6ee7ff}.tagS{color:#34d399}.tagG{color:#a78bfa}
details{border:1px solid rgba(255,255,255,.10);border-radius:12px;padding:10px 12px;background:rgba(16,26,51,.35)}
details summary{cursor:pointer;color:var(--text);font-weight:700}
details p{margin:8px 0 0}
.footer{padding:22px 0 40px;color:var(--muted);font-size:12px}
`;

const shell = `
<style>${css}</style>
<div class="header">
  <div class="container">
    <div class="brand">
      <div class="logo"></div>
      <div>
        <div class="title">電子業 ESG 形象網站（內容加長版）</div>
        <div class="subtitle">需求分析 / 系統分析 / 系統設計（規格書） / 系統實作（版本數位足跡）｜案例：Samsung Electronics（公開資料）</div>
      </div>
    </div>

    <div class="nav" id="nav">
      <button data-page="home" class="active">首頁</button>
      <button data-page="req">需求分析</button>
      <button data-page="ana">系統分析</button>
      <button data-page="spec">系統設計（規格書）</button>
      <button data-page="impl">系統實作（版本足跡）</button>
    </div>
  </div>
</div>
<main class="container" id="view"></main>
<footer class="container footer">
  <div class="divider"></div>
  <div>說明：本網站為課程作業展示。AI/NLP 自動化流程為系統設計規劃；本站以靜態頁呈現內容與方法論。</div>
</footer>
`;

const root = $("#root");
root.innerHTML = shell;

const VIEW = $("#view");
const NAV = $("#nav");

function kpiCards() {
  const cards = [
    { title: "產業", value: "電子業", caption: "高能耗 + 高供應鏈複雜度 + 快速產品汰換" },
    { title: "案例公司", value: "Samsung Electronics", caption: "公開永續報告、供應鏈稽核與政策揭露" },
    { title: "方法論", value: "Crawler + AI/NLP", caption: "自動蒐集→抽取→分類→比較→視覺化（規劃版）" },
  ];
  return `
    <div class="grid cols-3">
      ${cards
        .map(
          (k) => `
        <div class="card">
          <div class="kpi">
            <div>
              <div class="cap">${k.title}</div>
              <div class="num">${k.value}</div>
            </div>
            <span class="badge">概要</span>
          </div>
          <p>${k.caption}</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function materialityList() {
  return `
    <div class="card">
      <h3>材料性議題（示意）</h3>
      <p>用「衝擊（Impact）× 關注（Concern）」排序，示範電子業常見重大議題。</p>
      <div class="divider"></div>
      <ul>
        ${MATERIALITY.map(
          (m) => `
          <li>
            <span class="${m.cat === "E" ? "tagE" : m.cat === "S" ? "tagS" : "tagG"}">● ${m.cat}</span>
            &nbsp;${m.name}
            <span class="small">（衝擊 ${m.impact} / 關注 ${m.concern}）</span>
          </li>
        `
        ).join("")}
      </ul>
    </div>
  `;
}

function sourcesBlock() {
  return `
    <div class="card">
      <h3>公開資料來源（可追溯）</h3>
      <p>老師若要查核，可直接點連結確認。本站內容以「方向/做法/方法論」呈現，避免未核實數字硬塞。</p>
      <div class="divider"></div>
      <ul>
        ${SOURCES.map(
          (s) => `
          <li>
            <div style="color:var(--text)"><b>${s.title}</b></div>
            <div class="small">${s.note}</div>
            <div class="small"><a href="${s.url}" target="_blank" rel="noreferrer">開啟來源</a></div>
          </li>
        `
        ).join("")}
      </ul>
    </div>
  `;
}

/* ========== Pages ========== */
function pageHome() {
  return `
  <div class="hero">
    <h1 class="h1">電子業 ESG 重大性分析（Materiality Analysis）</h1>
    <p class="lead">
      本研究以「電子業」為產業背景，結合企業公開 ESG 永續資料，
      建立一套可支援多維度洞察與決策的重大性分析架構。
      分析不僅著眼於單一公司，而是從產業、公司、年度、指標、法規與外部評等等層面進行整合。
    </p >
  </div>

  ${kpiCards()}

  <div class="card">
    <h3>一、重大性分析目的與核心問題</h3>
    <ul>
      <li>電子業在高能耗、高供應鏈複雜度下，哪些 ESG 議題對企業營運與利害關係人最關鍵？</li>
      <li>不同分析維度（產業、公司、年度、指標）下，重大性排序是否一致？</li>
      <li>ESG 議題如何支援管理決策、投資評估與永續策略制定？</li>
    </ul>
  </div>

  <div class="card">
    <h3>二、多維度重大性分析架構（對齊課程重點）</h3>
    <ul>
      <li><b>產業維度：</b> 比較電子業與其他產業（如鋼鐵、水泥）在能源、碳排、供應鏈議題上的差異。</li>
      <li><b>公司維度：</b> 分析單一企業（如 Samsung Electronics）在電子業中的策略定位與揭露重點。</li>
      <li><b>年度維度：</b> 追蹤企業歷年 ESG 目標、承諾與執行進度之變化。</li>
      <li><b>指標維度：</b> 對齊 GRI、SDGs、ISSB（IFRS S1/S2）等國際揭露框架。</li>
      <li><b>法規與市場維度：</b> 納入新法規（ISSB、CSRD）與投資人 / ESG rating 關注焦點。</li>
    </ul>
  </div>

  <div class="card">
    <h3>三、電子業重大性議題辨識（示意）</h3>
    <p>
      重大性評估以「企業衝擊程度（Impact）」與「利害關係人關注度（Concern）」為雙軸，
      辨識電子業常見的關鍵 ESG 議題。
    </p >
    <ul>
      ${MATERIALITY.map(
        m => `
        <li>
          <b>${m.name}</b>
          <span class="small">（${m.cat}｜Impact ${m.impact} × Concern ${m.concern}）</span>
        </li>
      `
      ).join("")}
    </ul>
  </div>

  <div class="card">
    <h3>四、重大性成熟度分級與差距分析</h3>
    <ul>
      <li><b>領先（Leader）：</b> 已具備明確量化目標、年度追蹤與第三方驗證。</li>
      <li><b>成長（Follower）：</b> 已揭露政策與方向，但量化與追蹤機制仍在建立中。</li>
      <li><b>起步（Starter）：</b> 僅定性揭露，尚未形成系統化管理。</li>
      <li>透過分級可比較不同公司或年度間 ESG 成熟度差距及其原因。</li>
    </ul>
  </div>

  <div class="card">
    <h3>五、AI / NLP 輔助重大性分析（系統規劃）</h3>
    <ul>
      <li>自動蒐集 ESG 永續報告（PDF / 官網 / 新聞稿）。</li>
      <li>以 NLP 抽取 ESG 關鍵字、指標與目標承諾。</li>
      <li>依 E / S / G 與主題（淨零、供應鏈、資安等）進行分類。</li>
      <li>支援跨公司、跨年度、跨指標的重大性比較與趨勢洞察。</li>
    </ul>
  </div>

  <div class="card">
    <h3>六、分析結果應用情境</h3>
    <ul>
      <li><b>管理決策：</b> 協助企業聚焦最具影響力的 ESG 議題與資源配置。</li>
      <li><b>投資分析：</b> 支援投資人理解企業永續風險與長期價值。</li>
      <li><b>研究與教學：</b> 作為產業 ESG 發展趨勢與案例分析之基礎。</li>
    </ul>
  </div>

  ${sourcesBlock()}
  `;
}
function pageReq() {
  return `
    <div class="hero">
      <h1 class="h1">需求分析</h1>
      <p class="lead">把「網站要做什麼」寫成可驗收的需求（功能/非功能），並對齊課程：ESG/SDGs + AI 融合。</p>
    </div>

    <div class="card">
      <h3>行動目標（Action Goals）</h3>
      <ul>
        <li>自動彙整與結構化公開 ESG 永續資料（報告PDF/官網/新聞稿）。</li>
        <li>用 AI/NLP 進行分類、抽取與比較（公司/產業/年度/指標）。</li>
        <li>輸出多維度洞察（趨勢、差距、成熟度、法規應對）。</li>
        <li>把成果以「形象網站 + 規格書 + 足跡」呈現，便於驗收。</li>
      </ul>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>利害關係人（Stakeholders）</h3>
        <ul>
          <li>老師/助教：驗收規格、流程設計、可追溯來源</li>
          <li>同學/一般讀者：快速理解電子業 ESG</li>
          <li>企業情境：投資人、客戶、供應商、員工、社區與主管機關</li>
        </ul>
      </div>
      <div class="card">
        <h3>使用情境（User Stories）</h3>
        <ul>
          <li>3 分鐘看懂電子業 ESG：首頁趨勢 + 材料性議題</li>
          <li>想研究：用洞察清單決定研究題目（跨年度/跨公司/跨指標）</li>
          <li>想驗收：規格書表格 + 足跡匯出 JSON 作證據</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>功能需求（Functional Requirements）</h3>
      <ul>
        <li>呈現 E/S/G 主題、材料性議題、產業趨勢與案例資料來源。</li>
        <li>呈現 AI/NLP 管線流程、角色設計、例外處理（文字版）。</li>
        <li>提供結構化 schema（欄位/型別/用途）。</li>
        <li>版本足跡：記錄瀏覽/操作、匯出 JSON、清除。</li>
      </ul>
    </div>

    <div class="card">
      <h3>非功能需求（Non-functional Requirements）</h3>
      <div class="divider"></div>
      <table class="table">
        <thead><tr><th style="width:120px">面向</th><th>要求</th></tr></thead>
        <tbody>
          ${NONFUNC.map((x) => `<tr><td>${x.k}</td><td>${x.v}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>成果定義（Deliverables）</h3>
      <ul>
        <li>形象網站（本頁）</li>
        <li>需求分析/系統分析/規格書（可驗收）</li>
        <li>版本足跡 JSON（可下載）</li>
        <li>公開資料來源清單（可追溯）</li>
      </ul>
    </div>
  `;
}

function pageAna() {
  return `
    <div class="hero">
      <h1 class="h1">系統分析</h1>
      <p class="lead">把「怎麼做」講清楚：資料流、AI/NLP 管線、BPMN/IDEF、角色與例外控制（像你截圖那種）。</p>
    </div>

    <div class="card">
      <h3>系統目標（System Goal）</h3>
      <ul>
        <li>輸入：公開 ESG 報告/官網/新聞稿（PDF/HTML/Word）</li>
        <li>處理：解析→抽取→分類→比對→產生洞察</li>
        <li>輸出：網站內容（卡片/清單/流程/規格/來源）＋資料匯出（JSON）</li>
      </ul>
    </div>

    <div class="card">
      <h3>AI/NLP 自動化流程（Pipeline）</h3>
      <div class="divider"></div>
      ${PIPELINE.map(
        (p) => `
        <details>
          <summary>${p.step}</summary>
          <ul>${p.detail.map((d) => `<li>${d}</li>`).join("")}</ul>
        </details>
        <div style="height:10px"></div>
      `
      ).join("")}
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>${BPMN.title}</h3>
        ${BPMN.blocks
          .map(
            (b) => `
          <details>
            <summary>${b.name}</summary>
            <ul>${b.items.map((x) => `<li>${x}</li>`).join("")}</ul>
          </details>
          <div style="height:10px"></div>
        `
          )
          .join("")}
      </div>

      <div class="card">
        <h3>標準/法規接軌（Disclosure Standards）</h3>
        <p>電子業 ESG 需要同時面對「企業揭露」與「投資人/法規」要求。此處示範把 ISSB/IFRS S1/S2 納入規劃。</p>
        <ul>
          <li>IFRS S1：一般永續風險/機會揭露基準（2024 起適用）。</li>
          <li>IFRS S2：氣候相關揭露基準（2024 起適用）。</li>
          <li>可延伸：TCFD、GRI、SDGs、CSRD（依課程/地區要求）</li>
        </ul>
        <div class="divider"></div>
        <p class="small">（這裡是「方法論」：不是要你把每個標準背起來，而是展示你知道該如何對齊。）</p>
      </div>
    </div>

    <div class="card">
      <h3>結構化資料設計（JSON Schema 草案）</h3>
      <p>為了讓 AI/NLP 結果可查核、可比較、可視覺化，需要一個最小可用 schema。</p>
      <div class="divider"></div>
      <table class="table">
        <thead><tr><th style="width:160px">欄位</th><th style="width:110px">型別</th><th>用途</th></tr></thead>
        <tbody>
          ${DATA_SCHEMA.map((r) => `<tr><td>${r.field}</td><td>${r.type}</td><td>${r.desc}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    ${sourcesBlock()}
  `;
}

function pageSpec() {
  return `
    <div class="hero">
      <h1 class="h1">系統設計（規格書）</h1>
      <p class="lead">把作業寫成「可驗收」：模組、規格、驗收條件（你截圖裡的老師要求就是這種）。</p>
    </div>

    <div class="card">
      <h3>功能規格表（Functional Spec）</h3>
      <div class="divider"></div>
      <table class="table">
        <thead>
          <tr>
            <th style="width:150px">模組</th>
            <th style="width:170px">項目</th>
            <th>規格描述</th>
            <th>驗收條件</th>
          </tr>
        </thead>
        <tbody>
          ${SPEC_ROWS.map(
            (r) => `
            <tr>
              <td>${r.module}</td>
              <td>${r.item}</td>
              <td>${r.spec}</td>
              <td>${r.accept}</td>
            </tr>
          `
          ).join("")}
        </tbody>
      </table>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>測試案例（Test Cases）</h3>
        <ul>
          <li>TC-01：切換五個分頁，內容皆非空白，且至少各有 4 區塊。</li>
          <li>TC-02：版本足跡頁匯出 JSON，檔案含 meta/pageviews/actions。</li>
          <li>TC-03：來源清單可點開（新分頁），至少 4 條。</li>
          <li>TC-04：行動流程（Pipeline/BPMN）可展開閱讀。</li>
        </ul>
      </div>
      <div class="card">
        <h3>安全與隱私（Privacy）</h3>
        <ul>
          <li>本站不收集個資；足跡只存於本機 localStorage。</li>
          <li>若未來接後端：需新增同意機制、資料最小化、保存期限。</li>
          <li>若爬蟲擴充：需遵守網站 robots/條款，並保存來源證據。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>資訊架構（IA）對照</h3>
      <ul>
        <li>首頁：產業趨勢 + 材料性 + 多維洞察 + 來源</li>
        <li>需求分析：目標/需求/交付物</li>
        <li>系統分析：流程/角色/例外/標準/資料schema</li>
        <li>規格書：驗收條件與測試案例</li>
        <li>實作：版本足跡 + JSON 匯出（證據）</li>
      </ul>
    </div>
  `;
}

function pageImpl() {
  const fp = getFootprint();
  return `
    <div class="hero">
      <h1 class="h1">系統實作（版本數位足跡）</h1>
      <p class="lead">這一頁是你的「證據頁」：版本資訊、使用足跡、操作紀錄、可匯出 JSON（老師很吃這種）。</p>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>版本資訊（Version / Build）</h3>
        <div class="divider"></div>
        <div class="small"><b>app</b>：${SITE_VERSION.app}</div>
        <div class="small"><b>variant</b>：${SITE_VERSION.variant}</div>
        <div class="small"><b>version</b>：${SITE_VERSION.version}</div>
        <div class="small"><b>buildTime</b>：${SITE_VERSION.buildTime}</div>
        <div class="small"><b>note</b>：${SITE_VERSION.note}</div>

        <div class="divider"></div>
        <h3>公開資料案例（電子業）</h3>
        <ul>
          <li>永續報告：2025 Sustainability Report（Samsung Electronics）</li>
          <li>供應鏈治理：第三方稽核（RBA）與供應商行為準則</li>
          <li>揭露標準：ISSB/IFRS S1/S2（2024 起適用）</li>
        </ul>
      </div>

      <div class="card">
        <h3>足跡（Footprint）</h3>
        <p>只記錄你在網站做了哪些操作（分頁切換/匯出/清除），不包含任何個資。</p>
        <div class="divider"></div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <button class="btn" id="btnExport">匯出 JSON</button>
          <button class="btn" id="btnClear">清除足跡</button>
          <span class="badge">pageviews ${fp.pageviews.length}</span>
          <span class="badge">actions ${fp.actions.length}</span>
        </div>

        <details open>
          <summary>最近 pageviews（最多30筆）</summary>
          <div style="max-height:220px;overflow:auto;border:1px solid var(--border);border-radius:12px;padding:10px;margin-top:10px">
            ${
              fp.pageviews.length
                ? fp.pageviews.slice(0, 30).map(
                    (p) => `
                <div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)">
                  <div style="color:var(--text)">${p.path}</div>
                  <div class="small">${p.at}</div>
                </div>
              `
                  ).join("")
                : `<div class="small">尚無紀錄。請切換幾個分頁後再回來看。</div>`
            }
          </div>
        </details>

        <div style="height:10px"></div>

        <details>
          <summary>最近 actions（最多30筆）</summary>
          <div style="max-height:220px;overflow:auto;border:1px solid var(--border);border-radius:12px;padding:10px;margin-top:10px">
            ${
              fp.actions.length
                ? fp.actions.slice(0, 30).map(
                    (a) => `
                <div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)">
                  <div style="color:var(--text)">${a.type}</div>
                  <div class="small">${a.at}</div>
                </div>
              `
                  ).join("")
                : `<div class="small">尚無操作紀錄。</div>`
            }
          </div>
        </details>
      </div>
    </div>

    ${sourcesBlock()}
  `;
}

/* ========== Router ========== */
function render(page) {
  const pages = { home: pageHome, req: pageReq, ana: pageAna, spec: pageSpec, impl: pageImpl };
  (VIEW.innerHTML = (pages[page] ? pages[page]() : pageHome()));

  trackPage(page);

  // bind (impl only)
  const ex = $("#btnExport");
  const cl = $("#btnClear");
  if (ex) ex.onclick = () => { trackAction("export_json"); exportFootprint(); };
  if (cl) cl.onclick = () => { trackAction("clear_footprint"); clearFootprint(); render("impl"); };

  [...NAV.querySelectorAll("button")].forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
}

NAV.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const page = btn.dataset.page;
  trackAction("nav_click", { page });
  render(page);
});

render("home");
