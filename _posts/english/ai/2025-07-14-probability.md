---
layout: post
title: "Decoding Uncertainty: A Gentle Introduction to Probability Concepts"
category: Dev
tags: [ai, statistics, data-analysis]
---

Life is full of uncertainties, from whether it will rain tomorrow to the chances of your favorite sports team winning their next game. **Probability** is the language we use to quantify these uncertainties. It provides a framework for understanding the likelihood of different events occurring. Think of it as a way to put a number on how likely something is to happen. A probability of 0 means an event is impossible, while a probability of 1 means it's certain. Anything in between represents varying degrees of likelihood.

-----

## Flipping a Coin: The Basics of Probability

Let's start with a simple example: flipping a fair coin. There are two possible outcomes: heads or tails. Assuming the coin is fair, each outcome has an equal chance of occurring.

The probability of an event is calculated as:

$$P(\text{Event}) = \frac{\text{Number of favorable outcomes}}{\text{Total number of possible outcomes}}$$

For a fair coin:

  * $P(\\text{Heads}) = \\frac{1}{2} = 0.5$
  * $P(\\text{Tails}) = \\frac{1}{2} = 0.5$

We can simulate this in Python:

```python
import random

def coin_flip():
 return random.choice(['Heads', 'Tails'])

num_flips = 1000
results = [coin_flip() for _ in range(num_flips)]
heads_count = results.count('Heads')
tails_count = results.count('Tails')

print(f"Number of flips: {num_flips}")
print(f"Heads: {heads_count} (Probability: {heads_count/num_flips:.2f})")
print(f"Tails: {tails_count} (Probability: {tails_count/num_flips:.2f})")
```

As you run this code, you'll see that as the number of flips increases, the observed probabilities of heads and tails get closer to the theoretical probability of 0.5.

-----

## Multiple Trials: Introducing the Binomial Distribution

Now, let's imagine we flip the same fair coin not just once, but a fixed number of times, say 5 times. We're interested in the probability of getting a specific number of heads (or tails). This scenario is perfectly described by the **binomial distribution**.

The binomial distribution models the probability of obtaining a certain number of successes in a fixed number of independent trials, where each trial has only two possible outcomes (success or failure) and the probability of success remains the same for each trial.

In our coin flip example:

  * Each flip is a **trial**.
  * Getting a 'Heads' (or 'Tails') can be considered a **success**.
  * There are a fixed number of trials (n = 5).
  * Each flip is independent of the others.
  * The probability of success (getting Heads, p = 0.5) is constant for each flip.

The probability of getting exactly $k$ successes in $n$ trials in a binomial distribution is given by the formula:

$$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$$

Where:

  * $\\binom{n}{k} = \\frac{n\!}{k\!(n-k)\!}$ is the binomial coefficient, representing the number of ways to choose $k$ successes from $n$ trials.
  * $p$ is the probability of success on a single trial.
  * $(1-p)$ is the probability of failure on a single trial.
  * $k$ is the number of successes we are interested in.

Let's calculate the probability of getting exactly 3 heads in 5 coin flips:

  * $n = 5$
  * $k = 3$
  * $p = 0.5$
  * $1-p = 0.5$

$$P(X=3) = \binom{5}{3} (0.5)^3 (0.5)^{5-3} = \frac{5!}{3!(5-3)!} (0.125) (0.25) = 10 \times 0.03125 = 0.3125$$

So, there's a 31.25% chance of getting exactly 3 heads in 5 coin flips.

We can use Python to calculate binomial probabilities:

```python
from scipy.stats import binom

n = 5 # number of trials
p = 0.5 # probability of success

# Probability of exactly 3 heads
probability_3_heads = binom.pmf(3, n, p)
print(f"Probability of exactly 3 heads in 5 flips: {probability_3_heads:.4f}")

# Probability of 2 or fewer heads
probability_less_than_or_equal_to_2 = binom.cdf(2, n, p)
print(f"Probability of 2 or fewer heads in 5 flips: {probability_less_than_or_equal_to_2:.4f}")
```

-----

## When One Event Affects Another: Conditional Probability

Now, let's add a twist. What if the probability of an event depends on whether another event has already occurred? This is where **conditional probability** comes into play.

Imagine we have two bags of marbles.

  * Bag A contains 5 red marbles and 5 blue marbles.
  * Bag B contains 3 red marbles and 7 blue marbles.

Suppose we randomly choose a bag (with equal probability) and then randomly draw a marble from that bag. What is the probability that the marble we draw is red *given* that we chose Bag A?

The notation for conditional probability is $P(A/B)$, which reads as "the probability of event A occurring given that event B has occurred."

In our marble example, let:

  * Event R = Drawing a red marble
  * Event A = Choosing Bag A
  * Event B = Choosing Bag B

We want to find $P(R|A)$, the probability of drawing a red marble given that we chose Bag A.

Since Bag A has 5 red marbles and a total of 10 marbles, the probability of drawing a red marble if we've already chosen Bag A is simply:

$$P(R|A) = \frac{\text{Number of red marbles in Bag A}}{\text{Total number of marbles in Bag A}} = \frac{5}{10} = 0.5$$

Similarly

$P(R|B) = \\frac{3}{10} = 0.3$.

The formula for conditional probability is:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

Where $P(A \\cap B)$ is the probability of both A and B occurring, and $P(B)$ is the probability of B occurring.

Let's consider another scenario using our coin flips. Suppose we flip a coin twice. What is the probability that the second flip is heads *given* that the first flip was heads?

Let:

  * H1 = First flip is heads
  * H2 = Second flip is heads

We want to find

$P(H2|H1)$

Since the coin flips are independent events, the outcome of the first flip does not affect the outcome of the second flip. Therefore:

$$P(H2|H1) = P(H2) = 0.5$$

However, let's think about a dependent scenario. Suppose we have a deck of 52 cards. We draw one card and don't replace it. What is the probability that the second card we draw is an Ace, given that the first card we drew was also an Ace?

Let:

  * A1 = The first card drawn is an Ace
  * A2 = The second card drawn is an Ace

We want to find 

$P(A2|A1)$

  * The probability of the first card being an Ace, $P(A1) = \\frac{4}{52}$.
  * If the first card drawn was an Ace, there are now only 3 Aces left in a deck of 51 cards.
  * Therefore, the probability of the second card being an Ace given the first was an Ace is:
    $P(A2|A1) = \\frac{3}{51}$

-----

## Updating Our Beliefs with Data: Bayes' Rule

**Bayes' Rule** is a fundamental theorem in probability that describes how to update the probability of a hypothesis based on new evidence. It's like adjusting your beliefs as you gather more information.

In its simplest form, Bayes' Rule is stated as:

$$P(A|B) = \frac{P(B|A) P(A)}{P(B)}$$

Where:

  $P(A|B)$
  
  is the **posterior probability** of hypothesis A being true given evidence B. This is what we want to find.
  
  $P(B|A)$
  
  is the **likelihood** of observing evidence B if hypothesis A is true.
  
  $P(A)$
  
  is the **prior probability** of hypothesis A being true before observing any evidence. This is our initial belief.
  
  $P(B)$
  
  is the **marginal likelihood** or the probability of observing evidence B across all possible hypotheses. It can be calculated as 
  
  $P(B) = P(B|A)P(A) + P(B|\\neg A)P(\\neg A)$
  
  where $\\neg A$ represents the hypothesis that A is not true.

Let's revisit our two bags of marbles example. Suppose we draw a red marble. What is the probability that it came from Bag A?

Let:

  * Event A = Choosing Bag A (Prior probability $P(A) = 0.5$)
  * Event B = Choosing Bag B (Prior probability $P(B) = 0.5$)
  * Event R = Drawing a red marble

We know:

  $P(R|A) = 0.5$
  
  (Likelihood of drawing red if we chose Bag A)
  
  
  $P(R|B) = 0.3$
  
  (Likelihood of drawing red if we chose Bag B)

We want to find

$P(A|R)$

the probability that we chose Bag A given that we drew a red marble.

Using Bayes' Rule:

$$P(A|R) = \frac{P(R|A) P(A)}{P(R)}$$

First, we need to calculate $P(R)$, the overall probability of drawing a red marble:

$$P(R) = P(R|A)P(A) + P(R|B)P(B) = (0.5)(0.5) + (0.3)(0.5) = 0.25 + 0.15 = 0.4$$

Now we can plug this into Bayes' Rule:

$$P(A|R) = \frac{(0.5)(0.5)}{0.4} = \frac{0.25}{0.4} = 0.625$$

So, after drawing a red marble, the probability that it came from Bag A has increased from our initial belief of 0.5 to 0.625. This makes intuitive sense because Bag A has a higher proportion of red marbles.

Bayes' Rule is incredibly powerful and has wide applications in various fields, including medicine (diagnostic testing), spam filtering, machine learning, and many more, where we need to update our understanding based on new data.

Understanding these fundamental concepts of probability lays the groundwork for exploring more advanced statistical techniques and making informed decisions in the face of uncertainty. Keep exploring the fascinating world of probability!