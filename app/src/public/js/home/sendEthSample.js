"use strict"

const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];

getAccount();

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    if (accounts) {
        const account = accounts[0];
        console.log("account found: " + account);

        sendEth(account);
    }
}

function getStringAmount(eth) {
    const decimals = eth * Math.pow(10, 18);
    const strAmount = "0x" + decimals.toString(16);
    return strAmount;
}

function sendEth(accountFrom) {
    console.log("attempting transaction from: " + accountFrom);

    const sendAmount = getStringAmount(0.001);

    ethereum
        .request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: accountFrom,
                    to: "0x4a2c2062C40FE16830b41D754e6aB5dadc1ebB15",
                    value: sendAmount,
                    //gasPrice: "0x09184e72a000",
                    //gas: "0x2710",
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
}