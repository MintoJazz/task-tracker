import type { CardRepository } from './CardRepository.js';
import type { BoardRepository } from '../boards/BoardRepository.js';
import type { ControllerResult } from '../shared/http.js';
import { NotImplementedError } from '../shared/errors.js';
import { Card } from './Card.js';
import { DuplicateCardTitleError, CardNotFoundError, WipLimitExceededError } from './errors.js';
import { ColumnNotFoundError } from '../boards/errors.js';

export class CardController {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly boardRepository: BoardRepository,
  ) {}

  create(body: any): ControllerResult {
    const { title, columnId, priority, description } = body;
    
    if (!this.boardRepository.getDefault().hasColumn(columnId)) {
      throw new ColumnNotFoundError(columnId);
    }

    if (this.cardRepository.existsWithTitleInColumn(title, columnId)) {
      throw new DuplicateCardTitleError(title);
    }

    const card = Card.create(title, columnId, priority, description);
    this.cardRepository.save(card);

    return { status: 302, redirect: '/' };
  }

  move(id: string, body: any): ControllerResult {
    const card = this.cardRepository.findById(id);
    if (!card) throw new CardNotFoundError(id);

    const { columnId } = body;
    const board = this.boardRepository.getDefault();
    
    if (!board.hasColumn(columnId)) {
      throw new ColumnNotFoundError(columnId);
    }

    const column = board.findColumn(columnId);
    if (column.wipLimit !== null) {
      const cardsInColumn = this.cardRepository.findByColumn(columnId).length;
      if (cardsInColumn >= column.wipLimit) {
        throw new WipLimitExceededError();
      }
    }

    card.changeColumn(columnId);
    return { status: 302, redirect: '/' };
  }

  update(id: string, body: any): ControllerResult {
    const card = this.cardRepository.findById(id);
    if (!card) throw new CardNotFoundError(id);

    const { title, description, priority } = body;

    if (title && this.cardRepository.existsWithTitleInColumn(title, card.columnId, id)) {
      throw new DuplicateCardTitleError(title);
    }

    if (title || description !== undefined) card.rename(title ?? card.title, description);
    if (priority) card.changePriority(priority);

    return { status: 302, redirect: '/' };
  }

  remove(id: string): ControllerResult {
    if (!this.cardRepository.findById(id)) throw new CardNotFoundError(id);
    this.cardRepository.delete(id);
    return { status: 302, redirect: '/' };
  }

  showDetail(_id: string): ControllerResult {
    throw new NotImplementedError('CardController#showDetail');
  }

  search(_query: unknown): ControllerResult {
    throw new NotImplementedError('CardController#search');
  }
}
