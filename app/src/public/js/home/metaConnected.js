"use strict"

const t = window.localStorage.getItem("token");

console.log("local token: " + t);

const tokenElement = document.getElementById("playerToken");
tokenElement.textContent = t;

navigator.clipboard.writeText(t);