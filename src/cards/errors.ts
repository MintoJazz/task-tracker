export class InvalidCardTitleError extends Error {
  constructor(reason: string) {
    super(`Título de cartão inválido: ${reason}`);
    this.name = 'InvalidCardTitleError';
  }
}

export class InvalidCardColumnError extends Error {
  constructor(reason: string) {
    super(`Coluna do cartão inválida: ${reason}`);
    this.name = 'InvalidCardColumnError';
  }
}

export class InvalidPriorityError extends Error {
  constructor(value: unknown) {
    super(`Prioridade inválida: "${String(value)}". Use "baixa", "média" ou "alta".`);
    this.name = 'InvalidPriorityError';
  }
}

export class DuplicateCardTitleError extends Error {
  constructor(title: string) {
    super(`Já existe um cartão com o título "${title}" nesta coluna.`);
    this.name = 'DuplicateCardTitleError';
  }
}

export class WipLimitExceededError extends Error {
  constructor() {
    super(`O limite de WIP (Work In Progress) desta coluna foi excedido.`);
    this.name = 'WipLimitExceededError';
  }
}

export class CardNotFoundError extends Error {
  constructor(id: string) {
    super(`Cartão ${id} não encontrado.`);
    this.name = 'CardNotFoundError';
  }
}