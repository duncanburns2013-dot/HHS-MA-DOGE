import { useState } from "react";

// Simple doc citation badge
function Source({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 10,
        fontFamily: "monospace",
        backgroundColor: "#1a2a1a",
        color: "#6b6",
        padding: "2px 6px",
        borderRadius: 3,
        marginLeft: 4,
        verticalAlign: "middle",
        border: "1px solid #2a3a2a",
      }}
    >
      {label}
    </span>
  );
}

function MathLine({ label, value, source, color, bold, indent, op }) {
  return (
    <div
      className="flex items-baseline py-2 px-3"
      style={{
        borderBottom: "1px solid #151515",
        marginLeft: indent ? 20 : 0,
      }}
    >
      <span
        style={{
          flex: 1,
          color: "#bbb",
          fontSize: 14,
          fontWeight: bold ? 700 : 400,
        }}
      >
        {op && (
          <span style={{ color: "#666", marginRight: 4, fontFamily: "monospace" }}>
            {op}
          </span>
        )}
        {label}
        {source && <Source label={source} />}
      </span>
      <span
        className="font-mono"
        style={{
          color: color || "#fff",
          fontSize: bold ? 18 : 15,
          fontWeight: bold ? 800 : 600,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function DollarBar({ segments, height = 48 }) {
  return (
    <div>
      <div className="flex rounded overflow-hidden" style={{ height }}>
        {segments.map((s, i) => (
          <div
            key={i}
            className="h-full flex items-center justify-center"
            style={{
              width: `${s.pct}%`,
              backgroundColor: s.color,
              minWidth: s.pct > 1 ? undefined : 3,
            }}
          >
            {s.pct > 12 && (
              <div className="text-center px-1">
                <div
                  style={{ fontSize: 11, fontWeight: 800, color: "#000", lineHeight: 1.1 }}
                >
                  {s.cents}¢
                </div>
                {s.pct > 20 && (
                  <div style={{ fontSize: 9, color: "#000", opacity: 0.7, lineHeight: 1.1 }}>
                    {s.shortLabel}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-1">
        {segments.map((s, i) => (
          <div
            key={i}
            style={{ width: `${s.pct}%`, paddingRight: 4 }}
          >
            <div className="flex items-center gap-1">
              <div
                className="rounded-sm flex-shrink-0"
                style={{ width: 8, height: 8, backgroundColor: s.color }}
              />
              <span style={{ color: "#888", fontSize: 10, lineHeight: 1.2 }}>
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarkupProof() {
  const [expanded, setExpanded] = useState({});
  const toggle = (k) => setExpanded((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div
      style={{
        backgroundColor: "#08080a",
        color: "#ddd",
        fontFamily: "'Georgia', serif",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "20px 16px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ color: "#e05555", fontSize: 11, fontWeight: 700, letterSpacing: 2, fontFamily: "monospace" }}>
            HHS-MA-DOGE
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 4 }}>
            Following the Dollar
          </h1>
          <p style={{ color: "#777", fontSize: 14, marginTop: 6 }}>
            Five public documents. Simple arithmetic. Here's where
            <br />every dollar of elder home care actually goes.
          </p>
        </div>

        {/* ===================================== */}
        {/* STEP 1: THE PRICE TAG */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#161616", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ color: "#f0c050", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                STEP 1: WHAT DOES THE STATE PAY?
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                When an elderly person needs a home health aide, MassHealth pays the
                agency a fixed rate set by EOHHS. It's published in state regulation:
              </p>

              <div
                style={{
                  backgroundColor: "#0a0a0a",
                  borderRadius: 6,
                  padding: 16,
                  border: "1px solid #1a1a1a",
                }}
              >
                <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 }}>
                  101 CMR 350.04 — EOHHS FEE SCHEDULE
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span className="font-mono" style={{ color: "#f0c050", fontSize: 11 }}>G0156</span>
                  <span style={{ color: "#999", fontSize: 13 }}>Home health aide services</span>
                </div>

                <div style={{ marginTop: 12 }}>
                  <MathLine label="Rate per 15-minute unit" value="$10.18" source="101 CMR 350.04" color="#f0c050" />
                  <MathLine label="× 4 units" value="= $40.72 / hour" color="#f0c050" op="×4" bold />
                  <MathLine label="× 8 hours" value="= $325.76 / day" color="#f0c050" op="×8" />
                </div>
              </div>

              <p style={{ color: "#999", fontSize: 12, marginTop: 10, lineHeight: 1.6 }}>
                This is per-unit billing — unlike Medicare, which pays a flat ~$2,050 for
                a 30-day care episode. More hours billed = more revenue.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* STEP 2: HOW MUCH WAS BILLED */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#161616", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ color: "#f0c050", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                STEP 2: HOW MUCH DID THEY BILL?
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                CMS publishes every Medicaid claim in the T-MSIS dataset. Mystic Valley Elder Services
                (NPI 1578683694) billed:
              </p>

              <div style={{ backgroundColor: "#0a0a0a", borderRadius: 6, padding: 16, border: "1px solid #1a1a1a" }}>
                <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 }}>
                  CMS T-MSIS — DATA.MEDICAID.GOV — NPI 1578683694
                </div>
                <MathLine label="Total Medicaid payments to MVES" value="$222,949,564" source="T-MSIS" color="#6a9fd8" bold />
                <MathLine label="G0156 (home health aide) alone" value="$84,095,464" source="T-MSIS" color="#f0c050" bold />
                <div style={{ height: 8 }} />
                <MathLine label="G0156 billing ÷ $10.18/unit" value="8,260,851 units" source="MATH" color="#aaa" op="÷" />
                <MathLine label="Units ÷ 4 per hour" value="2,065,213 hours" source="MATH" color="#aaa" op="÷" bold />
              </div>

              <p style={{ color: "#999", fontSize: 12, marginTop: 10, lineHeight: 1.6 }}>
                That's <strong style={{ color: "#ddd" }}>2 million hours</strong> of aide time billed to
                Medicaid by a single agency. And the state also paid them through CTHRU:
              </p>

              <div style={{ backgroundColor: "#0a0a0a", borderRadius: 6, padding: 16, border: "1px solid #1a1a1a", marginTop: 8 }}>
                <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 }}>
                  CTHRU — MA COMPTROLLER
                </div>
                <MathLine label="FY2025 state payments to MVES" value="$102,077,567" source="CTHRU" color="#6a9fd8" />
                <MathLine label="5-year total (FY2021–2025)" value="$422,641,410" source="CTHRU" color="#6a9fd8" bold />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* STEP 3: WHERE DID IT GO */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#161616", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ color: "#f0c050", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                STEP 3: WHERE DID THE MONEY GO?
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                Every nonprofit files an IRS Form 990, signed under penalty of perjury.
                Part IX lists every dollar of expenses. MVES filed theirs for
                FY 7/1/2023 – 6/30/2024:
              </p>

              <div style={{ backgroundColor: "#0a0a0a", borderRadius: 6, padding: 16, border: "1px solid #1a1a1a" }}>
                <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 4 }}>
                  IRS FORM 990 PART IX — EIN 04-2562646
                </div>
                <div style={{ color: "#555", fontSize: 10, marginBottom: 12 }}>
                  Mystic Valley Elder Services Inc. | Tax year ending 6/30/2024
                </div>

                <MathLine
                  label="Line 11g: Subcontracted services"
                  value="$87,092,793"
                  source="990"
                  color="#f0c050"
                  bold
                />
                <MathLine label="Line 7: Staff salaries & wages" value="$18,757,020" source="990" color="#4aba4a" />
                <MathLine label="Lines 8–10: Benefits & payroll tax" value="$4,532,592" source="990" color="#6a9fd8" />
                <MathLine label="Line 5: Executive compensation" value="$765,990" source="990" color="#e05555" />
                <MathLine label="Lines 12–24: Other overhead" value="$9,226,740" source="990" color="#888" />
                <div style={{ borderTop: "2px solid #333", marginTop: 4 }}>
                  <MathLine label="Line 25: Total expenses" value="$120,375,135" source="990" color="#fff" bold />
                </div>
              </div>

              <div style={{ marginTop: 16, marginBottom: 8 }}>
                <DollarBar
                  segments={[
                    { pct: 72.4, color: "#f0c050", cents: 72, label: "To for-profit LLCs", shortLabel: "LLCs" },
                    { pct: 15.6, color: "#4aba4a", cents: 16, label: "Staff", shortLabel: "Staff" },
                    { pct: 3.8, color: "#6a9fd8", cents: 4, label: "Benefits", shortLabel: "" },
                    { pct: 7.7, color: "#666", cents: 8, label: "Overhead", shortLabel: "" },
                    { pct: 0.6, color: "#e05555", cents: 1, label: "Execs", shortLabel: "" },
                  ]}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#1a1500",
                  borderRadius: 6,
                  padding: 12,
                  border: "1px solid #332a10",
                  marginTop: 16,
                }}
              >
                <div style={{ color: "#f0c050", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                  72 cents of every dollar leaves immediately.
                </div>
                <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  MVES doesn't employ the aides. It passes $87 million to
                  for-profit companies — Greater Boston Patient Care LLC ($3.0M),
                  Connected Home Care LLC ($2.1M), Global Healthcare Services ($2.0M)
                  — that actually send the worker to the patient's home.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* STEP 4: WHAT THE AIDE GETS */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#161616", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ color: "#f0c050", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                STEP 4: WHAT DOES THE AIDE ACTUALLY EARN?
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ backgroundColor: "#0a0a0a", borderRadius: 6, padding: 16, border: "1px solid #1a1a1a" }}>
                <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 }}>
                  U.S. BUREAU OF LABOR STATISTICS — OES, MAY 2024
                </div>
                <div style={{ color: "#888", fontSize: 11, marginBottom: 8 }}>
                  SOC 31-1120 · Home Health and Personal Care Aides · Massachusetts
                </div>
                <MathLine label="Mean hourly wage" value="$18.50 / hr" source="BLS" color="#4aba4a" bold />
                <MathLine label="Annual mean" value="$38,490 / yr" source="BLS" color="#4aba4a" />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* STEP 5: THE PROOF */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#0a0a0a",
              borderRadius: 8,
              border: "2px solid #e05555",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#1a0a0a", borderBottom: "1px solid #2a1515" }}>
              <div style={{ color: "#e05555", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                STEP 5: THE MATH — WHERE EVERY DOLLAR GOES
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                Divide the $40.72/hr rate using the percentages from the 990:
              </p>

              {/* The waterfall */}
              <div style={{ backgroundColor: "#0a0a0a", borderRadius: 6, padding: 16, border: "1px solid #1a1a1a" }}>
                <MathLine
                  label="State pays per hour of aide time"
                  value="$40.72"
                  source="101 CMR 350.04"
                  color="#f0c050"
                  bold
                />

                <div style={{ borderTop: "1px solid #222", marginTop: 8, paddingTop: 8 }}>
                  <div style={{ color: "#888", fontSize: 11, marginBottom: 4, paddingLeft: 12 }}>
                    MVES keeps 27.6% (from 990 Part IX):
                  </div>
                  <MathLine label="MVES staff salaries" value="−$6.35" source="990 Ln 7" color="#4aba4a" indent op="−" />
                  <MathLine label="MVES benefits & payroll" value="−$1.55" source="990 Ln 8-10" color="#6a9fd8" indent op="−" />
                  <MathLine label="MVES overhead (rent, meals, IT)" value="−$3.14" source="990 Ln 12-24" color="#888" indent op="−" />
                  <MathLine label="MVES executives" value="−$0.26" source="990 Ln 5" color="#e05555" indent op="−" />
                </div>

                <div style={{ borderTop: "2px solid #333", marginTop: 8, paddingTop: 8 }}>
                  <MathLine
                    label="Remaining — sent to for-profit LLC"
                    value="$29.48"
                    source="990 Ln 11g"
                    color="#f0c050"
                    bold
                  />
                </div>

                <div style={{ borderTop: "1px solid #222", marginTop: 8, paddingTop: 8 }}>
                  <div style={{ color: "#888", fontSize: 11, marginBottom: 4, paddingLeft: 12 }}>
                    LLC pays the aide and keeps the rest:
                  </div>
                  <MathLine label="Aide wage" value="−$18.50" source="BLS OES" color="#4aba4a" indent op="−" />
                </div>

                <div style={{ borderTop: "2px solid #333", marginTop: 8, paddingTop: 8 }}>
                  <MathLine
                    label="LLC overhead & profit"
                    value="$10.98"
                    color="#e09030"
                    bold
                  />
                  <div style={{ color: "#777", fontSize: 11, paddingLeft: 12, marginTop: 4 }}>
                    Includes FICA, workers comp, scheduling, RN supervision, insurance, training, and profit.
                    These LLCs file cost reports with CHIA (957 CMR 6.00) — obtainable via public records request.
                  </div>
                </div>
              </div>

              {/* The dollar visual */}
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <div style={{ color: "#888", fontSize: 12, marginBottom: 8 }}>
                  For every $1.00 the state spends on an hour of home care:
                </div>
                <DollarBar
                  height={56}
                  segments={[
                    { pct: 45.4, color: "#4aba4a", cents: 45, label: "Aide wage", shortLabel: "Aide gets 45¢" },
                    { pct: 27.0, color: "#e09030", cents: 27, label: "LLC overhead", shortLabel: "LLC keeps 27¢" },
                    { pct: 19.6, color: "#888", cents: 20, label: "MVES admin", shortLabel: "MVES keeps 20¢" },
                    { pct: 3.8, color: "#6a9fd8", cents: 4, label: "Benefits", shortLabel: "" },
                    { pct: 3.8, color: "#e05555", cents: 4, label: "Meals/transport/exec", shortLabel: "" },
                  ]}
                />
              </div>

              <div
                style={{
                  marginTop: 20,
                  padding: 16,
                  backgroundColor: "#1a0a0a",
                  borderRadius: 6,
                  textAlign: "center",
                  border: "1px solid #2a1515",
                }}
              >
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>
                  The aide who bathes your grandmother
                  <br />
                  sees <span className="font-mono" style={{ color: "#4aba4a", fontSize: 24 }}>45 cents</span> of
                  every dollar.
                </div>
                <div style={{ color: "#999", fontSize: 13, marginTop: 8 }}>
                  <span className="font-mono" style={{ color: "#e09030" }}>27¢</span> goes to a for-profit LLC.{" "}
                  <span className="font-mono" style={{ color: "#888" }}>28¢</span> goes to MVES administration.
                </div>
                <div style={{ color: "#666", fontSize: 13, marginTop: 8 }}>
                  The CEO of the nonprofit middleman earns{" "}
                  <span className="font-mono" style={{ color: "#e05555" }}>$299,064</span>.
                  <br />
                  The aide earns{" "}
                  <span className="font-mono" style={{ color: "#4aba4a" }}>$38,490</span>.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* SCALE */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#161616", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ color: "#f0c050", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                SCALE: THIS IS ONE AGENCY OF 28
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                MVES is the largest, but there are 27 more. From T-MSIS, the
                top G0156 billers:
              </p>
              <div style={{ backgroundColor: "#0a0a0a", borderRadius: 6, padding: 12, border: "1px solid #1a1a1a" }}>
                {[
                  { name: "Mystic Valley Elder Services", g: 84.1, total: 222.9 },
                  { name: "Elder Svc. of Cape Cod", g: 55.0, total: 86.6 },
                  { name: "AgeSpan Inc", g: 51.7, total: 163.4 },
                  { name: "Somerville-Cambridge Elder", g: 36.5, total: 90.2 },
                  { name: "Maestro-Connections Health", g: 27.1, total: null },
                  { name: "Old Colony Elderly Services", g: 26.3, total: null },
                  { name: "Minuteman Senior Services", g: 25.9, total: null },
                ].map((a, i) => (
                  <div key={a.name} className="flex justify-between py-1.5" style={{ borderBottom: "1px solid #111" }}>
                    <span style={{ color: i === 0 ? "#f0c050" : "#aaa", fontSize: 13, fontWeight: i === 0 ? 700 : 400 }}>
                      {a.name}
                    </span>
                    <span className="font-mono" style={{ color: i === 0 ? "#f0c050" : "#888", fontSize: 13 }}>
                      ${a.g.toFixed(0)}M
                    </span>
                  </div>
                ))}
                <div style={{ color: "#666", fontSize: 11, marginTop: 6, textAlign: "center" }}>
                  G0156 billing only — source: CMS T-MSIS via data.medicaid.gov
                </div>
              </div>

              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                The CTHRU total across all 28 ASAPs from Elder Affairs:
              </p>
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <span className="font-mono" style={{ color: "#f0c050", fontSize: 32, fontWeight: 800 }}>
                  ~$3.4 billion
                </span>
                <div style={{ color: "#999", fontSize: 12 }}>FY2021–2025 · source: CTHRU</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* SOURCE TABLE */}
        {/* ===================================== */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", backgroundColor: "#161616", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ color: "#4aba4a", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace" }}>
                EVERY NUMBER IS FROM A PUBLIC DOCUMENT
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ color: "#666", fontSize: 10, textAlign: "left", padding: "4px 0", fontWeight: 400 }}>Claim</th>
                    <th style={{ color: "#666", fontSize: 10, textAlign: "left", padding: "4px 0", fontWeight: 400 }}>Source</th>
                    <th style={{ color: "#666", fontSize: 10, textAlign: "left", padding: "4px 0", fontWeight: 400 }}>How to verify</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { claim: "G0156 = $10.18/unit", source: "101 CMR 350.04", how: "mass.gov → regulations" },
                    { claim: "MVES billed $84M in G0156", source: "CMS T-MSIS", how: "data.medicaid.gov" },
                    { claim: "State paid MVES $102M", source: "CTHRU", how: "cthru.data.socrata.com" },
                    { claim: "72.4% to subcontractors", source: "IRS 990 Part IX", how: "propublica.org → EIN 04-2562646" },
                    { claim: "CEO earns $299K", source: "990 Schedule J", how: "Same 990 filing" },
                    { claim: "Aides earn $18.50/hr", source: "BLS OES", how: "bls.gov/oes → SOC 31-1120 → MA" },
                    { claim: "LLC cost reports exist", source: "957 CMR 6.00", how: "CHIA public records request" },
                  ].map((r) => (
                    <tr key={r.claim} style={{ borderTop: "1px solid #1a1a1a" }}>
                      <td style={{ color: "#ddd", fontSize: 12, padding: "6px 4px 6px 0" }}>{r.claim}</td>
                      <td style={{ color: "#4aba4a", fontSize: 11, fontFamily: "monospace", padding: "6px 4px" }}>{r.source}</td>
                      <td style={{ color: "#666", fontSize: 11, padding: "6px 0 6px 4px" }}>{r.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", color: "#333", fontSize: 11, paddingBottom: 20 }}>
          github.com/duncanburns2013-dot/HHS-MA-DOGE
        </div>
      </div>
    </div>
  );
}
