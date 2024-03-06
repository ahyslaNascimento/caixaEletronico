const prompt = require('prompt');

// Configuração do prompt
prompt.start();

// Programa exibindo o menu principal.
function iniciarPrograma() {
    exibirMenu();
}

// Chama a função que iniciará o programa
iniciarPrograma();

// Exibir o menu Principal
function exibirMenu() {
    console.log("### Menu Principal ###");
    console.log('Selecione uma opção:');
    console.log("1) Acessar conta");
    console.log("2) Criar conta");
    console.log("3) Remover conta");
    console.log("0) Sair do programa");

    // Usar o prompt.get de forma assíncrona
    prompt.get(['opcao'], (err, result) => {
        if (err) {
            console.error('Erro ao obter a opção do usuário:', err);
            return;
        }

        const opcao = result.opcao;
        processarOpcao(opcao);
    });
}

// Funções para cada opção do menu que o usuário vai escolher
function acessarConta() {
    console.log('Bem Vindo a sua conta Tech!');
    // Lógica da opção acessar conta
    exibirMenu();
}

function criarConta() {
    console.log('Crie sua conta em segundos!');
    // Lógica da opção criar conta
    exibirMenu();
}

function removerConta() {
    console.log('Não nos abandone!');
    // Lógica da opção remover conta
    exibirMenu();
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
            exibirMenu();
    }
}