/**
 * CONDEMA – Portal Institucional de Meio Ambiente
 * script.js — Versão 1.0
 *
 * Funcionalidades:
 * - Inicialização de ícones Lucide
 * - Menu mobile / hamburger
 * - Header sticky com sombra ao scroll
 * - Tabs de educação ambiental
 * - Contadores animados (hero stats)
 * - Partículas decorativas no hero
 * - Intersection Observer para animações por scroll
 * - Chatbot simulado
 * - Controles de acessibilidade (fonte / contraste)
 * - Atualização do ano no footer
 */

"use strict";

/* =====================================================
   1. INICIALIZAÇÃO PRINCIPAL
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa ícones Lucide
  if (typeof lucide !== "undefined") lucide.createIcons();

  initMobileMenu();
  initStickyHeader();
  initEducationTabs();
  initCounters();
  initParticles();
  initScrollAnimations();
  initChatbot();
  initAccessibility();
  setFooterYear();
});

/* =====================================================
   2. MENU MOBILE
   ===================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mainNav   = document.getElementById("main-nav");
  const overlay   = document.getElementById("menu-overlay");

  if (!hamburger || !mainNav) return;

  function openMenu() {
    hamburger.classList.add("open");
    mainNav.classList.add("open");
    overlay.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    mainNav.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    hamburger.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  // Fecha o menu ao clicar em qualquer link de navegação
  mainNav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* =====================================================
   3. HEADER STICKY COM SOMBRA
   ===================================================== */
function initStickyHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =====================================================
   4. TABS DE EDUCAÇÃO AMBIENTAL
   ===================================================== */
function initEducationTabs() {
  const tabs   = document.querySelectorAll(".edu-tab");
  const panels = document.querySelectorAll(".edu-panel");

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // Remove active de todos
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(p => {
        p.classList.remove("active");
        p.hidden = true;
      });

      // Ativa o alvo
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const panel = document.getElementById(`tab-${target}`);
      if (panel) {
        panel.classList.add("active");
        panel.hidden = false;

        // Re-inicializa ícones dentro do painel recém exibido
        if (typeof lucide !== "undefined") lucide.createIcons();
      }
    });
  });
}

/* =====================================================
   5. CONTADORES ANIMADOS (HERO STATS)
   ===================================================== */
function initCounters() {
  const counters = document.querySelectorAll(".stat-item__number[data-target]");

  if (!counters.length) return;

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };

    requestAnimationFrame(update);
  };

  // Dispara quando os contadores ficam visíveis
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

/* =====================================================
   6. PARTÍCULAS DECORATIVAS NO HERO
   ===================================================== */
function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  // Respeita preferência de redução de movimento
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = window.innerWidth < 640 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,${(Math.random() * 0.15 + 0.03).toFixed(2)});
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particle-float ${Math.random() * 12 + 8}s ease-in-out infinite;
      animation-delay: -${Math.random() * 12}s;
    `;
    container.appendChild(dot);
  }

  // Injeta keyframe se ainda não existe
  if (!document.getElementById("particle-style")) {
    const style = document.createElement("style");
    style.id = "particle-style";
    style.textContent = `
      @keyframes particle-float {
        0%, 100% { transform: translate(0, 0); }
        25%       { transform: translate(${rand(-40, 40)}px, ${rand(-30, 30)}px); }
        50%       { transform: translate(${rand(-40, 40)}px, ${rand(-30, 30)}px); }
        75%       { transform: translate(${rand(-40, 40)}px, ${rand(-30, 30)}px); }
      }
    `;
    document.head.appendChild(style);
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/* =====================================================
   7. INTERSECTION OBSERVER – ANIMAÇÕES POR SCROLL
   ===================================================== */
function initScrollAnimations() {
  const animated = document.querySelectorAll(
    ".animate-fade-up, .animate-slide-left, .animate-slide-right"
  );

  // Elementos dentro do hero já têm animação automática; ignora
  const heroEl = document.querySelector(".hero");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Remove a classe base após animar para liberar estilos
        entry.target.addEventListener("animationend", () => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
        }, { once: true });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animated.forEach(el => {
    // Não observa elementos que já estão dentro do hero
    if (heroEl && heroEl.contains(el)) return;
    // Reseta para invisible antes de observar
    el.style.opacity = "0";
    io.observe(el);
  });
}

/* =====================================================
   8. CHATBOT SIMULADO
   ===================================================== */
function initChatbot() {
  const chatMessages = document.getElementById("chatMessages");
  const chatInput    = document.getElementById("chatInput");
  const chatSend     = document.getElementById("chatSend");
  const chatOpts     = document.querySelectorAll(".chat-opt");

  if (!chatMessages) return;

  // Respostas predefinidas do bot
  const botResponses = {
    denuncia: {
      userMsg: "Fazer uma denúncia ambiental",
      botMsg:  "📋 Para registrar uma denúncia ambiental, você precisa:\n\n• Endereço ou localização do problema\n• Descrição da irregularidade\n• Fotos ou vídeos (se possível)\n\nVocê pode nos enviar tudo isso aqui mesmo ou acessar nosso WhatsApp oficial. Deseja continuar?"
    },
    descarte: {
      userMsg: "Informações sobre descarte correto",
      botMsg:  "♻️ Descarte correto por tipo de resíduo:\n\n🔵 Azul → Papel e papelão\n🔴 Vermelho → Plástico\n🟢 Verde → Vidro\n🟡 Amarelo → Metal\n🟫 Marrom → Orgânicos\n\nEleotrônicos e pilhas: Ecopontos Municipais\nEntulho: Solicite coleta especial. Posso ajudar mais?"
    },
    horarios: {
      userMsg: "Horários e contatos",
      botMsg:  "🕐 Atendimento presencial:\nSegunda a Sexta | 08h00 – 17h00\n\n📍 Rua Exemplo, 123 – Centro\n📞 (19) 3900-0000\n📱 (19) 99000-0000\n✉️ condema@municipio.sp.gov.br\n\nOutro serviço?"
    },
    educacao: {
      userMsg: "Educação ambiental",
      botMsg:  "📚 Nossos materiais de educação ambiental:\n\n• Guia de reciclagem doméstica\n• Manual de compostagem\n• Cartilha de preservação de nascentes\n• Programa CONDEMA nas Escolas\n\nPosso encaminhar materiais pelo seu e-mail. Gostaria?"
    },
    tutoriais: {
      userMsg: "Tutoriais e orientações",
      botMsg:  "🎬 Tutoriais disponíveis:\n\n1. Como separar o lixo em casa\n2. Como fazer compostagem\n3. Como plantar mudas nativas\n4. Como reduzir o consumo de água\n5. Como registrar uma denúncia ambiental\n\nIndique o número do tutorial desejado!"
    }
  };

  // Adiciona mensagem ao chat
  function addMessage(text, type = "bot") {
    const div = document.createElement("div");
    div.className = `chat-msg chat-msg--${type}`;
    const p = document.createElement("p");

    // Suporte a quebras de linha simples
    p.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
    div.appendChild(p);
    chatMessages.appendChild(div);

    // Scroll para o final
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Re-inicializa ícones
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  // Simula digitação do bot
  function botTypingThenReply(text, delay = 800) {
    const typing = document.createElement("div");
    typing.className = "chat-msg chat-msg--bot";
    typing.id = "typing-indicator";
    typing.innerHTML = `<p style="color:#9ca3af;font-size:.8rem">✍️ Digitando...</p>`;
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const ind = document.getElementById("typing-indicator");
      if (ind) ind.remove();
      addMessage(text, "bot");
    }, delay);
  }

  // Sanitização básica de HTML
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Clique nas opções rápidas
  chatOpts.forEach(opt => {
    opt.addEventListener("click", () => {
      const key = opt.dataset.response;
      const res = botResponses[key];
      if (!res) return;

      addMessage(res.userMsg, "user");
      botTypingThenReply(res.botMsg, 900);
    });
  });

  // Envio de mensagem digitada
  function sendUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    // Resposta genérica para mensagens livres
    const genericReply = `Obrigado pela sua mensagem! 🌿\n\nPara um atendimento mais ágil, utilize as opções acima ou entre em contato pelo nosso WhatsApp: (19) 99000-0000. Em horário comercial, respondemos em até 2 horas!`;
    botTypingThenReply(genericReply, 1000);
  }

  chatSend.addEventListener("click", sendUserMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendUserMessage();
  });
}

/* =====================================================
   9. ACESSIBILIDADE — FONTE E CONTRASTE
   ===================================================== */
function initAccessibility() {
  const btnIncrease = document.getElementById("btn-font-increase");
  const btnDecrease = document.getElementById("btn-font-decrease");
  const btnContrast = document.getElementById("btn-contrast");

  // Restaura preferências salvas
  const savedScale   = localStorage.getItem("condema-font-scale");
  const savedContrast = localStorage.getItem("condema-contrast");

  let currentScale = savedScale ? parseFloat(savedScale) : 16;

  if (savedContrast === "on") {
    document.body.classList.add("high-contrast");
  }

  applyFontScale(currentScale);

  if (btnIncrease) {
    btnIncrease.addEventListener("click", () => {
      if (currentScale < 22) {
        currentScale += 2;
        applyFontScale(currentScale);
      }
    });
  }

  if (btnDecrease) {
    btnDecrease.addEventListener("click", () => {
      if (currentScale > 12) {
        currentScale -= 2;
        applyFontScale(currentScale);
      }
    });
  }

  if (btnContrast) {
    btnContrast.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
      const isOn = document.body.classList.contains("high-contrast");
      localStorage.setItem("condema-contrast", isOn ? "on" : "off");
    });
  }

  function applyFontScale(size) {
    document.documentElement.style.setProperty("--font-scale", `${size}px`);
    localStorage.setItem("condema-font-scale", size);
  }
}

/* =====================================================
   10. ANO DINÂMICO NO FOOTER
   ===================================================== */
function setFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}
