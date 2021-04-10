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

class TasksInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

    handleIncludeTask = async () => {
        const { name, info, due_date } = this.state
        const arrayTime = due_date.split('/')
        const payload = { name, info, due_date: arrayTime }

        await api.insertTask(payload).then(res => {
            window.alert(`Task inserted successfully`)
            this.setState({
                name: '',
                info: '',
                due_date: '',
            })
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

                <Label>Date Due: </Label>
                <InputText
                    type="text"
                    value={due_date}
                    onChange={this.handleChangeInputTime}
                />

                <Button onClick={this.handleIncludeTask}>Add Task</Button>
                <CancelButton href={'/tasks/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TasksInsert