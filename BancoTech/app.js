const fs = require("fs");
const dados = require("./data.json");
const _contas = dados.contas;

const prompt = require("prompt-sync")(); // Configuração do prompt
let opcao = 0;

// para dar um atraso ao aparecer o menu novamente
function sleep(milliseconds) {
  let timeStart = new Date().getTime();
  while (true) {
    let elapsedTime = new Date().getTime() - timeStart;
    if (elapsedTime > milliseconds){
      break;
    }
  }
}

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
} ''

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
  const contaRemover = prompt("Digite sua conta: ");
  const senhaRemover = prompt("Digite sua senha: ");

  // Encontrar a conta a ser removida
  const contaARemover = _contas.find((conta) => {
    return (
      conta.numeroConta.toString() === contaRemover && conta.senha.toString() === senhaRemover
    );
  });

  if (contaARemover) {
    // Esse splice faz a remoção depois da confirmação
    _contas.splice(contaARemover, 1);

    // Salvar JSON com a conta removida
    const salvarJSON = { contas: _contas };
    fs.writeFileSync(
      "./BancoTech/data.json",
      JSON.stringify(salvarJSON, null, 2),
      "utf-8"
    );
    console.log("Conta removida com sucesso");

  } else {
    console.log("Conta não encontrada!");
  }
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

//------------------------------------------//

// Parte Ahysla
// função que faz o menu da conta ser exibido 
function exibirMenuConta(conta) {
  let opcaoConta;
  let voltarMenuPrincipal = false;

  do {
    console.log("------------------------");
    console.log("### Menu da Sua Conta ###");
    console.log("------------------------");
    console.log("1) Ver Saldo");
    console.log("2) Sacar");
    console.log("3) Depositar");
    console.log("4) Ver Informações do Cliente");
    console.log("5) Alterar Senha");
    console.log("0) Voltar ao Menu Principal");

    // solicitação para o usuário escolher entre as opções
    opcaoConta = prompt("Escolha uma opção: ");

    // processando qual opção foi escolhida
    voltarMenuPrincipal = processarOpcaoConta(opcaoConta, conta);

    // Se a opção escolhida não for voltar ao menu principal, continuar exibindo o menu da conta
    if (!voltarMenuPrincipal && opcaoConta !== '0') {
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

// fazer depositos
function depositar(conta) {
  const valorDeposito = parseFloat(prompt('Digite o valor que deseja depositar:'));
  if (valorDeposito <= 0 || isNaN(valorDeposito)) {
    console.log('Valor inválido. Tente novamente.');
  } else {
    conta.saldo += valorDeposito;
    console.log(`Depósito de R$ ${valorDeposito} realizado com sucesso.`);
  }
}

// para mostrar as informações dos clientes
function verInformacoesCliente(conta) {
  console.log(`Informações do Cliente:
        Nome: ${conta.nome}
        Tipo de Conta: ${conta.tipoConta}
        Agência: ${conta.agencia}
        Número da Conta: ${conta.numeroConta}`);
}

// para alterar a senha
function alterarSenha(conta) {
  const novaSenha = prompt('Digite a nova senha:');
  conta.senha = novaSenha;
  console.log('Senha alterada com sucesso.');
}

// para voltar ao menu prinpal ao escolher a opção 0 em menu conta
function voltarAoMenuPrincipal() {
  console.log('Voltando ao Menu Principal...');
  iniciarPrograma();
}


// Processando a opção escolhida no menu conta
function processarOpcaoConta(opcao, conta) {
  switch (opcao) {
    case '1':
      console.clear();
      verSaldo(conta);
      sleep(1000);
      break;
    case '2':
      console.clear();
      sacar(conta);
      sleep(1000);
      break;
    case '3':
      console.clear();
      depositar(conta);
      sleep(1000);
      break;
    case '4':
      console.clear();
      verInformacoesCliente(conta);
      sleep(1000);
      break;
    case '5':
      console.clear();
      alterarSenha(conta);
      sleep(1000);
      break;
    case '0':
      console.clear();
      voltarAoMenuPrincipal();
      sleep(1000);
      break;
    default:
      console.log('Opção inválida. Tente novamente.');
  }
}