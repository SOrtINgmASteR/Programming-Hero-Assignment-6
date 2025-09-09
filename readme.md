# 🚀 Programming Hero Assignment 6


## ❓❓ Question Answer:
**Question 1:** What is the difference between `var`, `let`, and `const`?  
**Answer:**   
| Feature        | `var`                             | `let`                | `const`                |
| -------------- | ----------------------------------| ---------------------| -----------------------|
| **Scope**      | Function-scoped                   | Block-scoped `{}`    | Block-scoped `{}`      |
| **Re-declare** | Allowed                           | Not allowed          | Not allowed            |
| **Re-assign**  | Allowed                           | Allowed              | Not allowed            |


**Question 2:** What is the difference between `map()`, `forEach()`, and `filter()`?   
**Answer:**  
`map()` -> Returns new Array & Transform each element.  
`forEach()` -> Doesn't Return a new Array & Iterate over the whole list.   
`filter()` -> Returns new Array & Keep only elements that match a condition.   

**Question 3:** What are arrow functions in ES6?   
**Answer:** It is a different way of Declaring a function with smaller syntax.
```js
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;
```
  
**Question 4:** How does destructuring assignment work in ES6?   
**Answer:** Allows you to unpack values from arrays or objects into variables.   
Array Destructuring:  
```js
const numbers = [10, 20, 30];
const [a, b, c] = numbers;
console.log(a, b, c); 

```
Object Destructuring:
```js
const user = { name: "Alice", age: 25 };
const { name, age } = user;
console.log(name, age);
const { name: username } = user;
console.log(username);
```

**Question 5:** Explain template literals in ES6. How are they different from string concatenation?   
**Answer:**  
- Template literals starts & ends with (``).
- It has the feature of string interpolation with `${}`.
- It has the feature of Multiline strings.
- Also much Easier than string concatenation.

```js
const name = "Alice";
const age = 25;

// Old way concatenation
console.log("My name is " + name + " and I am " + age + " years old.");

// ES6 Template Literal concatenation
console.log(`My name is ${name} and I am ${age} years old.`);

//ES6 Template Literal Multiline strings
const msg = `Hello,
This is a multiline
string!`;
console.log(msg)
```



## 📋 Task

This project is part of Programming Hero's web development course assignments. The main objectives include:  
- Making a responsive page from figma design.
- Using semantic HTML & Tailwind CSS elements.
- The page must be responsive for devices with smaller width
- Using DOM (Document Object Model) to implement some dynamic behavior to the page.
- Fetch data from API & Load it as JSON.
- Then load the data in the HTML page.

## 🛠️ Technologies Used

- HTML5
- Tailwind CSS
- Daisy UI components

## 🚀 Live Demo

[View Live Demo](https://sortingmaster.github.io/Programming-Hero-Assignment-6/)


## 📦 Resources

- Programming Hero Repository Link: `https://github.com/ProgrammingHero1/B12A06-Green-Earth`

Icons, images & figma design are provided in this repository.


## 💻 Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SOrtINgmASteR/Programming-Hero-Assignment-6.git
   ```

2. Open the project folder.
3. Open `index.html` in your browser.