<template>
  <div>
    <h2 class="flex justify-center">Task Manager</h2>
    <todo-form :userData="user" 
      @userChanged="user = $event"
      />
    <div class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400" >
      <p :class="this.selectedTab === 'pending' ? 'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg cursor-pointer ' :
      'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer'"  @click="setSelectedTab('pending')">
        <b>Pending Tasks:</b> {{ pendingTasks.length }}
      </p>
      <p :class="this.selectedTab === 'completed' ? 'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg cursor-pointer' :
      'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer'" @click="setSelectedTab('completed')">
        <b>Completed Tasks:</b> {{ completedTasksLength.length }}
      </p>
      <p 
      :class="this.selectedTab === 'total' ? 'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg cursor-pointer' :
      'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer'"
        @click="setSelectedTab('total')">
        <b>Total Tasks:</b> {{ totalTasks.length }}
      </p>
      <p :class="this.selectedTab === 'duplicated' ? 'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg cursor-pointer' :
      'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer'"  @click="setSelectedTab('duplicated')">
        <b>Duplicated Tasks:</b> {{ duplicateTask.length }}
      </p>
    </div>
    <p v-if="!totalTasks.length">No task added. Please add a task</p>
      <list :userData="user" :selectedTab="selectedTab" @userChanged="user = $event" />
  </div>
</template>

<script>
  import TodoListForm from './TodoInputForm.vue';
  import List from './List.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'TodoListForm',
    components: {
      'todo-form':TodoListForm,
      'list': List
    },
    data () {
      return {
        user : {
          title : '',
          demonstration: '',
          dueDate:  null,
          isCompleted: false,
          isPending: true,
          isDuplicate: false,
          isDueDateExpired: false
        },
        selectedTab : 'pending'
      }
    },  
    methods: {
      setSelectedTab(type){
        this.selectedTab = type;
      }
    },
    computed: mapGetters({
      totalTasks : 'totalTasks',
      completedTasksLength : 'completedTasksLength',
      pendingTasks : 'pendingTasks',
      duplicateTask : 'duplicateTask'
    })
  }
</script>