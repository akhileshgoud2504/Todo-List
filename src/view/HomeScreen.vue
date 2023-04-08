<template>
  <div class="m-auto">
    <div 
    class="container h-auto w-310p md:w-480 lg:w-640 2xl:w-864 bg-white rounded overflow-hidden mt-24 py-12 px-8 border-solid border border-transparent shadow-515xl">
      <TodoList />
    </div>
  </div>
  </template>
  
<script>
  import TodoList from '@/components/TodoListContainer.component.vue';

  export default {
    name: 'TodolistContainer',
    components: {
        TodoList
    }
  }
</script>