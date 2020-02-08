// let x = 1;
// function A(y) {
//   let x = 2;
//   function B(z) {
//     console.log(x + y + z)
//   }
//   return B
// }
// let C = A(2)
// C(3)


// let a = 12, b = 12;
// function fn() {
//   let a = b = 13;
//   console.log(a, b)
// }
// fn()
// console.log(a, b)

let i = 1;
let fn = function (i) {
  return function (n) {
    return console.log(n + (++i))
  }
}
let f = fn(1)
f(2)
fn(3)(4)
f(5)
console.log(i)