<template>
  <div>
    <form className="w-full my-8 mx-0 flex " @submit.prevent="onFormSubmit">
        <div id="titlecontainer">
          <label class="">Title</label>
          <input
            id="title"
            type="text"
            class="h-8 text-2xl py-0 px-1 w-5/6"
            placeholder="Add a Task"
            :value="userData?.title"
            @input="changeFormValue"
            maxlength="50"
          />
          <p class="text-red-600"> {{ this.titleError }}</p>
        </div>
        <div id="demonstrationcontainer">
          <label>Demonstration</label>
          <textarea 
            id="demonstration"
            type="text"
            class="resize-none h-16 text-2xl py-0 px-1 w-5/6"
            placeholder="Demonstrate a Task"
            :value="userData?.demonstration"
            @input="changeFormValue"
            maxlength="150"
          >
          </textarea>
          <p> {{ this.demonstrationError }}</p>
        </div>
        <div id="calender container">
        <label>Due Date</label>
          <date-picker 
            :value="userData?.dueDate" 
            :formatter="momentFormat"
            confirm
            type="datetime" 
            valueType="formatter" 
            @confirm="changeFormValue"
            @clear="clearDataValue"
            format = "YY-MM-DD hh:mm:ss"
            :disabled-date="disabledDateRange"
            :disabled-time="disabledTimeRange"
          >
          </date-picker>
        </div>
          <button class="w h-16 text-3xl cursor-pointer bg-pink-800 text-white border-none hover:bg-blue-600 transition duration-300 ease-in-out" 
          type="submit" 
        >{{!userData?.isUpdating ? "Add" : "Update"}}</button>
        <p> {{ this.submitError }}</p>
      </form>
    </div>
 </template>
 
 <script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import moment from 'moment';
  import { mapGetters } from 'vuex';
 
 export default {
   props: ['userData'],
   name: 'TodoListForm',
   components: { DatePicker },
   computed: mapGetters({
      totalTasks : 'totalTasks',
  }),
   data () {
    return {
      title: '',
      demonstration : '',
      dueDate : null,
      moment: moment,
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format("") : ''
        },
        parse: (value) => {
          return value ? moment(value, '').toDate() : null
        }
      },
      titleError: '',
      demonstrationError: '',
      submitError : '',
    }
   },
   methods : {
    changeFormValue(event){
      if(!event?.target?.id){
        this.dueDate = event;
        this.$emit('userChanged',{...this.userData , dueDate : this.dueDate });
      } else {
        const value = event.target.value;
        const id = event.target.id;
        if(id==='title'){
          this.title = value;
          this.$emit('userChanged',{...this.userData , title : this.title });
        } else if(id==='demonstration'){
          this.demonstration = value;
          this.$emit('userChanged',{...this.userData , demonstration : this.demonstration });
        }
      }      
    },
    clearDataValue(){
      this.dueDate = null;
        this.$emit('userChanged',{...this.userData , dueDate : null });
    },
    onFormSubmit() {
      this.titleError = '';
      this.demonstrationError = '';
      this.submitError = '';
      if(!this.userData?.isUpdating){
        if(!this.title){
          this.titleError = 'Please fill the above mandatory field';
        } else {
          if(this.title.length<3){
            this.titleError = 'Please enter minimum 3 characters of title';
          }
        }
        if(!this.demonstration){
          this.demonstrationError = 'Please fill the above mandatory field';
        } else {
          if(this.demonstration.length<5){
            this.demonstrationError = 'Please enter minimum 5 characters of demonstration';
          }
        }
        if(this.totalTasks.some(task => task.title === this.title) &&
          this.totalTasks.some(task => task.demonstration === this.demonstration)){
            this.submitError = "Please use dulipate option, Task with same name and description is already exists."
        }
        if(!this.titleError && !this.demonstrationError && !this.submitError){
          this.$store.dispatch('saveUserData',this.userData);
          this.title = '';
          this.demonstration = '';
          this.dueDate = null;
          this.$emit('userChanged',{
            title : '',
            demonstration: '',
            dueDate:  null,
            isCompleted: false,
            isPending: true,
            isDuplicate: false,
            isDueDateExpired: false
          });
        }
      } else {
        if(this.title){
          if(this.title.length<3){
            this.titleError = 'Please enter minimum 3 characters of title';
          }
        } 
        if(this.demonstration){
          if(this.title.length<5){
            this.demonstrationError = 'Please enter minimum 5 characters of demonstration';
          }
        }
        if(!this.titleError && !this.demonstrationError){
          this.$store.commit('updateTask',{task : this.userData , index: this.userData?.index});
          this.title = '';
          this.demonstration = '';
          this.dueDate = null;
          this.$emit('userChanged',{
            title : '',
            demonstration: '',
            dueDate:  null,
            isCompleted: false,
            isPending: true,
            isDuplicate: false,
            isDueDateExpired: false
          });
        }
      }
    },
    disabledDateRange(date) {
         return date < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    },
    disabledTimeRange(date) {
         return date < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(), new Date().getMinutes());
    }
   },

 }
 
</script>