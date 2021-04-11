import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../actions/index';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.closeForm();
    }

    onEditTask = () => {
        this.props.openForm();
        this.props.onEditTask(this.props.task);
    }

    render() {

        var { task, index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus} className={task.status === true ? 'label label-success' : 'label label-danger'}>
                        {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning">
                        <span
                            className="fa fa-pencil mr-5"
                            onClick={this.onEditTask}
                        >Sửa</span>
                    </button>
                                &nbsp;
                            <button onClick={this.onDelete} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5">Xóa</span>
                    </button>
                </td>
            </tr>
        );
    };
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(action.onUpdateStatus(id));
        },

        onDeleteTask: (id) => {
            dispatch(action.deleteTask(id));
        },

        closeForm: () => {
            dispatch(action.closeForm())
        },

        openForm: () => {
            dispatch(action.openForm());
        },

        onEditTask: (task) => {
            dispatch(action.editTask(task));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
