export class AnimaisAdocao {
  animaisAdocaoId: number;
  nomeAntigo: string;
  nomeAtual: string;
  especie: string;
  sexo: number;
  idade: number;
  adulto: number;
  raca: string;
  corPelagem: string;
  porte: number;
  castrado: number;
  vermifugado: number;
  raiva: number;
  v10: number;
  quadrupla: number;
  dose: number;
  microchip: number;
  rga: number;
  pathFoto: string;
  ativo: number;
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

