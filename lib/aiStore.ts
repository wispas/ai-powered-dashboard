export type AiResult = {
    summary: string;
    risk_score: number;
    sentiment: string;
    topics: string[];
    confidence: number;
  };
  
  const KEY = "last_ai_result";
  
  export function setAiResult(data: AiResult) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(KEY, JSON.stringify(data));
    }
  }
  
  export function getAiResult(): AiResult | null {
    if (typeof window === "undefined") return null;
  
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }
  