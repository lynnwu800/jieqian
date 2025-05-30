function drawFortune() {
  const fortunes = [
    { level: "上上签", text_zh: "脚踏实地步步高", text_en: "Step by step with steady effort, success will surely follow." },
    { level: "下签", text_zh: "风雨兼程需谨慎", text_en: "Though the road is tough, caution will lead you through." }
    // ... 其他签文
  ];

  const selected = fortunes[Math.floor(Math.random() * fortunes.length)];
  sessionStorage.setItem("fortune", JSON.stringify(selected));

  setTimeout(() => {
    window.location.href = "result.html";
  }, 200); // 适当延迟避免 sessionStorage 未完成写入
}
