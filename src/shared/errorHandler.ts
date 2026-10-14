import type { NextFunction, Request, Response } from 'express';
import { NotImplementedError } from './errors.js';
import { 
  InvalidCardColumnError, 
  InvalidCardTitleError, 
  InvalidPriorityError, 
  DuplicateCardTitleError, 
  WipLimitExceededError, 
  CardNotFoundError 
} from '../cards/errors.js';
import { ColumnNotFoundError, InvalidColumnNameError } from '../boards/errors.js';

const STATUS_BY_ERROR = new Map<Function, number>([
  [NotImplementedError, 501],
  [InvalidCardTitleError, 400],
  [InvalidCardColumnError, 400],
  [InvalidPriorityError, 400],
  [InvalidColumnNameError, 400],
  [ColumnNotFoundError, 404],
  [CardNotFoundError, 404],
  [DuplicateCardTitleError, 409],
  [WipLimitExceededError, 409],
]);

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const status = STATUS_BY_ERROR.get(err.constructor) ?? 500;
  res.status(status).render('error', { status, message: err.message });
}
