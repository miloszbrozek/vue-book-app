<template>
    <BooksPage/>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BooksPage from "@/components/BooksPage.vue";

@Component({
  components: {
    BooksPage: BooksPage,
  },
})
export default class App extends Vue {
}
</script>
