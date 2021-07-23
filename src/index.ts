import * as CryptoJS from "crypto-js"

class Block {
    // Class가 생성되지 않아도 사용할 수 있는 메소드
    // return 값은 string
    static calculateBlockHash = (index:number, previousHash:string, timestamp: number, data: string) :string =>
     CryptoJS.SHA256(index + previousHash + timestamp + data).toString()

    // 구조 검증 함수
    static validateStructure = (aBlock: Block) : boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string"
    
    public index:number;
    public hash:string;
    public previousHash:string;
    public data: string;
    public timestamp: number;

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
    addBlock(newBlock)
    return newBlock
}

// 파라미터는 Block 형태
// 해쉬 검증 함수
const getHashforBlock = (aBlock: Block) : string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

// (이전-새로운) 블록 검증 함수
const isBLockValid = (candidateBlock: Block, previousBlock: Block) : boolean => {
    if(!Block.validateStructure(candidateBlock)) { // 구조 검증
        return false
    } else if (previousBlock.index + 1 !== candidateBlock.index) { 
        // 이전 블록의 index + 1과 현재 블록의 index가 같지 않으면
        return false
    } else if (previousBlock.hash !== candidateBlock.previousHash) { 
        // 이전 hash와 현재 블럭 preHash가 같지 않으면
        return false
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        // 우리가 얻은 cadidateBlock의 hash이 cadidate 블록의 hash와 같지 않다면
        return false
    } else {
        return true
    }
}

// 아무것도 return 하지 않으므로 void
const addBlock = (candidateBlock: Block) : void => {
    if(isBLockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock)
    }
}

createNewBlock("second block")
createNewBlock("third block")
createNewBlock("fourth block")

console.log(blockchain)

export {}