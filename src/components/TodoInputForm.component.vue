<template>
  <div>
    <form className="w-full my-8 mx-0 flex " @submit.prevent="onFormSubmit">
        <div id="titlecontainer" class="py-2">
          <div class="flex"><p class="2xl:text-3xl">Title</p><span class=" 2xl:text-32p text-red-600">*</span></div>
          <input
            id="title"
            type="text"
            class="h-8 2xl:h-16 leading-8 py-0 px-1 w-5/6 border border-solid border-chinesesilver rounded-md text-sm 2xl:text-2xl"
            placeholder="Add a Task"
            :value="userData?.title"
            @input="changeFormValue"
            maxlength="50"
          />
          <p class="text-red-600 2xl:text-3xl"> {{ this.titleError }}</p>
        </div>
        <div id="demonstrationcontainer" class="py-2">
          <div class="flex"><p class="2xl:text-3xl">Demonstration</p><span class="text-red-600">*</span></div>
          <textarea 
            id="demonstration"
            type="text"
            class="resize-none h-16 2xl:h-20 leading-8 py-0 px-1 w-5/6 border border-solid border-chinesesilver rounded-md text-sm 2xl:text-2xl"
            placeholder="Demonstrate The Task"
            :value="userData?.demonstration"
            @input="changeFormValue"
            maxlength="150"
          >
          </textarea>
          <p class="text-red-600 2xl:text-3xl"> {{ this.demonstrationError }}</p>
        </div>
        <div id="calender container" class="py-2 ">
          <p class="2xl:text-3xl">Task Deadline(if applicable)</p>
          <div class="widthHandler">
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
        </div>
        <div class="flex justify-center">
          <button class="w-24 2xl:w-20r h-10 2xl:h-16 text-3xl my-2 cursor-pointer text-white bg-purple whiteextend  border-none hover:bg-blue-600 transition duration-300 ease-in-out rounded-md" 
          type="submit" 
        >{{!userData?.isUpdating ? "Add" : "Update"}}</button>
        <p class="text-red-600 2xl:text-3xl"> {{ this.submitError }}</p>
        </div>
      </form>
    </div>
 </template>
 
 <script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import moment from 'moment';
  import { disabledDateRange, disabledTimeRange, storeGetters, intialTaskData } from '@/Utils';
  import {isFormFiledValid} from '@/components/Validators/TodoInputForm.validators.js';
 
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


<style> 
  /* Using this styles to override the class inside the component which was by default generated by component*/
  @media screen and (min-width: 620px) {  
    .widthHandler .mx-datepicker {
      width: 345px;
    }
  }
  @media screen and (min-width: 1024px) {
    .widthHandler .mx-datepicker {
      width: 478px;
    }
  }
  @media screen and (min-width: 1536px) {
    .widthHandler .mx-datepicker {
      width: 663px;
    }
    .widthHandler .mx-datepicker .mx-input-wrapper .mx-input {
      height: 4rem;
      font-size: 24px;
    }
  }
</style>