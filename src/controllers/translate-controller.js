const { StatusCodes } = require('http-status-codes');
const translateService = require('../services/translate-service');

exports.handleTranslation = async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Missing Required Parameters: text, sourceLang, targetLang',
    });
  }

  try {
    const userId = req.user.userId;
    const gptResponse = await translateService.createTranslation(
      userId,
      text,
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
