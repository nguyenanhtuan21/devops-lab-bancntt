<!-- Component xử lý thao tác hàng loạt -->
<template>
  <button
    class="mc-multiple-command"
    id="multipleCommandID"
    v-click-outside="onClickOutside"
  >
    <div class="mc-main flex" @click="onClickTogglePopup">
      <span>Thực hiện hàng loạt</span>
      <div class="icon-arrow-down-fat"></div>
    </div>
    <div
      class="mc-component"
      v-if="isShowPopup"
      @click="isShowMessageBox = true"
    >
      <span>Xóa</span>
    </div>
  </button>
  <MessageBox
    v-if="isShowMessageBox"
    :boxMode="Enumeration.MessageBox.Delete"
    :message="message"
    @cancel="isShowMessageBox = false"
    @admit="deleteItems"
  />
</template>

<style scoped>
@import url(@/css/base/multiplecommand.css);
</style>

<script>
import MessageBox from "./BaseMessageBox.vue";
import Enumeration from "@/js/Enumeration";
import axios from "axios";

export default {
  name: "multipleCommandID",
  components: {
    MessageBox,
  },
  data() {
    return {
      isShowPopup: false,
      isShowMessageBox: false,
      Enumeration: Enumeration,
    };
  },
  props: {
    urls: {
      type: String,
      required: true,
    },
    items: {
      type: Set,
      required: true,
    },
    message: {
      type: String,
    },
  },

  methods: {
    /**
     * @Description ẩn hiện popup khi click btn thực hiện hàng loạt
     * @Author TVLOI
     * 07/09/2022
     */
    onClickTogglePopup() {
        if(this.items.size > 0){
            this.isShowPopup = !this.isShowPopup;
        }
    },
    /**
     * @Description ẩn popup khi click bên ngoài cha
     * @Author TVLOI
     * 07/09/2022
     */
    onClickOutside() {
      this.isShowPopup = false;
    },
    /**
     * @Description Xóa các record được chọn
     * @Author TVLOI
     * 07/09/2022
     */
    async deleteItems() {
      let check = false;
    //   tạo list đối tượng
      let formData = [];
        for(let item of Array.from(this.items)) {
            formData.push({
                id: item
            });
        }
      await axios
        .patch(this.urls, formData)
        .then((response) => {
          check = true;
          this.isShowMessageBox = false;
          this.$emit("afterDelete", check);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>