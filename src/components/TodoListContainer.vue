<template>
   <div>
      <h2>Task Manager</h2>
      <todo-form />
    </div>
</template>

<script>
  import TodoListForm from './TodoInputForm.vue';
  export default {
    name: 'TodoListForm',
    components: {
      'todo-form':TodoListForm
    }
  }
</script>