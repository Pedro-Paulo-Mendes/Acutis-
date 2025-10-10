function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function buscar() {
    const nomeDigitado = normalizar(document.getElementById("busca").value);
    const cards = document.querySelectorAll(".geral, .geral1"); 
    let encontrado = false;

    
    cards.forEach(c => c.classList.remove("destaque"));

    cards.forEach(card => {
        const foto = card.querySelector(".foto");
        if (!foto) return;

        const nomes = foto.dataset.nomes
            ? foto.dataset.nomes.split(",").map(n => normalizar(n))
            : [];

        if (nomes.includes(nomeDigitado)) {
            encontrado = true;

           
            card.scrollIntoView({ behavior: "smooth", block: "center" });

            // aplica efeito de destaque
            card.classList.add("destaque");

            // remove efeito após alguns segundos
            setTimeout(() => card.classList.remove("destaque"), 1500);
        }
    });

    if (!encontrado) {
        alert("Nome não encontrado");
    }
}

document.getElementById("busca").addEventListener("keypress",function(event)
{
    if (event.key==="Enter"){
        event.preventDefault();
        buscar();
    }
});
