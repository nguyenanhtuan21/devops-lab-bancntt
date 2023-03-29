<!-- /* ------------------
----Component BaseCombobox----------
----author: TVLOI ----------
----03/08/2022    ----------
*/ -->
<template>
    <!-- <div class="combobox" id="comboboxID">
        <div class="cb-input" :class="{ 'border-red': !cbValue && !checkValidated }"
            :title="!cbValue && !checkValidated ? titleMessage : ''" v-click-outside="onClickOutside">
            <input type="text" placeholder="Tìm kiếm" v-model="cbValue" @focus="isShow = true"
                />
            <div @click="isShow = !isShow">
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div class="cb-list" v-if="isShow">
            <div class="cb-item no-copy" v-for="item in listItem" :key="item[nameId]" @click="onSelectItem(item)">
                <i class="fa-solid fa-check"></i>{{ item[fieldName] }}
            </div>
        </div>
    </div> -->
    <el-select v-model="cbValue" class="el-select" placeholder="Chọn đơn vị" popper-class="selectbox" id="comboboxID"
        @change="onChange" ref="myCombobox"
        :class="{'warning' : !cbValue && !checkValidated}" :title="!cbValue && !checkValidated ? titleMessage : ''">
        <el-option v-for="item in listItem" :key="item[nameId]" :label="item[fieldName]" :value="item[nameId]"
            />
    </el-select>
</template>

<style scoped>
@import url(./../../css/base/basecombobox.css);
</style>

<script>
import axios from "axios";
import $ from "jquery"
import { nextTick } from '@vue/runtime-core';
// import { error } from 'console'
// import { response } from 'express'
export default {
    name: "comboboxID",
    props: [
        "urls",
        "fieldName",
        "nameId",
        "defaultValue",
        "checkValidated",
        "titleMessage",
    ],
    data() {
        return {
            listItem: [],
            isShow: false,
            selectedId: "",
            selectedName: "",
        };
    },

    mounted() {
        this.getData();
    },
    computed: {
        cbValue: {
            get() {
                return this.defaultValue;
            },
            set(value) {
                this.$emit("changeComboboxValue", value);
            },
        }
    },
    methods: {
        /**
         * @Description Lấy dữ liệu từ api đổ vào combobox
         * @Author TVLOI
         * 05/08/2022
         */
        getData() {
            axios
                .get(this.urls)
                .then((response) => (this.listItem = response.data))
                .catch((error) => console.log(error));
        },
        /**
         * @Description xử lý sự kiện select
         * @Author TVLOI
         * 05/08/2022
         */
        onSelectItem(item) {
            // lấy Id của item đã chọn
            this.selectedId = item[this.nameId];
            // lấy tên để gán vào ô input
            // this.cbValue = item[this.fieldName];
            // gửi id cho cha xử lý
            this.$emit("changeLabelValue", this.selectedId);
            // this.isShow = false;
        },
        onClickOutside() {
            this.isShow = false;
        },
        async onChange(e) {
            await nextTick();
            let el = $("#comboboxID").find("input");
            let name = this.$refs.myCombobox.selected.currentLabel;
            this.$emit("changeLabelValue", name);
        }
    },
};
</script>