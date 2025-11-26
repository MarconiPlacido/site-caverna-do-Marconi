// =============================
// 🔹 Tradutor EN → PT
// =============================
async function traduzir(texto) {
  try {
    const resposta = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`
    );

    const data = await resposta.json();
    return data.responseData.translatedText;
  } catch {
    return texto; // fallback sem travar
  }
}

// =============================
// 🔹 Carregar piada traduzida
// =============================
async function carregarPiada() {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await res.json();
    const div = document.getElementById("noticias");

    const traducao = await traduzir(data.value);

    div.innerHTML = `
      <p>${traducao}</p>
      
    `;
  } catch (erro) {
    console.error("Erro ao carregar piada:", erro);
  }
}

// =============================
// 🔹 Carregar notícias com CACHE
// =============================
async function carregarNoticias() {
  const lista = document.getElementById("lista-noticias");

  // 1 — Tenta API
  try {
    const resposta = await fetch(
      "https://gnews.io/api/v4/top-headlines?country=br&lang=pt&apikey=b4a3712c3bcfd7af4a6ae9020c881caf"
    );

    const data = await resposta.json();

    if (!data.articles) throw new Error("Erro no retorno da API");

    const noticias = data.articles.slice(0, 6); // máximo 6 cards

    // 👉 salvar no cache
    localStorage.setItem("noticiasCache", JSON.stringify(noticias));
    localStorage.setItem("noticiasHora", Date.now());

    renderizarNoticias(noticias);
    return;

  } catch (erro) {
    console.warn("API falhou, usando cache...", erro);
  }

  // 2 — Se falhar → usa CACHE
  const cache = localStorage.getItem("noticiasCache");

  if (cache) {
    renderizarNoticias(JSON.parse(cache));
  } else {
    lista.innerHTML = "<p style='color:white'>Não foi possível carregar notícias hoje 😢</p>";
  }
}

// =============================
// 🔹 Renderizar cards
// =============================
function renderizarNoticias(noticias) {
  const lista = document.getElementById("lista-noticias");
  lista.innerHTML = "";

  noticias.forEach((artigo) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <img class="news-img" src="${artigo.image || '/img/placeholder.jpg'}" alt="">
      <div class="news-content">
        <span class="news-tag">${artigo.source?.name || "Fonte"}</span>

        <h2 class="news-title">${artigo.title}</h2>

        <p class="news-description">
          ${artigo.description || "Sem descrição disponível."}
        </p>

        <a class="news-button" href="${artigo.url}" target="_blank" rel="noopener noreferrer">
          Ler mais
        </a>
      </div>
    `;

    lista.appendChild(card);
  });
}

// =============================
// 🔹 Carregar na página
// =============================
carregarPiada();
carregarNoticias();
