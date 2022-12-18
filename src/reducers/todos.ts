import { FetchTodosAction, Todo, Actions, ActionTypes } from '../actions';

const todosReducer = (state:Todo[]=[], action:Actions)=>{
    switch(action.type){
        case ActionTypes.fetchTodos: 
            return action.payload
        case ActionTypes.deleteTodo:
            return state.filter((todo:Todo)=>{
                return todo.id !== action.payload
            })
        default: 
            return state
    }
}

export {
    todosReducer
}