const { StatusCodes } = require('http-status-codes');
const summaryService = require('../services/summary-service');
exports.handleSummarization = async (req, res) => {
  const { text, summary_length } = req.body;

  if (!text || !summary_length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Missing Required Parameters: text, summary_length' });
  }

  try {
    const userId = req.user.userId;
    const gptResponse = await summaryService.createSummarization(
      userId,
      text,
      summary_length
    );
    return res.status(StatusCodes.OK).json({ summarized_text: gptResponse });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
