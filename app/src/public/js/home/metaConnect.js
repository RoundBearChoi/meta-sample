"use strict"

console.log("running metaConnect.js");

window.userWalletAddress = null;

const loginButton = document.getElementById('loginButton');
const userWallet = document.getElementById('userWallet');

const connectButton = document.getElementById("connectButton");

console.log(connectButton);

function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = 'MetaMask is not installed'
        loginButton.classList.remove('bg-purple-500', 'text-white')
        loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
        return false
    }

    //loginButton.addEventListener('click', loginWithMetaMask);
    connectButton.addEventListener("click", connectWithMetaMask);
}

async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
            console.error(e.message)
            return
        })
    if (!accounts) { return }

    window.userWalletAddress = accounts[0]
    userWallet.innerText = window.userWalletAddress
    loginButton.innerText = 'Sign out of MetaMask'

    loginButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetaMask)
    }, 200)
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

        connectButton.removeEventListener('click', loginWithMetaMask)

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

        //location.href = "/metaConnected";
    }

    // setTimeout(() => {
    //     loginButton.addEventListener('click', signOutOfMetaMask)
    // }, 200);
}

function signOutOfMetaMask() {
    window.userWalletAddress = null
    userWallet.innerText = ''
    loginButton.innerText = 'Sign in with MetaMask'

    loginButton.removeEventListener('click', signOutOfMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', loginWithMetaMask)
    }, 200)
}

window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
});