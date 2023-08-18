const register = require("./register");
const login = require("./login");
const update = require("./update");
const getCustomer = require("./getCustomer");
const getCustomers = require("./getCustomers");
const logout = require("./logout");


module.exports = {
    register,
    login,
    update,
    getCustomer,
    getCustomers,
    logout
}