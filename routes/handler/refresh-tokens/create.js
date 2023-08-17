const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const refreshTokens = req.body.refresh_token;

  // schema validasi
  const schema = {
    refresh_token: "string",
    user_id: "number",
  };

  const validate = v.validate(req.body, schema);

  // cek apakah ada error di isian data, hasil validasi array jika ada
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  // cari id user
  const user = await User.findByPk(userId);

  // cek dan berikan respon apakah ada data id
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const createdRefreshToken = await RefreshToken.create({
    token: refreshTokens,
    user_id: userId,
  });

  // jika berhasil berikan respon
  return res.json({
    status: "success",
    data: {
      id: createdRefreshToken.id,
    },
  });
};
