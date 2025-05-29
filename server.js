const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/gpt', async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
        'OpenAI-Project': 'proj_j6ok3WQsHdHMCg0Wsh0jPtF1'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();

    // 打印响应内容，方便调试
    console.log("✅ GPT API 返回数据：", JSON.stringify(data, null, 2));

    // 如果返回错误，返回 error 信息
    if (data.error) {
      console.error("❌ OpenAI 返回错误：", data.error);
      return res.status(500).json({ error: data.error });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ 后端请求 OpenAI 失败：", err);
    res.status(500).json({ error: "服务器内部错误，请稍后重试。" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ GPT 后端服务运行中：http://localhost:${PORT}`));
