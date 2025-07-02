---
layout: post
title: Python Basics - Arithmetic Operators
category: Dev
tags: [python]
---

Python has several artithmetic operators: `+`, `-`, `*`, `/`, `%`, `**`, `//`.

- `+` Addition

```python
>>> print(3 + 2)
5
>>> print(5 + 3)
8
>>> print("Olá, " + "Mundo!")
'Olá, Mundo!'
>>> print(5 + 2 * 3)   # Multiplication first
11
>>> print((5 + 2) * 3) # Parentheses first
21
```

- `-` Subtraction

```python
>>> print(3 - 2)
1
```

- `*` Multiplication

```python
>>> print(3 * 2)
6
>>> print(4 * 5)
20
>>> print("Ha" * 3)
'HaHaHa'
```

- `/` Division

```python
>>> print(9 / 2)
4.5
```

- `%` Mod (the remainder after dividing)

```python
>>> print(9 % 2) # 9 divided by 2 is 4 with a remainder of 1
1
>>> print(10 % 2) # 10 is even, so the remainder is 0
0
```

- `**` Exponentiation (note that `^` does not do this operation, as you might have seen in other languages)

```python
>>> print(3 ** 2) # 3 squared
9
>>> print(2 ** 8) # 2 to the power of 8
256
```

- `//` Divides and rounds down to the nearest integer

```python
>>> print(9 // 2)
4
>>> print(-9 // 2) # Watch out for negative numbers!
-5
```

- `+=` Add and assign

```python
>>> score = 10
>>> score += 5 # Adds 5 to the score
>>> print(score)
15
```

- Comparisons

```python
>>> a = 10
>>> b = 20
>>> print(a == 10)
True
>>> print(a != b)
True
>>> print(a > b)
False
```

- Logical Operators

```python
>>> idade = 25
>>> tem_cnh = True
>>> print(idade >= 18 and tem_cnh == True)
True
>>> print(not (5 > 10))
True
```
