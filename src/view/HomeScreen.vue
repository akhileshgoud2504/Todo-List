<template>
  <div>
    <div 
    class="container h-auto bg-white rounded overflow-hidden mt-24 py-12 px-8 border-solid border border-transparent shadow-515xl">
      <TodoList />
    </div>
    <!-- <ModalPopUp /> -->
  </div>
  </template>
  
<script>
  import TodoList from '../components/TodoListComponent/TodoListContainer.component.vue';
  // import ModalPopUp from '@/components/ModalPopUp.vue';

  export default {
    name: 'TodolistContainer',
    components: {
        TodoList,
        // ModalPopUp
    }
  }
</script>