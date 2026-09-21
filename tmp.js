// src/utils/bodyMetricsAnalysis.js
function parseBodyMetricsFromText(content) {
  if (!content) {
    return {};
  }
  const clean = (value) => {
    if (value === void 0 || value === null) return void 0;
    const parsed2 = parseFloat(String(value).replace(/,/g, ".").replace(/[^0-9.\-]/g, ""));
    return Number.isFinite(parsed2) ? parsed2 : void 0;
  };
  const search = (patterns) => {
    for (const pattern of patterns) {
      const match = pattern.exec(content);
      if (match && match[1]) {
        return clean(match[1]);
      }
    }
    return void 0;
  };
  const mapValue = (name, patterns) => ({ [name]: search(patterns) });
  const parsed = {
    ...mapValue("height", [/(?:身長|height)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i, /([0-9]{2,3}(?:\.[0-9]+)?)\s?cm/i]),
    ...mapValue("weight", [/(?:体重|weight)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i, /([0-9]{2,3}(?:\.[0-9]+)?)\s?kg/i]),
    ...mapValue("bmi", [/(?:BMI)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("bodyFatPercent", [/(?:体脂肪率|body fat)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)(?:\s?%|パーセント)?/i]),
    ...mapValue("bodyFatMass", [/(?:体脂肪量|body fat mass)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("skeletalMuscleMass", [/(?:骨格筋量|skeletal muscle mass)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("muscleMass", [/(?:筋肉量|muscle mass)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("leanBodyMass", [/(?:除脂肪体重|lean body mass)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("visceralFatLevel", [/(?:内臓脂肪|visceral fat)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("basalMetabolism", [/(?:基礎代謝|basal metabolic rate|BMR)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("bodyWater", [/(?:体水分量|body water)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("proteinMass", [/(?:タンパク質量|protein mass)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i]),
    ...mapValue("mineralMass", [/(?:ミネラル量|mineral mass)[^\d\n\r\-]{0,15}([0-9]+(?:\.[0-9]+)?)/i])
  };
  return Object.fromEntries(Object.entries(parsed).filter(([, value]) => value !== void 0));
}
function generateBodyAnalysis(metrics = {}, language = "ja") {
  const lang = language === "en" ? "en" : "ja";
  const texts = {
    ja: {
      noData: "\u307E\u3060\u5341\u5206\u306A\u8EAB\u4F53\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u4F53\u91CD\u3084\u4F53\u8102\u80AA\u7387\u3001\u7B4B\u8089\u91CF\u3092\u5165\u529B\u3059\u308B\u3068\u3001\u3088\u308A\u5177\u4F53\u7684\u306A\u5206\u6790\u304C\u3067\u304D\u307E\u3059\u3002",
      weightOnly: "\u73FE\u5728\u306E\u4F53\u91CD\u304B\u3089\u5065\u5EB7\u72B6\u614B\u306E\u4E00\u822C\u7684\u306A\u8A55\u4FA1\u3092\u884C\u3044\u307E\u3059\u3002\u3088\u308A\u8A73\u7D30\u306A\u5206\u6790\u306B\u306F\u4F53\u8102\u80AA\u7387\u3084\u7B4B\u8089\u91CF\u306E\u5165\u529B\u3092\u304A\u3059\u3059\u3081\u3057\u307E\u3059\u3002",
      fatOnlyLow: "\u4F53\u8102\u80AA\u7387\u306F\u6A19\u6E96\u7BC4\u56F2\u5185\u3067\u3059\u3002",
      fatOnlyMedium: "\u4F53\u8102\u80AA\u7387\u306F\u6A19\u6E96\u7BC4\u56F2\u3088\u308A\u3084\u3084\u9AD8\u3081\u3067\u3059\u3002",
      fatOnlyHigh: "\u4F53\u8102\u80AA\u7387\u304C\u3084\u3084\u9AD8\u3081\u3067\u3059\u3002",
      missingMuscle: "\u7B4B\u8089\u91CF\u306E\u30C7\u30FC\u30BF\u304C\u306A\u3044\u305F\u3081\u6B63\u78BA\u306A\u8A55\u4FA1\u306F\u3067\u304D\u307E\u305B\u3093\u304C\u3001\u6E1B\u91CF\u3092\u76EE\u7684\u3068\u3057\u305F\u904B\u52D5\u30D7\u30E9\u30F3\u304C\u304A\u3059\u3059\u3081\u3067\u3059\u3002",
      fatAndMuscle: "\u9AA8\u683C\u7B4B\u91CF\u306F\u73FE\u5728\u306E\u30C7\u30FC\u30BF\u3067\u898B\u3066\u5E73\u5747\u4EE5\u4E0A\u3067\u3059\u3002\u7B4B\u8089\u3092\u7DAD\u6301\u3057\u306A\u304C\u3089\u8102\u80AA\u3092\u843D\u3068\u3059\u30DC\u30C7\u30A3\u30EA\u30B3\u30F3\u30D7\u304C\u9069\u3057\u3066\u3044\u307E\u3059\u3002",
      bmiOnly: "BMI \u304C\u8A08\u7B97\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u4F53\u91CD\u3068\u8EAB\u9577\u3092\u5165\u529B\u3059\u308B\u3068\u3001\u3088\u308A\u6B63\u78BA\u306A\u4F53\u7D44\u6210\u5206\u6790\u304C\u53EF\u80FD\u3067\u3059\u3002",
      missingWeight: "\u4F53\u91CD\u306E\u30C7\u30FC\u30BF\u304C\u306A\u3044\u305F\u3081\u3001\u63A8\u5B9A\u8A55\u4FA1\u306B\u7559\u307E\u308A\u307E\u3059\u3002\u4F53\u91CD\u3092\u5165\u529B\u3059\u308B\u3068\u5206\u6790\u304C\u5F37\u5316\u3055\u308C\u307E\u3059\u3002",
      missingFat: "\u4F53\u8102\u80AA\u7387\u304C\u306A\u3044\u5834\u5408\u3001\u8102\u80AA\u3068\u7B4B\u8089\u306E\u30D0\u30E9\u30F3\u30B9\u3092\u6B63\u78BA\u306B\u5224\u65AD\u3067\u304D\u307E\u305B\u3093\u3002\u5165\u529B\u3092\u691C\u8A0E\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    en: {
      noData: "There is not enough body data yet. Enter your weight, body fat percentage, or muscle mass for a more detailed analysis.",
      weightOnly: "This overview is based on your current weight. Add body fat and muscle mass for a more accurate assessment.",
      fatOnlyLow: "Your body fat percentage is within the healthy range.",
      fatOnlyMedium: "Your body fat percentage is slightly above the healthy range.",
      fatOnlyHigh: "Your body fat percentage is moderately elevated.",
      missingMuscle: "Muscle mass data is missing, so the evaluation is less precise. A fat-loss focused exercise plan is recommended.",
      fatAndMuscle: "Your skeletal muscle mass appears above average for the current data. A body recomposition plan is appropriate to preserve muscle while reducing fat.",
      bmiOnly: "BMI is available. Enter your weight and height to get a more accurate body composition analysis.",
      missingWeight: "Weight data is missing, so this is only an estimate. Adding weight will improve the analysis.",
      missingFat: "Without body fat percentage, it is difficult to accurately judge the balance between fat and muscle. Consider adding this measurement."
    }
  };
  if (!metrics || Object.keys(metrics).length === 0) {
    return texts[lang].noData;
  }
  const parts = [];
  const { weight, bodyFatPercent, skeletalMuscleMass, muscleMass, bmi } = metrics;
  const muscleValue = skeletalMuscleMass ?? muscleMass;
  if (weight && !bodyFatPercent && !muscleValue) {
    parts.push(texts[lang].weightOnly);
  }
  if (weight && bodyFatPercent && !muscleValue) {
    const fatMessage = bodyFatPercent < 18 ? texts[lang].fatOnlyLow : bodyFatPercent <= 24 ? texts[lang].fatOnlyMedium : texts[lang].fatOnlyHigh;
    parts.push(`${fatMessage} ${texts[lang].missingMuscle}`);
  }
  if (weight && bodyFatPercent && muscleValue) {
    const fatMessage = bodyFatPercent < 18 ? texts[lang].fatOnlyLow : bodyFatPercent <= 24 ? texts[lang].fatOnlyMedium : texts[lang].fatOnlyHigh;
    parts.push(`${fatMessage} ${texts[lang].fatAndMuscle}`);
  }
  if (bmi && !weight && !bodyFatPercent) {
    parts.push(texts[lang].bmiOnly);
  }
  if (!weight) {
    parts.push(texts[lang].missingWeight);
  }
  if (!bodyFatPercent) {
    parts.push(texts[lang].missingFat);
  }
  return parts.filter(Boolean).join(" ");
}
function generateTrainingSuggestion(metrics, language = "ja") {
  const lang = language === "en" ? "en" : "ja";
  const texts = {
    ja: {
      noData: [
        "\u307E\u3060\u30C7\u30FC\u30BF\u304C\u5341\u5206\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
        "\u307E\u305A\u306F\u90312\u301C3\u56DE\u3001\u5168\u8EAB\u3092\u30D0\u30E9\u30F3\u30B9\u3088\u304F\u52D5\u304B\u3059\u904B\u52D5\u3092\u59CB\u3081\u307E\u3057\u3087\u3046\u3002",
        "\u7B4B\u30C8\u30EC\u3068\u6709\u9178\u7D20\u904B\u52D5\u3092\u7D44\u307F\u5408\u308F\u305B\u308B\u57FA\u790E\u30D7\u30E9\u30F3\u304B\u3089\u30B9\u30BF\u30FC\u30C8\u3059\u308B\u3068\u7D9A\u3051\u3084\u3059\u3044\u3067\u3059\u3002"
      ].join(" "),
      scoreFatMuscle: "\u8102\u80AA\u3068\u7B4B\u8089\u91CF\u306E\u4E21\u65B9\u306E\u30C7\u30FC\u30BF\u304C\u3042\u308B\u306E\u3067\u3001\u3088\u308A\u5177\u4F53\u7684\u306A\u30D7\u30E9\u30F3\u304C\u7ACB\u3066\u3089\u308C\u307E\u3059\u3002",
      planFatMuscle: "\u76EE\u6A19: \u7B4B\u8089\u3092\u7DAD\u6301\u3057\u306A\u304C\u3089\u8102\u80AA\u3092\u843D\u3068\u3059\u30DC\u30C7\u30A3\u30EA\u30B3\u30F3\u30D7\u3002",
      planFatMuscleDetails: "\u90313\u56DE\u306E\u7B4B\u30C8\u30EC: \u4E0A\u534A\u8EAB / \u4E0B\u534A\u8EAB / \u5168\u8EAB\u306E\u30ED\u30FC\u30C6\u30FC\u30B7\u30E7\u30F3\u3002\u5404\u56DE30\u301C45\u5206\u7A0B\u5EA6\u3002\n\u30FB\u8907\u5408\u7A2E\u76EE: \u30B9\u30AF\u30EF\u30C3\u30C8\u3001\u30C7\u30C3\u30C9\u30EA\u30D5\u30C8\u3001\u30D9\u30F3\u30C1\u30D7\u30EC\u30B9\u3001\u30D7\u30EB\u30A2\u30C3\u30D7\u306A\u3069\u3002\n\u30FB\u88DC\u52A9\u7A2E\u76EE: \u30D7\u30E9\u30F3\u30AF\u3001\u30E9\u30F3\u30B8\u3001\u30C0\u30F3\u30D9\u30EB\u30ED\u30FC\u306A\u3069\u3002\n",
      cardioRecommendation: "\u90312\u56DE\u306E\u6709\u9178\u7D20\u904B\u52D5: 20\u301C30\u5206\u306E\u30A6\u30A9\u30FC\u30AD\u30F3\u30B0\u3001\u30B8\u30E7\u30AE\u30F3\u30B0\u3001\u30B5\u30A4\u30AF\u30EA\u30F3\u30B0\u3001\u30A4\u30F3\u30BF\u30FC\u30D0\u30EB\u3092\u304A\u3059\u3059\u3081\u3057\u307E\u3059\u3002",
      highFatAdvice: "\u4F53\u8102\u80AA\u7387\u304C\u9AD8\u3081\u306A\u306E\u3067\u3001\u7279\u306B\u4E2D\u5F37\u5EA6\u306E\u6709\u9178\u7D20\u904B\u52D5\u3092\u7D99\u7D9A\u3057\u3066\u4EE3\u8B1D\u3092\u9AD8\u3081\u308B\u3053\u3068\u304C\u6709\u52B9\u3067\u3059\u3002",
      lowFatAdvice: "\u4F53\u8102\u80AA\u7387\u306F\u826F\u597D\u3067\u3059\u3002\u7B4B\u529B\u30A2\u30C3\u30D7\u3068\u7DAD\u6301\u3092\u512A\u5148\u3057\u3001\u4F53\u8102\u80AA\u7387\u304C\u4E0B\u304C\u308A\u3059\u304E\u306A\u3044\u3088\u3046\u6CE8\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      fatOnlyScore: "\u4F53\u8102\u80AA\u7387\u306E\u30C7\u30FC\u30BF\u304B\u3089\u6E1B\u91CF\u307E\u305F\u306F\u4F53\u8102\u80AA\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3057\u305F\u30D7\u30E9\u30F3\u3092\u63D0\u6848\u3057\u307E\u3059\u3002",
      fatOnlyPlan: "\u76EE\u6A19: \u4F53\u8102\u80AA\u7387\u306E\u6539\u5584\u3068\u57FA\u790E\u4EE3\u8B1D\u30A2\u30C3\u30D7\u3002\n\u90312\u301C3\u56DE\u306E\u7B4B\u30C8\u30EC\u3068\u90312\u56DE\u306E\u6709\u9178\u7D20\u904B\u52D5\u3092\u7D44\u307F\u5408\u308F\u305B\u307E\u3059\u3002",
      fatOnlyDetails: "\u7B4B\u30C8\u30EC: \u5168\u8EAB\u3092\u30AB\u30D0\u30FC\u3059\u308B\u30D5\u30EB\u30DC\u30C7\u30A3\u30EF\u30FC\u30AF\u30A2\u30A6\u30C8\u3002\u30B9\u30AF\u30EF\u30C3\u30C8\u3001\u30D7\u30C3\u30B7\u30E5\u30A2\u30C3\u30D7\u3001\u30D9\u30F3\u30C8\u30AA\u30FC\u30D0\u30FC\u30ED\u30A6\u3001\u30D2\u30C3\u30D7\u30B9\u30E9\u30B9\u30C8\u3092\u4E2D\u5FC3\u306B\u3002\n\u6709\u9178\u7D20: 20\u301C30\u5206\u306E\u65E9\u6B69\u304D\u3084\u8EFD\u3044\u30E9\u30F3\u30CB\u30F3\u30B0\u3092\u884C\u3044\u307E\u3059\u3002\n",
      fatOnlyReminder: "\u4F53\u8102\u80AA\u7387\u306E\u4F4E\u4E0B\u306B\u306F\u7D99\u7D9A\u304C\u91CD\u8981\u3067\u3059\u30021\u56DE\u3042\u305F\u308A\u306E\u5F37\u5EA6\u306F\u3084\u3084\u304D\u3064\u3081\u3092\u76EE\u5B89\u306B\u3001\u9031\u306E\u5408\u8A08\u904B\u52D5\u91CF\u3092\u5897\u3084\u3057\u307E\u3057\u3087\u3046\u3002",
      weightBmiScore: "\u4F53\u91CD\u3068BMI\u304B\u3089\u73FE\u5728\u306E\u4F53\u578B\u30A4\u30E1\u30FC\u30B8\u304C\u5206\u304B\u308B\u305F\u3081\u3001\u6A19\u6E96\u4F53\u578B\u306B\u8FD1\u3065\u3051\u308B\u305F\u3081\u306E\u30D7\u30E9\u30F3\u3092\u4F5C\u6210\u3057\u307E\u3059\u3002",
      weightBmiGoal: "\u76EE\u6A19: \u4F53\u91CD\u3092\u5065\u5EB7\u7684\u306A\u7BC4\u56F2\u3078\u8ABF\u6574\u3057\u3001\u7B4B\u529B\u3068\u6301\u4E45\u529B\u3092\u9AD8\u3081\u308B\u3002\n\u90312\u56DE\u306E\u7B4B\u30C8\u30EC\u3068\u90311\u301C2\u56DE\u306E\u6709\u9178\u7D20\u904B\u52D5\u3002\n",
      weightBmiDetails: "\u7B4B\u30C8\u30EC: \u5168\u8EAB\u3092\u52D5\u304B\u3059\u7A2E\u76EE\u3092\u4E2D\u5FC3\u306B\u3001\u30D7\u30C3\u30B7\u30E5\u7CFB\u30FB\u30D7\u30EB\u7CFB\u30FB\u30EC\u30C3\u30B0\u7CFB\u3092\u30D0\u30E9\u30F3\u30B9\u3088\u304F\u3002\n\u6709\u9178\u7D20: 30\u5206\u7A0B\u5EA6\u306E\u30A6\u30A9\u30FC\u30AD\u30F3\u30B0\u3084\u30B5\u30A4\u30AF\u30EA\u30F3\u30B0\u3092\u8FFD\u52A0\u3002\n",
      highBmiAdvice: "BMI\u304C\u9AD8\u3081\u306A\u306E\u3067\u3001\u6E1B\u91CF\u3092\u610F\u8B58\u3057\u305F\u98DF\u4E8B\u7BA1\u7406\u3068\u6709\u9178\u7D20\u904B\u52D5\u306E\u7D99\u7D9A\u304C\u91CD\u8981\u3067\u3059\u3002",
      lowBmiAdvice: "BMI\u304C\u4F4E\u3081\u306A\u306E\u3067\u3001\u7B4B\u8089\u91CF\u306E\u5897\u52A0\u3068\u4F53\u529B\u5F37\u5316\u3092\u512A\u5148\u3059\u308B\u30D7\u30E9\u30F3\u304C\u9069\u3057\u3066\u3044\u307E\u3059\u3002",
      weightOnlyScore: "\u4F53\u91CD\u306E\u307F\u306E\u30C7\u30FC\u30BF\u3067\u3082\u3001\u5168\u8EAB\u904B\u52D5\u3092\u4E2D\u5FC3\u306B\u3057\u305F\u5B89\u5B9A\u3057\u305F\u30D7\u30E9\u30F3\u3092\u4F5C\u308C\u307E\u3059\u3002",
      weightOnlyGoal: "\u76EE\u6A19: \u4F53\u91CD\u7DAD\u6301\u307E\u305F\u306F\u5897\u6E1B\u306E\u571F\u53F0\u3065\u304F\u308A\u3002\n\u90312\u56DE\u306E\u7B4B\u30C8\u30EC\u3068\u90311\u56DE\u306E\u6709\u9178\u7D20\u904B\u52D5\u3092\u57FA\u672C\u306B\u3057\u307E\u3059\u3002",
      weightOnlyDetails: "\u7B4B\u30C8\u30EC: \u30B9\u30AF\u30EF\u30C3\u30C8\u3001\u30D7\u30C3\u30B7\u30E5\u30A2\u30C3\u30D7\u3001\u30B7\u30FC\u30C6\u30C3\u30C9\u30ED\u30FC\u306A\u3069\u306E\u57FA\u672C\u306E\u8907\u5408\u7A2E\u76EE\u3092\u53D6\u308A\u5165\u308C\u308B\u3002\n\u6709\u9178\u7D20: 20\u301C30\u5206\u306E\u8EFD\u3081\u306E\u30B8\u30E7\u30AE\u30F3\u30B0\u3084\u30A6\u30A9\u30FC\u30AD\u30F3\u30B0\u3002\n",
      weightOnlyReminder: "\u6700\u521D\u306F\u7121\u7406\u306A\u304F\u7D9A\u3051\u3089\u308C\u308B\u8CA0\u8377\u306B\u8A2D\u5B9A\u3057\u30012\u301C3\u9031\u9593\u3054\u3068\u306B\u5F37\u5EA6\u3092\u5C11\u3057\u305A\u3064\u4E0A\u3052\u3066\u3044\u304D\u307E\u3057\u3087\u3046\u3002",
      noMatch: "\u73FE\u72B6\u306E\u30C7\u30FC\u30BF\u3060\u3051\u3067\u306F\u6700\u9069\u306A\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0\u3092\u78BA\u5B9A\u3067\u304D\u307E\u305B\u3093\u3002\u3088\u308A\u591A\u304F\u306E\u6E2C\u5B9A\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      nextStep: "\u307E\u305A\u306F\u4F53\u91CD\u3068\u4F53\u8102\u80AA\u7387\u3001\u7B4B\u8089\u91CF\u306E\u3044\u305A\u308C\u304B\u3092\u6E2C\u5B9A\u3057\u3001\u6B21\u306E\u30B9\u30C6\u30C3\u30D7\u306B\u9032\u307F\u307E\u3057\u3087\u3046\u3002",
      recommendedPlanLabel: "\u63A8\u5968\u30D7\u30E9\u30F3:",
      example: "\u4F8B: \u90311 / \u4F11\u307F / \u90312 / \u4F11\u307F / \u90313 / \u6709\u9178\u7D20 / \u4F11\u307F \u306E\u3088\u3046\u306A\u30EA\u30BA\u30E0\u304C\u7D99\u7D9A\u3057\u3084\u3059\u3044\u3067\u3059\u3002"
    },
    en: {
      noData: [
        "There is not enough data yet.",
        "Start with balanced full-body exercise two to three times per week.",
        "A basic plan combining strength training and cardio is easier to maintain."
      ].join(" "),
      scoreFatMuscle: "With both fat and muscle data available, a more specific plan can be created.",
      planFatMuscle: "Goal: Maintain muscle while reducing fat with a body recomposition plan.",
      planFatMuscleDetails: "Strength training three times a week: upper body / lower body / full body rotation, each session about 30\u201345 minutes.\nCompound lifts: squats, deadlifts, bench press, pull-ups.\nAccessory work: planks, lunges, dumbbell rows.\n",
      cardioRecommendation: "Add cardio twice a week for 20\u201330 minutes of walking, jogging, cycling, or intervals.",
      highFatAdvice: "Because body fat is higher, continuing moderate-intensity cardio to boost metabolism is effective.",
      lowFatAdvice: "Body fat is in a good range. Focus on building and maintaining strength while avoiding too much fat loss.",
      fatOnlyScore: "Based on body fat percentage, a plan focused on fat loss and body fat control is recommended.",
      fatOnlyPlan: "Goal: Improve body fat percentage and increase basal metabolism.\nCombine strength training two to three times a week with cardio twice a week.",
      fatOnlyDetails: "Strength training: full-body workouts that cover the whole body, centered on squats, push-ups, bent-over rows, and hip thrusts.\nCardio: 20\u201330 minutes of brisk walking or light running.\n",
      fatOnlyReminder: "Consistency is important for reducing body fat. Aim for slightly challenging intensity and increase total weekly activity.",
      weightBmiScore: "Weight and BMI give an idea of your current body type, so a plan to move toward a healthy range can be created.",
      weightBmiGoal: "Goal: Adjust weight to a healthy range while improving strength and endurance.\nStrength training twice a week and cardio one to two times a week.\n",
      weightBmiDetails: "Strength training: focus on full-body movements that balance pushing, pulling, and leg exercises.\nCardio: add 30 minutes of walking or cycling.\n",
      highBmiAdvice: "With a higher BMI, weight-loss focused nutrition and consistent cardio are important.",
      lowBmiAdvice: "With a lower BMI, prioritize increasing muscle mass and building strength.",
      weightOnlyScore: "Even with weight data only, you can build a stable plan centered on full-body exercise.",
      weightOnlyGoal: "Goal: Establish a foundation for weight maintenance or gradual adjustment.\nStrength training twice a week and cardio once a week are basic guidelines.",
      weightOnlyDetails: "Strength training: include basic compound movements such as squats, push-ups, and seated rows.\nCardio: 20\u201330 minutes of light jogging or walking.\n",
      weightOnlyReminder: "Start with a manageable load and gradually increase intensity every 2\u20133 weeks.",
      noMatch: "The current data is not enough to determine the best training plan. Please add more measurements.",
      nextStep: "Start by recording weight, body fat percentage, or muscle mass and continue from there.",
      recommendedPlanLabel: "Recommended plan:",
      example: "Example: Week 1 / rest / Week 2 / rest / Week 3 / cardio / rest is an easier rhythm to maintain."
    }
  };
  const safeMetrics = metrics || {};
  const weight = safeMetrics.weight;
  const bodyFatPercent = safeMetrics.bodyFatPercent;
  const skeletalMuscleMass = safeMetrics.skeletalMuscleMass;
  const muscleMass = safeMetrics.muscleMass;
  const bmi = safeMetrics.bmi;
  const muscleValue = skeletalMuscleMass ?? muscleMass;
  if (!safeMetrics || Object.keys(safeMetrics).length === 0) {
    return texts[lang].noData;
  }
  const planLines = [];
  const score = [];
  if (bodyFatPercent !== void 0 && muscleValue !== void 0) {
    score.push(texts[lang].scoreFatMuscle);
    planLines.push(texts[lang].planFatMuscle);
    planLines.push(texts[lang].planFatMuscleDetails);
    planLines.push(texts[lang].cardioRecommendation);
    if (bodyFatPercent >= 25) {
      planLines.push(texts[lang].highFatAdvice);
    } else if (bodyFatPercent <= 18) {
      planLines.push(texts[lang].lowFatAdvice);
    }
  } else if (bodyFatPercent !== void 0) {
    score.push(texts[lang].fatOnlyScore);
    planLines.push(texts[lang].fatOnlyPlan);
    planLines.push(texts[lang].fatOnlyDetails);
    planLines.push(texts[lang].fatOnlyReminder);
  } else if (weight !== void 0 && bmi !== void 0) {
    score.push(texts[lang].weightBmiScore);
    planLines.push(texts[lang].weightBmiGoal);
    planLines.push(texts[lang].weightBmiDetails);
    if (bmi >= 25) {
      planLines.push(texts[lang].highBmiAdvice);
    } else if (bmi < 18.5) {
      planLines.push(texts[lang].lowBmiAdvice);
    }
  } else if (weight !== void 0) {
    score.push(texts[lang].weightOnlyScore);
    planLines.push(texts[lang].weightOnlyGoal);
    planLines.push(texts[lang].weightOnlyDetails);
    planLines.push(texts[lang].weightOnlyReminder);
  } else {
    score.push(texts[lang].noMatch);
    planLines.push(texts[lang].nextStep);
  }
  return [
    score.join(" "),
    texts[lang].recommendedPlanLabel,
    planLines.join(" "),
    texts[lang].example
  ].filter(Boolean).join(" ");
}
function generateNutritionSuggestion(metrics, language = "ja") {
  const lang = language === "en" ? "en" : "ja";
  const estimatedWeight = metrics?.weight || 70;
  const estimated = !metrics?.weight;
  const proteinRate = 1.8;
  const estimatedMaintenance = Math.round(estimatedWeight * 24 + (metrics?.muscleMass || metrics?.skeletalMuscleMass ? 200 : 0));
  const estimatedCut = Math.max(estimatedMaintenance - 300, 1200);
  const estimatedBulk = estimatedMaintenance + 300;
  const protein = Math.round(estimatedWeight * proteinRate);
  const texts = {
    ja: {
      maintenance: `\u63A8\u5B9A\u7DAD\u6301\u30AB\u30ED\u30EA\u30FC\u306F\u7D04${estimatedMaintenance}kcal\u3067\u3059\u3002`,
      cut: `\u6E1B\u91CF\u76EE\u6A19\u306E\u5834\u5408\u306F\u7D04${estimatedCut}kcal\u3001\u5897\u91CF\u76EE\u6A19\u306E\u5834\u5408\u306F\u7D04${estimatedBulk}kcal\u3092\u76EE\u5B89\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
      protein: `\u63A8\u5968\u30BF\u30F3\u30D1\u30AF\u8CEA\u91CF\u306F1\u65E5\u3042\u305F\u308A\u7D04${protein}g\u3067\u3059\u3002`,
      estimatedNote: "\u4F53\u91CD\u30C7\u30FC\u30BF\u304C\u63A8\u5B9A\u5024\u3067\u3042\u308B\u305F\u3081\u3001\u6570\u5024\u306F\u76EE\u5B89\u3068\u3057\u3066\u304A\u4F7F\u3044\u304F\u3060\u3055\u3044\u3002"
    },
    en: {
      maintenance: `Estimated maintenance calories are about ${estimatedMaintenance} kcal.`,
      cut: `For a cutting goal, aim for about ${estimatedCut} kcal, and for a bulking goal, about ${estimatedBulk} kcal.`,
      protein: `Recommended protein intake is about ${protein} g per day.`,
      estimatedNote: "Because weight data is estimated, these numbers should be used as a guideline."
    }
  };
  const messageParts = [texts[lang].maintenance, texts[lang].cut, texts[lang].protein];
  if (estimated) {
    messageParts.push(texts[lang].estimatedNote);
  }
  return messageParts.join(" ");
}
function generateTrendAnalysis(history = [], language = "ja") {
  const lang = language === "en" ? "en" : "ja";
  const texts = {
    ja: {
      notEnough: "\u5C65\u6B74\u304C\u307E\u3060\u5C11\u306A\u3044\u305F\u3081\u3001\u5909\u5316\u3092\u5224\u65AD\u3059\u308B\u306B\u306F\u3082\u3046\u5C11\u3057\u30C7\u30FC\u30BF\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      weightSame: "\u4F53\u91CD\u306F\u5148\u6708\u3068\u307B\u307C\u540C\u3058\u3067\u3059\u3002",
      weightDown: (diff) => `\u5148\u6708\u304B\u3089\u4F53\u91CD\u304C${Math.abs(diff).toFixed(1)}kg\u6E1B\u5C11\u3057\u307E\u3057\u305F\u3002\u5065\u5EB7\u7684\u306A\u30DA\u30FC\u30B9\u3092\u7DAD\u6301\u3057\u307E\u3057\u3087\u3046\u3002`,
      weightUp: (diff) => `\u5148\u6708\u304B\u3089\u4F53\u91CD\u304C${diff.toFixed(1)}kg\u5897\u3048\u307E\u3057\u305F\u3002\u7B4B\u8089\u91CF\u306E\u5909\u5316\u3068\u7167\u3089\u3057\u5408\u308F\u305B\u3066\u8ABF\u6574\u3057\u307E\u3057\u3087\u3046\u3002`,
      fatSame: "\u4F53\u8102\u80AA\u7387\u306F\u5148\u6708\u3068\u540C\u3058\u3067\u3059\u3002",
      fatDown: (diff) => `\u4F53\u8102\u80AA\u7387\u306F${Math.abs(diff).toFixed(1)}%\u4F4E\u4E0B\u3057\u3066\u3044\u307E\u3059\u3002\u4F53\u8102\u80AA\u71C3\u713C\u304C\u9032\u3093\u3067\u3044\u307E\u3059\u3002`,
      fatUp: (diff) => `\u4F53\u8102\u80AA\u7387\u306F${diff.toFixed(1)}%\u4E0A\u6607\u3057\u3066\u3044\u307E\u3059\u3002\u98DF\u4E8B\u3084\u6709\u9178\u7D20\u904B\u52D5\u306E\u898B\u76F4\u3057\u3092\u691C\u8A0E\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
      muscleSame: "\u7B4B\u8089\u91CF\u306F\u5148\u6708\u3068\u307B\u307C\u540C\u3058\u3067\u3059\u3002",
      muscleUp: (diff) => `\u7B4B\u8089\u91CF\u304C${diff.toFixed(1)}kg\u5897\u3048\u3066\u3044\u307E\u3059\u3002\u826F\u3044\u30DA\u30FC\u30B9\u3067\u3059\u3002`,
      muscleDown: (diff) => `\u7B4B\u8089\u91CF\u304C${Math.abs(diff).toFixed(1)}kg\u6E1B\u5C11\u3057\u3066\u3044\u307E\u3059\u3002\u7DAD\u6301\u3068\u56DE\u5FA9\u3092\u610F\u8B58\u3057\u307E\u3057\u3087\u3046\u3002`,
      noTrend: "\u6B21\u306E\u5C65\u6B74\u3068\u306E\u5DEE\u5206\u3092\u3068\u308B\u305F\u3081\u306B\u3001\u4F53\u91CD\u30FB\u4F53\u8102\u80AA\u7387\u30FB\u7B4B\u8089\u91CF\u306E\u3046\u3061\u5C11\u306A\u304F\u3068\u30822\u3064\u3092\u8A18\u9332\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    en: {
      notEnough: "There is not enough history yet to determine a trend. Add more entries to see changes.",
      weightSame: "Weight is almost unchanged from last time.",
      weightDown: (diff) => `Weight has decreased by ${Math.abs(diff).toFixed(1)} kg since the previous entry. Keep up the healthy pace.`,
      weightUp: (diff) => `Weight has increased by ${diff.toFixed(1)} kg since the previous entry. Adjust according to changes in muscle mass.`,
      fatSame: "Body fat is unchanged from the previous entry.",
      fatDown: (diff) => `Body fat has decreased by ${Math.abs(diff).toFixed(1)}%. Fat burning progress is visible.`,
      fatUp: (diff) => `Body fat has increased by ${diff.toFixed(1)}%. Consider reviewing nutrition and cardio.`,
      muscleSame: "Muscle mass is almost unchanged from the previous entry.",
      muscleUp: (diff) => `Muscle mass has increased by ${diff.toFixed(1)} kg. That is good progress.`,
      muscleDown: (diff) => `Muscle mass has decreased by ${Math.abs(diff).toFixed(1)} kg. Focus on maintenance and recovery.`,
      noTrend: "Record at least two of weight, body fat percentage, or muscle mass to compare changes over time."
    }
  };
  if (!history || history.length < 2) {
    return texts[lang].notEnough;
  }
  const latest = history[0];
  const previous = history[1];
  const lines = [];
  if (latest.weight !== void 0 && previous.weight !== void 0) {
    const diff = latest.weight - previous.weight;
    lines.push(
      diff === 0 ? texts[lang].weightSame : diff < 0 ? texts[lang].weightDown(diff) : texts[lang].weightUp(diff)
    );
  }
  if (latest.bodyFatPercent !== void 0 && previous.bodyFatPercent !== void 0) {
    const diff = latest.bodyFatPercent - previous.bodyFatPercent;
    lines.push(
      diff === 0 ? texts[lang].fatSame : diff < 0 ? texts[lang].fatDown(diff) : texts[lang].fatUp(diff)
    );
  }
  if ((latest.skeletalMuscleMass ?? latest.muscleMass) !== void 0 && (previous.skeletalMuscleMass ?? previous.muscleMass) !== void 0) {
    const latestMuscle = latest.skeletalMuscleMass ?? latest.muscleMass;
    const previousMuscle = previous.skeletalMuscleMass ?? previous.muscleMass;
    const diff = latestMuscle - previousMuscle;
    lines.push(
      diff === 0 ? texts[lang].muscleSame : diff > 0 ? texts[lang].muscleUp(diff) : texts[lang].muscleDown(diff)
    );
  }
  if (lines.length === 0) {
    return texts[lang].noTrend;
  }
  return lines.join(" ");
}
function getBodyMetricLabel(key, language = "ja") {
  const lang = language === "en" ? "en" : "ja";
  const labels = {
    ja: {
      height: "\u8EAB\u9577",
      weight: "\u4F53\u91CD",
      bmi: "BMI",
      bodyFatPercent: "\u4F53\u8102\u80AA\u7387",
      bodyFatMass: "\u4F53\u8102\u80AA\u91CF",
      skeletalMuscleMass: "\u9AA8\u683C\u7B4B\u91CF",
      muscleMass: "\u7B4B\u8089\u91CF",
      leanBodyMass: "\u9664\u8102\u80AA\u4F53\u91CD",
      visceralFatLevel: "\u5185\u81D3\u8102\u80AA\u30EC\u30D9\u30EB",
      basalMetabolism: "\u57FA\u790E\u4EE3\u8B1D",
      bodyWater: "\u4F53\u6C34\u5206\u91CF",
      proteinMass: "\u30BF\u30F3\u30D1\u30AF\u8CEA\u91CF",
      mineralMass: "\u30DF\u30CD\u30E9\u30EB\u91CF"
    },
    en: {
      height: "Height",
      weight: "Weight",
      bmi: "BMI",
      bodyFatPercent: "Body Fat %",
      bodyFatMass: "Body Fat Mass",
      skeletalMuscleMass: "Skeletal Muscle Mass",
      muscleMass: "Muscle Mass",
      leanBodyMass: "Lean Body Mass",
      visceralFatLevel: "Visceral Fat Level",
      basalMetabolism: "Basal Metabolism",
      bodyWater: "Body Water",
      proteinMass: "Protein Mass",
      mineralMass: "Mineral Mass"
    }
  };
  return labels[lang][key] || key;
}
export {
  generateBodyAnalysis,
  generateNutritionSuggestion,
  generateTrainingSuggestion,
  generateTrendAnalysis,
  getBodyMetricLabel,
  parseBodyMetricsFromText
};
