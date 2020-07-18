import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TodoItem } from './todo-item';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllTodos should return empty', () => {
    expect(service.getAllTodos()).toEqual([]);
  });

  it('#getAllTodos - Add a TODO - should return Non empty array', () => {
    service.addTodo('Dummy',100);
    expect(service.getAllTodos().length).toBe(1);
  });

  it('#getAllTodos should return correct id', () => {
    service.addTodo('Dummy',100);
    let todo = service.getAllTodos();
    console.log(">>>>>>>>>>>> " + todo[0]);
    expect(todo[0].id).toBe(0);
  });

  it('service should return correct priority', () => {
    service.addTodo('Dummy',100);
    let todo = service.getAllTodos();
    console.log(">>>>>>>>>>>> " + todo[0]);
    expect(todo[0].priority).toBe(100);
  });

  it('service should delete the object', () => {
    service.addTodo('Dummy',100);
    service.deleteTodo(0);
    let todo = service.getAllTodos();
    expect(todo.length).toBe(0);
  });


  it('service default isComplete should be false', () => {
    service.addTodo('Dummy',100);
    let todo = service.getAllTodos();
    expect(todo[0].isComplete).toBe(false);
    
  });

  
  it('service default isComplete should be false', () => {
    service.addTodo('Dummy',100);
    let todo = service.getAllTodos();
    expect(todo[0].isComplete).toBe(false);
  });
});
