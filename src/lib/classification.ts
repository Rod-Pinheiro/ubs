import { 
  DorData, 
  ExamesData, 
  RespiratorioData, 
  EstomagoData, 
  PrenatalData, 
  CriancaData,
  ClassificationResult 
} from './types';

export function calcularPontuacaoDor(dor: DorData): number {
  if (dor.sintomasGraves) {
    return 3;
  }
  if (dor.intensidade >= 7 || dor.temFebre) {
    return 2;
  }
  if (dor.intensidade > 0 && dor.intensidade <= 6) {
    return 1;
  }
  return 0;
}

export function calcularPontuacaoExames(exames: ExamesData): number {
  if (exames.precisaPrioridade) {
    return 3;
  }
  if (exames.hipertensoDiabeticoReceitaAntiga || 
      exames.alteracaoNaQueixa || 
      exames.doencaGrave) {
    return 2;
  }
  if (exames.veioBem) {
    return 1;
  }
  return 0;
}

export function calcularPontuacaoRespiratorio(respiratorio: RespiratorioData): number {
  if (respiratorio.faltaAr || respiratorio.chiado || respiratorio.esforcoRespirar) {
    return 3;
  }
  if (respiratorio.tosseLeve && (respiratorio.temFebre || respiratorio.temCatarro)) {
    return 2;
  }
  if (respiratorio.tosseLeve && !respiratorio.temFebre && !respiratorio.temCatarro) {
    return 1;
  }
  return 0;
}

export function calcularPontuacaoEstomago(estomago: EstomagoData): number {
  if (estomago.vomitosRepetidos || estomago.sangue || estomago.febreAlta) {
    return 3;
  }
  if (estomago.dorForteConstante) {
    return 2;
  }
  if (estomago.enjooDiarreiaLeve) {
    return 1;
  }
  return 0;
}

export function calcularPontuacaoPrenatal(prenatal: PrenatalData): number {
  if (prenatal.sinaisAlarme) {
    return 3;
  }
  if (prenatal.riscoModerado) {
    return 2;
  }
  if (prenatal.tudoBem) {
    return 1;
  }
  return 0;
}

export function calcularPontuacaoCrianca(crianca: CriancaData): number {
  if (!crianca.menor2Anos) {
    return 0;
  }
  if (crianca.sintomasGraves) {
    return 3;
  }
  if (crianca.sintomasLeves) {
    return 2;
  }
  if (crianca.rotinaSemSintomas) {
    return 1;
  }
  return 0;
}

export function getClassificacaoFinal(pontuacao: number): {
  categoria: 'URGÊNCIA' | 'ACESSO AVANÇADO' | 'CUIDADO CONTINUADO';
  descricao: string;
  acao: string;
} {
  if (pontuacao === 3) {
    return {
      categoria: 'URGÊNCIA',
      descricao: 'Atendimento médico imediato necessário',
      acao: 'Encaminhar para triagem de urgência'
    };
  }
  
  if (pontuacao === 1 || pontuacao === 2) {
    return {
      categoria: 'ACESSO AVANÇADO',
      descricao: 'Atendimento prioritário nas próximas horas',
      acao: 'Agendar consulta médica em até 24 horas'
    };
  }
  
  return {
    categoria: 'CUIDADO CONTINUADO',
    descricao: 'Acompanhamento de rotina',
    acao: 'Agendar consulta eletiva conforme disponibilidade'
  };
}

export function calcularClassificacao(data: {
  dor: DorData;
  exames: ExamesData;
  respiratorio: RespiratorioData;
  estomago: EstomagoData;
  prenatal: PrenatalData;
  crianca: CriancaData;
}): ClassificationResult {
  const pontuacoes = {
    dor: calcularPontuacaoDor(data.dor),
    exames: calcularPontuacaoExames(data.exames),
    respiratorio: calcularPontuacaoRespiratorio(data.respiratorio),
    estomago: calcularPontuacaoEstomago(data.estomago),
    prenatal: calcularPontuacaoPrenatal(data.prenatal),
    crianca: calcularPontuacaoCrianca(data.crianca)
  };

  const pontuacaoFinal = Math.max(...Object.values(pontuacoes));
  const classificacao = getClassificacaoFinal(pontuacaoFinal);

  return {
    pontuacaoFinal,
    ...classificacao,
    detalhes: pontuacoes
  };
}