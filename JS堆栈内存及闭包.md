# JS堆栈内存及闭包

## 深入V8底层 GO/VO/AO/EC及作用域和执行上下文

* GO：全局对象
```
var globalObject = {
  Math: {},
  String: {},
  document: {},
  ...
  window: this
}
```
* ECStack：Execution Context Stack 执行环境栈
* EC：Execution Context 执行环境
    - VO：Variable Object 变量对象
    - AO：Activation Object 活动对象（函数的叫做AO， 理解为VO的一个分支）
* Scope 作用域，创建函数的时候赋予
* Scope Chain：作用域链
```
let x = 1;
function A(y) {
  let x = 2;
  function B(z) {
    console.log(x+y+z)
  }
  return B
}
let C = A(2)
C(3)
```
第一步：创建全局执行上下文，将其压入SCStack中
```
ECStack = [
  // 全局执行上下文
  EC(G) = {
    VO(G): {
      ... // 包含全局对象原有的属性
      x = 1;
      A = function(y){...};
      A[[scope]] = VO(G) // 创建函数时就确定作用域
    }
  }
];
```
第二步：执行A(2)
```
ECStack = [
  // A的执行上下文
  EC(A) = {
    // 链表初始化为：AO(A) -> VO(G)
    [scope]: VO(G)
    scopeChain: <AO(A), A[[scope]]>,
    // 创建函数A的活动对象
    AO(A): {
      arguments: [0,2],
      y:2,
      x:2,
      B:function(z){...},
      B[[scope]] = AO(A);
      this: window;
    }
  },

  // 全局执行上下文
  EC(G) = {
    VO(G): {
      ... // 包含全局对象原有的属性
      x = 1;
      A = function(y){...};
      A[[scope]] = VO(G) // 创建函数时就确定作用域
    }
  }
];
```
第三步：执行B/C函数C(3)
```
ECStack = [
  // B的执行上下文
  EC(B) = {
    [scope]: AO(A)
    scopeChain: <AO(B), AO(A), VO(G)>
    // 创建B的活动对象
    AO(B): {
      arguments: [0,3],
      z:3,
      this:window
    }
  }
  // A的执行上下文
  EC(A) = {
    // 链表初始化为：AO(A) -> VO(G)
    [scope]: VO(G)
    scopeChain: <AO(A), A[[scope]]>,
    // 创建函数A的活动对象
    AO(A): {
      arguments: [0,2],
      y:2,
      x:2,
      B:function(z){...},
      B[[scope]] = AO(A);
      this: window;
    }
  },

  // 全局执行上下文
  EC(G) = {
    VO(G): {
      ... // 包含全局对象原有的属性
      x = 1;
      A = function(y){...};
      A[[scope]] = VO(G) // 创建函数时就确定作用域
    }
  }
];
```