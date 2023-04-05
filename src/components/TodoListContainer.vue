<template>
   <div>
      <h2>Task Manager</h2>
      <todo-form  
        :userData = "user" 
        @userChanged="user = $event"
      />
    </div>
</template>

<script>
  import TodoListForm from './TodoInputForm.vue';
  export default {
    name: 'TodoListForm',
    components: {
      'todo-form':TodoListForm
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
        }
      }
    }
  }
</script>