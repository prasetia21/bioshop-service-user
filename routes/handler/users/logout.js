const { User, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  // cari id user
  const userId = req.body.user_id;
  const user = await User.findByPk(userId);

  // cek dan berikan respon apakah ada data id
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  // simpan data last login
  const data = {
    last_login:new Date()
  };

  const lastLogin = await User.create(data);
  
  // hapus refresh token berdasarkan id
  await RefreshToken.destroy({
    where: { user_id: userId },
  });

  

  // jika berhasil berikan respon
  return res.json({
    status: "success",
    message: "refresh token deleted",
  });
};
