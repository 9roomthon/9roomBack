const { StatusCodes } = require('http-status-codes');
const { callGPTApi } = require('../utils/gptUtil');
const Summary = require('../../models/summary');
exports.createSummarization = async (userId, text, summarize_length) => {
  const prompt = `Summarize the following text in a ${summarize_length} length: ${text}`;
  const summarizedText = await callGPTApi(prompt);

  try {
    Summary.create({
      user_id: userId,
      original_text: text,
      summary_text: summarizedText,
      summary_length: summarize_length,
    });

    return summarizedText;
  } catch (err) {
    console.error(err);
    throw new Error('Error processing summarization');
  }
};
