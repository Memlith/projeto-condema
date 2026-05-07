# COMDEMA – Portal Institucional de Meio Ambiente
**Conselho Municipal de Defesa do Meio Ambiente**  
Interior de São Paulo — Portal Web Institucional v1.0

---

## 📁 Estrutura de Arquivos

```
comdema/
├── index.html      ← Estrutura e conteúdo da página
├── style.css       ← Estilos, responsividade e animações
├── script.js       ← Interatividade e componentes JS
└── README.md       ← Este arquivo
```

---

## ▶️ Como Executar

### Opção 1 — Abrir diretamente no navegador
1. Faça download ou clone a pasta `comdema/`
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari)

### Opção 2 — Servidor local (recomendado para desenvolvimento)
```bash
# Com Python 3
cd comdema
python3 -m http.server 8080

# Acesse: http://localhost:8080
```

```bash
# Com Node.js / npx
npx serve comdema

# Acesse: http://localhost:3000
```

---

## ✅ Funcionalidades Implementadas

| Funcionalidade              | Descrição |
|-----------------------------|-----------|
| **Mobile First**            | Layout desenvolvido do menor para o maior breakpoint |
| **Responsividade**          | Celular, tablet e desktop (breakpoints: 480/640/768/900px) |
| **Acessibilidade**          | Skip link, ARIA labels, roles, contraste, botões acessíveis |
| **Alto Contraste**          | Modo de alto contraste com persistência em localStorage |
| **Tamanho de Fonte**        | Botões A+ / A- com persistência em localStorage |
| **Navegação Mobile**        | Menu hamburguer com overlay e fechamento por ESC |
| **Scroll Suave**            | CSS `scroll-behavior: smooth` |
| **Header Sticky**           | Header fixo com sombra ao scroll |
| **Hero Animado**            | Blobs animados + partículas JS + animações de entrada |
| **Contadores Animados**     | Hero stats com contagem progressiva (IntersectionObserver) |
| **Animações por Scroll**    | Elementos animam ao entrar na viewport (IntersectionObserver) |
| **Tabs de Educação**        | Abas interativas com 4 categorias de conteúdo ambiental |
| **Guia de Lixeiras**        | Visual colorido com as 5 categorias de reciclagem |
| **Chatbot Simulado**        | Bot com 5 opções + campo de texto livre + indicador de digitação |
| **WhatsApp Float**          | Botão flutuante animado com mensagem pré-definida |
| **SEO Básico**              | Meta tags: description, keywords, author, Open Graph |
| **Redução de Movimento**    | Respeita `prefers-reduced-motion` |

---

## 🎨 Paleta de Cores

| Variável CSS          | Cor HEX   | Uso |
|-----------------------|-----------|-----|
| `--forest`            | `#2d6a4f` | Cor principal verde-floresta |
| `--forest-dark`       | `#1b4332` | Fundos escuros, header, gradientes |
| `--forest-deep`       | `#081c15`  | Footer |
| `--green-400`         | `#4ade80` | Destaques e acentos |
| `--green-600`         | `#16a34a` | Botões primários |
| `--water`             | `#0ea5e9` | Elementos de água |
| WhatsApp              | `#25d366` | Botão flutuante e chatbot |

---

## 📱 Breakpoints Responsivos

| Breakpoint | Dispositivo |
|------------|-------------|
| `< 480px`  | Celular pequeno |
| `480px`    | Celular grande |
| `640px`    | Tablet pequeno |
| `768px`    | Tablet |
| `900px`    | Laptop / Desktop |
| `1200px`   | Desktop wide (container máx.) |

---

## 🔧 Personalização

### Número de WhatsApp
No `index.html` e no `script.js`, substitua `5519900000000` pelo número real:
```
https://wa.me/55XXXXXXXXXXX?text=...
```

### Nome do município
Substituir todas as ocorrências de `município` e `Município – SP` pelo nome real.

### E-mail institucional
Substituir `comdema@municipio.sp.gov.br` pelo e-mail real.

### Dados dos conselheiros
Os números na seção de stats (12 conselheiros, 340 denúncias, 28 campanhas) podem ser atualizados nos atributos `data-target` no `index.html`:
```html
<span class="stat-item__number" data-target="12">0</span>
```

---

## 🚀 Preparado para Backend

A estrutura está pronta para integração futura com:
- **PHP / Laravel / Node.js** para formulários de denúncia
- **CMS** (WordPress, Strapi) para gestão de notícias e campanhas
- **API REST** para busca de notícias e comunicados
- **Banco de dados** para registro e protocolo de denúncias
- **WhatsApp Business API** para substituir o chatbot simulado

---

## 📦 Dependências Externas (CDN)

| Biblioteca   | Versão   | Uso |
|--------------|----------|-----|
| Lucide Icons | latest   | Todos os ícones SVG |
| Google Fonts | —        | Fraunces (display) + DM Sans (body) |

**Sem dependências de frameworks JS** — código vanilla puro, leve e rápido.

---

## 🌿 Desenvolvido para

> Portal institucional do **COMDEMA** — Conselho Municipal de Defesa do Meio Ambiente  
> Prefeitura Municipal — Interior de São Paulo  
> Versão 1.0 — 2025
