/**
 * Object-Oriented Programming (OOP) JavaScript Exercises
 * From Beginner to Intermediate Level
 *
 * Instructions:
 * - Read each exercise carefully
 * - Understand the learning objective
 * - Follow the template provided
 * - Test your solution with the given examples
 * - Check your answers against the solution file
 */

console.log("=".repeat(60));
console.log("🎯 OOP JavaScript Exercises - 5 Essential Challenges");
console.log("=".repeat(60));

// ===================================================================
// EXERCISE 1: Basic Class Creation (Beginner)
// ===================================================================
/**
 * Learning Objective: Understand basic class syntax and object creation
 *
 * Problem: Create a Student class with basic properties and methods
 *
 * Requirements:
 * - Create a class named 'Student'
 * - Properties: name, age, grade, subjects (array)
 * - Method 'introduce()' that returns a greeting message
 * - Method 'addSubject(subject)' that adds a subject to the array
 * - Method 'getInfo()' that returns student details
 *
 * Expected Output:
 * student.introduce() should return: "Hi, I'm John, I'm 16 years old and in grade 10"
 * student.getInfo() should return object with all student details
 */

console.log("\n📚 Exercise 1: Basic Class Creation");
console.log("-".repeat(40));

// TODO: Write your Student class here
class Student {
  constructor(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
    this.subjects = [];
  }

  introduce() {
    return `Hi, I'm ${this.name}, I'm ${this.age} years old and in grade ${this.grade}`;
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }

  getInfo() {
    return {
      name: this.name,
      age: this.age,
      grade: this.grade,
      subjects: this.subjects,
    }
  }
}

// Test your solution:
const student = new Student("John", 16, 10);
// console.log(student.introduce());
student.addSubject("Math");
student.addSubject("Science");
console.log(student.getInfo());

// ===================================================================
// EXERCISE 2: Encapsulation - Private Fields & Data Protection (Intermediate)
// ===================================================================
/**
 * Learning Objective: Understand encapsulation with private fields
 *
 * Problem: Create a simple BankAccount class with secure balance management
 *
 * Requirements:
 * - Create a class named 'BankAccount'
 * - Private field: #balance
 * - Constructor accepts initial balance (must be >= 0)
 * - Getter 'balance' returns current balance (read-only)
 * - Method 'deposit(amount)' adds money (amount must be > 0)
 * - Method 'withdraw(amount)' removes money (check sufficient funds)
 * - Method 'getAccountSummary()' returns account info
 *
 * OOP Principle: ENCAPSULATION - Hide internal data, control access through methods
 *
 * Expected Output:
 * account.balance should return current balance
 * All operations should validate inputs and protect the balance
 */

console.log("\n📚 Exercise 2: Encapsulation - HIDE & PROTECT DATA");
console.log("-".repeat(50));

// TODO: Write your BankAccount class here
class BankAccount {
  // Your code here - remember to use private fields with #
  #balance;
  constructor(balance) {
    if(typeof balance !== 'number' || balance < 0) {
      throw new Error ('Initial balance must be >= 0')
    }
    this.#balance = balance;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Deposit amount must be > 0');
    }
    this.#balance += amount;
  }

  withdraw(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Withdraw amount must be > 0');
    }
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
  }

  getAccountSummary() {
    return `current balance: ${this.balance}`;
  }
}

// Test your solution:
const account = new BankAccount(1000);
console.log(`Initial balance: $${account.balance}`);
account.deposit(500);
account.withdraw(200);
console.log(account.getAccountSummary());

// ===================================================================
// EXERCISE 3: Inheritance - Code Reuse & Specialization (Intermediate)
// ===================================================================
/**
 * Learning Objective: Understand inheritance for code reuse
 *
 * Problem: Create an Animal and Dog class hierarchy
 *
 * Requirements:
 * - Create a base class 'Animal' with: name, species, age
 * - Method 'makeSound()' returns "The animal makes a sound"
 * - Method 'getInfo()' returns animal details
 * - Method 'eat()' returns "[name] is eating"
 * - Create a 'Dog' class that extends Animal
 * - Dog should have additional property: breed
 * - Override 'makeSound()' to return "Woof! Woof!"
 * - Add method 'fetch()' that returns "[name] is fetching the ball!"
 * - Override 'getInfo()' to include breed information
 *
 * OOP Principle: INHERITANCE - Reuse code through parent-child relationships
 *
 * Expected Output:
 * dog.makeSound() should return "Woof! Woof!"
 * dog.fetch() should return specific message
 * dog.eat() should work (inherited from Animal)
 */

console.log("\n📚 Exercise 3: Inheritance - EXTEND & REUSE CODE");
console.log("-".repeat(50));

// TODO: Write your Animal and Dog classes here
class Animal {
  // Your code here
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  makeSound() {
    return `The animal makes a sound`;
  }

  getInfo() {
    return {
      name: this.name,
      species: this.species,
      age: this.age,
    }
  }

  eat() {
    return `${this.name} is eating`
  }
}

class Dog extends Animal {
  constructor(name, species, age, breed) {
    super(name, species, age);
    this.breed = breed;
  }

  makeSound() {
    return `Woof! Woof!`;
  }

  fetch() {
    return `${this.name} is fetching the ball!`;
  }

  getInfo() {
    const info = super.getInfo();

    info.breed = this.breed;

    return info;
  }
}

// Test your solution:
const animal = new Animal("Rex", "Unknown", 5);
const dog = new Dog("Buddy", "Canine", 3, "Golden Retriever");
console.log(animal.makeSound());
console.log(dog.makeSound());
console.log(dog.fetch());
console.log(dog.eat());
console.log(dog.getInfo());

// ===================================================================
// EXERCISE 4: Polymorphism - Same Interface, Different Behavior (Intermediate)
// ===================================================================
/**
 * Learning Objective: Understand polymorphism through method overriding
 *
 * Problem: Create different shapes that calculate area differently
 *
 * Requirements:
 * - Create a base class 'Shape' with:
 *   - Property: name
 *   - Method 'calculateArea()' returns 0 (to be overridden)
 *   - Method 'describe()' returns shape description with area
 * - Create 'Rectangle' class extending Shape:
 *   - Properties: width, height
 *   - Override 'calculateArea()' to return width * height
 * - Create 'Circle' class extending Shape:
 *   - Property: radius
 *   - Override 'calculateArea()' to return π * radius²
 * - Create function 'processShapes(shapes)' that works with any shape type
 *
 * OOP Principle: POLYMORPHISM - Same method name, different implementations
 *
 * Expected Output:
 * Same method calls work on different shape types
 * Array of mixed shapes can be processed uniformly
 */

console.log(
  "\n📚 Exercise 4: Polymorphism - SAME INTERFACE, DIFFERENT BEHAVIOR"
);
console.log("-".repeat(60));

// TODO: Write your Shape classes here
class Shape {
  constructor(name) {
    this.name = name;
  }

  calculateArea() {
    return 0;
  }

  describe() {
    return '';
  }
}

class Rectangle extends Shape {
  constructor(width, height, name) {
    super(name);
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }

  describe() {
    const area = this.calculateArea();
    return `Rectangle has area ${area}`
  }

}

class Circle extends Shape {
  constructor(radius, name) {
    super(name);
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }

  describe() {
    const area = this.calculateArea();
    return `Circle has area ${area}`
  }
}

// TODO: Write function to process different shapes
function processShapes(shapes) {
  shapes.forEach((shape) => {
    console.log(shape.describe());
  })
}

// Test your solution:
const rectangle = new Rectangle(5, 4);
const circle = new Circle(3);
const shapes = [rectangle, circle];
console.log(rectangle.describe());
console.log(circle.describe());
processShapes(shapes);

// ===================================================================
// EXERCISE 5: Abstraction - Hide Complexity Behind Simple Interface (Intermediate)
// ===================================================================
/**
 * Learning Objective: Understand abstraction to hide complex operations
 *
 * Problem: Create a simple Calculator class that hides math complexity
 *
 * Requirements:
 * - Create abstract base class 'Calculator':
 *   - Property: result (starts at 0)
 *   - Abstract method 'calculate()' (throws error if not implemented)
 *   - Method 'getResult()' returns current result
 *   - Method 'reset()' sets result back to 0
 * - Create 'BasicCalculator' extending Calculator:
 *   - Method 'add(a, b)'
 *   - Method 'subtract(a, b)'
 *   - Method 'multiply(a, b)'
 *   - Override 'calculate()' to perform the operation
 * - Create 'ScientificCalculator' extending Calculator:
 *   - Method 'power(base, exponent)'
 *   - Method 'squareRoot(number)'
 *   - Override 'calculate()' for scientific operations
 *
 * OOP Principle: ABSTRACTION - Hide complex implementation behind simple interface
 *
 * Expected Output:
 * Users can perform complex calculations through simple method calls
 * Internal complexity is hidden from the user
 */

console.log("\n📚 Exercise 5: Abstraction - HIDE COMPLEXITY");
console.log("-".repeat(40));

// TODO: Write your Calculator classes here
class Calculator {
  constructor() {
    this.result = 0;
  }

  calculator() {
    throw new Error ('not implemented!');
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
  }
}

class BasicCalculator extends Calculator {
  add(a,b) {
    this.result = a + b;
    return this.result;
  }

  subtract(a,b) {
    this.result = a - b;
  }

  multiply(a, b) {
    this.result = a * b;
    return this.result;
  }

  calculator (operation, a, b) {
    switch (operation) {
      case 'add':
        return this.add(a,b);
      case 'subtract':
        return this.subtract(a,b);
      case 'multiply': 
        return this.multiply(a,b);
      default:
        throw new Error ('Not implemented this operation')
    }
  }
}

class ScientificCalculator extends Calculator {
  power(base, exponent) {
    this.result = Math.pow(base, exponent);
    return this.result;
  }

  squareRoot(number) {
    if(number < 0) {
      throw new Error ('number can not get squareBoot!')
    }
    this.result = Math.sqrt(number);
    return this.result;
  }

  calculator(operation, ...rest) {
    switch (operation) {
      case 'power':
        this.result = this.power(...rest);
      case 'squareRoot':
        this.result = this.squareRoot(...rest);
      default:
        throw new Error ('Not Implemented!')
    }
  }
}

// Test your solution:
const basicCalc = new BasicCalculator();
const sciCalc = new ScientificCalculator();
console.log(basicCalc.add(5, 3));
console.log(sciCalc.power(2, 8));
console.log(sciCalc.squareRoot(16));

console.log("\n" + "=".repeat(60));
console.log("🎯 COMPLETE ALL 5 EXERCISES TO MASTER OOP!");
console.log("📋 You've covered all 4 OOP Principles:");
console.log(
  "   ✅ ENCAPSULATION: Data hiding and controlled access (Exercise 2)"
);
console.log(
  "   ✅ INHERITANCE: Code reuse through class hierarchies (Exercise 3)"
);
console.log(
  "   ✅ POLYMORPHISM: Same interface, different behavior (Exercise 4)"
);
console.log(
  "   ✅ ABSTRACTION: Hide complexity behind simple interfaces (Exercise 5)"
);
console.log("📚 Plus essential foundation:");
console.log("   ✅ Basic Classes & Objects (Exercise 1)");
console.log("");
console.log(
  "💡 Check individual solution files: solution-01.js through solution-05.js"
);
console.log("🚀 Run: node run-solutions.js for interactive learning!");
console.log("=".repeat(60));
