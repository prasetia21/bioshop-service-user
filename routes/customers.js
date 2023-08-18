const express = require('express');
const router = express.Router();

const customersHandler = require("./handler/customers");

/* POST customers. */
router.post("/register", customersHandler.register);
router.post("/login", customersHandler.login);
router.post("/logout", customersHandler.logout);
router.put("/:id", customersHandler.update);
router.get("/:id", customersHandler.getCustomer);
router.get("/", customersHandler.getCustomers);


module.exports = router;
