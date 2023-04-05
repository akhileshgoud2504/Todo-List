<template>
  <div id="app" class="w-full min-h-screen bg-blue-600 flex justify-center items-start pt-0 pb-0 pr-2 pl-2">
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
