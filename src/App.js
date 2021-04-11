import React, { Component } from 'react';
import './App.css';
import TaskFrom from './components/TaskFrom';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as action from './actions/index';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        };
    }

    // Đóng mở TaskForm
    onToggleForm = () => {
        var { itemEditting } = this.props;
        if (itemEditting && itemEditting.id !== '') {
            this.props.openForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });

    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((tasks, index) => {
            if (tasks.id === id) {
                result = index;
            }
        });
        return result;
    }
    // ======================================================================== //


    // ==================== Xóa nội dung theo ID ================================ //
    onDelete = (id) => {
        var { tasks } = this.state;
        var kqFilter = tasks.filter(task => task.id !== id);
        this.setState({
            tasks: kqFilter
        })
        localStorage.setItem('tasks', JSON.stringify(kqFilter))
        this.onCloseForm();
    }

    // Sửa dự liệu trong TaskForm
    onUpdate = (id) => {
        var tasks = this.state.tasks;
        var index = this.findIndex(id); // tìm cái index của id
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowForm();
    }

    // ========================= Tìm Kiếm Dữ liệu ===================== //
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }
    // =================================================================== //

    // ========================= Sắp xếp dữ liệu nhận về ================ //
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }
    // ================================================================== //
    render() {

        var { sortBy, sortValue } = this.state; // Viết tắt của var tasks = this.state.tasks
        var { isDisplayForm } = this.props;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        <TaskFrom task={this.state.taskEditing} />
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>

                        <TaskControl></TaskControl>

                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                <TaskList></TaskList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditting: state.itemEditting
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(action.toggleForm());
        },

        openForm: () => {
            dispatch(action.openForm())
        },

        onClearTask: (task) => {
            dispatch(action.editTask(task))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
