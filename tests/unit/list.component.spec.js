import { shallowMount } from '@vue/test-utils'
import ListContainer from '@/components/List.component.vue'

describe('List Component rendering with no data',()=>{
  it('mounting',()=>{
    const container = shallowMount(ListContainer,
      {
        mixins: [{
        methods: {
          taskcompleted : ()=> jest.fn(),
          getTasks : ()=>  [],
          getRowClass : () => ''
        }
      }]})
    expect(container.exists()).toBe(true);
  })
})
describe('List component rendering with task data',()=>{
    it('mounting',()=>{
      const container = shallowMount(ListContainer,
        {
          mixins: [{
          methods: {
            taskcompleted : ()=> jest.fn(),
            getTasks : ()=>  [{
              id: '',
              title : '',
              demonstration: '',
              dueDate:  null,
              isCompleted: false,
              isPending: true,
              isDuplicate: false,
              isDueDateExpired: false
            }],
            getRowClass : () => ''
          }
        }]})
      expect(container.exists()).toBe(true);
    })
})
