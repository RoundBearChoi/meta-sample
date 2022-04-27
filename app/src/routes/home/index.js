"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.post("/login", ctrl.process.login);

router.get("/metaConnect", ctrl.output.metaConnect);
router.get("/metaConnected", ctrl.output.metaConnected);
router.get("/sendEthSample", ctrl.output.sendEthSample);
router.post("/onWalletConnect", ctrl.process.onWalletConnect);

module.exports = router;
