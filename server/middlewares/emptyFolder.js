const emptyFolder = require("../utils/emptyFolder");

exports.empty = async (req, res, next) => {
  const { email } = req.user;
  const dir = `public/files/${email}`;
  await emptyFolder(dir);
  next();
}