const { User } = require("../../../models");


module.exports = async (req, res) => {
    const id = req.params.id;

    // cari data id user dan tambahkan attribut untuk memfilter data yang akan dikirim dan ditampilkan 
    const user = await User.findByPk(id, {
        attributes: ["id", "username", "email", "role", "phone", "avatar", "last_login"]
    });

    // cek apakah user ada
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found",
        });
    }

    // jika ada berikan respon
    return res.json({
        status: "success",
        data: user
    });
}