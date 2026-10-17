import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL_CANDIDATES = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-3.5-flash"
];

export default async function handler(req, res) {
  // --- 強力なCORS設定 (他ドメインからのアクセスを許可) ---
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const { prompt } = req.body || {};

  if (!apiKey) {
    return res.status(500).json({ error: "APIキーがクラウド側に設定されていません。" });
  }

  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      console.log(`📡 Trying AI model: ${modelName}`);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });

      const systemPrompt = "あなたはプロの筋トレコーチです。ユーザーの質問に短く的確に答えてください。";
      const fullPrompt = `${systemPrompt}\n\n質問: ${prompt}`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        console.log(`✅ Success with ${modelName}`);
        return res.status(200).json({ output: text });
      }
    } catch (error) {
      console.warn(`❌ Failed with ${modelName}:`, error.message);
      // 次のモデルを試す
    }
  }

  // すべて失敗した場合
  res.status(500).json({
    error: "AIとの通信にすべて失敗しました。",
    details: "Google Cloud Consoleで 'Generative Language API' が有効であることを確認してください。"
  });
}
