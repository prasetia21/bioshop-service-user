const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const { User } = require("../../../models");

const v = new Validator();

module.exports = async (req, res) => {
  // validasi inputan user
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
    avatar: "string|optional",
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
  const id = req.params.id;
  const user = await User.findByPk(id);

  // cek dan berikan respon apakah ada data id
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  // cari email user
  const email = req.body.email;

  // cek dan berikan respon apakah ada data id
  if (email) {
    const checkEmail = await User.findOne({
      where: { email },
    });

    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: "error",
        message: "email already exist",
      });
    }
  }

  // hash password
  const password = await bcrypt.hash(req.body.password, 10);

  // simpan data
  const { name, profession, avatar } = req.body;

  await user.update({
    email,
    password,
    name,
    profession,
    avatar,
  });

  // jika berhasil berikan respon
  return res.json({
    status: "success",
    data: {
      id: user.id,
      email,
      name,
      profession,
      avatar,
    },
  });
};
