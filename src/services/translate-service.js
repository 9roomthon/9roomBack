const { StatusCodes } = require('http-status-codes');
const Translation = require('../../models/translation');
const { callGPTApi } = require('../utils/gptUtil');

exports.createTranslation = async (text, sourceLang, targetLang) => {
  const prompt = `Translate the following text from ${sourceLang} to ${targetLang}: ${text}`;
  try {
    const translatedText = await callGPTApi(prompt);
  } catch (err) {
    console.error(err);
    throw new Error('Error processing translation');
  }
};
