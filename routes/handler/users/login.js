const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const { User } = require("../../../models");

const v = new Validator();

module.exports = async (req, res) => {
    // validasi inputan user
    const schema = {
        email: "email|empty:false",
        password: "string|min:6",
    }

    const validate = v.validate(req.body, schema);

    // cek apakah ada error di isian data, hasil validasi array jika ada 
    if (validate.length) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    // cari email user
    const user = await User.findOne({
        where: { email: req.body.email }
    });

    // cek dan berikan respon apakah ada data email
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found",
        });
    }

    // cek password apakah sesuai
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res.status(404).json({
            status: "error",
            message: "password invalid",
        });
    }

    // jika berhasil berikan respon dan kirimkan data user
    return res.json({
        status: "success",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession,
        }
    });

}