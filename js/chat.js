if (localStorage.getItem("logado") !== "true") {
    window.location.href = "index.html";
}

const parametros = new URLSearchParams(window.location.search);
const chat = parametros.get("room") || "Grupo";
document.getElementById("chatTitulo").innerText = "Chat: " + chat;

const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const messagens = document.getElementById("messagens");

const historicoConversas = {
    "Grupo": [
        { autor: "Jainara", texto: "Oi povo, alguém já testou a nova interface do chat?" },
        { autor: "Carlos", texto: "Testei sim, Jai, ficou muito bacana com o Tailwind :D" },
        { autor: "Carlos", texto: "E aí, conseguiu fazer login sem problemas?" }
    ],
    "Estudos": [
        { autor: "Carlos", texto: "Alguém conseguiu entender o assunto de callback que o professor ensinou?" },
        { autor: "Ávilla", texto: "Consegui, mas foi difícil"},
        { autor: "Camilly", texto: "Eu entendi, mas preciso praticar mais" },
        { autor: "Jainara", texto: "Pode testar mandar uma mensagem aqui pra gente ver se a internet tá pegando?" }
    ]
};

function renderizarMensagem(autor, texto, isCurrentUser) {
    const msgDiv = document.createElement("div");
    
    if (isCurrentUser) {
        msgDiv.className = "flex flex-col items-end animate-fade-in";
        msgDiv.innerHTML = `
            <div class="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-md shadow-sm">
                <p class="leading-relaxed">${texto}</p> 
            </div>
        `;
    } else {
        msgDiv.className = "flex flex-col items-start";
        msgDiv.innerHTML = `
            <div class="bg-slate-200 text-slate-800 px-4 py-2 rounded-2xl rounded-tl-none max-w-md shadow-sm border border-slate-300">
                <p class="text-xs font-bold text-blue-800 mb-1">${autor}</p>
                <p class="leading-relaxed">${texto}</p>
            </div>
        `;
    }

    messagens.appendChild(msgDiv);
    messagens.scrollTop = messagens.scrollHeight;
}

function carregarHistorico() {
    const mensagensDaSala = historicoConversas[chat] || [];
    mensagensDaSala.forEach(msg => {
        renderizarMensagem(msg.autor, msg.texto, false); 
    });
}

carregarHistorico();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const textoMensagem = input.value.trim();
    if (!textoMensagem) return;
    renderizarMensagem("", textoMensagem, true);
    input.value = "";
});