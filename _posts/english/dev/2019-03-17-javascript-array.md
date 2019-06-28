---
layout: post
title: JavaScript Array methods
category: Dev
tags: [javascript]
keywords:
  - javascript
---

[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instances inherit from `Array.prototype`. As with all constructors, you can change the constructor's prototype object to make changes to all Array instances. For example, you can add new methods and properties to extend all Array objects. This is used for polyfilling, for example.


Let's practice:

- First of all let's declare some arrays:

  ```javascript
  const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
  ];
  
  const comments = [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 }
  ];
  ```

- The `some()` method tests whether at least one element in the array passes the test implemented by the provided function.

  ```javascript
  // Is at least one person older than 18?
  const isAdult = people.some(
      person => ((new Date()).getFullYear()) - person.year >= 18);
  
  console.log({isAdult}); // {isAdult: true}
  ```

- The `every()` method tests whether all elements in the array pass the test implemented by the provided function.

  ```javascript
  // Every person is older than 18?
  const allAdults = people.every(
      person => ((new Date()).getFullYear()) - person.year >= 19);
  
  console.log({allAdults}); // {allAdults: false}
  ```

- The `find()` method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.

  ```javascript
  // Find is like filter, but instead returns just the one you are looking for
  // find the comment with the ID of 823423
  const comment = comments.find(comment => comment.id === 823423);
  
  console.log(comment); // {text: "Super good", id: 823423}
  ```

- The `findIndex()` method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating no element passed the test.

  ```javascript
  // Find the comment with this ID
  // delete the comment with the ID of 823423
  const index = comments.findIndex(comment => comment.id === 823423);
  console.log(index);
  
  // easier way (change the comments variable): 
  // comments.splice(index, 1);
  
  // Redux way (creates a new variable, since state is immutable):
  const comments02 = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
  ];
  
  console.table(comments);
  console.table(comments02);
  
  ```

- The `Array.isArray()` method determines whether the passed value is an Array.

  ```javascript
  Array.isArray(people);  	// true
  Array.isArray([1, 2, 3]);  	// true
  Array.isArray({foo: 123}); 	// false
  Array.isArray('foobar');   	// false
  Array.isArray(undefined);  	// false
  
  ```

- The `join()` method creates and returns a new string by concatenating all of the elements in an array (or an [array-like object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.

  ```javascript
  let elements = ['Fire', 'Wind', 'Rain'];
  
  console.log(elements.join()); 		// "Fire,Wind,Rain"
  console.log(elements.join(', ')); 	// "Fire, Wind, Rain"
  console.log(elements.join('')); 	// "FireWindRain"
  console.log(elements.join('-')); 	// "Fire-Wind-Rain"
  ```

- The `from()` method creates a **new**, shallow-copied Array instance from an array-like or iterable object.

  ```javascript
  console.log(Array.from('foo'));   // Array ["f", "o", "o"]
  console.log(Array.from([1, 2, 3], x => x + x));   // Array [2, 4, 6]
  
  // But why use "Array.from()" instead of "array_a = array_b"? Let's see:
  
  const fruits = ['banana', 'pineapple', 'apple']
  const fruits2 = fruits
  console.log(fruits, fruits2)
  // Array ["banana", "pineapple", "apple"]
  // Array ["banana", "pineapple", "apple"]
  
  // As you see above, both fruits and fruits2 are the same, right?
  // But what happens if we modify only fruits2?
  
  fruits2[3] = 'strawberry'
  console.log(fruits, fruits2)
  // Array ["banana", "pineapple", "apple", "strawberry"]
  // Array ["banana", "pineapple", "apple", "strawberry"]
  
  // As you see above, both arrays are modified.
  // That happens because "=" creates a reference, not a copy of an array.
  
  // But with Array.from() this won't happen, as it creates a new copy:
  
  fruits3 = Array.from(fruits)
  console.log(fruits, fruits3)
  // Array ["banana", "pineapple", "apple"]
  // Array ["banana", "pineapple", "apple"]
  
  fruits3[3] = 'strawberry'
  console.log(fruits, fruits3)
  // Array ["banana", "pineapple", "apple"]
  // Array ["banana", "pineapple", "apple", "strawberry"]
  ```

> Is there any example you didn't like? Do you want more array methods here? Just tell me and I'll do my best.