const MAX_LINHAS = 15;

function calcularN1(tr) {
    let checkpoints = Array.from(tr.querySelectorAll('.checkpoint')).map(input => parseFloat(input.value) || 0);
    let sprints = Array.from(tr.querySelectorAll('.sprint')).map(input => parseFloat(input.value) || 0);

    checkpoints.sort((a, b) => b - a);
    let maiorNotasCheckpoints = checkpoints.slice(0, 2);

    let n1 = (maiorNotasCheckpoints.reduce((a, b) => a + b, 0) + sprints.reduce((a, b) => a + b, 0)) / 4;
    tr.querySelector('.n1').textContent = n1.toFixed(1);
    return n1;
}

function calcularN2(tr) {
    let n2 = parseFloat(tr.querySelector('.global-solution').value) || 0;
    tr.querySelector('.n2').textContent = n2.toFixed(1);
    return n2;
}

function calcularMediaFinal(tr, n1, n2) {
    let mediaFinal = (n1 * 0.4) + (n2 * 0.6);
    tr.querySelector('.media-final').textContent = mediaFinal.toFixed(1);
}

function atualizarNotas() {
    let todasAsLinhas = document.querySelectorAll('table tbody tr');
    todasAsLinhas.forEach(tr => {
        let n1 = calcularN1(tr);
        let n2 = calcularN2(tr);
        calcularMediaFinal(tr, n1, n2);
    });
}

function adicionarLinha() {
    let tabela = document.querySelector("#quadro-avaliacao-1 tbody");
    let linhas = tabela.querySelectorAll("tr");

    if (linhas.length < MAX_LINHAS) {
        let linhaExemplo = tabela.querySelector("tr");
        let novaLinha = linhaExemplo.cloneNode(true);

        let inputs = novaLinha.querySelectorAll("input");
        inputs.forEach(input => input.value = "");

        tabela.appendChild(novaLinha);

        adicionarValidacaoNosInputs();

        atualizarNotas();
    } else {
        alert("Limite máximo de 15 linhas alcançado.");
    }
}

function removerLinha() {
    let tabela = document.querySelector("#quadro-avaliacao-1 tbody");
    let linhas = tabela.querySelectorAll("tr");

    if (linhas.length > 1) {  
        tabela.removeChild(linhas[linhas.length - 1]);
    }
}

function adicionarValidacaoNosInputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let valor = parseFloat(e.target.value);

            if (valor > 10) {
                e.target.value = 10; 
            } else if (valor < 0) {
                e.target.value = 0; 
            }

            atualizarNotas();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    adicionarValidacaoNosInputs();
    atualizarNotas(); 
});
