const { StatusCodes } = require('http-status-codes');
const Translation = require('../../models/translation');
const { callGPTApi } = require('../utils/gptUtil');

exports.createTranslation = async (userId, text, targetLang) => {
  const prompt = `Translate the following text to ${targetLang}: ${text}`;
  try {
    const translatedText = await callGPTApi(prompt);
    Translation.create({
      user_id: userId,
      original_text: text,
      translated_text: translatedText,
      target_language: targetLang,
    });

    return translatedText;
  } catch (err) {
    console.error(err);
    throw new Error('Error processing translation');
  }
};
