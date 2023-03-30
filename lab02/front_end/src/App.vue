<template>
  <div class="container" id="amisID">
    <sidebar :isCollapseSidebar="isCollapseSidebar" @setCollapseSidebar="onClickCollapseSidebar" />
    <div class="main" :class="{ 'change-width-main': isCollapseSidebar }">
      <my-header @collapseSidebar="onClickCollapseSidebar" :isCollapseSidebar="isCollapseSidebar"></my-header>
      <!-- <my-content></my-content> -->
      <router-view :showPopup="onClickTogglePopup" :isShowPopup="isShowPopup" :reloadData="reloadData"
        @changeReloadData="changeReloadData"></router-view>
    </div>
    <employee-form-detail v-if="isShowPopup" :showPopup="onClickTogglePopup" :employeeSelected="employeeSelected"
      @changeEmployeeSelected="setEmployeeSelected" @saveEmployee="saveEmployee" @closeForm="onClickTogglePopup">
    </employee-form-detail>
  </div>
</template>

<script>
import NotiMessage from "@/locales/NotificationMessage"
import ExceptionMessage from "@/js/ExceptionMessage"
import EmployeeStore from "./store/employee";
import Notification from "./js/Notification";
import Enumeration from "@/js/Enumeration";
import axios, { AxiosError } from "axios";
import Sidebar from "./components/Common/TheSidebar.vue";
import MyHeader from "./components/Common/TheHeader.vue";
import CommonFn from "./js/Common";
import EmployeeFormDetail from "./components/Pages/TheEmployee/FormDetail.vue";


export default {
  name: "App",
  components: {
    Sidebar,
    MyHeader,
    EmployeeFormDetail,
  },
  data() {
    return {
      isShowPopup: false,
      isCollapseSidebar: false,
      employeeSelected: {...CommonFn.BlankEmployee},
      reloadData: false,
      Enumeration: Enumeration,
    };
  },
  props: [],
  mounted() { },
  updated() { },
  watch: {
    $route(to, from) {
      document.title = to.meta.name || "Amis";
    },
  },
  methods: {
    /**
     * @description xử lý đống mở popup detail
     * @author TVLoi
     */
    onClickTogglePopup(isShow, employee) {
      this.isShowPopup = isShow;
      try {
        if (employee) {
          this.employeeSelected = employee;
        } else {
          this.employeeSelected = {...CommonFn.BlankEmployee};
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description co dãn siderbar
     * @author TVLoi
     */
    onClickCollapseSidebar(isCollapse) {
      this.isCollapseSidebar = isCollapse;
    },
    /**
     * @description Note lại Employee click sửa
     * @author TVLoi
     */
    setEmployeeSelected(value) {
      this.employeeSelected = value;
    },
    /**
     * @description Hàm xử lý thêm sửa nhân viên
     * @author TVLoi
     */
    async saveEmployee(mode, isShowForm, callback) {
      let urls = EmployeeStore.Base;
      this.formatEmployee();
      if (mode == Enumeration.FormMode.Edit) {
        urls += `/${this.employeeSelected.EmployeeID}`;
        await axios
          .put(urls, this.employeeSelected)
          .then((response) => {
            Notification.info(
              NotiMessage.Edit.Title,
              NotiMessage.Edit.Content(this.employeeSelected.EmployeeCode)
            );
          })
          .catch((e) => {
            if(e.response.status == 500){
              Notification.error(ExceptionMessage.Server.Title,
              ExceptionMessage.Server.Content);
            }
            Notification.error(NotiMessage.Error.Title,
              NotiMessage.Error.Content);
            console.log(e);
          });
      } else {
        await axios
          .post(urls, this.employeeSelected)
          .then((response) => {
            if(callback){
              callback();

            }
            Notification.success(
              NotiMessage.Add.Title,
              NotiMessage.Add.Content(this.employeeSelected.EmployeeCode)
            );
            this.reloadData = true;
          })
          .catch((e) => {
            Notification.error(NotiMessage.Error.Title,
              NotiMessage.Error.Content);
            console.log(e);
          });
      }
      if (isShowForm) {
        this.isShowPopup = isShowForm;
      } else {
        this.isShowPopup = false;
      }
    },
    /**
     * @description hàm sửa biến cho component con
     * @author TVLoi
     */
    changeReloadData(value) {
      this.reloadData = value;
    },
    formatEmployee() {
      if (this.employeeSelected.IdentityNumber||this.employeeSelected.IdentityNumber==0) {
        this.employeeSelected.IdentityNumber = `${this.employeeSelected.IdentityNumber}`
      }
      if (this.employeeSelected.PhoneNumber||this.employeeSelected.PhoneNumber==0) {
        this.employeeSelected.PhoneNumber = `${this.employeeSelected.PhoneNumber}`
      }
      if (this.employeeSelected.LandlinePhoneNumber||this.employeeSelected.LandlinePhoneNumber==0) {
        this.employeeSelected.LandlinePhoneNumber = `${this.employeeSelected.LandlinePhoneNumber}`
      }
      if (this.employeeSelected.BankAccount||this.employeeSelected.BankAccount==0) {
        this.employeeSelected.BankAccount = `${this.employeeSelected.BankAccount}`
      }
    }
  },
};
</script>

<style>
@import url(./css/index.css);
</style>
