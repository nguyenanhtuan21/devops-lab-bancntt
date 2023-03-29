<!-- /* ------------------
----Component sidebar----------
----author: TVLOI ----------
----04/08/2022    ----------
*/ -->
<template>
        <div class="sidebar" id="sidebarId" :class="{ 'thin-width': isCollapseSidebar }">

            <!-- logo -->
            <div class="header">
                <div class="btn btn-menu-option" v-if="!isCollapseSidebar"></div>
                <div class="logo logo-image logo-amis" v-if="!isCollapseSidebar"></div>
                <div class="btn btn-menu-toggle icon-menu-light" v-show="isCollapseSidebar" @click="onClickMenuToggle(false)"></div>
            </div>

            <!-- menu -->
            <div class="menu">

                <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path" active-class="active" @click="menuItemActive = index">
                    <div class="menu-item">
                        <div :class="'menu-item-icon '+ item.iconClass"></div>
                        <div class="menu-item-title" v-if="!isCollapseSidebar">{{item.value}}</div>
                    </div>
                </router-link>

            </div>

        </div>
</template>

<style>
@import url('@/css/layout1/sidebar.css');
</style>

<script>
export default {
    name: 'sideBarId',
    props:['isCollapseSidebar'],
    data() {
        return {
            menuItems: [
                {iconClass:'icon-overview', path:'/none', value:'Tổng quan'},
                {iconClass:'icon-cash', path:'/none', value:'Tiền mặt'},
                {iconClass:'icon-deposits', path:'/employees', value:'Tiền gửi'},
                {iconClass:'icon-Purchase', path:'/purchase', value:'Mua hàng'},
                {iconClass:'icon-sell', path:'/sell', value:'Bán hàng'},
                {iconClass:'icon-Receipt', path:'/none', value:'Quản lý hóa đơn'},
                {iconClass:'icon-warehouse', path:'/none', value:'Kho'},
                {iconClass:'icon-tool', path:'/none', value:'Công cụ dụng cụ'},
                {iconClass:'icon-asset', path:'/none', value:'Tài sản cố định'},
                {iconClass:'icon-tax', path:'/none', value:'Thuế'},
                {iconClass:'icon-price', path:'/none', value:'Giá thành'},
                {iconClass:'icon-synthetic', path:'/none', value:'Tổng hợp'},
                {iconClass:'icon-budget', path:'/none', value:'Ngân sách'},
                {iconClass:'icon-report', path:'/none', value:'Báo cáo'},
                {iconClass:'icon-analysis', path:'/none', value:'Phân tích tài chính'},
            ],
            menuItemActive: 3
        }
    },
    methods: {
        /**
         * @description co giãn sidebar
         * @author TVLOI
         * 12/08/2022
         */
        onClickMenuToggle(variable) {
            this.$emit('setCollapseSidebar', false);
        }
    },
}
</script>