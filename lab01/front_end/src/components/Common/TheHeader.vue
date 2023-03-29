<template>
        <div class="header" id="headerId">

            <div class="btn btn-menu-toggle icon-menu" v-if="!isCollapseSidebar" @click="collapseSidebarEventHandle()"></div>

            <div class="header-branch">
                <div class="header-branch-name">CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC</div>
                <div class="header-branch-icon icon-angle"></div>
            </div>

            <div class="header-right">
                <div class="btn icon-notification"></div>
                <div class="user flex">
                    <div class="btn-image icon-avatar"></div>
                    <div class="user-name">Trần Văn Lợi</div>
                    <div class="user-icon icon-angle-small"></div>
                </div>
            </div>

        </div>
</template>

<script>
export default {
    name: 'headerId',
    props:['isCollapseSidebar'],
    data() {
        return {
            isShowBtnMenu: true
        }
    },
    methods: {
        // hàm xử lý thu gọn sidebar
        collapseSidebarEventHandle() {
            this.isShowBtnMenu = false;
            this.$emit('collapseSidebar', true);
        }
    },
}
</script>