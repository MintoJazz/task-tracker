import type { BoardRepository } from './BoardRepository.js';
import type { CardRepository } from '../cards/CardRepository.js';
import type { ControllerResult } from '../shared/http.js';
import { toBoardViewModel } from './boardView.js';

export class BoardController {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly cardRepository: CardRepository,
  ) {}

  showBoard(): ControllerResult {
    const board = this.boardRepository.getDefault();
    const cards = this.cardRepository.findAll();
    return {
      status: 200,
      view: 'board/index',
      locals: { board: toBoardViewModel(board, cards) },
    };
  }

  createColumn(body: any): ControllerResult {
    const { name, wipLimit } = body;
    const board = this.boardRepository.getDefault();
    board.addColumn(name, wipLimit ? Number(wipLimit) : null);
    
    return { status: 302, redirect: '/' };
  }
}
