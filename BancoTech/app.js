const prompt = require('prompt-sync')(); // Configuração do prompt
let opcao = 0;

// Programa exibindo o menu principal.
function iniciarPrograma() {

    do {

        exibirMenu();

    } while (opcao != 0)
}

// Chama a função que iniciará o programa
iniciarPrograma();

// Exibir o menu Principal
// delay 
function exibirMenu() {
    console.log("----------------------");
    console.log("### Menu Principal ###");
    console.log("----------------------");
    console.log("1) Acessar conta");
    console.log("2) Criar conta");
    console.log("3) Remover conta");
    console.log("0) Sair do programa");
    opcao = prompt("Escolha uma opção: ");
    processarOpcao(opcao);

}

// Funções para cada opção do menu que o usuário vai escolher
function acessarConta() {
    console.log('Bem Vindo a sua conta Tech!');
    nome = prompt("Digite seu nome: ");
    // Lógica da opção acessar conta
}

function criarConta() {
    console.log('Crie sua conta em segundos!');
    // Lógica da opção criar conta

}

function removerConta() {
    console.log('Não nos abandone!');
    // Lógica da opção remover conta

}

function sair() {
    // Lógica da opção sair do programa
    console.log('Saindo do programa...');
    process.exit();
}


// Função para processar a opção escolhida do usuário
function processarOpcao(opcao) {
    switch (opcao) {
        case '1':
            acessarConta();
            break;
        case '2':
            criarConta();
            break;
        case '3':
            removerConta();
            break;
        case '0':
            sair();
            break;
        default:

            console.log('Opção inválida. Tente novamente.');

    }
}