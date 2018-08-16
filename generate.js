const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');
const bip39 = require('bip39');
const bip32 = require('bip32');
const DERIVE_PATH_PREFIX ="m/44'/0'/0'/0/";
const MNEMONIC = "enter 12 words here";

function getAddress (node, network) {
  return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}
const children = [], addresses = [];
//const mnemonic = bip39.generateMnemonic();

const seed = bip39.mnemonicToSeed(MNEMONIC);

const root = bip32.fromSeed(seed);

for (let i=0; i < 500; i++){
  children[0] = root.derivePath(DERIVE_PATH_PREFIX + i);
  const address = getAddress(children[0]);
  addresses.push(address);
  // privateKey = children[0].toWIF();
}

fs.writeFileSync('addresses.txt', addresses.join('\n'));
