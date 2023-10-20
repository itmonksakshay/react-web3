import { ChainLogo } from "src/pages/Home/sections/Result2/components/ChainLogo";

export function darkenColor(color, v = -40) {
  if (color.length > 6) {
    color = color.substring(1, color.length);
  }
  var rgb = parseInt(color, 16);
  var r = Math.abs(((rgb >> 16) & 0xff) + v);
  if (r > 255) r = r - (r - 255);
  var g = Math.abs(((rgb >> 8) & 0xff) + v);
  if (g > 255) g = g - (g - 255);
  var b = Math.abs((rgb & 0xff) + v);
  if (b > 255) b = b - (b - 255);
  r = Number(r < 0 || isNaN(r)) ? 0 : (r > 255 ? 255 : r).toString(16);
  if (r.length === 1) r = "0" + r;
  g = Number(g < 0 || isNaN(g)) ? 0 : (g > 255 ? 255 : g).toString(16);
  if (g.length === 1) g = "0" + g;
  b = Number(b < 0 || isNaN(b)) ? 0 : (b > 255 ? 255 : b).toString(16);
  if (b.length === 1) b = "0" + b;
  return "#" + r + g + b;
}

export function getGrayscale(hex) {
  hex = hex.slice(1);
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  let grayscale = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  hex = Math.round(grayscale).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return "#" + hex + hex + hex;
}

export function formatAddress(address, preLen = 6, postLen = 4) {
  if (!address) return;
  return (
    address.slice(0, preLen) + "..." + address.slice(address.length - postLen)
  );
}

export function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

export function openNewTab(url) {
  let link = document.getElementById("term-link");
  link.href = url;
  link.target = "_blank";
  link.click();
  setTimeout(() => {
    link.target = "https://www.oneclick.fi/terms-of-service-defi";
  }, 1000);
}

export function isDarkMode() {
  return (
    document.getElementsByTagName("html")[0].className.indexOf("dark") > -1
  );
}

export function toggleDarkMode() {
  if (isDarkMode()) {
    document.getElementsByTagName("html")[0].className = "";
    localStorage.removeItem("dark");
  } else {
    document.getElementsByTagName("html")[0].className = "dark";
    localStorage.setItem("dark", 1);
  }
}

export function getTxnLink(chain, txnHash) {
  const chainLinks = {
    Ethereum: "https://etherscan.io/tx/",
    "BNB Chain": "https://bscscan.com/tx/",
    Polygon: "https://polygonscan.com/tx/",
    Arbitrum: "https://arbiscan.io/tx/",
    Optimism: "https://optimistic.etherscan.io/tx/",
    Avalanche: "https://avascan.info/blockchain/dexalot/tx/",
  };
  return chainLinks[chain] + txnHash;
}
