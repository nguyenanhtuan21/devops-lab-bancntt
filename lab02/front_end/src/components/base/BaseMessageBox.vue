<!-- /* ------------------
----MessageBox : popup cảnh báo----------
----author: TVLOI ----------
----16/08/2022    ----------
*/ -->
<template>
    <div class="modal" id="messageBox">
        <div class="modal-content">
            <div class="message-box">
                <div class="message">
                    <div :class="'icon ' + iconClass"></div>
                    <span>{{ message }}</span>
                </div>
                <!-- mode xóa nhân viên -->
                <div class="box-navbar" v-if="mode == Enumeration.MessageBox.Delete">
                    <div class="left">
                        <button class="btn-txt-black" @click="onClickCancel">Không</button>
                    </div>
                    <div class="right">
                        <button class="btn-txt bg-primary" @click="onClickAdmit">Có</button>
                    </div>
                </div>
                <!-- mode cảnh báo trùng mã -->
                <div class="box-navbar" v-if="mode == Enumeration.MessageBox.Duplicate">
                    <div class="left"></div>
                    <div class="right">
                        <button class="btn-txt bg-primary" @click="onClickCancel">Đồng ý</button>
                    </div>
                </div>
                <!-- mode cảnh báo đóng formDetail -->
                <div class="box-navbar" v-if="mode == Enumeration.MessageBox.Close">
                    <div class="left">
                        <button class="btn-txt-black" @click="onClickCancel">Hủy</button>
                    </div>
                    <div class="right">
                        <button class="btn-txt-black" @click="onClickRefuse">Không</button>
                        <button class="btn-txt bg-primary" @click="onClickAdmit">Có</button>
                    </div>
                </div>
                <!-- mode cảnh báo để trống -->
                <div class="box-navbar flex-center" v-if="mode == Enumeration.MessageBox.Blank">
                    <button class="btn-txt bg-primary" @click="onClickCancel">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(./../../css/base/messagebox.css);
</style>

<script>
import Enumeration from "@/js/Enumeration";
import { get, set } from "lodash";
export default {
    name: "messageBox",
    props: ["boxMode", "message"],
    data() {
        return {
            Enumeration: Enumeration,
        };
    },
    created() {
    },
    computed: {
        /**
         * @Description lấy ra class icon theo mode tương ứng
         * @Author TVLOI
         * 16/08/2022
         */
        iconClass() {
            if (this.mode == Enumeration.MessageBox.Close) {
                return "icon-warning-question";
            } else if (this.mode == Enumeration.MessageBox.Blank) {
                return "icon-warning-exclamation";
            }
            return "icon-warning";
        },
        mode: {
            get() {
                return this.boxMode;
            },
            set(value) {
                this.$emit("changeMessageBoxMode",value);
            }
        }
    },
    methods: {
        /**
         * @Description xử lý sự kiện bấm hủy
         * @Author TVLOI
         * 16/08/2022
         */
        onClickCancel() {
            this.$emit("cancel");
        },
        onClickAdmit() {
            this.$emit("admit");
        },
        onClickRefuse() {
            this.$emit('refuse');
        }
    },
};
</script>