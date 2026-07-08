console.log(" ============ 1 билет")

const massive = [1, 4, 7, 52, 234, 11, 664, 12, 44]
const maximum = massive.reduce((max, curr) => (curr > max ? curr : max))
console.log(maximum)

console.log(" ============ 2 билет")

const x = 1234321

const palin = (num) => {
    const str = String(num)
    const len = str.length

    for(let i = 0; i < len /2; i++){
        if(str[i] !== str[len - 1 - i]){
            return false;
        }
    }
    return true
}

console.log(palin(x))

console.log(" ============ 3 билет")

const suma = (begi, conez) => {
    if (begi > conez) {
        return 0;
    }
    return begi + suma(begi + 1, conez);
};

console.log(suma(1, 3))

console.log(" ============ 4 билет")

const operations = {
    сложить: (a, b) => a + b,
    вычесть: (a, b) => a - b,
    умножение: (a, b) => a * b,
    деление: (a, b) => (b !== 0 ? a / b : "Ошибка: деление на ноль")
};
function calc(a, b, operation) {

    if (operation in operations) {
        return operations[operation](a, b);
    }
    return "Ошибка: неизвестная операция";
}


console.log(calc(3, 6, "умножение"));
console.log(calc(10, 2, "деление"));   


console.log(" ============ 5 билет")
/*
const selSort = (arr) => {
    for (let i = 0; i , arr.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[lowest] > arr[j]) {
                lowest = j;
            }
        }
        if (i !== lowest) {
            [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
        }
    }
    return arr
}

console.log(selSort([12, 43, 75, 11, 654, 113]))*/

console.log(" ============ 6 билет")

function countVow (text) {
    const vowels = new Set(['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u']);
    return text.toLowerCase().split('').filter(char => vowels.has(char)).length
}
console.log(countVow("Привет1"))

console.log(" ============ 7 билет")

function celsToF (num) {
    const F = (num * 1.8) + 32
    return F
}

console.log(celsToF(24))

console.log(" ============ 8 билет")

function prime (n) {
    const primes = []
    const isPr = new Array(n + 1).fill(true)

    isPr[0] = isPr[1] = false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (isPr[i]) {
            for (let j = i * i; j <= n; j += i ) {
                isPr[j] = false;
            }
        }
    } for (let i = 2; i <= n; i++) {
        if (isPr[i]) primes.push(i)
    }
    return primes
}

console.log(prime(30))

console.log(" ============ 9 билет")

class Student {
    constructor(name, age, faculty, hobby) {
        this.name = name,
        this.age = age,
        this.faculty = faculty,
        this.hobby = hobby
    }

    study() {
        console.log(`${this.name} учится в Универе по направлению ${this.faculty}`)
    }
    agist() {
        console.log(`${this.name} взрослый самостоятельный человек в свои ${this.age}`)
    }
}

const stud = new Student("Александр", 20, "Инжинер-конструктор", "Играть в танки")
console.log(stud.study())
console.log(stud.agist())

console.log(" ============ 10 билет")

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } 

        else {
            right = mid - 1;
        }
    }

    return -1;
}

const sortedNumbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(sortedNumbers, 23));
console.log(binarySearch(sortedNumbers, 10)); 


console.log(" ============ 11 билет")

function NOD (a, b) {
    while (b !== 0) {
        let get = b;
        b = a % b;
        a = get
    }
    return a;
}

console.log(NOD(34, 10))

console.log(" ============ 12 билет")

class Figure {
    constructor() {
    if (this.constructor === Figure) {
            throw new Error("Нельзя создать экземпляр абстрактного класса Figure.");
        }
    }


    getArea() {
        throw new Error("Метод 'getArea()' должен быть реализован.");
    }

    getPerimeter() {
        throw new Error("Метод 'getPerimeter()' должен быть реализован.");
    }
}

class Circle extends Figure {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    getArea() {
       return Math.PI * Math.pow(this.radius, 2);
    }

    getPerimeter() {
       return 2 * Math.PI * this.radius;
    }
}

class Square extends Figure {
    constructor(side) {
        super();
        this.side = side;
    }

    getArea() {
        return Math.pow(this.side, 2);
    }

    getPerimeter() {
      return 4 * this.side;
    }
}

const circle = new Circle(5);
console.log(`Площадь круга: ${circle.getArea().toFixed(2)}`); 
console.log(`Периметр круга: ${circle.getPerimeter().toFixed(2)}`); 

const square = new Square(4);
console.log(`Площадь квадрата: ${square.getArea()}`); 
console.log(`Периметр квадрата: ${square.getPerimeter()}`);


