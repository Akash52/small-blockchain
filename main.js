const SHA256 = require('crypto-js/sha256')
const colors = require('colors')

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }
}

class Block {
  constructor(timestamp, transaction, previousHash = '') {
    this.timestamp = timestamp
    this.transaction = transaction
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.none = 0
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.none
    ).toString()
  }
  mineBlock(dificulty) {
    while (
      this.hash.substring(0, dificulty) !== Array(dificulty + 1).join('0')
    ) {
      this.none++
      this.hash = this.calculateHash()
    }
    console.log('Block Mined : ' + this.hash.cyan.underline)
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenisisBlock()]
    this.dificulty = 2
    this.pendingTransaction = []
    this.miningReward = 100
  }
  createGenisisBlock() {
    return new Block('7 - 7 - 2021', 'Genesis', 0)
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }
  //   addBlock(newBlock) {
  //     newBlock.previousHash = this.getLatestBlock().hash
  //     newBlock.mineBlock(this.dificulty)
  //     this.chain.push(newBlock)
  //   }
  // }
  minPendingTransaction(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransaction)
    block.mineBlock(this.dificulty)

    console.log('Block Successfully Mined..!'.blue)
    this.chain.push(block)

    this.pendingTransaction = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ]
  }

  createTransaction(transaction) {
    this.pendingTransaction.push(transaction)
  }

  getBalanceOfAddress(address) {
    let balance = 0

    for (const block of this.chain) {
      for (const trans of block.transaction) {
        if (trans.fromAddress === address) {
          balance -= trans.amount
        }
        if (trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }
    return balance
  }
}
let mvvcoin = new Blockchain()
mvvcoin.createTransaction(new Transaction('address1', 'address2', 100))
mvvcoin.createTransaction(new Transaction('address1', 'address2', 20))

console.log('\n Starting the miner...'.bgGreen.white)
mvvcoin.minPendingTransaction('abcaddress')

console.log('\n Balance of abc is', mvvcoin.getBalanceOfAddress('abcaddress'))

console.log('\n Starting the miner again...'.bgGreen.white)
mvvcoin.minPendingTransaction('xyz-address')

console.log('\n Balance of abc is', mvvcoin.getBalanceOfAddress('abcaddress'))

// console.log('Mining Block 1...'.white.bgMagenta)
// mvvcoin.addBlock(new Block(1, 7 - 8 - 2021, { anount: 1 }))
// console.log('Mining Block 2...'.white.bgMagenta)
// mvvcoin.addBlock(new Block(2, 7 - 8 - 2021, { anount: 4 }))

// console.log(JSON.stringify(mvvcoin, null, 4))
