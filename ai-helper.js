async function interpret() {
  const fortuneData = sessionStorage.getItem('fortune');
  if (!fortuneData) {
    document.getElementById("fortuneText").innerText = "⚠️ 请先抽签，再解签。";
    return;
  }
const fortune = JSON.parse(fortuneData);

  document.getElementById("fortuneText").innerText = `${fortune.level}\n${fortune.text_zh}\n${fortune.text_en}`;

  const prompt = `请帮我解读这条签文：“${fortune.text_zh}”，要求如下：
1. 用简洁中文和英文双语说明这条签的含义；
2. 说明这条签在“事业”、“感情”、“财运”三个方面的暗示；
3. 每个方面简洁2~3句话；
4. 风格积极、温和、有指导性。`;

  try {
    const response = await fetch("https://jieqian.onrender.com/gpt", {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      document.getElementById("interpretation").innerText = "⚠️ GPT 响应失败，可能超过调用限制，请稍后再试。";
      return;
    }

    document.getElementById("interpretation").innerText = data.choices[0].message.content;

  } catch (error) {
    document.getElementById("interpretation").innerText = "❌ 发生错误，GPT 无法返回内容。请检查网络或稍后再试。";
    console.error("GPT 请求失败：", error);
  }
}
