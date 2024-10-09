const { StatusCodes } = require('http-status-codes');
const Translation = require('../../models/translation');
const { callGPTApi } = require('../utils/gptUtil');

exports.createTranslation = async (userId, text, sourceLang, targetLang) => {
  const prompt = `Translate the following text from ${sourceLang} to ${targetLang}: ${text}`;
  try {
    const translatedText = await callGPTApi(prompt);
    Translation.create({
      userId,
      original_text: text,
      translated_text: translatedText,
      source_language: sourceLang,
      target_language: targetLang,
    });

    return translatedText;
  } catch (err) {
    console.error(err);
    throw new Error('Error processing translation');
  }
};
