export interface DorData {
  intensidade: number; // 0-10
  temFebre: boolean;
  sintomasGraves: boolean; // desmaio, falta de ar, sangramentos
}

export interface ExamesData {
  veioBem: boolean;
  hipertensoDiabeticoReceitaAntiga: boolean;
  alteracaoNaQueixa: boolean;
  doencaGrave: boolean; // câncer/infarto/derrame/pós internação
  precisaPrioridade: boolean;
}

export interface RespiratorioData {
  tosseLeve: boolean;
  temFebre: boolean;
  temCatarro: boolean;
  faltaAr: boolean;
  chiado: boolean;
  esforcoRespirar: boolean;
}

export interface EstomagoData {
  enjooDiarreiaLeve: boolean;
  dorForteConstante: boolean;
  vomitosRepetidos: boolean;
  sangue: boolean;
  febreAlta: boolean;
}

export interface PrenatalData {
  tudoBem: boolean;
  riscoModerado: boolean; // pressão alta, bebê não mexendo, vômitos excessivos, alteração urinária
  sinaisAlarme: boolean; // sangramento, perda de líquido, dor intensa
}

export interface CriancaData {
  menor2Anos: boolean;
  rotinaSemSintomas: boolean;
  sintomasLeves: boolean; // nariz escorrendo, febre leve, tosse leve, bebê brinca normalmente
  sintomasGraves: boolean; // catarro forte, esforço para respirar, febre ≥ 37.8ºC, criança sonolenta, sem responder
}

export interface FormData {
  dor: DorData;
  exames: ExamesData;
  respiratorio: RespiratorioData;
  estomago: EstomagoData;
  prenatal: PrenatalData;
  crianca: CriancaData;
}

export interface ClassificationResult {
  pontuacaoFinal: number;
  categoria: 'URGÊNCIA' | 'ACESSO AVANÇADO' | 'CUIDADO CONTINUADO';
  descricao: string;
  acao: string;
  detalhes: {
    dor: number;
    exames: number;
    respiratorio: number;
    estomago: number;
    prenatal: number;
    crianca: number;
  };
}

export type CategoryKey = keyof ClassificationResult['detalhes'];