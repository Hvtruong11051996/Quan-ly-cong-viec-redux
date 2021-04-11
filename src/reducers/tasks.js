import * as types from './../constants/ActionTypes';

// ============== Tạo ID Random ====================== // 
var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
// =========================================================== //
// ================== Tìm ID theo Index ===================== //
var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((tasks, index) => {
        if (tasks.id === id) {
            result = index;
        }
    });
    return result;
}
// ========================================================= //

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var id = '';
var index = -1;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        // Đóng mở taskForm
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === true ? true : false
            }
            if (!task.id) {
                task.id = randomID();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task
            }

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        // Thay đổi status
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id); // tìm cái index của id
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        // Xóa 1 phần tử
        case types.DELETE_TASK:
            id = action.id
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        default: return state
    }
}

export default myReducer;