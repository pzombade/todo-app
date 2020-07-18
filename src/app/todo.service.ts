import { Injectable } from '@angular/core';
import { TodoItem, Priorities } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos:TodoItem[] = [];
  lastItemIndex = 0;
  constructor() { }

  addTodo(text:string, id){
    const priority = parseInt(id);
    let todo = new TodoItem(this.lastItemIndex++, text, priority, false );
    this.todos.push(todo);
  }

  replaceTodo(td:TodoItem){
    let x = this.todos.filter((item) => item.id === td.id);
    x[0] = td;
  }

  updateTodo(td:TodoItem,selected){
    
    let x = this.todos.filter((item) => item.id === td.id);
     td.isComplete = selected;
     x[0] = td;
  }

  deleteTodo(id){
    this.todos = this.todos.filter((item) => item.id !== id);
    return this.todos;
  }

  getAllTodos(){
    return this.todos;
  }

  getTodoAgGridColumnDefs(priorityArray,completedArray){
    return [
      {headerName: 'Id', field: 'id',headerCheckboxSelection: true,checkboxSelection: true},
      {headerName: 'Priority', editable:true, field: 'priority', cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          cellHeight: 50,
          values: priorityArray
        }
      },
      {headerName: 'Label', field: 'todoText', editable: true,cellRenderer: (params) => {
        if(params.data.isComplete){
          return '<div style="text-decoration:line-through">'+params.data.todoText+'</div>';
        }else{
          return '<div style="text-decoration:none">'+params.data.todoText+'</div>';
        }
      }},
      {headerName: 'Completed', field: 'isComplete', editable:true, cellEditor: 'agSelectCellEditor',
      cellRenderer: params => {
        if(params.data.isComplete){
          return '<div style="color:green;font-weight:bold">Yes</div>';
        }else{
          return '<div>No</div>';
        }
      },
       cellEditorParams: {
         cellHeight: 50,
         values: completedArray
       }
    }
    ];
  }

  getDefaultTodoAgGridColumnDefs(){
    return {
      flex: 1,
      resizable: true,
    };
  }  
}
