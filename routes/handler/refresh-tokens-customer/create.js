const { Customer, RefreshTokenCustomer } = require("../../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  const customerId = req.body.customer_id;
  const refreshTokensCustomer = req.body.refresh_token_customer;

  // schema validasi
  const schema = {
    refresh_token_customer: "string",
    customer_id: "number",
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
  const customer = await Customer.findByPk(customerId);

  // cek dan berikan respon apakah ada data id
  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  const createdRefreshTokenCustomer = await RefreshTokenCustomer.create({
    token: refreshTokensCustomer,
    customer_id: customerId,
  });

  // jika berhasil berikan respon
  return res.json({
    status: "success",
    data: {
      id: createdRefreshTokenCustomer.id,
    },
  });
};
