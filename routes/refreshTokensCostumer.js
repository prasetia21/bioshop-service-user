const express = require('express');
const router = express.Router();

const refreshTokenCostumerHandler = require("./handler/refresh-tokens-costumers");

/* POST refresh tokens. */
router.post("/", refreshTokenCostumerHandler.create);
router.get("/", refreshTokenCostumerHandler.getToken);

module.exports = router;
