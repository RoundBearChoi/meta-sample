"use strict"

window.userWalletAddress = null;

const connectButton = document.getElementById("connectButton");

function toggleButton() {
    if (window.ethereum) {
        connectButton.addEventListener("click", connectWithMetaMask);
    } else {
        //send player to onboarding page
    }
}

async function connectWithMetaMask() {
    console.log("connecting with metamask");

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).
        catch((e) => {
            console.error(e.message);
            return;
        });

    if (accounts) {
        const walletPub = accounts[0];
        console.log("wallet connected: " + walletPub);

        connectButton.removeEventListener('click', connectWithMetaMask)

        const req = {
            walletAddress: walletPub,
        };

        fetch("/onWalletConnect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    console.log("token received: " + res.token);
                    //location.href = "/metaConnected";
                } else {

                }
            })

        //location.href = "/metaConnected";
    }

    // setTimeout(() => {
    //     loginButton.addEventListener('click', signOutOfMetaMask)
    // }, 200);
}

window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
});