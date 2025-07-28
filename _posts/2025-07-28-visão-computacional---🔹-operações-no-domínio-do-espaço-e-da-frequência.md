---
layout: post
title: "Visão Computacional - Operações no domínio do espaço e da frequência"
date: 2025-07-28 10:59:21 
categories: [dev]
---

Bem-vindo de volta ao nosso cantinho de tecnologia, onde vamos mergulhar juntos no fascinante mundo da Visão Computacional! Hoje, vamos explorar as Operações no domínio do espaço e da frequência, duas áreas essenciais para processamento de imagens e reconhecimento visual.

## Operações no Domínio do Espaço

Quando falamos de operações no domínio do espaço na Visão Computacional, estamos nos referindo ao processamento direto dos pixels de uma imagem. Essas operações são realizadas pixel a pixel e incluem tarefas como filtragem, detecção de bordas, suavização e segmentação.

Vamos dar uma olhada em um exemplo simples de detecção de bordas em uma imagem usando o filtro Sobel em Python:

```python
import cv2
import numpy as np

# Carregar a imagem
imagem = cv2.imread('imagem.jpg', cv2.IMREAD_GRAYSCALE)

# Aplicar o filtro Sobel para detectar bordas
sobelx = cv2.Sobel(imagem, cv2.CV_64F, 1, 0, ksize=5)
sobely = cv2.Sobel(imagem, cv2.CV_64F, 0, 1, ksize=5)

# Mostrar as imagens resultantes
cv2.imshow('Sobel X', sobelx)
cv2.imshow('Sobel Y', sobely)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

## Operações no Domínio da Frequência

Já as operações no domínio da frequência envolvem a transformação da imagem do domínio espacial para o domínio da frequência, onde podemos analisar as características da imagem de uma maneira diferente. A Transformada de Fourier é uma das ferramentas mais comuns utilizadas para isso.

Vamos dar uma olhada em como aplicar a Transformada de Fourier em uma imagem em Python:

```python
import cv2
import numpy as np
from matplotlib import pyplot as plt

# Carregar a imagem em tons de cinza
imagem = cv2.imread('imagem.jpg', 0)

# Aplicar a Transformada de Fourier
f = np.fft.fft2(imagem)
fshift = np.fft.fftshift(f)
magnitude_spectrum = 20*np.log(np.abs(fshift))

# Exibir a imagem original e o espectro de frequência
plt.subplot(121), plt.imshow(imagem, cmap='gray')
plt.title('Imagem de entrada'), plt.xticks([]), plt.yticks([])
plt.subplot(122), plt.imshow(magnitude_spectrum, cmap='gray')
plt.title('Espectro de Frequência'), plt.xticks([]), plt.yticks([])
plt.show()
```

E aí está! Uma visão geral das Operações no domínio do espaço e da frequência em Visão Computacional. Espero que esse mergulho tenha sido útil e esclarecedor para você. Continue explorando e experimentando com diferentes técnicas para aprimorar suas habilidades em Visão Computacional! ✨👁️🖥️