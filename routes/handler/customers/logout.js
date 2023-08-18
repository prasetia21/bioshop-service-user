const { Customer, RefreshTokenCustomer } = require("../../../models");

module.exports = async (req, res) => {
  // cari id customer
  const customerId = req.body.customer_id;
  const customer = await Customer.findByPk(customerId);

  // cek dan berikan respon apakah ada data id
  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "customer not found",
    });
  }

  // simpan data last login
  const data = {
    last_login:new Date()
  };

  const lastLogin = await Customer.create(data);
  
  // hapus refresh token berdasarkan id
  await RefreshTokenCustomer.destroy({
    where: { customer_id: customerId },
  });

  

  // jika berhasil berikan respon
  return res.json({
    status: "success",
    message: "refresh token deleted",
  });
};
