import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';


export class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todo: { parentId: props.selectedTodo?.id, deadline: "", task: "", moreDetails: "" }, loaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        var todo = { ...this.state.todo }
        todo[event.target.name] = value;
        this.setState({ todo: todo });
    }

    handleSubmit(event) {
        this.postTodo();
        event.preventDefault();
    }

    async postTodo() {
        await fetch('Todo/Todos', {
            method: "Post", body: JSON.stringify(this.state.todo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.props.setStateAdd();
            this.props.getTodos();
        });
    }

    render() {
        return (
            <div className="todo-form">
                <h2>Create Todo</h2>

                {
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} xs={5} sm={4} md={3} xl={2}>
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control
                                    required
                                    name="deadline"
                                    type="date"
                                    placeholder="Deadline"
                                    value={this.state.todo.deadline}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                required
                                name="task"
                                type="text"
                                placeholder="Task"
                                value={this.state.todo.task}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>More Details </Form.Label>
                            <Form.Control
                                name="moreDetails"
                                as="textarea"
                                rows={4}
                                value={this.state.todo.moreDetails}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" value="Submit" >Submit</Button>
                        <Button variant="secondary" value="Cancel" onClick={this.props.setStateAdd}>Cancel</Button>

                    </Form>
                }
            </div>
        )
    }
}
