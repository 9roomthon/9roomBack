// src/utils/gptUtil.js
const axios = require('axios');

// GPT API 호출 공통 함수
exports.callGPTApi = async (prompt) => {
  try {
    // GPT API 호출
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // GPT 응답에서 텍스트 추출
    const resultText = gptResponse.data.choices[0].message.content.trim();

    return resultText; // 번역 또는 요약된 텍스트 반환
  } catch (error) {
    console.error('Error calling GPT API:', error);
    throw new Error('Error processing GPT request');
  }
};
