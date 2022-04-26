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
        //need verification

        const address = req.body.walletAddress;
        const testing = req.body.testing;
        console.log("incoming wallet address: " + address);
        console.log("testing string: " + testing);

        //temp projectID
        const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/bf78d49fb1824455ba8085d9d1d5211f"));

        web3.eth.getBalance(address, (err, result) => {
            if (err) {
                console.log("error getting eth balance: " + err);
            } else {
                console.log("eth balance: " + result);

                const payload = {
                    publicAddress: address,
                    eth: result,
                };

                const t = jwt.sign(payload, "tokenRequired");

                return res.json({
                    success: true,
                    token: t,
                });
            }
        });
    },
};

module.exports = {
    output,
    process,
}
