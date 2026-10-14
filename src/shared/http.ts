import type { Response } from 'express';

export interface ControllerResult {
  status: number;
  view?: string;
  locals?: Record<string, unknown>;
  redirect?: string;
}

export function respond(res: Response, result: ControllerResult): void {
  if (result.redirect) {
    res.redirect(result.status || 302, result.redirect);
  } else if (result.view && result.locals) {
    res.status(result.status).render(result.view, result.locals);
  } else {
    res.status(result.status).send();
  }
}
