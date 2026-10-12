# OpportunityLens — Global Scholarship Discovery Engine

A deterministic, evidence-backed global scholarship discovery platform engineered for students seeking legitimate education funding worldwide.

## 1. Overview & Problem Solved
Students worldwide frequently struggle to identify legitimate scholarships they genuinely qualify for. Sponsoring ministries and universities enforce strict nationality limits, study level caps, and GPA cutoffs, often with high out-of-pocket travel and visa costs hidden behind marketing terms.

OpportunityLens solves this with:
- **Global Scholarship Discovery Directory**: Pre-indexed database of prestigious government awards (UK Chevening, US Fulbright, German DAAD, French Eiffel, Japanese MEXT, Australian Awards, Swiss Government Excellence), premier university funds (Oxford Clarendon, Cambridge Gates, Toronto Pearson, Tsinghua Schwarzman), and selective secondary summer programs (MIT RSI, Telluride TASS).
- **100% Deterministic Evidence Engine**: Transparent software rules evaluating degree level (High School, Undergrad, Master's, PhD), legal citizenship/nationality, prioritized study discipline, age cutoffs, and GPA thresholds without black-box LLM hallucinations or 503 API downtime.
- **Explainable Criteria Match Score**: Itemized breakdown across Degree Level Fit (25%), Nationality Fit (25%), Subject Alignment (20%), Academic Metrics (20%), and Funding Needs (10%). Note: this score reflects documented criteria alignment only, not an admission probability.
- **Cost Disaggregation Calculator**: Transparently disaggregates tuition grants from housing, meals, round-trip flights, and visa insurance.
- **Data Ingestion & Source Registry**: An administrative ingestion architecture with official source registration, batch JSON/CSV importing, URL-based deduplication, schema validation, and audit logging.
- **Application Pipeline Tracker**: Kanban and timeline tracking with document checklists and local persistence.

---

## 2. Architecture & Design
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, and Apple-inspired minimalist design tokens with light/dark theme support.
- **Backend**: Express full-stack server (`server.ts`) providing deterministic REST endpoints (`/api/status`, `/api/ingest`, `/api/ingest/logs`) with Vite middleware mounted during development.
- **Zero Runtime AI Dependencies**: No external LLM calls, no API key requirements, and zero risk of runtime service outages.
- **Persistence**: Safe browser-side `localStorage` abstraction for user profiles, custom ingested scholarships, source registry entries, and application tracking with JSON export support.

---

## 3. Data Ingestion & Authoritative Source Registry
OpportunityLens catalogs authoritative portals:
1. **UK Foreign, Commonwealth & Development Office (FCDO)** — Chevening Scholarships
2. **U.S. Department of State** — Fulbright Foreign Student Program
3. **German Academic Exchange Service (DAAD)** — EPOS & Postgraduate Awards
4. **Australian Department of Foreign Affairs and Trade (DFAT)** — Australia Awards
5. **Campus France / French Ministry of Foreign Affairs** — Eiffel Scholarship of Excellence
6. **Japanese Ministry of Education (MEXT)** — Japanese Government Research Scholarships
7. **The Rhodes Trust / University of Oxford** — Rhodes Scholarships & Clarendon Fund
8. **Gates Cambridge Trust / University of Cambridge** — Gates Cambridge Scholarships
9. **Schwarzman Scholars / Tsinghua University** — Schwarzman Global Affairs Fellowship
10. **Federal Commission for Scholarships (SERI)** — Swiss Government Excellence Scholarships
11. **University of Toronto Admissions Office** — Lester B. Pearson International Scholarship
12. **Center for Excellence in Education (CEE) & MIT** — Research Science Institute (RSI)

### Ingestion Validation & Deduplication
- Records are validated against strict schemas (mandatory title, organizer, and HTTPS URL).
- Duplicate records matching identical official URLs are merged and deduplicated.
- Validation failures produce detailed error reports in the ingestion audit log.

---

## 4. Setup & Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
npm start
```
The application runs locally on `http://localhost:3000`. No external API keys or paid subscriptions are required.
