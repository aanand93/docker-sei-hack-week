
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class TasksUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            info: '',
            due_date: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputRating = async event => {
        const info = event.target.validity.valid
            ? event.target.value
            : this.state.info

        this.setState({ info })
    }

    handleChangeInputTime = async event => {
        const due_date = event.target.value
        this.setState({ due_date })
    }

    handleUpdateTask = async () => {
        const { id, name, info, due_date } = this.state
        const arrayTime = due_date.split('/')
        const payload = { name, info, due_date: arrayTime }

        await api.updateTaskById(id, payload).then(res => {
            window.alert(`Task updated successfully`)
            this.setState({
                name: '',
                info: '',
                due_date: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const task = await api.getTaskById(id)

        this.setState({
            name: task.data.data.name,
            info: task.data.data.info,
            due_date: task.data.data.due_date.join('/'),
        })
    }

    render() {
        const { name, info, due_date } = this.state
        return (
            <Wrapper>
                <Title>Create Task</Title>

                <Label>Task: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Info: </Label>
                <InputText
                    type="text"
                    value={info}
                    onChange={this.handleChangeInputRating}
                />

                <Label>Due Date: </Label>
                <InputText
                    type="text"
                    value={due_date}
                    onChange={this.handleChangeInputTime}
                />

                <Button onClick={this.handleUpdateTask}>Update Task</Button>
                <CancelButton href={'/tasks/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TasksUpdate