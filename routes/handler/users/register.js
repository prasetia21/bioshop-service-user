const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const { User } = require("../../../models");

const v = new Validator();

module.exports = async (req, res) => {
    // validasi inputan user
    const schema = {
        username: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
        phone: "string|empty:false",
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

    // cek dan berikan respon apakah ada duplikat data email
    if (user) {
        return res.status(409).json({
            status: "error",
            message: "email already exist",
        });
    }

    // hash password
    const password = await bcrypt.hash(req.body.password, 10);

    // simpan data
    const data = {
        password,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        role: "user"
    };

    const createUser = await User.create(data);

    // jika berhasil berikan respon
    return res.json({
        status: "success",
        data: {
            id: createUser.id
        }
    });

}