
<template>
    <div v-if="getPopUpValue" class="container w-full max-w-lg h-auto bg-white rounded overflow-hidden border-solid border-1 border-transparent shadow-[0_5px_15px_rgba(0, 0, 0, 0.1)">
        <div
          v-show="getPopUpValue"
          class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-gray-700 bg-opacity-50
          "
        >
          <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl">Delete Task</h3>
              <svg
                @click="toggle"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-red-900 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                width="30"
                height="30"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="mt-4">
              <p class="mb-4 text-sm">
                Are you sure you want to delete this task?
              </p>
            </div>
            <div lass="mt-4 flex">
              <button
                @click="toggle"
                class="px-6 py-2 text-blue-800 border border-blue-600 rounded justify-start"
              >
                Cancel
              </button>
              <button 
              @click="confirmDelete"
              class="px-6 py-2 ml-2 text-blue-100 bg-pink-800 rounded justify-end">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  </template>
  <script>
   import { mapGetters } from 'vuex';
  export default {
    props: ['taskindex'],
    name: 'modal-popup',
    data(){
      return{
        isOpen: false
      }
    },
    computed: mapGetters({
        getPopUpValue : 'getPopUpValue'
    }),
    methods:{
        toggle(){
            this.$store.commit('tooglePopUp', this.getPopUpValue);
        },
        confirmDelete(){
          this.$store.commit('tooglePopUp', this.getPopUpValue);
          this.$store.commit('deleteTask', this.index);
        }
    },
    beforeUpdate(){
      this.isOpen = this.getPopUpValue;
    }
  };
  </script>