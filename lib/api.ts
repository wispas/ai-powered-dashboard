import axios from "axios";

export async function analyzeText(text: string) {
  const res = await axios.post("http://127.0.0.1:8001/analyze", {
    text,
  });
  return res.data;
}