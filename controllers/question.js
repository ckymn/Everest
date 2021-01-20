const questionGet = async (req, res, next) => {
  await res.status(200).json({
    success: true,
  });
};

module.exports = {
  questionGet,
};
