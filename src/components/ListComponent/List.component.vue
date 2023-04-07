<template>
    <div>
        <div v-if="getTasks().length">
            <table class="table w-full table-auto border border-solid border-chinesesilver border-collapse">
                <thead>
                    <tr class="w-full border border-solid border-chinesesilver">
                        <th class="w-1/5 border border-solid border-chinesesilver">Sl.no</th>
                        <th class="w-1/5 border border-solid border-chinesesilver">Title</th>
                        <th class="w-1/5 border border-solid border-chinesesilver">Description</th>
                        <th class="w-1/5 border border-solid border-chinesesilver">Due Date</th>
                        <th class="w-1/5 border border-solid border-chinesesilver"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="getRowClass(task)" v-for="(task, index) in getTasks()" :key="index">
                        <td class="w-1/5 border border-solid border-chinesesilver">{{ index + 1 }}</td>
                        <td class="w-1/5 border border-solid border-chinesesilver">{{ task.title }}</td>
                        <td class="w-1/5 border border-solid border-chinesesilver">{{ task.demonstration }}</td>
                        <td class="w-1/5 border border-solid border-chinesesilver">{{ !task.dueDate ? '-' : moment(task.dueDate).format('MMMM Do YYYY, h:mm:ss a') }}</td>
                        <td class="flex justify-between">
                            <div class="cursor-pointer" @click="taskcompleted(task, task.key, 'completed')"><img class="w-5 h-5" src="../../assets/images/doubletick.png"/></div>
                            <div class="cursor-pointer" @click="taskcompleted(task, task.key, 'duplicate')"><img class="w-5 h-5"  src="../../assets/images/duplicate.png"/></div>
                            <div class="cursor-pointer" @click="taskcompleted(task, task.key, 'edit')"><img class="w-5 h-5" src="../../assets/images/edit.png" /></div>
                            <div class="cursor-pointer" @click="taskcompleted(task,task.key,'delete')"><img class="w-5 h-5" src="../../assets/images/delete.png" /></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalPopUpComponent :task="task"/>
    </div>
</template>


<script>
import moment from 'moment';
import ModalPopUpComponent from '../ModelPopUpComponent/ModalPopUp.component.vue';
import { storeGetters, isDueDateExpired } from '@/Utils';

export default {
    props: ['userData', 'selectedTab'],
    name: 'task-list',
    components: { ModalPopUpComponent },
    data(){
        return {
            task: '',
            moment: moment,
            isDueDateExpired
        }
    },
    computed: storeGetters,
    methods: {
        taskcompleted(task, index, type) {
            if (type === 'completed') {
                this.$store.dispatch('completedTasks', { task: { ...task, isCompleted: true, isPending: false }, index: index });
            } else if (type === 'duplicate') {
                this.$store.commit('saveUserData', { ...task, key: Date.now(), isDuplicate: true });
            } else if (type === 'edit') {
                this.$emit('userChanged', { ...task, index: index, isUpdating: true });
            } else if (type === 'delete') {
                this.task = task;
                this.$store.commit('tooglePopUp',this.getPopUpValue);
            }
        },
        getTasks() {
            if(this.selectedTab === 'total'){
                return this.totalTasks;
            } else if(this.selectedTab === 'completed'){
                return this.completedTasksLength;
            } else if(this.selectedTab === 'pending'){
                return this.pendingTasks;
            } else if(this.selectedTab === 'duplicated'){
                return this.duplicateTask;
            } else {
                return [];
            }
        },
        getRowClass(task){
            if(task.isCompleted){
                return 'border border-solid border-chinesesilver bg-lime-400 w-full';
            } else if(isDueDateExpired(task)){
                return 'border border-solid border-chinesesilver bg-red-500 w-full';
            }else if(task.isDuplicate){
                return 'border border-solid border-chinesesilver bg-orange-400 w-full';
            } else {
                return 'border border-solid border-chinesesilver bg-slate-300 w-full';
            }
        }
    },
}
</script>
