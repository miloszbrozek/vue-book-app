<template>
    <div class="content p-4">
        <b-container fluid class="page rounded">
          <b-row class="p-4">
            <h3 class="title mb-3">
              Most popular Books of All time
            </h3>
            <BooksList :books="books" class="books-list"/>
          </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BooksTable from "@/components/BooksTable.vue";
import books from '../assets/books'
import {Book} from "@/models/Book";

@Component({
  components: {
    BooksList: BooksTable,
  },
})
export default class BooksPage extends Vue {
  books = books as Book[]
}
</script>

<style scoped>
  .page {
    background-color: white;
  }
  .content {
    background-color: #f5f1ed;
  }
  .title {
  }
  .books-list {
    margin-left: -12px;
  }
</style>
