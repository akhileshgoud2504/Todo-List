<template>
    <div>
        <div v-if="getTasksLength()">
            <table class="table w-full table-auto">
                <thead>
                    <tr>
                        <th>Sl.no</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="isDueDateExpired(task)  ? 'bg-pink-800 ' : ''"
                    v-for="(task, index) in 
                        selectedTab === 'total' ? totalTasks :
                            selectedTab === 'completed' ? completedTasks :
                                selectedTab === 'pending' ? pendingTasks :
                                    selectedTab === 'duplicated' ? duplicateTask : []" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ task.title }}</td>
                        <td>{{ task.demonstration }}</td>
                        <td>{{ !task.dueDate ? '-' : moment(task.dueDate).format('MMMM Do YYYY, h:mm:ss a') }}</td>
                        <td class="cursor-pointer" @click="taskcompleted(task, index, 'completed')"><img
                                src="../assets/doubletick.png" /></td>
                        <td class="cursor-pointer" @click="taskcompleted(task, index, 'duplicate')"><img
                                src="../assets/duplicate.png" /></td>
                        <td class="cursor-pointer" @click="taskcompleted(task, index, 'edit')"><img
                                src="../assets/edit.png" /></td>
                        <td class="cursor-pointer" @click="taskcompleted(task,index,'delete')"><img src="../assets/delete.png" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalPopUp :taskindex="taskindex"/>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import ModalPopUp from './ModalPopUp.vue';
import moment from 'moment';

export default {
    props: ['userData', 'selectedTab'],
    name: 'task-list',
    components: { ModalPopUp },
    data(){
        return {
            taskindex: '',
            moment: moment
        }
    },
    computed: mapGetters({
        totalTasks: 'totalTasks',
        completedTasks: 'completedTasksLength',
        pendingTasks: 'pendingTasks',
        duplicateTask: 'duplicateTask',
        getPopUpValue : 'getPopUpValue'
    }),
    methods: {
        taskcompleted(task, index, type) {
            if (type === 'completed') {
                this.$store.dispatch('completedTasks', { task: { ...task, isCompleted: true, isPending: false }, index: index });
            } else if (type === 'duplicate') {
                this.$store.commit('saveUserData', { ...task, isDuplicate: true });
            } else if (type === 'edit') {
                this.$emit('userChanged', { ...task, index: index, isUpdating: true });
            } else if (type === 'delete') {
                this.index = index;
                this.$store.commit('tooglePopUp',this.getPopUpValue);
            }
        },
        getTasksLength() {
            if(this.selectedTab === 'total'){
                return this.totalTasks.length;
            } else if(this.selectedTab === 'completed'){
                return this.completedTasks.length;
            } else if(this.selectedTab === 'pending'){
                return this.pendingTasks.length;
            } else if(this.selectedTab === 'duplicated'){
                return this.duplicateTask.length;
            } else {
                return 0;
            }
        },
        isDueDateExpired(task){
            return (!moment(task?.dueDate).isAfter(moment(new Date()).format()) && !task?.isCompleted);
        }
    },
}
</script>