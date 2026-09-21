const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors")({ origin: true });

exports.gemini = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    // 最新の環境変数読み込み方式に変更
    const apiKey = process.env.GOOGLE_API_KEY;
    const { prompt } = req.body || {};

    if (!apiKey) {
      return res.status(500).json({ error: "APIキーが設定されていません。" });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = "あなたはプロの筋トレコーチです。ユーザーの質問に短く的確に答えてください。";
      const fullPrompt = `${systemPrompt}\n\n質問: ${prompt}`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      res.status(200).json({ output: text });
    } catch (error) {
      console.error("Firebase AI Error:", error.message);
      res.status(500).json({ error: "AI通信エラー", details: error.message });
    }
  });
});
