
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
        public priority: Priorities,
        public isComplete: boolean ){
    }
    
}


