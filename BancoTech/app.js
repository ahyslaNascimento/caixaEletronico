const fs = require("fs");
const dados = require("./data.json");
const _contas = dados.contas;

const prompt = require("prompt-sync")(); // Configuração do prompt
let opcao = 0;

// Programa exibindo o menu principal.
function iniciarPrograma() {
  do {
    exibirMenu();
  } while (opcao != 0);
}

function continuar() {
  console.log("Gostaria de continuar no programa? ");
  let opcao2;
  do {
    opcao2 = prompt("S/N").toUpperCase();
    if (opcao2 == "N") {
      opcao = 0;
    } else if (opcao2 !== "S") {
      console.log("Opção inválida. Tente novamente.");
    }
  } while (opcao2 !== "N" && opcao2 !== "S");
}''

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
  const contas = _contas;

  console.log("Bem Vindo a sua conta Tech!");
  // armazenando os dados
  const contaInformada = prompt("Digite sua conta: ");
  const senhaInformada = prompt("Digite sua senha: ");

  //conta encontrada
  // transformar em uma função
  const contaEncontrada = contas.find((conta) => {
    return (
      conta.numeroConta === contaInformada && conta.senha === senhaInformada
    );
  });
  //verificando se a conta existe
  if (contaEncontrada) {
    console.log(`Bem-vindo, ${contaEncontrada.nome}!`);

    // exibir  o menu conta caso a conta exista
    exibirMenuConta(contaEncontrada);
  } else {
    console.log("Conta ou senha inválida. Tente novamente.");
  }

  // Função autenticar usuário :
  //caso a conta e senha informados sejam válidas, mostrar menu minha conta
  // (ver saldo, sacar, depositar, ver informações do cliente, alterar senha e sair),
  //caso seja inválida pedir para o usuário informar novamente
  // Lógica da opção acessar conta
}

function criarConta() {
  console.log("=== Cadastro de Contas ===");
  console.log("Informe os dados da nova conta:");
  const nomeNC = prompt("Digite o nome:");
  const senhaNC = prompt("Digite a senha:");
  const tipoContaNC = prompt("Digite o tipo de conta:");
  const agenciaNC = prompt("Digite a agência:");
  const saldoInicial = parseFloat(prompt("Digite o saldo inicial:") || 0.0);

  // Gerar um ID autoincrementado
  const novoId = _contas.length + 1;

  // Gerar um numeroConta autoincrementado
  const numeroContaNC = (_contas.length + 1).toString().padStart(6, "0");

  // Cria um novo objeto de conta para passar para o JSON
  const novaConta = {
    id: novoId,
    nome: nomeNC,
    senha: senhaNC,
    tipoConta: tipoContaNC,
    agencia: agenciaNC,
    numeroConta: numeroContaNC,
    saldo: saldoInicial,
  };

  // Passa o objeto para o JSON
  _contas.push(novaConta);

  // Salvar JSON
  const salvarJSON = { contas: _contas };
  fs.writeFileSync(
    "./BancoTech/data.json",
    JSON.stringify(salvarJSON, null, 2),
    "utf-8"
  );

  console.log("Conta cadastrada com sucesso!");
}

function removerConta() {
  // Encontrar a conta a ser removida
  const contaARemover = contas.find((conta) => {
    return (
      conta.numeroConta === contaInformada && conta.senha === senhaInformada
    );
  });

  //Pedir confirmação para remoção (usar uma váriável senha ou nome)
  // Esse splice o ideal é ficar dentro de um if onde o usuário digitará a confirmação
  _contas.splice(contaARemover, 1);

  // Salvar JSON com a conta removida
  const salvarJSON = { contas: _contas };
  fs.writeFileSync(
    "./BancoTech/data.json",
    JSON.stringify(salvarJSON, null, 2),
    "utf-8"
  );

  console.log("Conta removida com sucesso");
}

function sair() {
  // Lógica da opção sair do programa
  console.log("Saindo do programa...");
  process.exit();
}

// Função para processar a opção escolhida do usuário
function processarOpcao(opcao) {
  switch (opcao) {
    case "1":
      acessarConta();
      break;
    case "2":
      criarConta();
      break;
    case "3":
      removerConta();
      break;
    case "0":
      sair();
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
  }
}

// função que faz o menu da conta ser exibido 
function exibirMenuConta(conta) {
    let opcaoConta;
    do {
        console.log("------------------------");
        console.log("### Menu da Sua Conta ###");
        console.log("------------------------");
        console.log("1) Ver Saldo");
        console.log("2) Sacar");
        console.log("3) Depositar");
        console.log("4) Ver Informações do Cliente");
        console.log("5) Alterar Senha");
        console.log("0) Voltar ao menu principal");

        // solitação para o usuario escolher entre as opções
        opcaoConta = prompt("Escolha uma opção: ");
        console.clear();

        // processando qual opção foi escolhida
        processarOpcaoConta(opcaoConta, conta);

        voltarMenuPrincipal = processarOpcaoConta(opcaoConta, conta);

        // Se a opção escolhida indicar para voltar ao menu principal, sair do loop
        if (voltarMenuPrincipal) {
            console.clear();
            break;
        }

        // Se a opção escolhida não for voltar ao menu principal, continuar exibindo o menu da conta
        if (opcaoConta !== '0') {
            continuar();
            console.clear();
        }

    } while (opcaoConta !== '0');
}

// Para visualizar o saldo da conta
function verSaldo(conta) {
    console.log(`Seu saldo atual é: ${conta.saldo}`);
}

// Para fazer saques
function sacar(conta) {
    const valorSaque = parseFloat(prompt('Digite o valor que deseja sacar:'));
    if (valorSaque <= 0 || isNaN(valorSaque)) {
        console.log('Valor inválido. Tente novamente.');
    } else if (valorSaque > conta.saldo) {
        console.log('Saldo insuficiente. Operação cancelada.');
    } else {
        conta.saldo -= valorSaque;
        console.log(`Saque de R$ ${valorSaque} realizado com sucesso.`);
    }
}

// Fazer depositos
function depositar(conta) {
    const valorDeposito = parseFloat(prompt('Digite o valor que deseja depositar:'));
    if (valorDeposito <= 0 || isNaN(valorDeposito)) {
        console.log('Valor inválido. Tente novamente.');
    } else {
        conta.saldo += valorDeposito;
        console.log(`Depósito de R$ ${valorDeposito} realizado com sucesso.`);
    }
}

// Para mostrar as informações dos clientes
function verInformacoesCliente(conta) {
    console.log(`Informações do Cliente:
        Nome: ${conta.nome}
        Tipo de Conta: ${conta.tipoConta}
        Agência: ${conta.agencia}
        Número da Conta: ${conta.numeroConta}`);
}

// Para alterar a senha
function alterarSenha(conta) {
    const novaSenha = prompt('Digite a nova senha:');
    conta.senha = novaSenha;
    console.log('Senha alterada com sucesso.');
}

function voltarAoMenuPrincipal() {
    console.log('Voltando ao Menu Principal...');
    return true; // Retornando true e indicando que deve voltar ao menu principal
}

// Processando a opção escolhida no menu conta
function processarOpcaoConta(opcao, conta) {
    switch (opcao) {
        case '1':
            verSaldo(conta);
            break;
        case '2':
            sacar(conta);
            break;
        case '3':
            depositar(conta);
            break;
        case '4':
            verInformacoesCliente(conta);
            break;
        case '5':
            alterarSenha(conta);
            break;
        case '0':
            return voltarAoMenuPrincipal(); // Chamando a função e retornando o valor que indica voltar ao menu principal
        default:
            console.log('Opção inválida. Tente novamente.');
    }

    return true; // Retornando true por padrão para continuar exibindo o menu da conta
} 