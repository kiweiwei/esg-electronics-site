/* ===== ESG 形象網站（電子業｜內容加長版｜保留原版UI + 足跡匯出） =====
   案例公司：Samsung Electronics（公開永續報告/官方揭露/供應鏈稽核說明/ISSB標準）
   內容定位：密度：多維度洞察 + 流程/角色/例外 + 規格書
*/

const $ = (sel) => document.querySelector(sel);

/* ========== 版本資訊 ========== */
const SITE_VERSION = {
  app: "ESG-Electronics-Site",
  variant: "A-LongContent",
  version: "1.3.0",
  buildTime: new Date().toISOString(),
  note:
    "GitHub Pages 靜態版；內容以公開資料彙整 + 方法論設計",
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

/* ========== 公開資料來源 ========== */
const SOURCES = [
  {
    title: "Samsung Electronics Sustainability Report 2025 (PDF)",
    note:
      "官方永續報告：包含淨零、再生能源、循環經濟、供應鏈等章節",
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
    "揭露標準接軌：ISSB/IFRS S1/S2、TCFD/GRI/CSRD 等",
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
    spec: "首頁/需求/分析/規格/實作分頁；每頁至少含多區塊卡片與條列",
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
        <div class="title">電子業 ESG 形象網站</div>
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
    { title: "方法論", value: "Crawler + AI/NLP", caption: "自動蒐集→抽取→分類→比較→視覺化" },
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
      <p>老師若要查核，可直接點連結確認。本站內容以「方向/做法/方法論」呈現。</p>
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
function pageAna() {
  return `
    <div class="hero">
      <h1 class="h1">系統分析（System Analysis）</h1>
      <p class="lead">
        依課程要求：以「自動化蒐集 + AI/NLP 結構化 + 多維度比較 + 視覺化展示」為核心，
        以文字版 BPMN/IDEF（流程分解、角色設計、資料流、控制/例外）完成系統分析。
      </p >
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>一、系統目標（輸入/處理/輸出）</h3>
        <ul>
          <li><b>輸入（Input）：</b> 企業公開 ESG 永續報告（PDF/HTML/Word）、官方新聞稿、政策頁面、供應鏈稽核/準則文件。</li>
          <li><b>處理（Process）：</b> 解析抽取 → AI/NLP 分類/標籤 → 指標對齊（GRI/SDGs/ISSB）→ 比較分析（公司/產業/年度）→ 產生洞察。</li>
          <li><b>輸出（Output）：</b> 網站（重大性分析+洞察+流程+規格）＋ 可匯出 JSON（版本數位足跡/分析結果格式）。</li>
        </ul>
      </div>

      <div class="card">
        <h3>二、核心價值（為什麼要做系統）</h3>
        <ul>
          <li>ESG 報告多為非結構化文本，人工閱讀成本高、比較困難。</li>
          <li>需要「可追溯」與「可重複」的抽取與分類流程，支援跨年度、跨公司比較。</li>
          <li>對齊 ISSB/IFRS S1/S2 等標準，有助於把揭露要求轉成可檢核的資訊欄位。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>三、BPMN / IDEF（文字版）流程分解（Main Flow）</h3>
      <div class="divider"></div>

      <details open>
        <summary>Step 1：資料蒐集（Crawler / Connector）</summary>
        <ul>
          <li>建立「來源清單」（公司官網永續頁、報告PDF、新聞稿、政策文件）。</li>
          <li>定期檢查更新（按年度/季度），保存原始檔與來源 URL（可追溯）。</li>
          <li>輸出：Raw 資料庫（PDF/HTML）＋ metadata（公司/年度/來源/下載時間）。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 2：解析抽取（Parser / Table Extraction）</summary>
        <ul>
          <li>PDF 文字抽取、章節定位、表格與圖表說明抓取。</li>
          <li>抽取目標：ESG 目標承諾、KPI 指標、措施、風險與治理描述。</li>
          <li>輸出：Parsed 文本 + 表格結構。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 3：AI/NLP 結構化（Classification / Tagging）</summary>
        <ul>
          <li>分類：E/S/G、主題標籤（淨零/綠電/水資源/循環/供應鏈/資安/人權/職安/治理）。</li>
          <li>抽取：KPI 名稱、目標、時間範圍、進度描述、區域/事業部。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 4：對齊標準（GRI / SDGs / ISSB 對照）</summary>
        <ul>
          <li>建立 mapping 表：主題標籤 ↔ 指標框架（GRI、SDGs、ISSB）。</li>
          <li>輸出：每則資訊包含「標準對應欄位」與「證據片段」以利查核。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 5：多維度比較分析（Industry / Company / Year / Indicator）</summary>
        <ul>
          <li>產業比較：電子 vs 其他產業。</li>
          <li>公司比較：同產業企業之揭露深度、策略差異。</li>
          <li>年度追蹤：目標與進度的變化（趨勢/落差/原因）。</li>
          <li>輸出：洞察摘要、材料性排序、成熟度分級結果。</li>
        </ul>
      </details>

      <div style="height:10px"></div>

      <details>
        <summary>Step 6：視覺化與展示（Website / Dashboard）</summary>
        <ul>
          <li>以形象網站呈現：重大性分析、多維洞察、流程/規格、資料來源。</li>
          <li>提供匯出：足跡 JSON。</li>
        </ul>
      </details>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>四、角色設計（Actors / Responsibilities）</h3>
        <ul>
          <li><b>資料管理者：</b> 維護來源清單、下載規則、版本控管。</li>
          <li><b>分析者：</b> 定義標籤、對齊標準、抽樣驗證結果。</li>
          <li><b>使用者：</b> 瀏覽洞察、檢視來源、下載匯出檔。</li>
          <li><b>系統：</b> 排程、解析、分類、比對、輸出。</li>
        </ul>

        <div class="divider"></div>
        <h3>五、控制與例外（Controls / Exceptions）</h3>
        <ul>
          <li>下載失敗：重試、改用備援來源、記錄錯誤碼。</li>
          <li>解析失敗：OCR fallback / 或標記人工校正。</li>
          <li>分類不確定：信心分數低→進入人工複核清單。</li>
          <li>資料衝突：保留原文片段 + 欄位優先序規則。</li>
        </ul>
      </div>

      <div class="card">
        <h3>六、分析維度矩陣</h3>
        <div class="divider"></div>
        <table class="table">
          <thead><tr><th style="width:160px">維度</th><th>內容</th><th>可產出洞察</th></tr></thead>
          <tbody>
            <tr><td>產業（Industry）</td><td>電子業特性：能耗、供應鏈、電子廢棄物、資安</td><td>與其他產業的差異與關鍵風險</td></tr>
            <tr><td>公司（Company）</td><td>公開報告揭露策略、政策、目標與措施</td><td>企業定位、策略差異、揭露完整度</td></tr>
            <tr><td>年度（Year）</td><td>同公司跨年度目標/進度/成效</td><td>趨勢追蹤、落差原因、成熟度變化</td></tr>
            <tr><td>指標（Indicator）</td><td>GRI/SDGs/ISSB 對照</td><td>揭露一致性、缺口分析、可比性提升</td></tr>
            <tr><td>法規/市場</td><td>ISSB/CSRD/投資人關注與ESG評等</td><td>合規風險、回應策略、溝通重點</td></tr>
          </tbody>
        </table>

        <div class="divider"></div>
        <h3>七、資料治理（Data Governance）</h3>
        <ul>
          <li>可追溯：每筆結構化資訊保留 source_url + evidence_snippet。</li>
          <li>版本控管：來源檔 hash、下載時間、解析版本。</li>
          <li>品質控管：抽樣複核、錯誤回饋、標籤一致性檢查。</li>
        </ul>
      </div>
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
      <p class="lead">把「怎麼做」講清楚：資料流、AI/NLP 管線、BPMN/IDEF、角色與例外控制。</p>
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
      <h1 class="h1">系統設計（規格書｜Spec）</h1>
      <p class="lead">
        本規格書以「可驗收」為核心：每個模組都定義輸入/輸出、規格、驗收條件、測試案例與品質要求，
        對齊期末考：需求分析、系統分析、系統設計、系統實作。
      </p >
    </div>

    <div class="card">
      <h3>一、系統模組清單（Modules）</h3>
      <ul>
        <li><b>M1：重大性分析展示</b>（多維度架構 + 材料性議題清單 + 成熟度分級）</li>
        <li><b>M2：產業/公司/年度/指標維度說明</b>（維度矩陣 + 可產出洞察）</li>
        <li><b>M3：AI/NLP 流程展示</b>（Pipeline + BPMN/IDEF 文字版）</li>
        <li><b>M4：可追溯來源</b>（公開資料來源連結 + 說明）</li>
        <li><b>M5：版本數位足跡</b>（pageviews/actions + JSON 匯出）</li>
      </ul>
    </div>

    <div class="card">
      <h3>二、資料規格（Data Spec：最小可用 Schema）</h3>
      <p>用於「從公開報告 → 結構化」的資料欄位定義。</p >
      <div class="divider"></div>
      <table class="table">
        <thead><tr><th style="width:160px">欄位</th><th style="width:110px">型別</th><th>說明</th></tr></thead>
        <tbody>
          ${DATA_SCHEMA.map((r) => `<tr><td>${r.field}</td><td>${r.type}</td><td>${r.desc}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>三、功能規格與驗收（Functional Spec & Acceptance）</h3>
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
          <tr>
            <td>分析內容</td>
            <td>重大性分析多維度</td>
            <td>頁面需明確呈現：產業/公司/年度/指標/法規/外部評等之分析架構與應用</td>
            <td>至少 5 個維度皆有具體條列與用途</td>
          </tr>
          <tr>
            <td>流程設計</td>
            <td>IDEF/UML/BPMN（文字版）</td>
            <td>流程分解需包含：步驟、輸入/輸出、角色、控制/例外</td>
            <td>4 個流程區塊以上（含例外）</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid cols-2">
      <div class="card">
        <h3>四、測試案例（Test Cases）</h3>
        <ul>
          <li><b>TC-01</b>：分頁切換正常；每頁至少 4 個內容區塊。</li>
          <li><b>TC-02</b>：來源連結可開啟；來源條目 ≥ 4。</li>
          <li><b>TC-03</b>：足跡頁可匯出 JSON，且檔內含 meta/pageviews/actions。</li>
          <li><b>TC-04</b>：清除足跡後，pageviews/actions 重新計數。</li>
          <li><b>TC-05</b>：Pipeline/BPMN 區塊可展開閱讀。</li>
        </ul>
      </div>

      <div class="card">
        <h3>五、系統品質（Quality）</h3>
        <ul>
          <li><b>可讀性：</b> 條列清楚、段落分區、手機可閱讀。</li>
          <li><b>可追溯性：</b> 重要敘述對應公開來源連結。</li>
          <li><b>一致性：</b> 標籤（E/S/G、主題）使用一致字彙。</li>
          <li><b>可維護性：</b> 內容以資料物件集中管理，後續新增公司/產業方便。</li>
          <li><b>隱私：</b> 足跡只存本機，不含個資。</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>六、延伸功能</h3>
      <ul>
        <li>支援多公司切換（Samsung / TSMC / Intel）並做 benchmark。</li>
        <li>把重大性矩陣做成互動散點圖（Impact × Concern）。</li>
        <li>加入「外部評等」欄位（ESG rating / 永續指數）做比較視覺化。</li>
        <li>加入「法規對照表」：ISSB S1/S2 → 站內欄位 → 證據片段。</li>
      </ul>
    </div>
  `;
}

function pageImpl() {
  const fp = getFootprint();
  return `
    <div class="hero">
      <h1 class="h1">系統實作（版本數位足跡）</h1>
      <p class="lead">這一頁是你的「證據頁」：版本資訊、使用足跡、操作紀錄、可匯出 JSON。</p>
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
        <p>只記錄在網站做了哪些操作（分頁切換/匯出/清除），不包含任何個資。</p>
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
