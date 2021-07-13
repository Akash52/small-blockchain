const SHA256 = require('crypto-js/sha256')
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString()
  }
}
class Blockchain {
  constructor() {
    this.chain = [this.createGenisisBlock()]
  }
  createGenisisBlock() {
    return new Block(0, 7 - 7 - 2021, 'Genesis', 0)
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }
}

let mvvcoin = new Blockchain()
mvvcoin.addBlock(new Block(1, 7 - 8 - 2021, { anount: 1 }))
mvvcoin.addBlock(new Block(2, 7 - 8 - 2021, { anount: 4 }))

console.log(JSON.stringify(mvvcoin, null, 4))
