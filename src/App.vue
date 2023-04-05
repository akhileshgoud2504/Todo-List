<template>
  <div id="app" class="w-full min-h-screen bg-blue-600 flex justify-center items-start pt-0 pb-0 pr-2 pl-2">
    <div class="w-full h-auto bg-white rounded overflow-hidden mt-24 pt-12 pb-12 pr-8 pl-8">
      <TodoList />
    </div>
  </div>
</template>

<script>
  import TodoList from './components/TodoList.vue';

  export default {
    components: {
        TodoList: TodoList
    }
  }
</script>
