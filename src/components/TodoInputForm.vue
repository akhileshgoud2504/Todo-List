<template>
    <form className="w-full my-8 mx-0 flex ">
        <p>Title</p>
        <input
          id="title"
          type="text"
          class="h-8 text-2xl py-0 px-1 w-5/6"
          placeholder="Add a Task"
          :value="userData?.title"
          @input="changeFormValue"
        />
        <p>Demonstration</p>
        <textarea 
          id="demonstration"
          type="text"
          class="resize-none h-16 text-2xl py-0 px-1 w-5/6"
          placeholder="Demonstrate a Task"
          :value="userData?.demonstration"
          @input="changeFormValue"
        >
        </textarea>
        <p>Due Date</p>
        <date-picker 
          :value="userData?.dueDate" 
          :formatter="momentFormat"
          confirm
          type="datetime" 
          valueType="formatter" 
          @confirm="changeFormValue"
          @clear="clearDataValue"
          format = "YY-MM-DD hh:mm:ss"
        >
        </date-picker>
        <button class="w-1/6 h-16 text-3xl cursor-pointer bg-pink-800 text-white border-none hover:bg-blue-600 transition duration-300 ease-in-out" 
        type="submit">Add</button>
      </form>
 </template>
 
 <script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import moment from 'moment';
 
 export default {
   props: ['userData'],
   name: 'TodoListForm',
   components: { DatePicker },
   data () {
    return {
      title: '',
      demonstration : '',
      dueDate : null,
      momentFormat: {
      stringify: (date) => {
        return date ? moment(date).format() : ''
      },
      parse: (value) => {
        return value ? moment(value, '').toDate() : null
      }
    }
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
    }
   }
 }
 
</script>