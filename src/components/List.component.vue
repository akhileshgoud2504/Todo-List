<template>
    <div>
        <div v-if="getTasks().length" class="w-full overflow-auto">
            <table class="table border border-solid border-chinesesilver border-collapse">
                <thead>
                    <tr class="border border-solid border-chinesesilver">
                        <th class="border border-solid border-chinesesilver 2xl:text-3xl">Sl.no</th>
                        <th class="border border-solid border-chinesesilver 2xl:text-3xl">Title</th>
                        <th class="border border-solid border-chinesesilver 2xl:text-3xl">Description</th>
                        <th class="border border-solid border-chinesesilver 2xl:text-3xl">Due Date</th>
                        <th class="border border-solid border-chinesesilver 2xl:text-3xl">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="getRowClass(task)" v-for="(task, index) in getTasks()" :key="index">
                        <td class="border border-solid border-chinesesilver 2xl:text-3xl">{{ index + 1 }}</td>
                        <td class="border border-solid border-chinesesilver 2xl:text-3xl">{{ task.title }}</td>
                        <td class="border border-solid border-chinesesilver 2xl:text-3xl">{{ task.demonstration }}</td>
                        <td class="border border-solid border-chinesesilver 2xl:text-3xl">{{ !task.dueDate ? '-' : moment(task.dueDate).format('MMMM Do YYYY, h:mm:ss a') }}</td>
                        <td class="justify-between">
                            <div class="flex">
                            <div class="cursor-pointer" @click="taskcompleted(task, task.key, 'completed')"><img class="w-10 min-w-full	" src="@/assets/images/doubletick.png"/></div>
                            <div class="cursor-pointer" @click="taskcompleted(task, task.key, 'duplicate')"><img class="w-10 min-w-full	"  src="@/assets/images/duplicate.png"/></div>
                            <div class="cursor-pointer" @click="taskcompleted(task, task.key, 'edit')"><img class="w-10 min-w-full	" src="@/assets/images/edit.png" /></div>
                            <div class="cursor-pointer" @click="taskcompleted(task,task.key,'delete')"><img class="w-10 min-w-full	" src="@/assets/images/delete.png" /></div>
                            </div>
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
import ModalPopUpComponent from '@/components/ModalPopUp.component.vue';
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
