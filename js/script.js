const usuarios = [
    { user: "mimmarcelo", pass: "Teste123" },
    { user: "aluno1", pass: "1234" },
    { user: "aluno2", pass: "4321" },
    { user: "aluno3", pass: "abcd" },
    { user: "aluno4", pass: "0000" }
];

function login() {
    let u = document.getElementById("usuario").value;
    let s = document.getElementById("senha").value;

    let valido = usuarios.find(x => x.user == u && x.pass == s);

    if (valido) {
        localStorage.setItem("logado", "true");
        window.location.href = "chat.html";
    } else {
        alert("Login inválido");
    }
}