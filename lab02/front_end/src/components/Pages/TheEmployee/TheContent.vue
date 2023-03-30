<!-- /* ------------------
----Component employee content: table, paging, add employee----------
----author: TVLOI ----------
----04/08/2022    ----------
*/ -->
<template>
  <div class="lt-component" v-show="menuComponent && !isShowPopup" id="menuComponent"
    v-click-outside="clickOutSidePopupDelete">
    <div class="dropdown-menu">
      <div @click="onClickReplication">Nhân bản</div>
      <div @click="
        isShowMessageBox = true;
        menuComponent = false;
      ">
        Xóa
      </div>
      <div>Ngưng sử dụng</div>
    </div>
  </div>
  <MessageBox v-if="isShowMessageBox" :boxMode="Enumeration.MessageBox.Delete" :message="warningMessage"
    @cancel="isShowMessageBox = false" @admit="deleteEmployee" />
  <!-- Phần table -->
  <div class="content">
    <!-- title của table và button thêm mới bản ghi -->
    <div class="content-header">
      <div class="grid-title">Nhân viên</div>
      <button class="btn-txt bg-primary flex no-copy" id="btnAddEmployee" @click="showPopup(true)">
        Thêm mới nhân viên
      </button>
    </div>
    <div class="main-content">
      <!-- header table ô search và refesh table -->
      <div class="grid-header">
        <div class="grid-header-left">
          <MultipleCommand :urls="EmployeeStore.DeleteMultiple" :items="employeesID" :message="warning.DeleteMultiple"
            @afterDelete="onAfterDeleteMultiple"></MultipleCommand>
        </div>
        <div class="grid-header-right">
          <div class="input-search">
            <input type="text" placeholder="Tìm theo mã, tên nhân viên" v-model="employeeFilter"
              @keyup.enter="getEmployees()" />
            <div class="input-icon icon-search" @click="getEmployees()"></div>
          </div>
          <button class="btn icon-refesh" title="Lấy lại dữ liệu" @click="getEmployees()"></button>
          <a class="btn icon-export" title="Lấy lại dữ liệu" :href="EmployeeStore.Export(employeeFilter)" download></a>
        </div>
      </div>

      <div class="content-grid" id="EmployeeID">
        <Loading v-if="isLoading"></Loading>
        <table>
          <thead>
            <tr>
              <th></th>
              <th class="select-col">
                <div class="checkbox-row" :class="{ 'border-active': checkAll }" @click="onClickCheckAll">
                  <input type="text" class="checkbox-input" />
                  <div class="icon-done" v-if="checkAll"></div>
                </div>
              </th>
              <th>MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>
              <th title="Số chứng minh nhân dân">SỐ CMND</th>
              <th>CHỨC DANH</th>
              <th>TÊN ĐƠN VỊ</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th>CHI NHÁNH TÀI KHOẢN NGÂN HÀNG</th>
              <th class="function-col">CHỨC NĂNG</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in employees" :key="item.EmployeeID" @dblclick="showPopup(true, item)"
              v-on="defaultEmployeesID.add(item.EmployeeID)" :class="{'active' : employeesID.has(item.EmployeeID)}">
              <td></td>
              <td class="select-col" v-on="checkAll ? employeesID.add(item.EmployeeID) : null">
                <div class="checkbox-row" @click="onClickCheckbox(item.EmployeeID)"
                  :class="{ 'border-active': employeesID.has(item.EmployeeID) }">
                  <input type="checkbox" class="checkbox-input" />
                  <div class="icon-done" v-if="employeesID.has(item.EmployeeID)"></div>
                </div>
              </td>
              <td>{{ item.EmployeeCode }}</td>
              <td>{{ item.EmployeeName }}</td>
              <td>{{ item.GenderName }}</td>
              <td>{{ getDateFormat(item.DateOfBirth) }}</td>
              <td>{{ item.IdentityNumber }}</td>
              <td>{{ item.PositionName }}</td>
              <td>{{ item.DepartmentName }}</td>
              <td>{{ item.BankAccount }}</td>
              <td>{{ item.BankName }}</td>
              <td>{{ item.BankBranch }}</td>
              <td class="function-col">
                <div class="dropdown-row">
                  <button class="edit-row" @click="showPopup(true, item)">
                    Sửa
                  </button>
                  <button class="btn-dropdown" @click="
                    menuComponentHandle($event);
                    setCurrentEmployee(item);
                  ">
                    <div :class="{
                      'border-blue':
                        currentEmployee.EmployeeID == item.EmployeeID &&
                        menuComponent,
                    }">
                      <div class="icon-dropdown icon-angle-green"></div>
                    </div>
                  </button>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- phần footer table: phân trang.. -->
      <div class="grid-pagination">
        <!-- hiển thị số bản ghi -->
        <div class="pagination-left">
          <div class="total-row">
            Tổng số: <span>{{ currentPageRecords }}/{{ totalRecord }}</span> bản
            ghi
          </div>
        </div>

        <!-- phân trang -->
        <div class="pagination-right">
          <div class="combobox-up" :class="{ active: isShowPageQuantitySelect }" v-click-outside="onClickQuantityPage">
            <input type="text" :value="recordsPerPage + ' bản ghi trên 1 trang'" readonly />
            <div class="dropdown-popup" v-show="isShowPageQuantitySelect">
              <div @click="
                recordsPerPage = 10;
                isShowPageQuantitySelect = false;
              " :class="{'active' : recordsPerPage == 10}">
                10 bản ghi trên 1 trang
              </div>
              <div @click="
                recordsPerPage = 20;
                isShowPageQuantitySelect = false;
              " :class="{'active' : recordsPerPage == 20}">
                20 bản ghi trên 1 trang
              </div>
              <div @click="
                recordsPerPage = 30;
                isShowPageQuantitySelect = false;
              " :class="{'active' : recordsPerPage == 30}">
                30 bản ghi trên 1 trang
              </div>
              <div @click="
                recordsPerPage = 50;
                isShowPageQuantitySelect = false;
              " :class="{'active' : recordsPerPage == 50}">
                50 bản ghi trên 1 trang
              </div>
              <div @click="
                recordsPerPage = 100;
                isShowPageQuantitySelect = false;
              " :class="{'active' : recordsPerPage == 100}">
                100 bản ghi trên 1 trang
              </div>
            </div>
            <button class="btn-dropdown-up" @click="isShowPageQuantitySelect = !isShowPageQuantitySelect">
              <div class="icon-arrow-down" :class="{ active: isShowPageQuantitySelect }"></div>
            </button>
          </div>
          <pagination :totalPages="totalPages" :currentPage="currentPage" @changeCurrentPage="changeCurrentPage"
            :maxVisibleButtons="maxVisibleButtons">
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotiMessage from "@/locales/NotificationMessage"
import warning from "@/locales/WarningMessage"
import EmployeeStore from "@/store/employee";
import Notification from "@/js/Notification";
import Enumeration from "@/js/Enumeration";
import axios, { AxiosError } from "axios";
// import common from "../../../js/Common";
import MultipleCommand from "@/components/base/MultipleCommand.vue";
import pagination from "@/components/base/Pagination";
import $ from "jquery";
import MessageBox from "@/components/base/BaseMessageBox.vue";
import Loading from "@/components/base/Loading.vue"
// import FormDetail from './FormDetail.vue'

export default {
  name: "EmployeeID",
  components: {
    pagination,
    MessageBox,
    MultipleCommand,
    Loading
  },
  data() {
    return {
      warning: warning,
      EmployeeStore: EmployeeStore,
      // Enum
      Enumeration: Enumeration,
      // Danh sách nhân viên
      employees: [],
      formDetail: false,
      menuComponent: false,
      // rowId: "",
      // ẩn popup chọn số lượng bản ghi
      isShowPageQuantitySelect: false,
      // số bản ghi trên trang
      recordsPerPage: 30,
      totalPages: Number,
      currentPage: 1,
      totalRecord: Number,
      currentPageRecords: Number,
      // số nút trang tối đa hiện
      maxVisibleButtons: 3,
      employeeFilter: "",
      isLoading: false,
      isShowMessageBox: false,
      // Lời nhắn cho popup warning
      warningMessage: "",
      currentEmployee: {},
      defaultEmployeesID: new Set(),
      employeesID: new Set(),
      checkboxAll: false,
    };
  },
  props: ["showPopup", "isShowPopup", "reloadData"],
  created() {
    // khởi tạo dữ liệu danh sách nhân viên
    this.getEmployees();
  },
  updated() {
    // this.onCheckboxEvents();
  },
  computed: {
    /**
     * @Description binding 2 chiều reloadData
     * @Author TVLOI
     * 14/08/2022
     */
    loadData: {
      get() {
        return this.reloadData;
      },
      set(value) {
        this.$emit("changeReloadData", value);
      },
    },
    /**
     * @Description ẩn hiện checkbox checkAll
     * @Author TVLOI
     * 09/09/2022
     */
    checkAll: {
      get() {
        if (this.employeesID.size == this.recordsPerPage || this.checkboxAll) {
          return true;
        }
        return false;
      },
      set(value) {
        return value;
      },
    },
  },
  watch: {
    /**
     * @Description khi số bản ghi trên 1 trang thay đổi thực hiện lấy lại dữ liệu
     * @Author TVLOI
     * 07/08/2022
     */
    recordsPerPage: function () {
      this.currentPage = 1;
      this.getEmployees();
    },
    /**
     * @Description khi đổi trang thực hiện lấy lại dữ liệu
     * @Author TVLOI
     * 07/08/2022
     */
    currentPage: function () {
      this.getEmployees();
    },
    /**
     * @Description nếu loadData = true getData()
     * @Author TVLOI
     * 06/08/2022
     */
    loadData: function () {
      if (this.loadData) {
        this.getEmployees();
        this.loadData = false;
      }
    },
  },
  methods: {
    /**
     * @Description lấy dữ liệu nhân viên từ api
     * @Author TVLOI
     * 06/08/2022
     */
    async getEmployees() {
      this.isLoading = true;
      let urls = EmployeeStore.Filter(this.recordsPerPage, this.currentPage, this.employeeFilter, "");
      await axios
        .get(urls)
        .then((response) => {
          this.employees = response.data.Data;
          if (!this.employees.length) {
            this.currentPage = 1;
          }
          // tổng số trang
          this.totalPages = response.data.TotalPages;
          // tổng số bản ghi
          this.totalRecord = response.data.TotalRecords;
          // số bản ghi trên trang
          this.currentPageRecords = response.data.CurrentPageRecords;
        })
        .catch((e) => {
          Notification.error(NotiMessage.Error.Title,
          NotiMessage.Error.Content);
          console.log(e);
        });
      this.isLoading = false;
    },
    /**
     * @Description lấy vị trí và ẩn hiện menu sửa xóa
     * @Author TVLOI
     * 07/08/2022
     */
    menuComponentHandle(e) {
      // tìm vị trí của đối tượng yêu cầu hiện menu
      let position = $(e.target)[0].getBoundingClientRect();
      var top = position.top;
      var left = position.left;
      $("#menuComponent")
        .find(".dropdown-menu")
        .css({ top: top + 30, left: left - 50 });
      this.menuComponent = !this.menuComponent;
    },
    /**
     * @Description lưu id nhân viên để xóa
     * @Author TVLOI
     * 07/08/2022
     */
    setCurrentEmployee(employee) {
      this.currentEmployee = employee;
      this.warningMessage = warning.Delete(this.currentEmployee.EmployeeCode);
    },
    /**
     * @Description xóa nhân viên theo id
     * @Author TVLOI
     * 07/08/2022
     */
    deleteEmployee() {
      let urls = EmployeeStore.Delete(this.currentEmployee.EmployeeID);
      axios
        .delete(urls)
        .then((response) => {
          // this.menuComponent = false;
          this.isShowMessageBox = false;
          this.getEmployees();
          Notification.warning(
            NotiMessage.Delete.Title,
            NotiMessage.Delete.Content(this.currentEmployee.EmployeeCode)
          );
        })
        .catch((e) => {
          Notification.error(NotiMessage.Error.Title,
          NotiMessage.Error.Content);
          console.log(e);
        });
    },
    /**
     * @Description Lấy ra định dạng date dd/mm/yyyy
     * @Author TVLOI
     * 07/08/2022
     */
    getDateFormat(dateSrc) {
      let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, "0"),
        day = date.getDate().toString().padStart(2, "0");

      return `${day}/${month}/${year}`;
    },
    /**
     * @Description chuyển trang
     * @Author TVLOI
     * 07/08/2022
     */
    changeCurrentPage(value) {
      this.currentPage = value;
    },
    /**
     * @Description Export dữ liệu to excel
     * @Author TVLOI
     * 07/08/2022
     */
    // async exportToExcel() {
    //   let url = `https://localhost:44358/api/v1/Employees/Export`;
    //   await axios
    //     .post(url, this.employees, { responseType: "blob" })
    //     .then((response) => {
    //       SaveFile.forceFileDownload(response, "employeesFile");
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    /**
     * @Description ẩn context page size
     * @Author TVLOI
     * 07/08/2022
     */
    onClickQuantityPage(e) {
      this.isShowPageQuantitySelect = false;
    },
    /**
     * @Description click outside combobox cột chức năng
     * @Author TVLOI
     * 30/08/2022
     */
    clickOutSidePopupDelete(e) {
      if (e.target.classList[0] != "icon-dropdown") {
        this.menuComponent = false;
      }
    },
    /**
     * @Description click single checkbox
     * @Author TVLOI
     * 07/09/2022
     */
    onClickCheckbox(id) {
      this.checkboxAll = false;
      if (this.employeesID.has(id)) {
        this.employeesID.delete(id);
      } else {
        this.employeesID.add(id);
      }
    },
    /**
     * @Description click multiple checkbox
     * @Author TVLOI
     * 07/09/2022
     */
    onClickCheckAll() {
      this.checkboxAll = !this.checkboxAll;
      if (this.employeesID.size == this.defaultEmployeesID.size) {
        this.employeesID = new Set();
      } else {
        this.employeesID = new Set(this.defaultEmployeesID);
      }
    },
    /**
     * @Description Sự kiện sau khi xóa nhiều bản ghi
     * @Author TVLOI
     * 07/09/2022
     */
    onAfterDeleteMultiple(check) {
      if (check) {
        Notification.warning(
          NotiMessage.DeleteMultiple.Title,
          NotiMessage.DeleteMultiple.Content(this.employeesID.size)
        );
        this.employeesID = new Set();
        this.getEmployees();
      } else {
        Notification.error(NotiMessage.Error.Title,
          NotiMessage.Error.Content);
      }
    },
    /**
     * @Description Sự kiện click nhân bản
     * @Author TVLOI
     * 09/09/2022
     */
    onClickReplication() {
      let employeeSelected = JSON.parse(JSON.stringify(this.currentEmployee));
      delete employeeSelected.EmployeeID;
      employeeSelected.EmployeeCode = "";
      this.showPopup(true, employeeSelected);
    },
  },
};
</script>