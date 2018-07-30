interface Human {
    name : string;
    age : number;
    gender : string;
}

const person = {
    name : "eunmi",
    age : 29,
    gender : "F" 
}
const sayHiObject = (person : Human): string => {
    return `Hello ${person.name} , age ${person.age}, gender ${person.gender}!`;
}


//typescirpt는 변수의 형태를 지정할 수 있음 리턴값도.
const sayHi = (name:string, age:number, gender:string): void => {
    console.log(`Hello ${name} , age ${age}, gender ${gender}!`);
}

sayHi('sungmin', 30, 'M');
console.log(sayHiObject(person));

export {};