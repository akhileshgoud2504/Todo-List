import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks : [],
    modelOptions: {
      isPopUpOpen : false
    }
  },
  getters: {
    totalTasks(state){
      return state.tasks;
    },
    completedTasksLength(state){
      return state.tasks.filter(task=>{
        return task.isCompleted;
      });
    },
    pendingTasks(state){
      return state.tasks.filter(task=>{
        return task.isPending;
      });
    },
    duplicateTask(state){
      return state.tasks.filter(task=>{
        return task.isDuplicate;
      });
    },
    getPopUpValue(state){
      return state.modelOptions.isPopUpOpen;
    }
  },
  mutations: {
    saveUserData(state,task) {
      state.tasks.push(task);
    },
    completedTasks(state,data) {
      const index = state.tasks.findIndex((statetask)=> statetask.key === data.index)
      Vue.set(state.tasks,index,data?.task);
    },
    deleteTask(state,taskKey) {
      const index = state.tasks.findIndex((statetask)=> statetask.key === taskKey)
      state.tasks.splice(index,1);
    },
    updateTask(state,data){
      const index = state.tasks.findIndex((statetask)=> statetask.key === data.index)
      Vue.set(state.tasks,index,data?.task);
    },
    tooglePopUp(state,value){
      Vue.set(state.modelOptions,'isPopUpOpen',!value)
    }
  },
  actions: {
    saveUserData(context,task){
      setTimeout(()=>{
        context.commit('saveUserData',task);
      },500);
    },
    completedTasks(context,data){
        setTimeout(()=>{
          context.commit('completedTasks',data);
        },1000);
    }
  },
  modules: {
  }
})
