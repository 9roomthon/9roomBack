const { StatusCodes } = require('http-status-codes');
const translateService = require('../services/translate-service');

exports.handleTranslation = async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Missing Required Parameters: text, sourceLang, targetLang',
    });
  }

  try {
    const userId = 1;
    const gptResponse = await translateService.createTranslation(
      userId,
      text,
      sourceLang,
      targetLang
    );
    return res.status(StatusCodes.OK).json({ translated_text: gptResponse });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
