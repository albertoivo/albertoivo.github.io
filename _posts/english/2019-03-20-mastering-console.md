---
layout: post
title: Mastering console
category: Dev
tags: [javascript]
---

`console.xxx` is a great way to debug the code. I know that one can use a debiug tool, but I prefer console. So let's see some useful hint about it.


```html
<html>

<p>Let's mastering the console.</p>

<script>
  // Interpolated
  let name = 'Ivo'

  // old way
  console.log('Hello, my name is %s!!!', name)

  // ES6 way
  console.log(`Hello, my name is ${name}!!!`)

  // Styled
  console.log('%c I am a great Text', 'font-size:50px; background: blue;')

  // Warning
  console.warn('Oh nooooooo!')

  // error
  console.error('Shit!')

  // info
  console.info('This is a useful info.')

  // testting
  console.assert(1 === 1, 'This msg will NOT be showed')
  console.assert(1 === 2, 'This msg WILL be showed')

  // clearing
  // console.clear()

  // viewing DOM elements
  const p = document.querySelector('p')

  console.log(p)
  console.dir(p)

  // grouping together
  const people = [{
    name: 'Alberto',
    age: '34'
  }, {
    name: 'Mari',
    age: '33'
  }]

  people.forEach(p => {
    console.group(`${p.name}`)
    console.log(`This is ${p.name}.`)
    console.log(`${p.name} is ${p.age} years old.`)
    console.groupEnd(`${p.name}`)
  })

  // table
  console.table(people)

  // counting
  console.count('Alberto')
  console.count('Ivo')
  console.count('Alberto')
  console.count('Alberto')
  console.count('Ivo')

  // timing
  console.time('fetch data')
  fetch('https://api.github.com/users/albertoivo')
    .then(resp => resp.json())
    .then(() => console.timeEnd('fetch data'))
</script>


</html>
```