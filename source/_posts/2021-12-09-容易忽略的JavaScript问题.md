---
title: 容易忽略的JavaScript问题
date: 2021-12-09 10:22:31
categories: 'JavaScript' 
cover: 
tags: 
---

#### 1.typeof('abc')和 typeof 'abc'都是 string, 那么 typeof 是操作符还是函数？

首先可以给出明确的答案: typeof是操作符。如果 typeof 为 function，那么 typeof(typeof) 会返回'function'，但经过测试上述代码会报错，说明typeof并非函数。

> 括号的作用是进行分组而非函数的调用。—— 《javascript 高级程序设计》

**扩展**: typeof可以返回7种数据类型：number、string、boolean、undefined、object、function ，以及 ES6 新增的 symbol，对于原始数据类型中除了null都可以正确判断，对于引用类型除了函数会返回function,其余都会返回object。

**基本数据类型**： Number、String、Boolean、Null、 Undefined、Symbol

**引用数据类型**： object 

**instanceof**可以区分Array、Object和Function以及自定义的类的实例， 但是无法判断基本数据类型。

Object.prototype.toString.call()可以精准的判断数据类型，一般需要封装后使用，直接使用的效果：toString.call(()=>{}) '[object Function]'即统一返回格式“[object Xxx]” 的字符串

#### 2.number能表示的整数的最大范围？

安全的整数范围为15位数以下，项目中ID会存在超过15位数的情况， 所以推荐使用string。

#### 3.slice和splice的区别？

slice用来截取数组和字符串， 而splice用来对数组元素进行增删。