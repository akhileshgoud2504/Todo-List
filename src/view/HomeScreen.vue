<template>
  <div>
    <div 
    class="w-full max-w-lg h-auto bg-white rounded overflow-hidden mt-24 py-12 px-8 border-solid border-1 border-transparent shadow-[0_5px_15px_rgba(0, 0, 0, 0.1)]">
      <TodoList />
    </div>
    <!-- <ModalPopUp /> -->
  </div>
  </template>
  
<script>
  import TodoList from '../components/TodoListContainer.vue';
  // import ModalPopUp from '@/components/ModalPopUp.vue';

  export default {
    name: 'TodolistContainer',
    components: {
        TodoList,
        // ModalPopUp
    }
  }
</script>