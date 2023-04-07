import moment from "moment";
import { mapGetters } from "vuex";

export const intialTaskData = {
    id: '',
    title : '',
    demonstration: '',
    dueDate:  null,
    isCompleted: false,
    isPending: true,
    isDuplicate: false,
    isDueDateExpired: false
}

export const storeGetters = mapGetters({
    totalTasks : 'totalTasks',
    completedTasksLength : 'completedTasksLength',
    pendingTasks : 'pendingTasks',
    duplicateTask : 'duplicateTask'
})

export function isDueDateExpired(task){
    if(task?.dueDate){
        return (!moment(task?.dueDate).isAfter(moment(new Date()).format()) && !task?.isCompleted);
    }
}

export function disabledDateRange(date) {
    return date < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
}
export function disabledTimeRange(date) {
    return date < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(), new Date().getMinutes());
}

