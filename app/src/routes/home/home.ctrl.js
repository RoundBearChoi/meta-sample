"use strict";

const jwt = require("jsonwebtoken");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    metaConnect: (req, res) => {
        res.render("home/metaConnect");
    },
    metaConnected: (req, res) => {
        res.render("home/metaConnected");
    },
};

const process = {
    login: (req, res) => {
        const id = req.body.id;
        const pw = req.body.pw;

        console.log(id, pw);

        //need verification

        return res.json({
            success: false,
            msg: "login failed",
        });
    },

    onWalletConnect: (req, res) => {
        const address = req.body.walletAddress;
        console.log("incoming wallet address: " + address);

        //need verification
        if (true) {
            const publicAddress = { publicAddress: address };
            const t = jwt.sign(publicAddress, "tokenRequired");

            return res.json({
                success: true,
                token: t,
            });
        } else {

        }
    },
};

module.exports = {
    output,
    process,
}
