import {shallowMount, mount} from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'
import BooksTable from '@/components/BooksTable.vue'
import {localVue} from "../localVue";
import books from "@/assets/books";


// this is a place where I would put some fake data but I already have books in assets so I will just use those
const testBooksData = books;
const booksPerPage = 3

describe('BooksTable.vue', () => {
    it('renders pagination and several book titles correctly', () => {
        const wrapper = mount(BooksTable, {localVue, propsData: {'books': testBooksData, 'perPage': booksPerPage}})
        expect(wrapper.findComponent(Pagination).exists()).toBe(true)

        const text = wrapper.text()
        for (let i = 0; i < booksPerPage; ++i) {
            const book = testBooksData[i]
            expect(text).toMatch(book.title)
        }
        expect(text).not.toMatch(testBooksData[booksPerPage].title)
    })

    it('renders book props correctly', () => {
        const wrapper = mount(BooksTable, {localVue, propsData: {'books': [testBooksData[0]], 'perPage': booksPerPage}})

        const book = testBooksData[0]
        const text = wrapper.text()

        expect(text).toMatch(book.title)
        expect(text).toMatch(book.publishYear.toString())
        expect(text).toMatch(book.author)
        expect(text).toMatch(book.rating.toString())
        expect(wrapper.find("img.book-image").attributes()).toHaveProperty("src", book.image)

        const storeLinks = wrapper.findAll(".store-link")
        expect(storeLinks.length).toBe(book.stores.length)
        storeLinks.wrappers.forEach((storeLink, index) => {
            expect(storeLink.text()).toBe(book.stores[index].label)
        })
    })

    it('renders book details can be expanded/collapsed', async () => {
        const wrapper = mount(BooksTable, {localVue, propsData: {'books': testBooksData, 'perPage': booksPerPage}})
        const testedBookIndex = booksPerPage-1;

        const selector = "tbody .books-list-tr .book-details"
        // check if details row is collapsed
        expect(wrapper.find(selector).exists()).toBe(false)

        await wrapper.find('.books-list').vm.$emit('row-clicked', testBooksData[testedBookIndex])
        await wrapper.vm.$nextTick()

        // check if details row is expanded
        const bookDetails = wrapper.find(selector)
        expect(bookDetails.exists()).toBe(true)

        //compare html without whitespaces
        expect(bookDetails.html().replace(/\s+/g, ''))
            .toContain(testBooksData[testedBookIndex].html.replace(/\s+/g, ''))

        //collapse again and check
        await wrapper.find('.books-list').vm.$emit('row-clicked', testBooksData[testedBookIndex])
        await wrapper.vm.$nextTick()

        expect(wrapper.find(selector).exists()).toBe(false)
    })
})
