<template>
  <div class="d-flex">
      <div>
        <b-button
            class="text-secondary pagination-btn prev-button"
            :disabled="prevDisabled"
            variant="link"
            @click="currentPageChanged(value-1)">
          <b-icon :variant="prevDisabled ? 'secondary' : 'dark'" icon="chevron-left"></b-icon>
        </b-button>
      </div>

      <div>
        <span>
          Page {{ value }} of {{ totalPages }}
        </span>
      </div>
      <div>
        <b-button
            class="text-secondary pagination-btn next-button"
            :disabled="nextDisabled"
            variant="link"
            @click="currentPageChanged(value+1)">
          <b-icon :variant="nextDisabled ? 'secondary' : 'dark'" icon="chevron-right"></b-icon>
        </b-button>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Pager extends Vue {
  @Prop() value!: number;
  @Prop() totalRows!: number;
  @Prop() perPage!: number;


  get totalPages() {
    if (this.perPage == 0 || this.totalRows == 0) {
      return 1;
    }
    return Math.floor(this.totalRows / this.perPage) + (this.totalRows % this.perPage > 0 ? 1 : 0)
  }

  get nextDisabled() {
    return this.value >= this.totalPages;
  }

  get prevDisabled() {
    return this.value <= 1;
  }

  currentPageChanged(page: number) {
    this.$emit('input', page)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.pagination-btn {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
