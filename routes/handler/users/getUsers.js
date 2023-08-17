const { User } = require("../../../models");


module.exports = async (req, res) => {

    // ambil data query dari url browser user_ids[]
    // sampel http://localhost:5000/users?user_ids%5B%5D=1&user_ids%5B%5D=2
    const userIds = req.query.user_ids || [];

    // setup filter data yang akan dikirim / ditampilkan
    const sqlOptions = {
        attributes: ["id", "name", "email", "role", "profession", "avatar"]
    }

    // cek apakah ada user_ids yang diinput / didapat
    if (userIds.length) {
        sqlOptions.where ={
            id: userIds
        }
    }

    // cari data user dan tambahkan attribut untuk memfilter data yang akan dikirim dan ditampilkan 
    const user = await User.findAll( sqlOptions );

    // jika ada berikan respon
    return res.json({
        status: "success",
        data: user
    });
}