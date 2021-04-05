import React, { Component } from 'react';
import { Container, Navbar, Row, Col, Button } from 'react-bootstrap';


function AddTodoButton(props) {
    return (
        <Col xs={4} md={3} lg={2} className="text-center">
            <Button variant="success"
                disabled={props.selectedTodo?.parentId != null || props.selectedTodo?.isComplete ? true : false}
                onClick={props.setStateAdd}>
                {props.selectedTodo == null || props.selectedTodo?.parentId != null ? "Add Todo" : "Add Sub Todo"}
            </Button>
        </Col>
    )
}

function DeleteTodoButton(props) {
    return (
        <Col xs={4} md={3} lg={2} className="text-center">
            <Button variant="danger" disabled={props.selectedTodo == null ? true : false} onClick={props.deleteTodo}>Delete</Button>
        </Col>
    )
}

export class NavMenu extends Component {
    render() {
        return (
            <header>
                <Container>
                    <Row >
                        <Navbar className="justify-content-center" bg="primary" fixed="top">
                            {!this.props.addTodo &&
                                <AddTodoButton selectedTodo={this.props.selectedTodo} setStateAdd={this.props.setStateAdd} />
                            }
                            <Col xs={4} md={3} lg={2} className="text-center">
                                <Navbar.Brand href="/">Todo List</Navbar.Brand>
                            </Col>
                            {!this.props.addTodo &&
                                <DeleteTodoButton selectedTodo={this.props.selectedTodo} deleteTodo={this.props.deleteTodo} />
                            }
                        </Navbar>
                    </Row>
                </Container>
            </header>
        );
    }
}
