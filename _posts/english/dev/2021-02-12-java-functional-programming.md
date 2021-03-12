---
layout: post
title: Understanding Java’s Consumer, Supplier and Predicate
category: Dev
tags: [java]
keywords:
  - java
---

Functional programming in Java in a better way.

_Functional interfaces_ provide target types for lambda expressions and method references. Each functional interface has a single abstract method, called the functional method for that functional interface, to which the lambda expression's parameter and return types are matched or adapted.

## `Interface Consumer<T>`

Represents an operation that accepts a single input argument and returns no result. Unlike most other functional interfaces, **Consumer** is expected to operate via side-effects.

```java
void accept(T t);
default Consumer<T> andThen(Consumer<? super T> after);
```
> The `accept` method is the Single Abstract Method (SAM) which accepts a single argument of type T.
> 
> Whereas, the other one `andThen` is a default method used for composition.

```java
List<String> cities = Arrays.asList("Sydney", "Dhaka", "New York", "London");

Consumer<List<String>> upperCaseConsumer = list -> {
    for(int i=0; i< list.size(); i++){
        list.set(i, list.get(i).toUpperCase());
    }
};

Consumer<List<String>> printConsumer = list -> list.forEach(System.out::println);

upperCaseConsumer.andThen(printConsumer).accept(cities);
```

`Consumer` interface has specific implementation types for integer, double and long types

```java
IntConsumer void accept(int x);
DoubleConsumer void accept(double x);
LongConsumer void accept(long x);
```

## `Interface Supplier<T>`

Represents a supplier of results.

There is no requirement that a new or distinct result be returned each time the supplier is invoked.

This is a functional interface whose functional method is `get()`.

```java
T get()
```
```java
Supplier<String> supplier = () -> {
    String res = "Success";
    // Do something and return a result.
    return res;
};

System.out.println(supplier.get());
```

`Supplier` interface has specific implementation types for boolean, integer, double and long types

```java
Booleansupplier boolean getAsBoolean();
DoubleSupplier double getAsDouble();
IntSupplier int getAsInt()
LongSupplier long getAsLong();
```

## `public interface Predicate<T>`

Represents a predicate (boolean-valued function) of one argument.

This is a functional interface whose functional method is `test(Object)`.

```java
boolean	test(T t);

default Predicate<T> and(Predicate<? super T> other)
static <T> Predicate<T>	isEqual(Object targetRef);
default Predicate<T> negate();
static <T> Predicate<T>	not(Predicate<? super T> target);
default Predicate<T> or(Predicate<? super T> other)
```
### Example

#### Code

```java
List<Integer> numbers      = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
List<Integer> moreNumbers1 = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
List<Integer> moreNumbers2 = Arrays.asList(11, 12, 13, 14, 15, 16, 17, 18, 19, 20);

Predicate<Integer> p1 = num -> num < 5;
Predicate<Integer> p2 = n -> n > 3;
Predicate<Integer> p3 = n -> n < 7;

// test()
System.out.println("******* TEST() *********");
System.out.println(p1.test(10) ? "10 is smaller than 5" : "10 is bigger than 5");

// negate()
System.out.println("******* NEGATE() *********");
numbers.stream().filter(p1.negate()).forEach(System.out::println);

// not()
System.out.println("******* NOT() *********");
System.out.println(Predicate.not(p1).test(10));
System.out.println(Predicate.not(p1).test(2));

// and()
System.out.println("******* AND() *********");
numbers.stream().filter(p2.and(p3)).forEach(System.out::println);

// isEqual()
System.out.println("******* ISEQUAL() *********");
Predicate<Object> p4 = Predicate.isEqual(numbers);
System.out.println(p4.test(moreNumbers1));
System.out.println(p4.test(moreNumbers2));

// or()
System.out.println("******* OR() *********");
numbers.stream().filter(p2.or(p3)).forEach(System.out::println);
```

#### Output

```sh
******* TEST() *********
10 is bigger than 5

******* NEGATE() *********
5
6
7
8
9
10

******* NOT() *********
true
false

******* AND() *********
4
5
6

******* ISEQUAL() *********
true
false

******* OR() *********
1
2
3
4
5
6
7
8
9
10
```
