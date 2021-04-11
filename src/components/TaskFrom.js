import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../actions/index';

class TaskFrom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentDidMount() {
        if (this.props.itemEditting && this.props.itemEditting.id !== null) {
            this.setState({
                id: this.props.itemEditting.id,
                name: this.props.itemEditting.name,
                status: this.props.itemEditting.status,
            })
        } else {
            this.onClear();
        }

    }
    // Đưa dữ liệu vào Form để sửa
    // Hàm này cần chạy lệnh npx react-codemod rename-unsafe-lifecycles
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditting) {
            this.setState({
                id: nextProps.itemEditting.id,
                name: nextProps.itemEditting.name,
                status: nextProps.itemEditting.status,
            });
        } else {
            this.onClear();
        }
    }


    onCloseForm = () => {
        this.props.closeForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        // Đóng TaskForm và Clear TasksForm
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        if (!this.props.isDisplayForm) return null;

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {!this.state.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
                        <i className="fa fa-minus" aria-hidden="true" onClick={this.onCloseForm}></i>
                    </h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}

                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                {!this.state.id ? 'Thêm Công Việc' : 'Lưu Lại'}
                            </button>&nbsp;
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditting: state.itemEditting

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(action.saveTask(task))
        },

        closeForm: () => {
            dispatch(action.closeForm())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFrom);
