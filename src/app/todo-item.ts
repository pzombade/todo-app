
export enum Priorities{
    Low,
    Medium,
    High,
    Critical
}


export class TodoItem {
    constructor( 
        public id: number,
        public todoText: string,
        public priority: number,
        public isComplete: boolean ){
    }
    
}


