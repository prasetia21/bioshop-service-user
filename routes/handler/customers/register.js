const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const { Customer } = require("../../../models");

const v = new Validator();

module.exports = async (req, res) => {
    // validasi inputan Customer
    const schema = {
        first_name: "string|empty:false",
        last_name: "string|empty:false",
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

    // cari username Customer
    const customerUserName = await Customer.findOne({
        where: { username: req.body.username }
    });

    // cek dan berikan respon apakah ada duplikat data email
    if (customerUserName) {
        return res.status(409).json({
            status: "error",
            message: "username already exist",
        });
    }

    // cari email Customer
    const customerEmail = await Customer.findOne({
        where: { email: req.body.email }
    });

    // cek dan berikan respon apakah ada duplikat data email
    if (customerEmail) {
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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
    };

    const createCustomer = await Customer.create(data);

    // jika berhasil berikan respon
    return res.json({
        status: "success",
        data: {
            id: createCustomer.id
        }
    });

}