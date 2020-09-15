import { shallowMount } from '@vue/test-utils'
import BooksPage from '@/components/BooksPage.vue'
import BooksTable from '@/components/BooksTable.vue'
import {localVue} from "../localVue";


describe('BooksPage.vue', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(BooksPage, {localVue, propsData: {'books': []}})
        expect(wrapper.text()).toMatch("Most popular Books of All time")
        expect(wrapper.findComponent(BooksTable).exists()).toBe(true)
    })
})
