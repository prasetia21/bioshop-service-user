const { RefreshTokenCustomer } = require("../../../models");

module.exports = async (req, res) => {

    // ambil data refresh token di browser
    // http://localhost:5000/refresh_tokens_costumer?refresh_token_costumer=daskjbkjasbfkjasbfasf
    const refreshTokensCustomer = req.query.refresh_token_customer;

    // cari data refresh token
    const token = await RefreshTokenCustomer.findOne({
        where: { token: refreshTokensCustomer }
    });

    // cek apakah tokennya sesuai
    if (!token) {
        return res.status(400).json({
            status: "error",
            message: "invalid token"
        });
    }

    // jika benar berikan respon
    return res.json({
        status: "success",
        token
    })
}