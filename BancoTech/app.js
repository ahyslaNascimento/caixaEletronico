import dados from '../data.json';

const prompt = require('prompt-sync')(); // Configuração do prompt
let opcao = 0;


// Programa exibindo o menu principal.
function iniciarPrograma() {
    do {

        exibirMenu();

    } while (opcao != 0)
}

function continuar() {
    console.log("Gostaria de continuar no programa? ");
    let opcao2;
    do {
        opcao2 = prompt("S/N").toUpperCase();
        if (opcao2 == 'N') {
            opcao = 0
        } else if (opcao2 !== 'S') {
            console.log('Opção inválida. Tente novamente.');
        }

    } while (opcao2 !== 'N' && opcao2 !== 'S')
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
    console.clear();
    processarOpcao(opcao);
    continuar();
    console.clear();
}

// Funções para cada opção do menu que o usuário vai escolher
function acessarConta() {
    //transformando os dados do json em um array de contas
    const contas = dados.contas;

    console.log('Bem Vindo a sua conta Tech!');
    // armazenando os dados
    const contaInformada = prompt("Digite sua conta: ");
    const senhaInformada = prompt("Digite sua senha: ");

    //conta encontrada
    // transformar em uma função
    const contaEncontrada = contas.find(conta => { return conta.numeroConta === contaInformada && conta.senha === senhaInformada; });


    // Função autenticar usuário : 
    //caso a conta e senha informados sejam válidas, mostrar menu minha conta
    // (ver saldo, sacar, depositar, ver informações do cliente, alterar senha e sair), 
    //caso seja inválida pedir para o usuário informar novamente
    // Lógica da opção acessar conta
}

function criarConta() {
    console.log('Crie sua conta em segundos!');
    dados.contas.push(novoUsuario); // adcionando novo, mandando pro json

    const novoUsuario = {
        "id": novoId,
        "nome": nome,
        "senha": senha,
        "tipoConta": tipoConta,
        "agencia": agencia,
        "conta": conta,
        "saldo": parseFloat(saldoInicial) || 0.00
    };

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