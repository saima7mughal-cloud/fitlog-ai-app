import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const apiKey = process.env.GOOGLE_API_KEY;

app.use(cors());
app.use(express.json());

// 🔍 リクエストログ
app.use((req, res, next) => {
  if (req.url === "/api/gemini") {
    console.log(`[${new Date().toLocaleTimeString()}] ➡️ AI Request Received`);
  }
  next();
});

// --- Google AI SDK の初期化 (AQ.キー対応) ---
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body || {};

  if (!apiKey) {
    return res.status(500).json({ error: "APIキーが設定されていません。" });
  }

  try {
    const systemPrompt = "あなたはプロの筋トレコーチです。ユーザーの質問に短く的確に答えてください。";
    const fullPrompt = `${systemPrompt}\n\n質問: ${prompt}`;

    console.log("📡 SDKを使ってGeminiに通信中...");

    // 公式SDKを使った通信 (これが最もAQ.キーに強い方法です)
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ AIからの回答取得に成功しました！");
    res.json({ output: text });
  } catch (error) {
    console.error("❌ SDK Error:", error.message);

    // エラー内容に応じたメッセージ
    let userError = "AIとの通信に失敗しました。";
    if (error.message.includes("API_KEY_INVALID")) {
      userError = "APIキーが無効です。設定を見直してください。";
    } else if (error.message.includes("404")) {
      userError = "AIモデルが見つかりません。";
    }

    res.status(500).json({ error: userError, details: error.message });
  }
});

// --- 静的ファイル配信 ---
const distPath = path.resolve(__dirname, "dist");
app.use("/assets", express.static(path.join(distPath, "assets")));
app.use(express.static(distPath));

app.get("*", (req, res) => {
  if (!req.url.startsWith("/api")) {
    res.sendFile(path.join(distPath, "index.html"));
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log("=========================================");
  console.log(`🚀 FitLog AI サーバー起動 (Google公式SDK版)`);
  console.log(`🔗 URL: http://localhost:${port}`);
  console.log(`APIキー形式: ${apiKey.startsWith('AQ.') ? '新形式(AQ.)' : '従来形式'}`);
  console.log("=========================================");
});
