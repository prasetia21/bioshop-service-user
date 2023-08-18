const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const { Customer } = require("../../../models");

const v = new Validator();

module.exports = async (req, res) => {
  // validasi inputan Customer
  const schema = {
    first_name: "string|empty:false",
    last_name: "string|empty:false",
    username: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    phone: "string|empty:false",
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

  // cari id customer
  const id = req.params.id;
  const customer = await Customer.findByPk(id);

  // cek dan berikan respon apakah ada data id
  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  // cari email customer
  const email = req.body.email;

  // cek dan berikan respon apakah ada data id
  if (email) {
    const checkEmail = await Customer.findOne({
      where: { email },
    });

    if (checkEmail && email !== customer.email) {
      return res.status(409).json({
        status: "error",
        message: "email already exist",
      });
    }
  }

  // hash password
  const password = await bcrypt.hash(req.body.password, 10);

  // simpan data
  const { username, first_name, last_name, phone, avatar } = req.body;

  await customer.update({
    first_name,
    last_name,
    email,
    password,
    username,
    phone,
    avatar,
  });

  // jika berhasil berikan respon
  return res.json({
    status: "success",
    data: {
      id: user.id,
      first_name,
      last_name,
      email,
      username,
      phone,
      avatar,
    },
  });
};
