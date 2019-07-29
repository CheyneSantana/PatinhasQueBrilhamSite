export class AdotanteDTO {
  adotanteId: number;
  adotanteAnimalAdocaoId: number;
  nome: string;
  dtNascimento: Date;
  rg: string;
  cpf: string;
  cep: string;
  endereco: string;
  nroEndereco: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  profissao: string;
  telRes: string;
  telCel: string;
  estado: number;
}

export enum KdEstado {
  Enviado = 0,
  Finalizado = 1,
  Cancelado = 2
}
