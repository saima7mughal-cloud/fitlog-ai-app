FitLog AI 🏋️‍♂️📊
A Next-Gen Fitness Dashboard: AI-Powered Body Analysis, Training & Nutrition Guide

A web application that centralizes your daily workout logs and body composition data (weight, body fat percentage, muscle mass, etc.) across mobile and PC. The AI analyzes your "current condition" to recommend the optimal training menu and nutritional balance.

✨ Core Features
📸 Automated Data Extraction from Images & PDFs (OCR / AI Analysis)
Simply upload your InBody scan sheet, smart scale app screenshot, or health checkup results. The AI automatically reads and inputs the numbers, completely eliminating the hassle of manual data entry.

📝 Stress-Free Manual Input
Supports over 13 metrics including height, weight, BMI, body fat, and skeletal muscle mass—but with "zero required fields." You can quickly log only what you measured that day. It is designed specifically to make daily tracking easy and sustainable.

🤖 AI Personal Analysis & Recommendations
The AI analyzes your current condition based on your inputted data. It automatically calculates and suggests tailored training plans, target calories (for weight loss, maintenance, or bulking), and recommended protein intake based on your goals. Even when you first start and have limited data, it provides appropriate advice using estimated values.

📈 Progress Graphs & History Management
Past measurement data is visualized in lists and graphs for quick reading. You can understand your long-term body changes at a single glance.

🛠️ Development Process & Focus Points
I built this app as a personal project over roughly two months, balancing the planning and implementation between my school assignments and exams as a 2nd-year high school student studying Information Technology.

[ Tech Stack ]

Frontend / Backend: React, Vite, Firebase

Mobile Support: Capacitor, Android Studio (for testing)

AI Integration: Google Gemini API, VS Code AI coding assistance

[ Key Focus Areas ]

A Hybrid of "Core Understanding" and "AI Utilization"
Instead of leaving everything to code-generation AI from the start, I first wrote the base code myself to fully understand the underlying mechanics. Once that foundation was set, introducing AI tools drastically accelerated my development speed and the overall quality of the features.

UI/UX Built for Daily Use by Gym Goers
Since I work out myself, my top priority was "making sure daily logging doesn't become a chore." By making all input fields optional and adding an image upload feature, I lowered the barrier to entry as much as possible.

🔥 Struggles & Overcoming Challenges
The hardest part of this development was implementing the AI function that analyzes and proposes based on measurement data.

I hit a wall where errors kept popping up during data passing and API integration, and the AI just wouldn't work as intended for a while.
To solve this, I went back and forth between VS Code and Android Studio to isolate the causes, and utilized an AI agent tool to get a bird's-eye view of the entire project structure to separate the errors. By giving precise instructions via prompts and crushing bugs one by one, I finally succeeded in getting the AI features running perfectly.

🚀 Future Updates
Improve the UI based on feedback from actual gym-goers and fitness enthusiasts.

Add meal logging and automated scheduling for targeted muscle group training.

Further optimization for seamless performance as a native Android/iOS app.

👤 About the Developer
Profile: 2nd-Year High School Student (Information Technology Dept. at a Technical High School)

Development Period: Approx. 2 months (Developed alongside schoolwork and other activities)





（日本語）
FitLog AI 🏋️‍♂️📊
AIがあなたの体を分析してトレーニングと栄養を提案する、次世代フィットネスダッシュボード

日々のトレーニング記録や体組成データ（体重・体脂肪率・筋肉量など）をスマホやPCで一元管理し、AIが「今の状態」を分析して最適なトレーニングメニューや栄養バランスを提案してくれるWebアプリです。

✨ 主な機能
📸 画像・PDFからの自動読み取り（OCR / AI解析）
InBodyの測定用紙や体組成計のアプリ画面、健康診断の結果などをアップロードするだけで、AIが数値を読み取って自動入力してくれます。手打ちの面倒さをなくしました。

📝 ストレスフリーな手動入力
身長・体重・BMI・体脂肪率・骨格筋量など13項目以上に対応していますが、「必須項目はゼロ」にしています。その日測ったところだけをサクッと記録できる、継続しやすさにこだわった設計です。

🤖 AIパーソナル分析＆提案
入力されたデータをもとに、AIが現在のコンディションを分析。目的に合わせたトレーニングプランや、目標カロリー（減量・維持・増量）、推奨タンパク質量などを自動で計算して提案します。まだデータが少ない使い始めの時期でも、推定値から適切なアドバイスを出してくれます。

📈 グラフでの推移・履歴管理
過去の測定データはリストとグラフでパッと見でわかるように可視化。長期的な体の変化がひと目でわかります。

🛠️ 開発プロセスとこだわった点
このアプリは、情報技術科に通う高校2年生の個人開発プロジェクトとして、学校の課題やテストの合間を縫って約2ヶ月で企画から実装まで行いました。

【主な開発環境・技術】

フロントエンド・バックエンド: React, Vite, Firebase

モバイル対応: Capacitor, Android Studio (動作検証)

AI連携: Google Gemini API, VS CodeのAIコーディング支援

【こだわったポイント】

「基礎の理解」と「AI活用」のハイブリッド
最初からコード生成AIに丸投げするのではなく、まずは自分でベースのコードを書き、裏側の仕組みをしっかり理解することから始めました。その土台があった上でAIツールを導入したことで、開発スピードと機能のクオリティを一気に引き上げることができました。

筋トレする人が「毎日使える」UI/UX
自分自身も筋トレをしているので、「毎日の記録が面倒にならないこと」を一番に考えました。入力項目をすべて任意にし、画像アップロード機能をつけることで、ハードルを極限まで下げています。

🔥 沼にハマった点と乗り越えた課題
開発の中で一番苦労したのは、「測定データをもとに分析・提案を行うAI機能の実装」です。

データの受け渡しやAPI連携でエラーが連発し、AIが全然意図した通りに動いてくれない時期が続きました。
解決策として、VS CodeとAndroid Studioを行き来して原因を洗い出し、AIエージェントツールを使ってプロジェクト全体の構造を俯瞰しながらエラーを切り分けていきました。プロンプトで的確に指示を出しながらバグを一つずつ潰していくことで、最終的にAI機能を正常に動かすことに成功しました。

🚀 今後のアップデート予定
実際のジム通いや筋トレ好きの人たちに使ってもらい、フィードバックをもとにUIを改善

食事記録や、部位ごとのトレーニングメニューの自動スケジューリング機能の追加

Android/iOSのネイティブアプリとしてのさらなる動作最適化

👤 開発者について
属性: 高校2年生（工業高校情報科）

開発期間: 約2ヶ月（学業・部活等と並行して制作）
