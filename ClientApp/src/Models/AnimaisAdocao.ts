export class AnimaisAdocao {
  AnimaisAdocaoId: number;
  NomeAntigo: string;
  NomeAtual: string;
  Especie: string;
  Sexo: number;
  Idade: number;
  Adulto: number;
  Raca: string;
  CorPelagem: string;
  Porte: number;
  Castrado: number;
  Vermifugado: number;
  Raiva: number;
  V10: number;
  Quadrupla: number;
  Dose: number;
  Microchip: number;
  RGA: number;
  PathFoto: string;
  detalhes: string;
  Adotado: number;
}

export enum KdAtivo {
  Não = 0,
  Sim = 1
}

export enum KdSexo {
  Fêmea = 0,
  Macho = 1
}

export enum KdEspecie {
  Cão = 0,
  Gato = 1
}

export enum KdAdulto {
  Filhote = 0,
  Adulto = 1
}

export enum KdPorte {
  Pequeno = 0,
  Médio = 1,
  Grande = 2
}

export enum KdVermifugado {
  Não = 0,
  Sim = 1,
  SemInformação = 2
}

