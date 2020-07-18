import { TodoItem } from './todo-item';

describe('TodoItem', () => {
  it('should create an instance', () => {
    expect(new TodoItem(100,'Test',1,true)).toBeTruthy();
  });

  
});
