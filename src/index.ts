// * JS에는 interface가 반영되지 않는다. 그래서 Class 사용

// ts 측면으론 interface가 더 안전하다.
// 하지만 React, express, node를 사용한다면 class

class Human {
    public name: string;
    public age: number;
    public gender: string;                // gender은 선택 사항
    constructor(name:string, age:number, gender?:string) { // 클래스 만들어질 때마다 실행. 즉, 클래스로부터 객체를 만들 때
        // class의 name은 constructor의 name과 같다
        this.name = name,
        this.age = age,
        this.gender = gender
    }
}

const minhoo = new Human("Minhoo", 19, "Male")

const sayHi = (person): string => {
    return `Hello ${person.name}, you are ${person.age}! You are a ${person.gender}`
}

console.log(sayHi(minhoo))





// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }

// const person = {
//     name: "minhoo",
//     age: 19,
//     gender: "male"
// }

// const sayHi = (person:Human): string => {
//     return `Hello ${person.name}, you are ${person.age}! You are a ${person.gender}`
// }

// console.log(sayHi(person))

