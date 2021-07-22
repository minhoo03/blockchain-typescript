import * as CryptoJS from "crypto-js"

class Block {
    public index:number;
    public hash:string;
    public previousHash:string;
    public data: string;
    public timestamp: number;

    // Class가 생성되지 않아도 사용할 수 있는 메소드
    // return 값은 string
    static calculateBlockHash = (index:number, previousHash:string, timestamp: number, data: string) :string =>
     CryptoJS.SHA256(index + previousHash + timestamp + data).toString()

    constructor(
        index:number,
        hash:string, 
        previousHash:string,
        data: string,
        timestamp: number,
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "2020202020202", "", "Hello", 123456)

// 배열이자 Block 형태로 = [genesisBlock]을 담겠다..
let blockchain: Block[] = [genesisBlock]
// blockchain.push("stuff") <- Block이 아니니 추가가 되지 않는다.

const getBlockChain = () : Block[] => blockchain // 블록 배열 - 블록체인의 길이 확인

const getLatestBlock = () : Block => blockchain[blockchain.length - 1] // 블록 - 가장 최근의 블록체인 가져오기

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 100)

const createNewBlock = (data:string) : Block => {
    const previousBlock: Block = getLatestBlock()
    const newIndex: number = previousBlock.index + 1
    const newTimeStamp: number = getNewTimeStamp()
    const newHash : string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data)

    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp)

    return newBlock
}

console.log(createNewBlock("hello"), createNewBlock("bye bye"))

export {}