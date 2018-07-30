import * as CryptoJS from "crypto-js";

interface Human {
    name : string;
    age : number;
    gender : string;
}

class People {
    public name : string;
    public age : number;
    public gender : string;

    constructor(name : string, age : number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
      ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    
    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    constructor(
      index: number,
      hash: string,
      previousHash: string,
      data: string,
      timestamp: number
    ) {
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
    }
  }


const person = {
    name : "eunmi",
    age : 29,
    gender : "F" 
}

//Class로 선언도 가능하고 Interface로 선언도 가능하다.
//클래스로 선언한경우 컴파일 후 클래스 내용이 js에 남는다.
const sayHiObject = (person : People): string => {
    return `Hello ${person.name} , age ${person.age}, gender ${person.gender}!`;
}


//typescirpt는 변수의 형태를 지정할 수 있음 리턴값도.
const sayHi = (name:string, age:number, gender:string): void => {
    console.log(`Hello ${name} , age ${age}, gender ${gender}!`);
}

sayHi('sungmin', 30, 'M');
console.log(sayHiObject(person));


const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);
let blockchain: Block[] = [genesisBlock];;


const getBlockChain = () : Block[] => blockchain;

const getLastBlock = () : Block => blockchain[blockchain.length -1];

const getTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previosBlock: Block = getLastBlock();
    const newIndex: number = previosBlock.index + 1;
    const newTimestamp: number = getTimeStamp();
    const newHash: string = 
        Block.calculateBlockHash(
        newIndex,
        previosBlock.hash,
        newTimestamp,
        data
        );
    const newBlock: Block = 
        new Block(
        newIndex,
        newHash,
        previosBlock.hash,
        data,
        newTimestamp
        );
    return newBlock;
  };

  const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
      return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
      return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
      return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
      return false;
    } else {
      return true;
    }
  };

  const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLastBlock())) {
      blockchain.push(candidateBlock);
    }
  };

  const getHashforBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

  
  addBlock(createNewBlock("hello"));
  addBlock(createNewBlock("bye bye"));

  

  console.log(getBlockChain());


export {};