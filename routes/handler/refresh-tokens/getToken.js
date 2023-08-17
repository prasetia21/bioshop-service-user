const { RefreshToken } = require("../../../models");

module.exports = async (req, res) => {

    // ambil data refresh token di browser
    // http://localhost:5000/refresh_tokens?refresh_token=daskjbkjasbfkjasbfasf
    const refreshTokens = req.query.refresh_token;

    // cari data refresh token
    const token = await RefreshToken.findOne({
        where: { token: refreshTokens }
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