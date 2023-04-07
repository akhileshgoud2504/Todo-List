<template>
  <div>
    <form className="w-full my-8 mx-0 flex " @submit.prevent="onFormSubmit">
        <div id="titlecontainer" class="py-2">
          <div class="flex"><p>Title</p><span class="text-red-600">*</span></div>
          <input
            id="title"
            type="text"
            class="h-8 leading-8 py-0 px-1 w-5/6 border border-solid border-chinesesilver rounded-md text-sm"
            placeholder="Add a Task"
            :value="userData?.title"
            @input="changeFormValue"
            maxlength="50"
          />
          <p class="text-red-600"> {{ this.titleError }}</p>
        </div>
        <div id="demonstrationcontainer" class="py-2">
          <div class="flex"><p>Demonstration</p><span class="text-red-600">*</span></div>
          <textarea 
            id="demonstration"
            type="text"
            class="resize-none h-16 leading-8 py-0 px-1 w-5/6 border border-solid border-chinesesilver rounded-md text-sm"
            placeholder="Demonstrate The Task"
            :value="userData?.demonstration"
            @input="changeFormValue"
            maxlength="150"
          >
          </textarea>
          <p class="text-red-600"> {{ this.demonstrationError }}</p>
        </div>
        <div id="calender container" class="py-2">
        <p>Task Deadline(if applicable)</p>
            <date-picker 
              :value="userData?.dueDate" 
              :formatter="momentFormat"
              confirm
              type="datetime" 
              valueType="formatter" 
              @confirm="changeFormValue"
              @clear="clearDataValue"
              placeholder="YY-MM-DD hh:mm:ss"
              format = "YY-MM-DD hh:mm:ss"
              :disabled-date="disabledDateRange"
              :disabled-time="disabledTimeRange"
              />
        </div>
        <div class="flex justify-evenly">
          <button class="w-24 h-10 text-3xl my-2 cursor-pointer text-white bg-purple whiteextend  border-none hover:bg-blue-600 transition duration-300 ease-in-out rounded-md" 
          type="submit" 
        >{{!userData?.isUpdating ? "Add" : "Update"}}</button>
        <p class="text-red-600"> {{ this.submitError }}</p>
        </div>
      </form>
    </div>
 </template>
 
 <script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import moment from 'moment';
  import { disabledDateRange, disabledTimeRange, storeGetters, intialTaskData } from '@/Utils';
  import {isFormFiledValid} from './TodoInputForm.validators';
 
 export default {
   props: ['userData'],
   components: { DatePicker },
   computed: storeGetters,
   data () {
    return {
      title: '',
      demonstration : '',
      dueDate : null,
      moment: moment,
      titleError: '',
      demonstrationError: '',
      submitError : '',
      disabledDateRange,
      disabledTimeRange,
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format("") : ''
        },
        parse: (value) => {
          return value ? moment(value, '').toDate() : null
        }
      },
    }
   },
   methods: {
     changeFormValue(event) {
       if (!event?.target?.id) {
         this.dueDate = event;
         this.$emit('userChanged', { ...this.userData, dueDate: this.dueDate });
       } else {
         const value = event.target.value;
         const id = event.target.id;
         if (id === 'title') {
           this.title = value;
           this.$emit('userChanged', { ...this.userData, title: this.title });
         } else if (id === 'demonstration') {
           this.demonstration = value;
           this.$emit('userChanged', { ...this.userData, demonstration: this.demonstration });
         }
       }
     },
     clearDataValue() {
       this.dueDate = null;
       this.$emit('userChanged', { ...this.userData, dueDate: null });
     },
     onFormSubmit() {
       this.titleError = '';
       this.demonstrationError = '';
       this.submitError = '';
       this.titleError = isFormFiledValid(!this.userData?.isUpdating, this.title, 3, 'title');
       this.demonstrationError = isFormFiledValid(!this.userData?.isUpdating, this.demonstration, 5, 'demonstration');
       if (!this.userData?.isUpdating) {
         if (this.totalTasks.some(task => task.title === this.title) &&
           this.totalTasks.some(task => task.demonstration === this.demonstration)) {
           this.submitError = "Please use dulipate option, Task with same name and description is already exists."
         }
       }
       if (!this.titleError && !this.demonstrationError && !this.submitError) {
         !this.userData?.isUpdating ? this.$store.dispatch('saveUserData', { ...this.userData, key: Date.now() }) : this.$store.commit('updateTask', { task: this.userData, index: this.userData?.key });
         this.title = '';
         this.demonstration = '';
         this.dueDate = null;
         this.$emit('userChanged', intialTaskData);
       }
     }
   },
 }
 
</script>