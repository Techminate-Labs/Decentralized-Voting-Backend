const crypto = require('crypto');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
        this.signature = ''
    }

     /**
   * Creates a SHA256 hash of the transaction
   *
   * @returns {string}
   */
  calculateHash() {
    return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
  }

  /**
   * Signs a transaction with the given signingKey (which is an Elliptic keypair
   * object that contains a private key and a public key). The signature is then stored inside the
   * transaction object and later stored on the blockchain.
   *
   * @param {string} keyPair
   */
  signTransaction(keyPair) {
    // You can only send a transaction from the wallet that is linked to your
    // key. So here we check if the fromAddress matches your publicKey
    if (keyPair.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    
    // Calculate the hash of this transaction, sign it with the key
    // and store it inside the transaction obect
    const hashTxs = this.calculateHash();
    const sign = keyPair.sign(hashTxs, 'base64');

    //Distinguished Encoding Rules, which is a binary format
    this.signature = sign.toDER('hex');
  }

  isValid() {
    // If the transaction doesn't have a from address we assume it's a mining reward
    if (this.fromAddress === null) return true;

    // check signature
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }

}

module.exports = Transaction;