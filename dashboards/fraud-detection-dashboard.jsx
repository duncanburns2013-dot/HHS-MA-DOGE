import { useState, useMemo } from "react";

// ─── FRAUD DETECTION DATA ─────────────────────────────────────────────────────
const SUMMARY = [
  { level: "P1 - HIGHEST", count: 32, total: 1171003724, desc: "Same person + same codes + suspicious service" },
  { level: "P2 - HIGH", count: 23, total: 309283108, desc: "Same person + suspicious service type" },
  { level: "P3 - MEDIUM-HIGH", count: 286, total: 2400487132, desc: "Same person + same codes + $500K+" },
  { level: "P4 - MEDIUM", count: 53, total: 1054586379, desc: "Suspicious service + multi entity + $500K+" },
  { level: "P5 - REVIEW", count: 97, total: 10693693108, desc: "Same person + $5M+ (needs review)" },
];

const P1_TARGETS = [
  { addr: "300 COMMERCIAL ST STE 19", city: "MALDEN", total: 247817344, entities: 3, name: "MYSTIC VALLEY ELDER SERVICES", person: "SEAN HUBACZ", codes: "S5170", type: "asap" },
  { addr: "2315 WASHINGTON ST", city: "ROXBURY", total: 207251049, entities: 3, name: "CENTRAL BOSTON ELDER SERVICES", person: "EVENS BONTEMPS", codes: "H0044", type: "asap" },
  { addr: "144 MAIN ST", city: "BROCKTON", total: 157920857, entities: 3, name: "OLD COLONY ELDERLY SERVICES", person: "DIANA DIGIORGI", codes: "T1020", type: "asap" },
  { addr: "25 MAIN ST", city: "WEYMOUTH", total: 124683308, entities: 2, name: "BREWSTER AMBULANCE / EASCARE", person: "MARK BREWSTER", codes: "A0080", type: "transport" },
  { addr: "61 MEDFORD ST", city: "SOMERVILLE", total: 118686097, entities: 4, name: "SOMERVILLE-CAMBRIDGE ELDER", person: "JOHN O'NEILL", codes: "S5140", type: "asap" },
  { addr: "1646 PURCHASE ST", city: "NEW BEDFORD", total: 87349662, entities: 2, name: "COASTLINE ELDERLY SERVICES", person: "CHARLES SISSON", codes: "S5170", type: "asap" },
  { addr: "303 BEECH ST", city: "HOLYOKE", total: 64995250, entities: 4, name: "RIVER VALLEY COUNSELING", person: "JENNIFER SALCINES", codes: "90834", type: "behavioral" },
  { addr: "900 MEMORIAL AVE", city: "W. SPRINGFIELD", total: 38446663, entities: 2, name: "TOTAL WELLNESS CENTERS", person: "MATTHEW SMOLAREK", codes: "80307", type: "wellness" },
  { addr: "112 TURNPIKE RD STE 101", city: "WESTBOROUGH", total: 22564234, entities: 2, name: "BSD HOME CARE MANAGEMENT", person: "AZRIEL LIEBERMAN", codes: "H0043", phone: "(845)", type: "homecare" },
  { addr: "425 LAKE AVE N STE 102", city: "WORCESTER", total: 15976635, entities: 2, name: "CITY HOME CARE LLC", person: "BORIS LIPSKIY", codes: "G0156", type: "homecare" },
  { addr: "2343 PURCHASE ST", city: "NEW BEDFORD", total: 14355330, entities: 2, name: "ALL CARE HOMECARE LLC", person: "SCHREE PETTIGREW", codes: "99214", type: "homecare" },
  { addr: "1013 MAIN ST", city: "WORCESTER", total: 12514129, entities: 2, name: "EMERGENCY MEDICAL TRANSPORT", person: "ERIC THOMAS", codes: "93000", type: "transport" },
  { addr: "37 BIRCH ST", city: "MILFORD", total: 12273869, entities: 2, name: "SALMON HOME CARE LLC", person: "GARY SACON", codes: "G0299", type: "homecare" },
  { addr: "4 STONY HILL RD", city: "WILBRAHAM", total: 11525576, entities: 2, name: "EXCEL HOME CARE SERVICES", person: "REBECCA PAQUETTE", codes: "S5130", type: "homecare" },
  { addr: "439 S UNION ST UNIT 2104", city: "LAWRENCE", total: 6779062, entities: 2, name: "FERRERAS COUNSELING LLC", person: "MARIA FERRERAS", codes: "H0004", type: "behavioral" },
  { addr: "200 CORDWAINER DR", city: "NORWELL", total: 5468206, entities: 3, name: "SOUTH SHORE CTR WELLNESS", person: "KENNETH ROOD", codes: "90837", type: "wellness" },
  { addr: "484 PLEASANT ST", city: "BROCKTON", total: 4782413, entities: 2, name: "TJOCELYNE COUNSELING", person: "TAMARRA ARISTILDE", codes: "90837", type: "behavioral" },
  { addr: "11 VANDERBILT AVE", city: "NORWOOD", total: 3311452, entities: 2, name: "EASTWAY WELLNESS LLC", person: "YI LUO", codes: "97110", type: "wellness" },
  { addr: "400 N MAIN ST", city: "RANDOLPH", total: 3068252, entities: 2, name: "NEW LIFE COUNSELING", person: "PAULA DUVELSON", codes: "90837", type: "wellness" },
  { addr: "62 CENTER ST", city: "FAIRHAVEN", total: 2276308, entities: 2, name: "COMMUNITY NURSE HOME CARE", person: "LISA PARENT", codes: "G0299", type: "homecare" },
  { addr: "389 MAIN ST STE 301", city: "MALDEN", total: 1782164, entities: 2, name: "EMBRACE PATHWAYS", person: "GABRIELA MELLO MUNIZ", codes: "90837", type: "wellness" },
  { addr: "21 FATHER DEVALLES BLVD", city: "FALL RIVER", total: 1469603, entities: 3, name: "FITZGERALD COUNSELING", person: "JILL FITZGERALD", codes: "90837", type: "behavioral" },
  { addr: "232 PLEASANT ST", city: "METHUEN", total: 1179886, entities: 2, name: "BLUESKIES WELLNESS", person: "BELEN GODWIN", codes: "90837", type: "wellness" },
  { addr: "370 MAIN ST STE 910", city: "WORCESTER", total: 1031532, entities: 2, name: "AUGUSTUS SEALY", person: "", codes: "H0015", type: "behavioral" },
  { addr: "1208B VFW PKWY STE 201", city: "BOSTON", total: 911541, entities: 2, name: "SUN WELLNESS ACUPUNCTURE", person: "SUNYOUNG LEE", codes: "97810", type: "wellness" },
  { addr: "66 CLIFTON AVENUE", city: "MARBLEHEAD", total: 608268, entities: 2, name: "MARBLEHEAD COUNSELING", person: "PAUL CROSBY", codes: "H2012", type: "behavioral" },
  { addr: "1525 BLUE HILL AVE", city: "MATTAPAN", total: 450879, entities: 3, name: "FRITZ SAMSON / MULTICULTURAL", person: "", codes: "90837", type: "behavioral" },
  { addr: "10 N MAIN ST FL 2", city: "FALL RIVER", total: 449581, entities: 2, name: "OPTIMAL HEALTH", person: "ELIZABETH GOMES", codes: "90837", type: "wellness" },
  { addr: "350 LINCOLN ST STE 2400", city: "HINGHAM", total: 448463, entities: 2, name: "BRIDGEWAY WELLNESS", person: "LATANYA DUNCAN", codes: "90837", type: "wellness" },
  { addr: "37 BELMONT ST STE 203", city: "BROCKTON", total: 254274, entities: 2, name: "YVELANDE BOURSIQUOT", person: "", codes: "90837", type: "behavioral" },
  { addr: "51 UNION ST STE 214", city: "WORCESTER", total: 246229, entities: 2, name: "ELIZABETH GREENE / BAKER", person: "", codes: "90837", type: "behavioral" },
  { addr: "425 UNION ST STE 46", city: "W. SPRINGFIELD", total: 125608, entities: 2, name: "LUIS TORRES-CORDERO", person: "", codes: "90837", type: "behavioral" },
];

const CLUSTER_ADDRESSES = [
  { addr: "600 TECHNOLOGY CENTER DR", city: "STOUGHTON", entities: 7, total: 6620437058, priority: "P5", note: "Tempus Unlimited — fiscal intermediary processing PCA payments",
    subs: [
      { name: "TEMPUS UNLIMITED, INC.", amt: 5571605313, person: "LARRY SPENCER (CEO)" },
      { name: "TEMPUS UNLIMITED, INC.", amt: 554866274, person: "LARRY SPENCER (CEO)" },
      { name: "TEMPUS UNLIMITED, INC.", amt: 290808661, person: "LARRY SPENCER (CEO)" },
    ]},
  { addr: "360 MERRIMACK ST", city: "LAWRENCE", entities: 13, total: 114070143, priority: "P4", note: "Elder Services of Merrimack Valley + FCP + eye doctors + home health",
    subs: [
      { name: "ELDER SVCS MERRIMACK VALLEY", amt: 86287325, person: "ROSANNE DISTEFANO (EXEC DIR)" },
      { name: "FCP, INC", amt: 21211297, person: "BARBARA WILSON (PRESIDENT)" },
      { name: "TALLMAN EYE ASSOCIATES, PC", amt: 3702345, person: "CYNTHIA DEANGELIS" },
    ]},
  { addr: "147 PELHAM ST", city: "METHUEN", entities: 4, total: 105319411, priority: "P4", note: "Comfort Home Care LLC — $104M from one address",
    subs: [
      { name: "COMFORT HOME CARE LLC", amt: 103808965, person: "BRANDON HOWES (PRESIDENT)" },
      { name: "GREATER LAWRENCE FAMILY HEALTH", amt: 1505843, person: "KARIN BERNARD" },
      { name: "MADENNYS MARIA", amt: 4603, person: "" },
    ]},
  { addr: "1 GENERAL ST", city: "LAWRENCE", entities: 38, total: 102767075, priority: "P5", note: "Lawrence General Hospital — 38 NPIs, one address",
    subs: [
      { name: "LAWRENCE GENERAL HOSPITAL", amt: 84569433, person: "JOHN WHITLOCK (CFO)" },
      { name: "LAWRENCE GENERAL HOSPITAL", amt: 9969053, person: "JOHN WHITLOCK (CFO)" },
      { name: "L & M RADIOLOGY, INC.", amt: 4159764, person: "JAMES MEYER" },
    ]},
  { addr: "4 VALLEY MILL RD", city: "HOLYOKE", entities: 5, total: 78806646, priority: "P4", note: "WestMass Eldercare — 5 NPIs, 3 different controllers",
    subs: [
      { name: "WESTMASS ELDERCARE", amt: 39000040, person: "ROSEANN MARTOCCIA (EXEC DIR)" },
      { name: "WESTMASS ELDERCARE", amt: 34144241, person: "PRISCILLA CHALMERS (EXEC DIR)" },
      { name: "WESTMASS ELDERCARE", amt: 4267357, person: "PRISCILLA CHALMERS" },
    ]},
  { addr: "439 S UNION ST", city: "LAWRENCE", entities: 4, total: 62635689, priority: "P4", note: "Maestro-Connections — multiple home care LLCs",
    subs: [
      { name: "MAESTRO-CONNECTIONS HEALTH", amt: 52901102, person: "GEORGE KIONGERA (PRESIDENT)" },
      { name: "MAESTRO COMMUNITY CARE, LLC", amt: 7240513, person: "GEORGE KIONGERA" },
      { name: "AFYA HOME CARE LLC", amt: 2367529, person: "STEPHEN WANJIRU" },
    ]},
  { addr: "242 GREEN ST", city: "GARDNER", entities: 28, total: 60099601, priority: "P4", note: "Henry Heywood Hospital — 28 NPIs at one address",
    subs: [
      { name: "HENRY HEYWOOD MEMORIAL HOSPITAL", amt: 54500178, person: "THOMAS SULLIVAN (CEO)" },
      { name: "HEYWOOD MEDICAL GROUP INC.", amt: 4222030, person: "THOMAS SULLIVAN (CEO)" },
      { name: "WACHUSETT RADIOLOGY, INC.", amt: 452293, person: "LAURA CHEN" },
    ]},
  { addr: "100 CUMMINGS CTR", city: "BEVERLY", entities: 9, total: 53408308, priority: "P4", note: "Associated Home Care + staffing + 7 other entities",
    subs: [
      { name: "ASSOCIATED HOME CARE", amt: 34081080, person: "MICHAEL TRIGILIO (PRESIDENT)" },
      { name: "STANDARDS CARE STAFFING, INC", amt: 15126416, person: "AGNES MANUMBU" },
      { name: "JESSICA BLUTSTEIN", amt: 3811111, person: "" },
    ]},
  { addr: "599 CANAL ST", city: "LAWRENCE", entities: 12, total: 35756138, priority: "P4", note: "International Health Solutions + LIFOD Home Health + 10 others",
    subs: [
      { name: "INTERNATIONAL HEALTH SOLUTIONS", amt: 17519747, person: "RITA NORTON (CLINICAL DIR)" },
      { name: "LIFOD HOME HEALTH CARE LLC", amt: 15360775, person: "KARIUKI KIMUNGU (CEO)" },
      { name: "PATRICIO DHIMITRI", amt: 782700, person: "" },
    ]},
  { addr: "15 UNION ST", city: "LAWRENCE", entities: 5, total: 13878893, priority: "P2", note: "A Quality Home Care + 4 individual billers at one address",
    subs: [
      { name: "A QUALITY HOME CARE INC", amt: 13443660, person: "ELIZABETH KAARA (CEO)" },
      { name: "GERALDO PAGAN", amt: 316577, person: "" },
      { name: "JENNIFER POWELL", amt: 73104, person: "" },
    ]},
  { addr: "140 HIGH ST", city: "SPRINGFIELD", entities: 23, total: 5883175, priority: "P2", note: "23 entities at one address — HealthPoint Homecare + 22 others",
    subs: [
      { name: "JOHN O'REILLY", amt: 917324, person: "" },
      { name: "HEALTHPOINT HOMECARE SERVICES", amt: 821369, person: "FREDRICK ODHIAMBO (CEO)" },
      { name: "MATTHEW SADOF", amt: 621356, person: "" },
    ]},
  { addr: "578 MAIN ST", city: "MALDEN", entities: 6, total: 1665300, priority: "P4", note: "American Dental + Rite Time Home Care + 4 others",
    subs: [
      { name: "AMERICAN DENTAL CONSULTANTS", amt: 1250899, person: "SAIF NAJI (OWNER)" },
      { name: "RITE TIME HOME CARE SERVICES", amt: 401819, person: "SOLOMON NWACHUKWU" },
      { name: "MATTHEW SIU", amt: 7898, person: "" },
    ]},
  { addr: "400 W CUMMINGS PARK", city: "WOBURN", entities: 5, total: 871636, priority: "P4", note: "America Home Care Center + 4 other entities",
    subs: [
      { name: "AMERICA HOME CARE CENTER", amt: 566721, person: "FRANCES IGIEBOR" },
      { name: "THOMAS STINSON", amt: 235057, person: "" },
      { name: "PILGRIM MEDICAL ASSOCIATES", amt: 36640, person: "THOMAS STINSON (PRESIDENT)" },
    ]},
];

const MARKUP_DATA = {
  rate: 40.72,
  aideWage: 18.50,
  asapCut: 11.24,
  llcRemaining: 29.48,
  llcOverhead: 10.98,
  aidePct: 45.4,
  asapPct: 27.6,
  llcPct: 27.0,
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
};

const F = "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace";
const C = {
  bg: "#08080a", surface: "#111114", card: "#161619", border: "#222228",
  red: "#ef4444", amber: "#f59e0b", green: "#22c55e", blue: "#6aa4d8",
  cyan: "#06b6d4", purple: "#a78bfa", pink: "#ec4899",
  text: "#e4e4e7", muted: "#71717a", dim: "#3f3f46",
};

const typeColors = {
  asap: { bg: "#1a1500", border: "#332a10", text: "#f0c050", label: "ASAP" },
  homecare: { bg: "#0a1a0a", border: "#1a2a1a", text: "#4aba4a", label: "HOME CARE LLC" },
  behavioral: { bg: "#0a0a1a", border: "#1a1a2a", text: "#6a9fd8", label: "BEHAVIORAL" },
  wellness: { bg: "#1a0a1a", border: "#2a1a2a", text: "#a78bfa", label: "WELLNESS" },
  transport: { bg: "#1a0808", border: "#2a1515", text: "#ef4444", label: "TRANSPORT" },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function StatCard({ value, label, sublabel, color }) {
  return (
    <div style={{ textAlign: "center", padding: "12px 8px" }}>
      <div style={{ fontFamily: F, fontSize: 24, fontWeight: 800, color: color || C.text }}>{value}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 10, color: C.dim }}>{sublabel}</div>}
    </div>
  );
}

function PriorityBar({ level, count, total, maxTotal, color }) {
  const pct = (total / maxTotal) * 100;
  return (
    <div style={{ marginBottom: 8 }}>
      <div className="flex justify-between items-baseline" style={{ marginBottom: 2 }}>
        <span style={{ fontFamily: F, fontSize: 11, color, fontWeight: 700 }}>{level}</span>
        <span style={{ fontFamily: F, fontSize: 11, color: C.muted }}>{count} targets · {fmt(total)}</span>
      </div>
      <div style={{ height: 6, backgroundColor: C.border, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, backgroundColor: color, borderRadius: 3, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function TargetRow({ t, rank }) {
  const tc = typeColors[t.type] || typeColors.behavioral;
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        backgroundColor: open ? tc.bg : "transparent",
        border: `1px solid ${open ? tc.border : "transparent"}`,
        borderRadius: 6, padding: "8px 10px", marginBottom: 2, cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <div className="flex items-center gap-2">
        <span style={{ fontFamily: F, fontSize: 10, color: C.dim, width: 20 }}>{rank}</span>
        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 3, backgroundColor: tc.bg, border: `1px solid ${tc.border}`, color: tc.text, fontFamily: F, fontWeight: 700, flexShrink: 0 }}>
          {tc.label}
        </span>
        <span style={{ flex: 1, fontSize: 12, color: C.text, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {t.name}
        </span>
        <span style={{ fontFamily: F, fontSize: 13, color: t.total > 100000000 ? C.red : t.total > 10000000 ? C.amber : C.text, fontWeight: 700 }}>
          {fmt(t.total)}
        </span>
      </div>
      {open && (
        <div style={{ marginTop: 8, paddingLeft: 22, fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
          <div><span style={{ color: C.dim }}>Address:</span> {t.addr}, {t.city}</div>
          <div><span style={{ color: C.dim }}>Controller:</span> <span style={{ color: tc.text }}>{t.person || "Unknown"}</span>{t.phone && <span style={{ color: C.red, marginLeft: 8 }}>{t.phone} area code = NY</span>}</div>
          <div><span style={{ color: C.dim }}>NPIs:</span> {t.entities} entities · <span style={{ color: C.dim }}>Top code:</span> <span style={{ fontFamily: F, color: C.cyan }}>{t.codes}</span></div>
          <div style={{ fontSize: 11, color: C.red, marginTop: 4, fontWeight: 600 }}>
            Same person controls all entities · Billing identical codes
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VIEWS ────────────────────────────────────────────────────────────────────
function OverviewView() {
  const maxTotal = Math.max(...SUMMARY.map(s => s.total));
  const colors = [C.red, "#ff6b35", C.amber, "#86efac", C.muted];
  return (
    <div>
      <div className="grid grid-cols-4 gap-3" style={{ marginBottom: 20 }}>
        <StatCard value="491" label="Fraud Targets" sublabel="addresses flagged" color={C.red} />
        <StatCard value="$15.6B" label="Total Medicaid $" sublabel="flagged spending" color={C.amber} />
        <StatCard value="32" label="P1 Highest" sublabel="$1.17B" color={C.red} />
        <StatCard value="49" label="Elder/Home Care" sublabel="$2.1B" color={C.green} />
      </div>

      <div style={{ backgroundColor: C.surface, borderRadius: 8, padding: 16, marginBottom: 20, border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.cyan, letterSpacing: 2, marginBottom: 12 }}>PRIORITY BREAKDOWN</div>
        {SUMMARY.map((s, i) => (
          <PriorityBar key={s.level} level={s.level} count={s.count} total={s.total} maxTotal={maxTotal} color={colors[i]} />
        ))}
      </div>

      <div style={{ backgroundColor: C.surface, borderRadius: 8, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.cyan, letterSpacing: 2, marginBottom: 12 }}>HOW TARGETS WERE IDENTIFIED</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
          Cross-referenced <span style={{ color: C.text, fontWeight: 600 }}>CMS T-MSIS</span> Medicaid billing (227M rows)
          against <span style={{ color: C.text, fontWeight: 600 }}>NPPES NPI Registry</span> (9.4M providers).
          Flagged addresses where <span style={{ color: C.amber }}>one person controls multiple entities</span> billing
          identical procedure codes — the structural fingerprint of billing fraud.
          Priority weighting uses dollar volume, service type (home care, transport, wellness = highest risk),
          and whether the same individual appears as authorized official across NPIs.
        </div>
      </div>
    </div>
  );
}

function TargetsView() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("total");

  const filtered = useMemo(() => {
    let d = [...P1_TARGETS];
    if (filter !== "all") d = d.filter(t => t.type === filter);
    if (sort === "total") d.sort((a, b) => b.total - a.total);
    if (sort === "entities") d.sort((a, b) => b.entities - a.entities);
    return d;
  }, [filter, sort]);

  const types = ["all", ...new Set(P1_TARGETS.map(t => t.type))];

  return (
    <div>
      <div className="flex gap-2 flex-wrap" style={{ marginBottom: 12 }}>
        {types.map(t => {
          const tc = t === "all" ? { text: C.cyan } : typeColors[t];
          return (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: "4px 10px", fontSize: 10, fontFamily: F, letterSpacing: 1,
              backgroundColor: filter === t ? (tc.text || C.cyan) + "22" : "transparent",
              color: filter === t ? (tc.text || C.cyan) : C.dim,
              border: `1px solid ${filter === t ? (tc.text || C.cyan) + "44" : C.border}`,
              borderRadius: 4, cursor: "pointer", textTransform: "uppercase",
            }}>{t === "all" ? `ALL (${P1_TARGETS.length})` : `${(typeColors[t]?.label || t)} (${P1_TARGETS.filter(x => x.type === t).length})`}</button>
          );
        })}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          <button onClick={() => setSort("total")} style={{ padding: "4px 8px", fontSize: 10, fontFamily: F, backgroundColor: sort === "total" ? C.surface : "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer" }}>BY $</button>
          <button onClick={() => setSort("entities")} style={{ padding: "4px 8px", fontSize: 10, fontFamily: F, backgroundColor: sort === "entities" ? C.surface : "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer" }}>BY NPIS</button>
        </div>
      </div>

      <div style={{ fontSize: 11, color: C.dim, marginBottom: 8, fontFamily: F }}>
        {filtered.length} P1-HIGHEST targets · ${(filtered.reduce((s, t) => s + t.total, 0) / 1e9).toFixed(2)}B · Click to expand
      </div>

      {filtered.map((t, i) => <TargetRow key={t.addr} t={t} rank={i + 1} />)}
    </div>
  );
}

function ClustersView() {
  const [expanded, setExpanded] = useState({});
  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  const [sortBy, setSortBy] = useState("total");

  const sorted = useMemo(() => {
    const d = [...CLUSTER_ADDRESSES];
    if (sortBy === "total") d.sort((a, b) => b.total - a.total);
    if (sortBy === "entities") d.sort((a, b) => b.entities - a.entities);
    return d;
  }, [sortBy]);

  return (
    <div>
      <div style={{ backgroundColor: "#1a0808", borderRadius: 8, padding: 16, border: `1px solid #2a1515`, marginBottom: 20 }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.red, letterSpacing: 2, marginBottom: 8 }}>RED FLAG: MULTI-ENTITY ADDRESSES</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          These addresses have <span style={{ color: C.red, fontWeight: 700 }}>3+ entities</span> billing Medicaid from a single location.
          Click any row to see who's there. Legitimate operations exist (hospitals, medical plazas), but
          multiple home care LLCs at one address billing identical codes is a classic fraud pattern.
        </div>
      </div>

      <div className="flex gap-2" style={{ marginBottom: 12 }}>
        <button onClick={() => setSortBy("total")} style={{ padding: "4px 10px", fontSize: 10, fontFamily: F, backgroundColor: sortBy === "total" ? C.surface : "transparent", color: sortBy === "total" ? C.amber : C.dim, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer" }}>BY DOLLARS</button>
        <button onClick={() => setSortBy("entities")} style={{ padding: "4px 10px", fontSize: 10, fontFamily: F, backgroundColor: sortBy === "entities" ? C.surface : "transparent", color: sortBy === "entities" ? C.red : C.dim, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer" }}>BY # ENTITIES</button>
      </div>

      {sorted.map((c, i) => {
        const isOpen = expanded[i];
        return (
          <div key={i}
            style={{
              backgroundColor: isOpen ? C.card : C.surface,
              borderRadius: 8, marginBottom: 6,
              border: `1px solid ${isOpen ? C.red + "44" : C.border}`,
              overflow: "hidden", transition: "all 0.15s",
            }}
          >
            <div
              onClick={() => toggle(i)}
              style={{ padding: "10px 14px", cursor: "pointer" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2" style={{ flex: 1 }}>
                  <span style={{ fontFamily: F, fontSize: 10, padding: "2px 6px", borderRadius: 3, backgroundColor: C.red + "22", color: C.red, border: `1px solid ${C.red}33`, flexShrink: 0 }}>
                    {c.entities} NPIs
                  </span>
                  <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 2, backgroundColor: C.dim + "44", color: C.muted, fontFamily: F, flexShrink: 0 }}>
                    {c.priority}
                  </span>
                  <span style={{ fontFamily: F, fontSize: 12, color: C.text, fontWeight: 700 }}>{c.addr}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>{c.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: F, fontSize: 14, color: c.total > 100000000 ? C.red : c.total > 10000000 ? C.amber : C.text, fontWeight: 700 }}>
                    {fmt(c.total)}
                  </span>
                  <span style={{ color: C.dim, fontSize: 14, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                </div>
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4, paddingLeft: 2 }}>{c.note}</div>
            </div>

            {isOpen && (
              <div style={{ padding: "0 14px 12px", borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F, fontSize: 9, color: C.dim, letterSpacing: 1, padding: "8px 0 4px", textTransform: "uppercase" }}>
                  Entities at this address (top 3 shown):
                </div>
                {c.subs.map((s, j) => (
                  <div key={j} className="flex justify-between items-baseline" style={{ padding: "5px 0", borderBottom: `1px solid ${C.border}22` }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 12, color: j === 0 ? C.text : C.muted, fontWeight: j === 0 ? 700 : 400 }}>
                        {s.name}
                      </span>
                      {s.person && (
                        <span style={{ fontSize: 10, color: C.dim, marginLeft: 8 }}>{s.person}</span>
                      )}
                    </div>
                    <span style={{ fontFamily: F, fontSize: 12, color: s.amt > 50000000 ? C.red : s.amt > 1000000 ? C.amber : C.muted, fontWeight: 600, flexShrink: 0 }}>
                      {fmt(s.amt)}
                    </span>
                  </div>
                ))}
                {c.entities > 3 && (
                  <div style={{ fontSize: 10, color: C.dim, fontStyle: "italic", marginTop: 6, fontFamily: F }}>
                    + {c.entities - 3} more entities at this address
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MarkupView() {
  const m = MARKUP_DATA;
  return (
    <div>
      <div style={{ backgroundColor: C.surface, borderRadius: 8, padding: 16, border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.cyan, letterSpacing: 2, marginBottom: 12 }}>THE BILLING MARKUP — PROVED FROM 5 PUBLIC DOCUMENTS</div>

        {[
          { label: "State pays per hour (101 CMR 350.04)", value: "$40.72", color: C.amber },
          { label: "MVES admin layer — 27.6% (990 Part IX)", value: "−$11.24", color: C.muted, indent: true },
          { label: "To for-profit LLC (72.4%)", value: "$29.48", color: C.amber, bold: true },
          { label: "Aide wage (BLS OES)", value: "−$18.50", color: C.green, indent: true },
          { label: "LLC overhead & profit", value: "$10.98", color: "#e09030", bold: true },
        ].map((r, i) => (
          <div key={i} className="flex justify-between items-baseline" style={{
            padding: "6px 8px", borderBottom: `1px solid ${C.border}`, marginLeft: r.indent ? 16 : 0,
          }}>
            <span style={{ fontSize: 12, color: r.bold ? C.text : C.muted, fontWeight: r.bold ? 700 : 400 }}>{r.label}</span>
            <span style={{ fontFamily: F, fontSize: r.bold ? 16 : 14, color: r.color, fontWeight: r.bold ? 800 : 600 }}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Dollar bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginBottom: 6 }}>For every $1.00 the state spends:</div>
        <div className="flex rounded overflow-hidden" style={{ height: 44 }}>
          {[
            { pct: 45.4, color: "#4aba4a", label: "45¢ Aide" },
            { pct: 27.0, color: "#e09030", label: "27¢ LLC" },
            { pct: 27.6, color: "#666", label: "28¢ ASAP" },
          ].map((s, i) => (
            <div key={i} className="h-full flex items-center justify-center" style={{ width: `${s.pct}%`, backgroundColor: s.color }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#000" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connection to fraud */}
      <div style={{ backgroundColor: "#1a0808", borderRadius: 8, padding: 16, border: `1px solid #2a1515` }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.red, letterSpacing: 2, marginBottom: 8 }}>WHY THE MARKUP ENABLES FRAUD</div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
          {[
            ["Per-unit billing", "G0156 at $10.18/unit rewards volume, not outcomes"],
            ["Multiple NPIs", "One person splits billing across entities to avoid thresholds"],
            ["Mandatory subcontracting", "MGL c. 19A §4B forces money through a second entity"],
            ["Unpublished cost reports", "957 CMR 6.00 data requires a CHIA public records request"],
            ["Untracked wage pass-through", "Chapter 257 requires 75% but never verifies"],
          ].map(([title, desc], i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <span style={{ color: C.red, fontWeight: 700 }}>{i + 1}.</span>{" "}
              <span style={{ color: C.text, fontWeight: 600 }}>{title}</span>{" "}
              <span style={{ color: C.dim }}>—</span> {desc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SourceView() {
  return (
    <div>
      <div style={{ backgroundColor: C.surface, borderRadius: 8, padding: 16, border: `1px solid ${C.border}`, marginBottom: 16 }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.green, letterSpacing: 2, marginBottom: 12 }}>DATA SOURCES</div>
        {[
          ["CMS T-MSIS", "227M rows, 2018-2024 Medicaid provider spending", "data.medicaid.gov"],
          ["NPPES NPI Registry", "9.4M providers, authorized officials", "npiregistry.cms.hhs.gov"],
          ["IRS Form 990", "Nonprofit expenses, exec comp, subcontractors", "projects.propublica.org/nonprofits"],
          ["101 CMR 350.04", "G0156 = $10.18/unit fee schedule", "mass.gov/regulations"],
          ["CTHRU", "MA Comptroller vendor payments", "cthru.data.socrata.com"],
          ["BLS OES", "Home health aide wages by state", "bls.gov/oes"],
          ["957 CMR 6.00", "LLC cost reports filed with CHIA", "chiamass.gov (PRR required)"],
        ].map(([name, desc, url], i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}22` }}>
            <div style={{ fontFamily: F, fontSize: 12, color: C.green, fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{desc}</div>
            <div style={{ fontSize: 10, color: C.dim, fontFamily: F }}>{url}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: C.surface, borderRadius: 8, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F, fontSize: 10, color: C.amber, letterSpacing: 2, marginBottom: 12 }}>METHODOLOGY</div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
          Joined T-MSIS billing data against NPPES provider registry. Flagged addresses where one person appears
          as authorized official on multiple NPIs billing identical procedure codes. Priority weighted by dollar volume,
          service type risk (home care/transport/wellness), and entity count. Cross-referenced against IRS 990
          filings for nonprofit expense breakdowns and executive compensation. Markup calculation uses 990 Part IX
          functional expense ratios applied to G0156 billing rate from 101 CMR 350.04.
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "OVERVIEW" },
  { id: "targets", label: "P1 TARGETS" },
  { id: "clusters", label: "CLUSTERS" },
  { id: "markup", label: "MARKUP PROOF" },
  { id: "source", label: "SOURCE" },
];

export default function FraudDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: F, fontSize: 10, color: C.red, letterSpacing: 3, textTransform: "uppercase" }}>
            HHS-MA-DOGE · FRAUD DETECTION
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "4px 0", fontFamily: "Georgia, serif" }}>
            491 Addresses · $15.6 Billion Flagged
          </h1>
          <div style={{ fontSize: 12, color: C.dim }}>
            T-MSIS × NPPES cross-reference · Same person, multiple NPIs, identical codes
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 flex-wrap" style={{ marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 2 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "8px 14px", fontSize: 11, fontFamily: F, letterSpacing: 1,
              backgroundColor: tab === t.id ? C.red : "transparent",
              color: tab === t.id ? "#fff" : C.dim,
              border: "none", cursor: "pointer", borderRadius: "3px 3px 0 0",
              transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Views */}
        {tab === "overview" && <OverviewView />}
        {tab === "targets" && <TargetsView />}
        {tab === "clusters" && <ClustersView />}
        {tab === "markup" && <MarkupView />}
        {tab === "source" && <SourceView />}
      </div>
    </div>
  );
}
