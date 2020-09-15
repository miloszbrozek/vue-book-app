<template>
  <b-container fluid>
    <b-row>
      <b-table hover
               :items="books"
               :fields="fields"
               @row-clicked="rowClicked"
               @row-dblclicked="rowClicked"
               :current-page="currentPage"
               :per-page="perPage"
               class="books-list"
               thead-tr-class="books-list-tr"
               tbody-tr-class="books-list-tr"
      >
        <template v-slot:head()="{column, field}">
          <div :class="column == 'title' ? 'text-left' : 'text-center'">
            <span class="text-uppercase text-secondary">{{ field.label }}</span>
          </div>
        </template>

        <template v-slot:cell(title)="data">
          <div class="d-flex">
            <div class="mr-2"><img :src="data.item.image" class="thumbnail rounded book-image"/></div>
            <div class="d-flex flex-column">
              <div class="title mb-1 font-weight-bold">{{ data.item.title }}</div>
              <div class="author text-secondary">{{ data.item.author }}</div>
            </div>
          </div>
        </template>
        <template v-slot:cell(publishYear)="data">
          <div class="d-flex align-items-center justify-content-center h-100">
            <span>{{data.item.publishYear}}</span>
          </div>
        </template>
        <template v-slot:cell(rating)="data">
          <div class="d-flex align-items-center justify-content-center h-100">
            <span>{{data.item.rating}}/10</span>
          </div>
        </template>
        <template v-slot:cell(buyOn)="data">
          <div class="d-flex align-items-center justify-content-center h-100 flex-column">
            <b-button v-for="store in data.item.stores" :key="store.label"
                      variant="link" class="store-link" @click="linkButtonClicked(store.link)">
              {{ store.label }}
            </b-button>
          </div>
        </template>

        <template v-slot:row-details="row">
            <div class="book-details" v-html="row.item.html"></div>
        </template>
      </b-table>
      <div class="my-4 d-flex justify-content-center w-100">
        <Pagination v-model="currentPage" :total-rows="books.length" :per-page="perPage" />
      </div>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Pagination from "@/components/Pagination.vue";
import {Book} from "@/models/Book";


@Component({
  components: {
    Pagination,
  },
})
export default class BooksTable extends Vue {
  @Prop() books!: Book[];
  @Prop({default: 5}) readonly perPage!: number;
  fields = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'publishYear',
      label: 'Published',

    },
    {
      key: 'rating',
      label: 'Rating',
    },
    {
      key: 'buyOn',
      label: 'Buy on',
    }
  ]
  currentPage=1

  rowClicked(item: any) {
    this.$set(item, '_showDetails', !item._showDetails)
  }

  linkButtonClicked(link: string) {
    location.href = link
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .thumbnail {
    width: 68px;
    height: 100px;
  }
  .store-link {
    color: #bcd283;
    padding:0px;
    font-weight: bold;
  }
  .store-link:hover {
    color: #dde8c1;
  }
</style>
