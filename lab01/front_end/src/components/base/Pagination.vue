<!-- /* ------------------
----Component pagination----------
----author: TVLOI ----------
----04/08/2022    ----------
*/ -->
<template>
  <div class="pagination" id="pagination">
    <button class="btn-i-left no-copy" @click="currentPageComputed -= 1" :disabled="isInFirstPage">Trước</button>
    <div class="btn-i-left btn-page no-copy" v-show="!isInFirstPage && (currentPageComputed > maxVisibleButtons)"
    @click="currentPageComputed = 1"
    >1</div>
    <button class="btn-i-left no-copy" v-show="!isInFirstPage && (currentPageComputed > maxVisibleButtons)">...</button>
    <div class="btn-num">
      <div class="btn-page no-copy" v-for="page in pages" :key="page.name" :class="{ active: currentPageComputed == page.name }"
        @click="currentPageComputed = page.name" :aria-disabled="page.isDisabled">
        {{ page.name }}
      </div>
    </div>
    <div class="no-copy" v-if="!isInLastPage && (currentPageComputed < totalPages - maxVisibleButtons + 1)">...</div>
    <div class="btn-i-right btn-page no-copy" v-if="!isInLastPage && (currentPageComputed < totalPages - maxVisibleButtons + 1)"
    @click="currentPageComputed = totalPages"
    >{{totalPages}}</div>
    <button class="btn-i-right no-copy" @click="currentPageComputed += 1" :disabled="isInLastPage">Sau</button>
  </div>
</template>

<style scoped>
@import url(./../../css/base/pagination.css);
</style>


<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "pagination",
  props: {
    // số page button hiện
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 4
    },
    // Tổng số page
    totalPages: {
      type: Number,
      required: true
    },
    // trang đang chọn
    currentPage: {
      type: Number,
      required: true
    }
  },
  watch: {},
  computed: {
    /**
 * @Description Binding 2 chiều currentPage vs cha
 * @Author TVLOI
 * 07/08/2022
 */
    currentPageComputed: {
      get() {
        return this.currentPage;
      },

      set(value) {
        if (typeof value == 'number') {
          this.$emit('changeCurrentPage', value);
        }
      }
    },
    /**
 * @Description Tính page bắt đầu
 * @Author TVLOI
 * 07/08/2022
 */
    startPage() {
      // trang hiện tại <= 1
      if (this.currentPage <= 1) {
        return 1;
      }
      // trang hiện tại là trang cuối
      // trả về tổng số trang - số trang hiện +1
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // trang hiện tại ở giữa trả về currentPage -1
      return this.currentPage - 1;
    },
    /**
 * @Description các button hiện và đang active hay ko
 * @Author TVLOI
 * 07/08/2022
 */
    pages() {
      // mảng lưu các nút được hiện
      const range = [];

      // lặp các nút được hiện
      for (let i = this.startPage;
        // nếu trang bắt + số trang hiện lớn hơn totalPages => lấy totalPages
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i += 1) {
        if (i > 0) {
          range.push({
            name: i,
            // nếu = currenPage thì disabled
            isDisabled: i === this.currentPage
          });

        }
      }
      return range;
    },
    // kiểm tra đang ở trang 1
    isInFirstPage() {
      return this.currentPage === 1;
    },
    // kiểm tra True nếu đang ở trang cuối
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  }
};
</script>