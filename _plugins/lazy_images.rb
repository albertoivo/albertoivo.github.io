# frozen_string_literal: true

# Pós-processa o HTML de posts e páginas adicionando:
#   - loading="lazy"     -> imagens fora da viewport só carregam quando necessário
#   - decoding="async"   -> decodificação não bloqueia a renderização
# Melhora Core Web Vitals (LCP/CLS) sem precisar editar cada imagem manualmente.
#
# Aplica apenas em documentos HTML (posts e páginas), preserva <img> que já
# tenham os atributos definidos e ignora imagens marcadas com data-no-lazy.
Jekyll::Hooks.register [:posts, :pages], :post_render do |doc|
  next unless doc.output_ext == ".html"
  next if doc.output.nil?

  doc.output = doc.output.gsub(/<img\b([^>]*)>/i) do
    attrs = Regexp.last_match(1)

    # Respeita opt-out explícito
    next "<img#{attrs}>" if attrs =~ /data-no-lazy/i

    attrs = "#{attrs} loading=\"lazy\"" unless attrs =~ /\bloading\s*=/i
    attrs = "#{attrs} decoding=\"async\"" unless attrs =~ /\bdecoding\s*=/i

    "<img#{attrs}>"
  end
end
