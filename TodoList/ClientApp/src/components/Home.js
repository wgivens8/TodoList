import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { TodoOverviewList } from './TodoOverviewList';
import { Todo } from './Todo';

export class Home extends Component {
    render() {
        return (
            <Container className="content">
                {this.props.props.addTodo
                    ? <Todo selectedTodo={this.props.props.selectedTodo} selectTodo={this.props.selectTodo} setStateAdd={this.props.setStateAdd} getTodos={this.props.getTodos} />
                    : <TodoOverviewList todos={this.props.props.todos} selectedTodo={this.props.props.selectedTodo} selectTodo={this.props.selectTodo} isCompleteChange={this.props.isCompleteChange} />
                }
            </Container>
        );
    }
}
