<template>
  <div class="modal" id="employeeDetailID">
    <div class="modal-content" >
      <div class="popup flex" @keydown.esc="onCloseForm" @click="onClickOutside">
        <Loading v-if="isLoading"></Loading>
        <div class="p-header">
          <div class="flex">
            <div class="p-title">{{ formText.Title }}</div>
            <div class="check-box flex">
              <input type="checkbox" id="customer" name="role" value="customer" />
              <label for="role">{{ formText.Role.Customer }}</label><br />
              <input type="checkbox" id="supplier" name="role" value="supplier" />
              <label for="role">{{ formText.Role.Supplier }}</label><br />
            </div>
          </div>
          <div class="header-button">
            <div class="btn icon-question"></div>
            <div class="btn icon-close" @click="onCloseForm"></div>
          </div>
        </div>
        <div class="p-content">
          <div class="double-block flex">
            <div class="left-block">
              <div class="block-row">
                <div class="tl-input">
                  <label for="EmployeeCode">{{ formText.FieldName.Code }} <span>*</span></label>
                  <input type="text" class="input-thin" :placeholder="formText.Placeholder.Code" :readonly="mode == Enumeration.FormMode.Edit" name="EmployeeCode"
                    maxlength="20" id="EmployeeCode" v-model="currentEmployee.EmployeeCode" ref="inputCode" :class="{
                      'border-red':
                        !currentEmployee.EmployeeCode && !checkValidated,
                    }" :title="
                      !currentEmployee.EmployeeCode && !checkValidated
                        ? formText.BlankMessage.Code
                        : ''
                    " />
                </div>
                <div class="tl-input">
                  <label for="EmployeeName">{{ formText.FieldName.Name }} <span>*</span></label>
                  <input type="text" class="input-fat" :placeholder="formText.Placeholder.Name" name="EmployeeName" ref="inputName"
                    maxlength="100" id="EmployeeName" v-model="currentEmployee.EmployeeName" required :title="
                      !currentEmployee.EmployeeName && !checkValidated
                        ? formText.BlankMessage.Name
                        : ''
                    " :class="{
                      'border-red':
                        !currentEmployee.EmployeeName && !checkValidated,
                    }" />
                </div>
              </div>
              <div class="tl-input">
                <label for="DepartmentName">{{ formText.FieldName.DepartmentName }} <span>*</span></label>
                <BaseCombobox :urls="departmentUrl" :defaultValue="currentEmployee.DepartmentID"
                  :fieldName="'DepartmentName'" :nameId="'DepartmentID'" @changeLabelValue="changeDepartmentName"
                  @changeComboboxValue="changeComboboxValue" :checkValidated="checkValidated"
                  :titleMessage="formText.BlankMessage.Department" ref="inputDepartment"></BaseCombobox>
              </div>
              <div class="tl-input">
                <label for="PositionName">{{
                formText.FieldName.PositionName
                }}</label>
                <input type="text" class="input-full" :placeholder="formText.Placeholder.PositionName" maxlength="100"
                  name="PositionName" id="PositionName" v-model="currentEmployee.PositionName" />
              </div>
            </div>
            <div class="right-block">
              <div class="block-row">
                <div class="tl-input">
                  <label for="DateOfBirth">{{
                  formText.FieldName.DateOfBirth
                  }}</label>
                  <el-date-picker class="el-date-picker" v-model="computedDateOfBirth" type="date" clear-icon=""
                    popper-class="el-date-picker-popper" prefix-icon="" :max="todayDate" placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY" value-format="YYYY-MM-DD" />
                </div>
                <div class="tl-input">
                  <label for="Gender">{{ formText.FieldName.Gender }}</label>
                  <div class="group-radio">
                    <input type="radio" class="tl-radio" v-model="currentEmployee.Gender" :value="0" />
                    <label for="Gender">Nam</label>
                    <input type="radio" class="tl-radio" v-model="currentEmployee.Gender" :value="1" />
                    <label for="Gender">Nữ</label>
                    <input type="radio" class="tl-radio" v-model="currentEmployee.Gender" :value="2" />
                    <label for="Gender">Khác</label>
                  </div>
                </div>
              </div>
              <div class="block-row">
                <div class="tl-input">
                  <label for="IdentityNumber" title="Số chứng minh nhân dân">{{
                  formText.FieldName.IdentityNumber
                  }}</label>
                  <input type="number" class="input-fat" :placeholder="formText.Placeholder.IdentityNumber" min="0"
                    maxlength="20" name="IdentityNumber" v-model="currentEmployee.IdentityNumber" />
                </div>
                <div class="tl-input">
                  <label for="IdentityDate">{{
                  formText.FieldName.IdentityDate
                  }}</label>
                  <!-- <input type="date" class="input-thin input-date" name="IdentityDate" :max="todayDate"
                    v-model="computedIdentityDate" /> -->
                  <el-date-picker class="el-date-picker" v-model="computedIdentityDate" type="date"
                    popper-class="el-date-picker-popper" clear-icon="" :max="todayDate" placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY" value-format="YYYY-MM-DD" />
                </div>
              </div>
              <div class="tl-input">
                <label for="IdentityPlace">{{
                formText.FieldName.IdentityPlace
                }}</label>
                <input type="text" class="input-full" :placeholder="formText.Placeholder.IdentityPlace"
                  name="IdentityPlace" v-model="currentEmployee.IdentityPlace" />
              </div>
            </div>
          </div>
          <div class="single-block">
            <div class="tl-input">
              <label for="Address">{{ formText.FieldName.Address }}</label>
              <input type="text" class="input-full" :placeholder="formText.Placeholder.Address" name="Address"
                v-model="currentEmployee.Address" />
            </div>
          </div>

          <div class="group-input">
            <div class="tl-input">
              <label for="PhoneNumber" title="Số điện thoại di động">{{
              formText.FieldName.PhoneNumber
              }}</label>
              <input type="number" class="input-full" :placeholder="formText.Placeholder.PhoneNumber" name="PhoneNumber"
                min="0" maxlength="50" id="PhoneNumber" v-model="currentEmployee.PhoneNumber" />
            </div>
            <div class="tl-input">
              <label for="LandlinePhone" title="Số điện thoại cố định">{{
              formText.FieldName.LandlinePhone
              }}</label>
              <input type="number" class="input-full" :placeholder="formText.Placeholder.LandlinePhone" min="0"
                maxlength="50" name="LandlinePhone" id="LandlinePhone" v-model="currentEmployee.LandlinePhoneNumber" />
            </div>
            <div class="tl-input">
              <label for="Email">{{ formText.FieldName.Email }}</label>
              <input type="text" class="input-full" :placeholder="formText.Placeholder.Email" name="Email" id="Email"
                :class="{
                  'border-red':
                    !validateEmail
                }" v-model="currentEmployee.Email" />
            </div>
          </div>
          <div class="group-input">
            <div class="tl-input">
              <label for="BankAccount">{{
              formText.FieldName.BankAccount
              }}</label>
              <input type="number" class="input-full" :placeholder="formText.Placeholder.BankAccount" name="BankAccount"
                min="0" id="BankAccount" v-model="currentEmployee.BankAccount" />
            </div>
            <div class="tl-input">
              <label for="BankName">{{ formText.FieldName.BankName }}</label>
              <input type="text" class="input-full" :placeholder="formText.Placeholder.BankName" name="BankName"
                id="BankName" v-model="currentEmployee.BankName" />
            </div>
            <div class="tl-input">
              <label for="BankBranch">{{
              formText.FieldName.BankBranch
              }}</label>
              <input type="text" class="input-full" :placeholder="formText.Placeholder.BankBranch" name="BankBranch"
                id="BankBranch" v-model="currentEmployee.BankBranch" />
            </div>
          </div>
        </div>
        <div class="line-gray"></div>
        <div class="p-footer flex">
          <div class="flex">
            <button class="btn-txt-black" @click="onCloseForm">Hủy</button>
            <div class="flex">
              <button @click="saveEmployee" :class="
                mode == Enumeration.FormMode.Add
                  ? 'btn-txt-black'
                  : 'btn-txt bg-primary'
              ">
                Cất
              </button>
              <button class="btn-txt bg-primary" @click="saveAndAddEmployee" v-if="mode == Enumeration.FormMode.Add">
                Cất và thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MessageBox v-if="isShowMessageBox" @changeMessageBoxMode="messageBoxMode = $event" @cancel="onCloseMessage"
    :message="warningMessage" :boxMode="messageBoxMode" @admit="saveEmployee" @refuse="onRefuseEdited"></MessageBox>
</template>

<style scoped>
@import url("@/css/base/modal.css");
</style>


<script>
import NotiMessage from "@/locales/NotificationMessage"
import Warning from "@/locales/WarningMessage"
import DepartmentStore from "@/store/department"
import EmployeeStore from "@/store/employee";
import Text from "@/js/Const";
import Loading from "@/components/base/Loading.vue"
import MessageBox from "@/components/base/BaseMessageBox.vue";
import axios from "axios";
import Enumeration from "@/js/Enumeration";
import BaseCombobox from "@/components/base/BaseCombobox.vue";
import ExceptionMessage from "@/js/ExceptionMessage"
import CommonFn from "@/js/Common";
export default {
  name: "employeeDetailID",
  components: {
    BaseCombobox,
    MessageBox,
    Loading
  },
  data() {
    return {
      departmentUrl: DepartmentStore.Base,
      // Form chế độ add hoặc edit
      mode: Enumeration.FormMode.Add,
      // biến validate
      checkValidated: true,
      // chứa các enum
      Enumeration: Enumeration,
      // biến hiển thị popup cảnh báo
      isShowMessageBox: false,
      // lời nhắn truyền vào MessageBox
      warningMessage: "",
      // chế độ của MessageBox
      messageBoxMode: Enumeration.MessageBox.Blank,
      // Lưu lại employee trước khi thay đổi
      oldEmployee: {},
      isEdited: false,
      isDuplicate: false,
      formText: Text,
      isLoading: false
    };
  },
  props: ["showPopup", "employeeSelected"],
  async created() {
    if (!this.employeeSelected.EmployeeID) {
      this.currentEmployee.EmployeeCode = await this.newEmployeeCode();
    }
  },
  mounted() {
    //
    if (this.employeeSelected.EmployeeID) {
      this.mode = Enumeration.FormMode.Edit;
      // Lưu lại employee trước khi thay đổi
      this.oldEmployee = { ...this.currentEmployee };
    }

    // auto focus
    if(this.mode == Enumeration.FormMode.Add) {

      this.$refs.inputCode.focus();
    }else {
      this.$refs.inputName.focus();
    }
  },
  computed: {
    /**
     * @description Nhân viên đang được chọn(sửa, thêm)
     * @author TVLoi
     */
    currentEmployee: {
      get() {
        return this.employeeSelected;
      },
      set(value) {
        this.$emit("changeEmployeeSelected", value);
      },
    },
    /**
     * @description biding 2 chiều DateOfbirth
     * @author TVLoi
     */
    computedDateOfBirth: {
      get() {
        if (!this.currentEmployee.DateOfBirth) return null;
        return this.currentEmployee.DateOfBirth;
      },
      set(value) {
        if (value <= this.todayDate) {
          this.currentEmployee.DateOfBirth = value;
        }
      },
    },
    /**
     * @description biding 2 chiều IdentityDate
     * @author TVLoi
     */
    computedIdentityDate: {
      get() {
        if (!this.currentEmployee.IdentityDate) return null;
        return this.currentEmployee.IdentityDate;
      },
      set(value) {
        if (value <= this.todayDate) {
          this.currentEmployee.IdentityDate = value;
        }
      },
    },
    /**
     * @description Validate form Có hợp lệ không
     * @author TVLoi
     */
    isValidate() {
      if(this.isDuplicate){
        return false;
      }
      if (!this.currentEmployee.EmployeeCode) {
        return false;
      }
      if (!this.currentEmployee.EmployeeName) {
        return false;
      }
      if (!this.currentEmployee.DepartmentID) {
        return false;
      }
      if (!this.validateEmail) {
        return false;
      }
      return true;
    },
    /**
     * @description Date hiện tại
     * @author TVLoi
     * 16/08/2022
     */
    todayDate() {
      let now = new Date();
      return now.toISOString().slice(0, 10);
    },
    /**
     * @description validate email
     * @author TVLoi
     * 16/08/2022
     * @return {Boolean}
     */
    validateEmail() {
      let email = this.currentEmployee.Email;
      if (!email) return true;
      const regex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;
      return String(email).toLowerCase().match(regex);
    }
  },
  updated() {
    this.isEdited = true;
    // employeeSelected: function() {
    //   debugger
    //   if(this.oldEmployee != this.currentEmployee){
    //     this.isEdited = true;
    //   }
    // }
  },
  methods: {
    getDate(value) {
      try {
        return value.slice(0, 10);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description thực hiện lưu thông tin nhân viên
     * @author TVLoi
     * 16/08/2022
     */
    async saveEmployee() {
      if(this.mode == Enumeration.FormMode.Add){
        await this.checkExistEmployeeCode();
      }
      try {
        if (this.isValidate) {
          if (!this.currentEmployee.Email) {
            delete this.currentEmployee.Email;
          }
          this.$emit("saveEmployee", this.mode);
        } else {
          this.validateAction();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description gắn DepartmentId
     * @author TVLoi
     */
    changeDepartmentName(name) {
      try {
        this.currentEmployee.DepartmentName = name;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description hàm emit của combobox
     * @author TVLoi
     */
    changeComboboxValue(value) {
      try {
        this.currentEmployee.DepartmentID = value;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description Lấy new EmployeeCode từ API
     * @author TVLoi
     * 16/08/2022
     */
    async newEmployeeCode() {
      this.isLoading = true;
      try {
        let me = this;
        let newEmployeeCode = "";
        let urls = EmployeeStore.NewCode;
        await axios
          .get(urls)
          .then((response) => {
            newEmployeeCode = response.data;
            this.isLoading = false;
          })
          .catch((e) => {
            console.log(e);
            this.isLoading = false;
          });
        return newEmployeeCode;
      } catch (error) {
        if (error.response.status == 500) {
          Notification.error(ExceptionMessage.Server.Title,
            ExceptionMessage.Server.Content);
        }else{
          Notification.error(NotiMessage.Error.Title,
            NotiMessage.Error.Content);
          console.log(error);
        }
      }
    },
    /**
     * @description xử lý sự kiện đóng form detail
     * @author TVLoi
     * 16/08/2022
     */
    onCloseForm() {
      // kiểm tra employeeSelected có thay đổi ko
      let checkEdited =
        JSON.stringify(this.oldEmployee) ===
        JSON.stringify(this.currentEmployee);
      if (checkEdited || this.mode == Enumeration.FormMode.Add) {
        this.$emit("closeForm", false);
      } else {
        this.messageBoxMode = Enumeration.MessageBox.Close;
        this.warningMessage = Warning.DataChanged;
        this.isShowMessageBox = true;
      }
    },
    /**
     * @description xử lý sự kiện đóng form detail khi chỉnh sửa
     * @author TVLoi
     * 17/08/2022
     */
    onRefuseEdited() {
      let me = this;
      var proNames = Object.getOwnPropertyNames(this.oldEmployee);
      proNames.filter(function (propName) {
        me.currentEmployee[propName] = me.oldEmployee[propName];
      });
      this.showPopup(false);
    },
    /**
     * @description tìm nhân viên theo mã
     * @author TVLoi
     * 17/08/2022
     */
    async checkExistEmployeeCode() {
      this.isLoading = true;
      let me = this;
      let urll = EmployeeStore.Filter("", "", this.currentEmployee.EmployeeCode, "");
      await axios
        .get(urll)
        .then((response) => {
          if (response.data.CurrentPageRecords == 1) {
            me.isDuplicate = true;
          } else {
            me.isDuplicate = false;
          }
          this.isLoading = false;
        })
        .catch((e) => {
          this.isLoading = false;
          Notification.error(NotiMessage.Error.Title,
            NotiMessage.Error.Content);
          console.log(e);
        });
    },
    /**
     * @description Xử lý cất và thêm employee
     * @author TVLoi
     * 19/08/2022
     */
    async saveAndAddEmployee() {
      this.isLoading = true;
      await this.checkExistEmployeeCode();
      let me = this;
      try {
        if (this.isValidate) {
          if (!this.currentEmployee.Email) {
            delete this.currentEmployee.Email;
          }
          await this.$emit("saveEmployee", this.mode, Enumeration.FormMode.Show.Yes, async function (callback) {
            // me.currentEmployee.EmployeeCode = me.newEmployeeCode();
            // Lấy nhân viên value trống
            var blankEmployee = { ...CommonFn.BlankEmployee };
            // call Api lấy mã nhân viên mới
            blankEmployee.EmployeeCode = await me.newEmployeeCode();
            // lấy ra tất cả thuộc tính của blankEmployee
            var proNames = Object.getOwnPropertyNames(blankEmployee);
            // Gán giá trị cho currentEmployee
            proNames.filter(function (propName) {
              me.currentEmployee[propName] = blankEmployee[propName];
            });
            Object.keys(me.currentEmployee).forEach((k) => me.currentEmployee[k] == null && delete me.currentEmployee[k]);
            this.isLoading = false;
          });

        } else {
          this.validateAction();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description Thực thi validate
     * @author TVLoi
     * 19/08/2022
     */
    async validateAction() {
      // Gọi api check trùng mã
      // await this.checkExistEmployeeCode();
      this.checkValidated = false;
      this.messageBoxMode = Enumeration.MessageBox.Blank;
      if (this.isDuplicate && this.mode == Enumeration.FormMode.Add) {
        this.messageBoxMode = Enumeration.MessageBox.Duplicate;
        this.warningMessage = Warning.Duplicate(this.currentEmployee.EmployeeCode);
        // this.warningMessagee = `Mã nhân viên <${this.currentEmployee.EmployeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`;
      } else if (!this.currentEmployee.EmployeeCode) {
        this.warningMessage = Text.BlankMessage.Code;
      } else if (!this.currentEmployee.EmployeeName) {
        this.warningMessage = Text.BlankMessage.Name;
      } else if (!this.currentEmployee.DepartmentName) {
        this.warningMessage = Text.BlankMessage.Department;
      } else if (!this.validateEmail) {
        this.warningMessage = Text.BlankMessage.Email;
      }
      this.isShowMessageBox = true;
    },
    /**
     * @description Đóng popup cảnh báo và focus
     * @author TVLoi
     * 19/09/2022
     */
    onCloseMessage() {
      this.isShowMessageBox = false;
      if (!this.currentEmployee.EmployeeCode) {
        this.$refs.inputCode.focus();
      } else if (!this.currentEmployee.EmployeeName) {
        this.$refs.inputName.focus();
      }
    }
  },
};
</script>