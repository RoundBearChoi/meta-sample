"use strict";

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

// const users = {
//     id: ["111", "222", "333"],
//     pw: ["111", "222", "333"],
// };

const process = {
    login: (req, res) => {
        const id = req.body.id;
        const pw = req.body.pw;

        console.log(id, pw);

        // if (users.id.includes(id)) {
        //     const idx = users.id.indexOf(id);

        //     if (users.pw[idx] === pw) {
        //         return res.json({
        //             success: true,
        //         });
        //     }
        // }

        return res.json({
            success: false,
            msg: "login failed",
        });
    },

    onWalletConnect: (req, res) => {
        const address = req.body.walletAddress;

        console.log("incoming wallet address: " + address);
    },
};

module.exports = {
    output,
    process,
}
