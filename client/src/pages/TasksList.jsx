import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateTask extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/Tasks/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteTask extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the task ${this.props.id} permanently?`,
            )
        ) {
            api.deleteTaskById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class TasksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllTasks().then(tasks => {
            this.setState({
                tasks: tasks.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { tasks, isLoading } = this.state
        console.log('TCL: TasksList -> render -> tasks', tasks)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Task',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Info',
                accessor: 'info',
                filterable: true,
            },
            {
                Header: 'Due Date',
                accessor: 'due_date',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteTask id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateTask id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!tasks.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={tasks}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default TasksList