const { StatusCodes } = require('http-status-codes');
const translateService = require('../services/translate-service');

exports.handleTranslation = async (req, res) => {
  const { text, sourceLang, targetLang } = req.query;

  if (!text || !sourceLang || !targetLang) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Missing Required Parameters: text, sourceLang, targetLang',
    });
  }

  try {
    const gptResponse = await translateService.createTranslation(
      text,
      sourceLang,
      targetLang
    );
    res.status(StatusCodes.OK).json({ translated_text: gptResponse });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
