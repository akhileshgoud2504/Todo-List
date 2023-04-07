<template>
  <div id="app" class="w-full min-h-screen bg-blue-600 flex justify-center items-start px-0 py-2">
    <HomeScreen />
  </div>
</template>

<script>
  import HomeScreen from './view/HomeScreen.vue';

  export default {
    components: {
      HomeScreen
    }
  }
</script>
