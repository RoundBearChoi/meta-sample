"use strict";

const jwt = require("jsonwebtoken");
const Web3 = require("web3");

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
        const testing = req.body.testing;
        console.log("incoming wallet address: " + address);
        console.log("testing string: " + testing);

        const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/bf78d49fb1824455ba8085d9d1d5211f"));

        web3.eth.getBalance(address)
            .then((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("result: " + result);
                }
            });

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
