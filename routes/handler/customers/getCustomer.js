const { Customer } = require("../../../models");


module.exports = async (req, res) => {
    const id = req.params.id;

    // cari data id customer dan tambahkan attribut untuk memfilter data yang akan dikirim dan ditampilkan 
    const customer = await Customer.findByPk(id, {
        attributes: ["id", "first_name", "last_name", "username", "email", "phone", "avatar", "last_login"]
    });

    // cek apakah customer ada
    if (!customer) {
        return res.status(404).json({
            status: "error",
            message: "customer not found",
        });
    }

    // jika ada berikan respon
    return res.json({
        status: "success",
        data: customer
    });
}