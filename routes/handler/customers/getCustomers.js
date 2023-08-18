const { Customer } = require("../../../models");


module.exports = async (req, res) => {

    // ambil data query dari url browser customer_ids[]
    // sampel http://localhost:5000/customers?customer_ids%5B%5D=1&customer_ids%5B%5D=2
    const customerIds = req.query.customer_ids || [];

    // setup filter data yang akan dikirim / ditampilkan
    const sqlOptions = {
        attributes: ["id", "first_name", "last_name", "username", "email", "role", "phone", "avatar", "last_login"]
    }

    // cek apakah ada customer_ids yang diinput / didapat
    if (customerIds.length) {
        sqlOptions.where ={
            id: customerIds
        }
    }

    // cari data customer dan tambahkan attribut untuk memfilter data yang akan dikirim dan ditampilkan 
    const customer = await Customer.findAll( sqlOptions );

    // jika ada berikan respon
    return res.json({
        status: "success",
        data: customer
    });
}