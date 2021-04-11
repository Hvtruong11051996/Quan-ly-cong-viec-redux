import React, { Component } from 'react';
import TaskSeachControl from './TaskSeachControl';
import TaskSortControl from './TaskSortControl';

class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                <TaskSeachControl></TaskSeachControl>

                <TaskSortControl></TaskSortControl>
            </div>
        );
    };
}

export default TaskControl;
