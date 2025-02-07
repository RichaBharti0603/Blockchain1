class Block {
    constructor (index, timestamp,data, previousHah =''){
        this.index= index;
        this.timestamp= timestamp;
        this.data= data;
        this.previousHash = previousHash;
        this.hash= this.calculateHash();
    }
    calculateHash(){
        return SHA526(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block(0,"01/07/2027", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHah = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i=1; i<this.chain.length ;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let Vandana = new Blockchain();
Vandana.addBlock(new Block(1, "10/07/2017", {amount:4}));
Vandana.addBlock(new Block(2,"12/07/2017", {amount: 10}));
