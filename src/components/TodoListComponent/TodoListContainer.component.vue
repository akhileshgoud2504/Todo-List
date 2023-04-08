<template>
  <div>
    <p class="flex justify-center text-3xl">Task Manager</p>
    <todo-form :userData="user" @userChanged="user = $event" />
    <div class="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400 py-4"  v-if="totalTasks.length">
      <p :class="this.selectedTab === 'pending' ? this.selectedTabStyles : this.unSelectedTabStyles"  @click="setSelectedTab('pending')">
        <b>Pending Tasks:</b> {{ pendingTasks.length }}
      </p>
      <p :class="this.selectedTab === 'completed' ? this.selectedTabStyles : this.unSelectedTabStyles" @click="setSelectedTab('completed')">
        <b>Completed Tasks:</b> {{ completedTasksLength.length }}
      </p>
      <p :class="this.selectedTab === 'total' ? this.selectedTabStyles : this.unSelectedTabStyles"  @click="setSelectedTab('total')">
        <b>Total Tasks:</b> {{ totalTasks.length }}
      </p>
      <p :class="this.selectedTab === 'duplicated' ? this.selectedTabStyles : this.unSelectedTabStyles" @click="setSelectedTab('duplicated')">
        <b>Duplicated Tasks:</b> {{ duplicateTask.length }}
      </p>
    </div>
    <p v-if="!totalTasks.length">No task added. Please add a task</p>
      <list :userData="user" :selectedTab="selectedTab" @userChanged="user = $event" />
  </div>
</template>

<script>
  import TodoInputFormComponent from '@/components/ToDoInputComponent/TodoInputForm.component.vue';
  import List from '@/components/List.component.vue';
  import { intialTaskData, storeGetters } from '@/Utils';

  export default {
    components: {
      'todo-form':TodoInputFormComponent,
      'list': List
    },
    data () {
      return {
        user : intialTaskData,
        selectedTab : 'pending',
        selectedTabStyles : 'inline-block px-4 py-3 text-white bg-purple rounded-lg cursor-pointer',
        unSelectedTabStyles : 'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white cursor-pointer'
      }
    },  
    methods: {
      setSelectedTab(type){
        this.selectedTab = type;
      }
    },
    computed: storeGetters
  }
</script>