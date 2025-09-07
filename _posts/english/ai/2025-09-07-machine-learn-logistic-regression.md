---
layout: post
title: "Machine Learning Explained: Logistic Regression"
category: Dev
tags: [ai, python, machine learn]
keywords:
  - ai, machine learn
---

If you’ve ever wondered how a computer can predict whether an email is spam or not, whether a customer will buy a product, or whether a patient has a disease, then you’ve already brushed against the power of **Logistic Regression**.

Despite its name, logistic regression isn’t about “regression” — it’s actually a **classification algorithm**. Think of it as a *smart yes/no predictor*.

In this post, we’ll go from the basics all the way to advanced topics, using **Python examples** to make everything practical.

---

## What is Logistic Regression?

At its core, logistic regression is used when the outcome is **categorical**:

* Example: “Yes” vs “No”, “Spam” vs “Not Spam”, “Disease” vs “Healthy”.

Instead of predicting a continuous number (like linear regression does), it predicts a **probability between 0 and 1**.

👉 *Analogy:* Imagine a dimmer switch for light. Instead of being just “on” or “off”, logistic regression gradually turns the brightness up or down depending on the input.

---

## The Intuition Behind Logistic Regression

Linear regression could try to solve classification problems, but the outputs might be less than 0 or greater than 1 — which makes no sense for probabilities.

The solution?
We pass the output of the linear function through the **sigmoid function**:

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

This squashes any number into the range **(0,1)**.

👉 If probability > 0.5 → predict class 1 (Yes).

👉 If probability ≤ 0.5 → predict class 0 (No).

---

## Math Behind Logistic Regression (Simplified)

* **Linear combination of inputs:**

  $$
  z = w_1x_1 + w_2x_2 + \dots + b
  $$

* **Apply sigmoid:**

  $$
  P(y=1|X) = \sigma(z)
  $$

* **Logit (log-odds):**
  Logistic regression models the log-odds of the outcome as a linear function of inputs.

* **Loss function:**
  Instead of minimizing squared error, logistic regression minimizes **cross-entropy loss**.

---

## Binary vs Multi-class Logistic Regression

* **Binary:** Two outcomes (e.g., survive/didn’t survive in Titanic).
* **Multi-class:** One-vs-Rest (OvR) or Softmax regression for more than two outcomes (e.g., classify types of flowers).

---

## Logistic Regression in Python (Step by Step)

Let’s use the famous **Breast Cancer dataset** from scikit-learn.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.datasets import load_breast_cancer

# Load dataset
data = load_breast_cancer()
X, y = data.data, data.target

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluation
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
```

👉 Output includes accuracy, precision, recall, and F1-score.

---

## Visualizing Logistic Regression

### Sigmoid Function

```python
import numpy as np
import matplotlib.pyplot as plt

z = np.linspace(-10, 10, 100)
sigmoid = 1 / (1 + np.exp(-z))

plt.plot(z, sigmoid)
plt.title("Sigmoid Function")
plt.xlabel("z")
plt.ylabel("σ(z)")
plt.grid(True)
plt.show()
```

### ROC Curve (for evaluation)

```python
from sklearn.metrics import roc_curve, auc

y_prob = model.predict_proba(X_test)[:,1]
fpr, tpr, _ = roc_curve(y_test, y_prob)
roc_auc = auc(fpr, tpr)

plt.plot(fpr, tpr, label=f"AUC = {roc_auc:.2f}")
plt.plot([0,1],[0,1],'--',color='gray')
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve")
plt.legend()
plt.show()
```

---

## Regularization in Logistic Regression

* **Overfitting** happens when the model memorizes instead of generalizing.
* Logistic regression uses **regularization** by default in scikit-learn.
* Types:

  * **L1 (Lasso):** can shrink coefficients to zero (feature selection).
  * **L2 (Ridge):** shrinks coefficients but keeps them non-zero.

```python
model_l1 = LogisticRegression(penalty='l1', solver='liblinear')
model_l2 = LogisticRegression(penalty='l2')
```

---

## Advanced Topics

* **Multi-class classification with softmax.**
    - It's handled using the softmax function to generalize logistic regression. It's importante because many real-world problems involve more than two classes.
* **Feature scaling** improves convergence.
    - Features scaling is crucial for logistic regression, especially when using regularization because it ensures that all features contribute equally to the distance computations.
* **Handling imbalanced datasets:** class weights, SMOTE, or resampling.
    - Imbalanced datasets can lead to biased models. Techniques like adjusting class weights or using synthetic data generation (SMOTE) can help.
* **Comparisons with other classifiers:** decision trees, random forests, SVMs.
    - Logistic regression is often a baseline model. Comparing its performance with more complex models helps in understanding its strengths and weaknesses.

---

## Real-World Applications

* 🏦 **Finance:** Loan approval prediction.
* 🩺 **Healthcare:** Disease risk classification.
* 📧 **NLP:** Spam detection in emails.
* 📈 **Marketing:** Predict customer churn.

---

## Common Pitfalls

* Forgetting to scale features.
    - The presence of features with different scales can lead to suboptimal performance.
* Misinterpreting coefficients.
    - Coefficients represent log-odds, not direct probabilities.
* Using logistic regression for non-linear relationships without feature engineering.
    - Logistic regression assumes a linear relationship between the log-odds and the features.
* Interpreting probabilities as certainties.
    - A probability of 0.7 does not mean a 70% chance of the event occurring; it indicates a higher likelihood compared to 0.3.
* Ignoring multicollinearity.
    - Highly correlated features can distort the model's estimates and should be addressed through techniques like PCA or removing redundant features.