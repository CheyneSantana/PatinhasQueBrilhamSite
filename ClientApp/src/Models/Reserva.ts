export class Reserva {
  reservaId: number;
  nomeDono: string;
  nomePet: string;
  tipoPet: string;
  raca: string;
  idadePet: number;
  portePet: string;
  residencial: string;
  celular: string;
  email: string;
  comentario: string;
  fromDate: Date;
  toDate: Date;
  ticket: number;
  estado: number;
  userid: number;
}

export enum KdEstado {
  Criado = 0,
  Usado = 1,
  Cancelado = 2
}
