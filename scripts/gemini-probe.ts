/**
 * Diagnostic: why does the live advisor answer come back truncated?
 * Prints finishReason + usageMetadata only — never the API key.
 * Run: bun scripts/gemini-probe.ts
 */
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.log('GEMINI_API_KEY not set in this shell environment.');
  process.exit(2);
}

const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 20000 } });

const prompt = `You are the OpportunityLens Senior Scholarship Advisor.
Provide expert, tailored, actionable application counsel for a student applying to this specific verified scholarship.
STRICT CONSTRAINTS:
1. Base your counsel strictly on the verified scholarship record and student profile below.
2. Keep your response strictly under 200 words.
3. Organize into 2-3 short bulleted sections: Strategic Positioning; Crucial Requirement & Documents; Immediate Action & Timeline.
4. Never invent scholarships, deadlines, eligibility rules, funding amounts.
5. End with a one-line reminder to verify every detail on the official provider portal.

STUDENT PROFILE:
Academic Level: Master's
GPA: 3.70
Nationality: Nigerian
Country of Residence: Nigeria
Intended Major: Public Policy
Target Destination: New Zealand
Demonstrated Financial Need: Yes

VERIFIED SCHOLARSHIP RECORD:
Title: Manaaki New Zealand Scholarships
Sponsoring Provider: Ministry of Foreign Affairs and Trade (MFAT New Zealand)
Destination Countries: New Zealand
Eligible Academic Levels: Master's
Official Deadline: Consult official portal
Official Program URL: https://www.scholarships.education.govt.nz/

STUDENT QUESTION:
"What are my strongest qualification angles for this scholarship, and what should I prioritize this month?"`;

const label = process.argv[2] || 'default';

async function run(name: string, config: Record<string, unknown>) {
  const started = Date.now();
  const r = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config,
  });
  const text = (r.text || '').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  console.log(`\n=== ${name} (${Date.now() - started}ms) ===`);
  console.log('finishReason:', r.candidates?.[0]?.finishReason);
  console.log('usageMetadata:', JSON.stringify(r.usageMetadata));
  console.log(`words: ${words} | chars: ${text.length}`);
  console.log('--- text ---');
  console.log(text);
}

if (label === 'nothink') {
  await run('maxOutputTokens 400 + thinking OFF', {
    maxOutputTokens: 400,
    temperature: 0.3,
    thinkingConfig: { thinkingBudget: 0 },
  });
} else if (label === 'more-tokens') {
  await run('maxOutputTokens 2048 (thinking on)', {
    maxOutputTokens: 2048,
    temperature: 0.3,
  });
} else {
  await run('as shipped: maxOutputTokens 400', { maxOutputTokens: 400, temperature: 0.3 });
}
