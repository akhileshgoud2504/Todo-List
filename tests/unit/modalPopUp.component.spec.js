import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import ModalPopUpComponent from '@/components/ModalPopUp.component.vue';
import Vuex from 'vuex';

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Modal PopUp Component With GetPopUpValue False', () => {

  let actions
  let store

  beforeEach(() => {
    actions = {
      toggleDevice: jest.fn()
    },
    store = new Vuex.Store({
      modules: {
      	auth: {
          state: {},
          getters: {
            getPopUpValue : () => false
         }
      },
      actions
    }})
  })

  it('mounting component', () => {
  	const container = shallowMount(ModalPopUpComponent, { store, localVue })
  	expect(container.exists()).toBe(true)
  })
})
describe('Modal PopUp Component With GetPopUpValue True', () => {

  let actions
  let store

  beforeEach(() => {
    actions = {
      toggleDevice: jest.fn()
    },
    store = new Vuex.Store({
      modules: {
      	auth: {
          state: {},
          getters: {
            getPopUpValue : () => true
         }
      },
      actions
    }})
  })

  it('mounting component', () => {
    const task = {
      id: '',
      title : '',
      demonstration: '',
      dueDate:  null,
      isCompleted: false,
      isPending: true,
      isDuplicate: false,
      isDueDateExpired: false
    }
  	const container = shallowMount(ModalPopUpComponent, { store, localVue, propsData: { task }})
  	expect(container.exists()).toBe(true)
    })
  })
