import { Component, Input, Output } from '@angular/core';
import { TodoItem } from './todo-item';
import { TodoService } from './todo.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Input() todoText;
  @Input() @Output() selectedPriority:number = 2;
  

  rowData:TodoItem[] = [];
  gridApi;
  defaultColDef;
  columnDefs;

  
  priorityArray = [0,1,2,3];
  completedArray = ['No','Yes']

  constructor(private todoService:TodoService, private translate: TranslateService){
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  useLanguage(language: string) {
    this.translate.use(language).subscribe(()=>{
      this.columnDefs = this.todoService.getTodoAgGridColumnDefs(this.priorityArray,this.completedArray);
    });
  }

  ngOnInit(){
    this.defaultColDef = this.todoService.getDefaultTodoAgGridColumnDefs();
   this.columnDefs = this.todoService.getTodoAgGridColumnDefs(this.priorityArray,this.completedArray);
  

    for(let i=0; i<1; i++){
      this.todoService.addTodo("Test_"+i,2);
    }
    this.rowData = this.todoService.getAllTodos();
  }

  deleteSelectedRows() {
    const sureToDelete = confirm("Plase confirm to delete the selected rows.");
    if(sureToDelete){
      const selectRows = this.gridApi.getSelectedRows();
      selectRows.map((rowToDelete) => {
          console.log("Delete " + rowToDelete);
          this.rowData = this.todoService.deleteTodo(rowToDelete.id);
          this.gridApi.setRowData(this.rowData);
      });
    }
  }

  markSelectedRows(markFlag) {
    const selectRows = this.gridApi.getSelectedRows();
    selectRows.map((row) => {
         console.log("Marking " + row);
         row.isComplete = markFlag; 
         this.todoService.replaceTodo(row);
         this.gridApi.setRowData(this.rowData);
    });
  }

  addTodo(){
    if(this.todoText!==''){
      this.todoService.addTodo(this.todoText, this.selectedPriority);
      this.rowData = this.todoService.getAllTodos();
      this.gridApi.setRowData(this.rowData);
      this.todoText="";
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.useLanguage('en');
  }

  onCellValueChanged(params: any) {
    if(params.newValue===''){
      params.data.todoText = params.oldValue;
      alert('Please enter valid todo label!');
    }
    console.log(params.data);
    params.data.isComplete = params.data.isComplete === 'Yes';
    this.todoService.replaceTodo(params.data);
    this.gridApi.setRowData( this.todoService.getAllTodos());
  }

  cellKeyDown(e){
    const keyCode = e.event.keyCode;
    
    if(e.event.ctrlKey && e.event.code==='KeyM'){
      // Mark slected TODOs as complete
      this.markSelectedRows(true);
    }else if(e.event.ctrlKey && e.event.code==='KeyX'){
      // Mark slected TODOs as NOT complete
      this.markSelectedRows(false);
    }else if(keyCode===8 || keyCode===46){
      // Delete Selected Rows
      this.deleteSelectedRows();
    }
  }
}
