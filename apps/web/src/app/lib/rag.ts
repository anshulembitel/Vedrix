import path from "path";
import mammoth from "mammoth";

export type RagChunk = {
  id: string;
  title: string;
  text: string;
};

let cachedChunks: RagChunk[] | null = null;

async function loadChunks(): Promise<RagChunk[]> {
  if (cachedChunks) return cachedChunks;

  const filePath = path.join(
    process.cwd(),
    "public",
    "RAG.docx"
  );

  const result = await mammoth.extractRawText({ path: filePath });
  const rawText = (result.value || "").trim();

  if (!rawText) {
    cachedChunks = [];
    return cachedChunks;
  }

  const words = rawText.split(/\s+/).filter(Boolean);
  const CHUNK_SIZE = 220;
  const CHUNK_OVERLAP = 40;

  const chunks: RagChunk[] = [];
  let i = 0;
  let chunkIndex = 0;

  while (i < words.length) {
    const slice = words.slice(i, i + CHUNK_SIZE);
    const chunkText = slice.join(" ").trim();

    chunks.push({
      id: `apparatus-chunk-${chunkIndex + 1}`,
      title: `Apparatus Solutions – chunk ${chunkIndex + 1}`,
      text: chunkText,
    });

    i += CHUNK_SIZE - CHUNK_OVERLAP;
    chunkIndex++;
  }

  cachedChunks = chunks;
  return chunks;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function overlapScore(qTokens: string[], dTokens: string[]): number {
  const dSet = new Set(dTokens);
  let score = 0;
  for (const t of qTokens) {
    if (dSet.has(t)) score++;
  }
  return score;
}

export async function retrieveTopK(
  query: string,
  k = 6
): Promise<RagChunk[]> {
  const chunks = await loadChunks();
  if (!chunks.length) return [];

  const qTokens = tokenize(query);

  const scored = chunks.map((chunk) => ({
    chunk,
    score: overlapScore(qTokens, tokenize(chunk.text)),
  }));

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, k);
  const bestScore = top[0]?.score ?? 0;
  const MIN_SCORE = 1;

  if (bestScore < MIN_SCORE) {
    return chunks.slice(0, Math.min(k, chunks.length));
  }

  return top.map((s) => s.chunk);
}