import React, { Component } from 'react';
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { addTodo: false, selectedTodo: null, todos: [] };
        this.getTodos = this.getTodos.bind(this);
        this.selectTodo = this.selectTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.setStateAdd = this.setStateAdd.bind(this);
        this.isCompleteChange = this.isCompleteChange.bind(this);
    }

    componentDidMount() {
        this.getTodos();
    }

    selectTodo(todo) {
        if (this.state.selectedTodo == null || todo.id !== this.state.selectedTodo.id)
            this.setState({ selectedTodo: todo });
        else
            this.setState({ selectedTodo: null });
    }

    setStateAdd() {
        this.setState({ addTodo: !this.state.addTodo });
    }

    isCompleteChange(todo) {
        let updatedTodo = { ...todo };
        updatedTodo.isComplete = !todo.isComplete;

        this.updateTodo(updatedTodo);
    }

    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossOrigin="anonymous"
                />
                <NavMenu selectedTodo={this.state.selectedTodo} addTodo={this.state.addTodo} setStateAdd={this.setStateAdd} deleteTodo={this.deleteTodo} />
                <Home props={this.state} selectTodo={this.selectTodo} setStateAdd={this.setStateAdd} isCompleteChange={this.isCompleteChange} getTodos={this.getTodos} />
            </div>
        );
    }

    async getTodos() {
        const response = await fetch('Todo/Todos');
        const data = await response.json();

        data.sort((a, b) => {
            var ret = new Date(a.deadline) - new Date(b.deadline);
            if (ret === 0) {
                ret = a.id < b.id ? -1 : 1;
            };

            return ret;
        });

        var nestedTodos = data.filter(x => { return x.parentId == null }).map(todo => {
            let nestedTodo = todo;
            nestedTodo.children = data.filter(x => { return x.parentId === todo.id });

            if (this.state.selectedTodo?.id === nestedTodo.id)
                this.setState({ selectedTodo: nestedTodo });

            return nestedTodo;
        })

        this.setState({ todos: nestedTodos });
    }

    async updateTodo(todo) {
        await fetch('Todo/Todos', {
            method: "PUT", body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this.getTodos);
    }

    async deleteTodo() {
        await fetch(`Todo/Todos/${this.state.selectedTodo.id}`, { method: "DELETE" })
            .then(() => {
                this.setState({ selectedTodo: null });
                this.getTodos();
            });
    }
}
