import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState{
  fetching: boolean
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state = {
      fetching: false
    }
  }

  componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>, snapshot?: any): void {
    if(!prevProps.todos.length && this.props.todos.length){
      this.setState({
        fetching: false
      })
    }
  }

  fetchData = (): void => {
    this.props.fetchTodos();
    this.setState({
      fetching: true
    })
  };

  deleteHandler = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.deleteHandler(todo.id)}>
          {todo.title}
        </div>
      );
    });
  }

  render(): React.ReactNode {
    console.log(this.props.todos);

    return (
      <div>
        <button onClick={this.fetchData}>fetch</button>
        {this.state.fetching? 'loading' : this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { fetchTodos, deleteTodo })(App);
