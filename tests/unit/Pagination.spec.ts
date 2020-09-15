import { shallowMount, mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'
import {localVue} from "../localVue";


const threePagesState = {
  value: 2,
  totalRows: 7,
  perPage: 3
};

const singlePageState = {
  value: 1,
  totalRows: 2,
  perPage: 3
}

describe('Pagination.vue', () => {
  it('renders page number correctly for 3 pages', () => {
    const wrapper = shallowMount(Pagination, {localVue, propsData: threePagesState})
    expect(wrapper.text()).toMatch("Page 2 of 3")
    expect(wrapper.find('.prev-button').attributes()["disabled"]).toBeFalsy()
    expect(wrapper.find('.next-button').attributes()["disabled"]).toBeFalsy()
  })

  it('renders page number correctly for a single page', () => {
    const wrapper = shallowMount(Pagination, {localVue, propsData: singlePageState})
    expect(wrapper.text()).toMatch("Page 1 of 1")
    expect(wrapper.find('.prev-button').attributes()).toHaveProperty("disabled")
    expect(wrapper.find('.next-button').attributes()).toHaveProperty("disabled")
  })

  it('interacts when changing pages', async () => {
    const wrapper = mount(Pagination, {
      localVue,
      propsData: threePagesState,
      listeners: {
        // simulate v-model update
        input: (val: any) => {
          wrapper.setProps({ value: val });
        }
      }
    })
    const prevButton = wrapper.find('.prev-button')
    const nextButton = wrapper.find('.next-button')

    await prevButton.trigger('click')
    await nextButton.trigger('click')
    await nextButton.trigger('click')
    await wrapper.vm.$nextTick()

    const emittedInput = wrapper.emitted().input || []
    expect(emittedInput.length).toBe(3)
    expect(emittedInput[0]).toStrictEqual([1])
    expect(emittedInput[2]).toStrictEqual([3])

    expect(wrapper.find('.next-button').attributes()).toHaveProperty("disabled")
  })
})
