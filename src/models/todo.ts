export default interface Todo{
    name: string
    status: boolean
    id: number
}

export interface TodoState{
    todos: Todo[],
    currentTodo?: Todo
}