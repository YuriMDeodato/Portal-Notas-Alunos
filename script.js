var qtdNotas = 4;
var qtdAlunos = 5;

function desenharTabela() {
  const tabela = document.querySelector("#tabela");
  let dadoAntigo = "";
  for (let aluno = 1; aluno <= qtdAlunos; aluno++) {
    dadoAntigo = tabela.innerHTML;
    tabela.innerHTML =
      dadoAntigo +
      `<tr id=linha${aluno}>
                        <th>${aluno}</th>
                        <td><input type="text" class="form-control" id="nome${aluno}" placeholder="nome"></td>
                        <td><input type="number" class="form-control" id="nota1-${aluno}" placeholder=""></td>
                        <td><input type="number" class="form-control" id="nota2-${aluno}" placeholder=""></td>
                        <td><input type="number" class="form-control" id="nota3-${aluno}" placeholder=""></td>
                        <td><input type="number" class="form-control" id="nota4-${aluno}" placeholder=""></td>
                        <td><output id="media${aluno}"></output></td>
                        <td><output id="situacao${aluno}"></output></td>
      </tr>`;
  }
}
function addAluno() {
  qtdAlunos = qtdAlunos + 1;

  const tabela = document.querySelector("#tabela");
  //Criação dos elementos
  let linha = document.createElement("tr");
  let headerLinha = document.createElement("th");
  let dadoNome = document.createElement("td");
  let inNome = document.createElement("input");
  let dadoNota = "";
  let inNota = "";
  let dadoMedia = document.createElement("td");
  let outMedia =  document.createElement("output");
  let dadoSituacao = document.createElement("td");
  let outSituacao =  document.createElement("output");

  linha.id = `linha${qtdAlunos}`;

  headerLinha.innerText = qtdAlunos;

  inNome.classList.add("form-control");
  inNome.id = `nome${qtdAlunos}`;
  inNome.type = "text";
  inNome.placeholder = "nome";

  dadoNome.appendChild(inNome);
  linha.appendChild(headerLinha);
  linha.appendChild(dadoNome);

  for (let nota = 1; nota <= qtdNotas; nota++) {
    dadoNota = document.createElement("td");
    inNota = document.createElement("input");
    inNota.classList.add("form-control");
    inNota.id = `nota${nota}-${qtdAlunos}`;
    inNota.type = "number";

    dadoNota.appendChild(inNota);
    linha.appendChild(dadoNota);
  }

  outMedia.id = `media${qtdAlunos}`;
  dadoMedia.appendChild(outMedia);
  linha.appendChild(dadoMedia);

  outSituacao.id = `situacao${qtdAlunos}`;
  dadoSituacao.appendChild(outSituacao);
  linha.appendChild(dadoSituacao);

  tabela.appendChild(linha);
}
function delAluno(){
  if(qtdAlunos > 1){
    let alunoDeletar = document.querySelector(`#linha${qtdAlunos}`);
    document.querySelector('#tabela').removeChild(alunoDeletar);
    qtdAlunos = qtdAlunos - 1;
  }
}
function addNota(){
  qtdNotas =  qtdNotas + 1;

  let colunaReferencia = document.querySelector('#media0');
  let novaColuna = document.createElement('th');

  novaColuna.innerText = `Nota ${qtdNotas}`;
  document.querySelector('#linha0').insertBefore(novaColuna, colunaReferencia);

  for(let aluno = 1; aluno <= qtdAlunos; aluno++){
    let dadoNota = document.createElement("td");
    let inNota = document.createElement("input");
    
    inNota.classList.add("form-control");
    inNota.id = `nota${qtdNotas}-${aluno}`;
    inNota.type = "number";

    dadoNota.appendChild(inNota);
    
    novaColuna = dadoNota;
    colunaReferencia = document.querySelector(`#media${aluno}`).parentElement;
    document.querySelector(`#linha${aluno}`).insertBefore(novaColuna, colunaReferencia);
  }
}
function delNota(){
  if(qtdNotas > 1){
    let notaDeletar = document.querySelector('#media0').previousElementSibling;
    document.querySelector('#linha0').removeChild(notaDeletar);
  
    for(let aluno = 1; aluno <= qtdAlunos; aluno++){
      notaDeletar = document.querySelector(`#nota${qtdNotas}-${aluno}`).parentElement;
      document.querySelector(`#linha${aluno}`).removeChild(notaDeletar);
    }
    qtdNotas = qtdNotas - 1;
  }
}
function calcular() {
  let notaParcial;
  let notaSoma;
  let mediaFinal;
  let situacao = "";
  let situacaoCor = "";
  for (let aluno = 1; aluno <= qtdAlunos; aluno++) {
    notaParcial = 0;
    notaSoma = 0;
    mediaFinal = 0;
    //entrada dos dados
    for (let nota = 1; nota <= qtdNotas; nota++) {
      notaParcial = Number(
        document.getElementById(`nota${nota}-${aluno}`).value
      );
      notaSoma = notaSoma + notaParcial;
    }
    //processamento dos dados
    mediaFinal = notaSoma / qtdNotas;
    if (mediaFinal >= 50) {
      situacao = "Aprovado";
      situacaoCor = "green";
    } else if (mediaFinal >= 45 && mediaFinal < 50) {
      situacao = "Recuperação";
      situacaoCor = "yellow";
    } else if (mediaFinal < 45) {
      situacao = "Reprovado";
      situacaoCor = "red";
    }
    //saida de dados
    document.getElementById(`media${aluno}`).innerText = mediaFinal;
    document.getElementById(`situacao${aluno}`).innerText = situacao;
    document.getElementById(`situacao${aluno}`).style.backgroundColor =
      situacaoCor;
  }
}