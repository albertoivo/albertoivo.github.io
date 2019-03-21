---
layout: post
title: Mastering console
category: Dev
tags: [javascript]
keywords:
  - javascript
---

`console.xxx` is a great way to debug the code. I know that we could use a debug tool, but I prefer console. So let's see some useful hint about it.


```javascript
// Interpolated
let old = 'Old Way'
let es6 = 'EcmaScript 6'

// old way
console.log('Hello, my name is %s!!!', old)

// ES6 way
console.log(`Hello, my name is ${es6}!!!`)
```
Resultado:

![](../../images/console01.png)

```javascript
// Styled
console.log('%c I am a great Text', 'font-size:50px; background: blue;')
```
Resultado:

![](../../images/console02.png)


```javascript
// Warning
console.warn('Oh nooooooo!')

// error
console.error('Shit!')

// info
console.info('This is a useful info.')
```
Resultado:

![](../../images/console03.png)


```javascript
// testing
console.assert(1 === 1, 'This msg will NOT be showed')
console.assert(1 === 2, 'This msg WILL be showed')
```
Resultado:

![](../../images/console04.png)


```javascript
// clearing
console.clear()
```


```javascript
// viewing DOM elements
const p = document.querySelector('p')

console.log(p)
console.dir(p)
```
Resultado:

![](../../images/console05.png)


```javascript
// grouping together
const people = [
	{ name: 'Alberto', age: '34'},
	{ name: 'Mari', age: '33'}
]

people.forEach(p => {
  console.group(`${p.name}`)
  console.log(`This is ${p.name}.`)
  console.log(`${p.name} is ${p.age} years old.`)
  console.groupEnd(`${p.name}`)
})

// table
console.table(people)
```
Resultado:

![](../../images/console06.png)


```javascript
// counting
console.count('Alberto')
console.count('Ivo')
console.count('Alberto')
console.count('Alberto')
console.count('Ivo')
```
Resultado:

![](../../images/console07.png)


```javascript
// timing
console.time('fetch data')
fetch('https://api.github.com/users/albertoivo')
  .then(resp => resp.json())
  .then(() => console.timeEnd('fetch data'))
```

Resultado:

![](../../images/console08.png)