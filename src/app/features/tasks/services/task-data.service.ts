import { Injectable } from '@angular/core';
import { DataService, Params } from '../../../services/data.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService extends DataService<Task> {
  public getTasks = (query: Params) => this.get('/', query);
  public createTask() {

  }
}
