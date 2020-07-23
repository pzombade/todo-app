import { Injectable } from '@angular/core';
import { TodoItem, Priorities } from './todo-item';
import { TranslateService } from '@ngx-translate/core';
import { ICellRendererParams } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos:TodoItem[] = [];
  lastItemIndex = 0;
  constructor( private translate: TranslateService) { }

  addTodo(text:string, id){
    const priority = parseInt(id);
    let todo = new TodoItem(this.lastItemIndex++, text, priority, false );
    this.todos.push(todo);
  }

  replaceTodo(td:TodoItem){
    let x = this.todos.filter((item) => item.id === td.id);
    x[0] = td;
  }

  deleteTodo(id){
    this.todos = this.todos.filter((item) => item.id !== id);
    return this.todos;
  }

  getAllTodos(){
    return this.todos;
  }

  public localizeHeader(parameters: ICellRendererParams): string {
    let headerIdentifier = parameters.colDef.field;
    return this.translate.instant("todo.table."+headerIdentifier);
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
        const text = this.translate.instant(params.data.todoText);
        if(params.data.isComplete){
          return '<div style="text-decoration:line-through">'+text+'</div>';
        }else{
          return '<div style="text-decoration:none">'+text+'</div>';
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
      headerValueGetter: this.localizeHeader.bind(this)
    };
  }  
  
}
