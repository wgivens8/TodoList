import React, { Component } from 'react';
import { Card, Accordion, Row, Col, Form } from 'react-bootstrap'

function TodoOverviewItem(props) {
    return (
        <Row>
            <Col xs={2} lg={1} className="justify-content-xs-center">
                <Form.Check
                    disabled={props.todo.isComplete}
                    type={"checkbox"}
                    className={"large-checkbox"}
                    aria-label="IsComplete"
                    onChange={() => props.isCompleteChange(props.todo)}
                    checked={props.todo.isComplete} />
            </Col>
            <Col>
                <Card className={`${props.todo.parentId == null ? "parent" : "child"} ${props.selectedTodo?.id === props.todo.id && "selected"}`}>
                    <Accordion.Toggle
                        as={Card.Header}
                        eventKey={props.todo.id}
                        className={`${Date.now() > Date.parse(props.todo.deadline) && "overdue"}`}
                        value={props.todo.id}
                        onClick={() => props.selectTodo(props.todo)}>
                        Deadline: {props.todo.deadline} <br />
                        {props.todo.task}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={props.todo.id}>
                        <Card.Body>{props.todo.moreDetails}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Col>
        </Row>
    )
}

function TodoOverview(props) {
    return (
        <React.Fragment>
            <TodoOverviewItem key={props.todo.id} todo={props.todo} selectTodo={props.selectTodo} isCompleteChange={props.isCompleteChange} selectedTodo={props.selectedTodo} />
            {props.todo.children.map(todo =>
                <TodoOverviewItem key={todo.id} todo={todo} selectTodo={props.selectTodo} isCompleteChange={props.isCompleteChange} selectedTodo={props.selectedTodo} />
            )}
        </React.Fragment>
    )
}

export class TodoOverviewList extends Component {
    static displayName = TodoOverviewList.name;

    render() {
        return (
            <div>
                <Accordion defaultActiveKey={this.props.selectedTodo?.id}>
                    {this.props.todos.map(todo =>
                        <TodoOverview key={todo.id} todo={todo} selectedTodo={this.props.selectedTodo} selectTodo={this.props.selectTodo} isCompleteChange={this.props.isCompleteChange} />
                    )}
                </Accordion>
            </div>
        );
    }
}
