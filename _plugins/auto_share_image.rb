# frozen_string_literal: true

# Define automaticamente a imagem de compartilhamento social (og:image / twitter:image)
# de um post a partir da PRIMEIRA imagem encontrada no corpo, quando o post não
# tiver "image:" definido no front-matter.
#
# Assim cada post ganha uma imagem de preview própria sem edição manual, e o
# autor ainda pode sobrescrever definindo "image:" no front-matter.
#
# Roda em :pre_render (antes do Markdown virar HTML) e olha o conteúdo bruto,
# aceitando tanto sintaxe Markdown ![alt](url) quanto <img src="url">.
MARKDOWN_IMAGE = /!\[[^\]]*\]\(\s*(\S+?)\s*(?:"[^"]*")?\)/
HTML_IMAGE = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/i

Jekyll::Hooks.register :posts, :pre_render do |post|
  # Já tem imagem explícita? Respeita.
  next if post.data["image"] && !post.data["image"].to_s.strip.empty?

  content = post.content.to_s

  match = content.match(MARKDOWN_IMAGE) || content.match(HTML_IMAGE)
  next unless match

  url = match[1]

  # Só usa URLs utilizáveis como og:image: absolutas (http/https) ou
  # caminhos internos começando com "/". Ignora caminhos relativos frágeis.
  next unless url.start_with?("http://", "https://", "/")

  post.data["image"] = url
end
