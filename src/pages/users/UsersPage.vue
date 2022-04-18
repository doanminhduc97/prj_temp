<template>
  <v-container fluid>
    <div class="user-dashboard">
      <v-card>
        <v-card-title>
          <h1>Danh sách người dùng</h1>
        </v-card-title>
        <v-card-title>
            <template>
              <div class="d-flex justify-end">
                <div>
                  <v-btn
                    color="primary"
                    dark
                    class="ml-auto ma-3 btn-add"
                    @click="onClickBtn()"
                    style="width: 100px"
                  >
                    Thêm mới
                    <v-icon small style="padding-left: 5px"
                      >mdi-plus-circle-outline</v-icon
                    >
                  </v-btn>
                </div>
              </div>
            </template>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headersTable"
          :items="listUsers"
          mobile-breakpoint="800"
          :search="search"
          style="padding: 18px; padding-left: 32px"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left color-content">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.maNguoiDung }}</td>
            <td class="text-xs-left">{{ props.item.taiKhoan }}</td>
            <td class="text-xs-left">{{ props.item.hoTen }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.diDong }}</td>
            <td class="text-xs-left">{{ props.item.ghiChu }}</td>
            <td class="text-xs-left">{{ props.item.nguoiTao }}</td>
            <td class="text-xs-left">
              {{ moment(props.item.ngayTao).format("YYYY-MM-DD") || "" }}
            </td>
            <td class="text-xs-left">
               <i class="el-icon-error" v-if="!props.item.trangThai"></i> 
               <i class="el-icon-success" v-else></i> 
            </td>
            <td class="text-xs-left">
              <i class="el-icon-error" v-if="!props.item.admin"></i> 
               <i class="el-icon-success" v-else></i>
            </td>
            <td class="d-flex justify-center">
              <v-icon
                small
                class="mr-2"
                @click="onClickBtn(props.item.maNguoiDung)"
                color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon small @click="confirmDeleteItem(props.item.maNguoiDung)" color="pink">
                mdi-delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <transition>
      <v-alert type="success" v-if="isActionSuccess">
        I'm a success alert.
      </v-alert>
    </transition>
    <transition>
      <v-alert type="error" v-if="isActionSuccess">
        I'm an error alert.
      </v-alert>
    </transition>
    <confirm-delete
      :title="titleDialog"
      v-model="dialogDel"
      @deleteItem="deleteUserGroup"
    />
  </v-container>
</template>
<script>
import { UsersService } from "../../sevices/users.service";
import ConfirmDelete from "../../components/dialog/ConfirmDelete.vue";
export default {
  name: "UsersPage",
  components: {
    ConfirmDelete
  },
  data() {
    return {
      headersTable: [
        { text: "ID", value: "id", class: "header-table__color title" },
        {
          text: "Mã Người Dùng",
          value: "maNguoiDung",
          class: "header-table__color title"
        },
        {
          text: "Tài Khoản",
          value: "taiKhoan",
          class: "header-table__color title"
        },
        {
          text: "Họ Tên",
          value: "hoTen",
          class: "header-table__color title"
        },
        {
          text: "Email",
          value: "email",
          class: "header-table__color title"
        },
        {
          text: "Di Động",
          value: "diDong",
          class: "header-table__color title"
        },
        {
          text: "Ghi Chú",
          value: "ghiChu",
          width: "200px",
          class: "header-table__color title"
        },
        {
          text: "Người Tạo",
          value: "nguoiTao",
          class: "header-table__color title"
        },
        {
          text: "Ngày Tạo",
          value: "ngayTao",
          width: "220px",
          class: "header-table__color title"
        },
        {
          text: "Trạng Thái",
          value: "trangThai",
          class: "header-table__color title"
        },
        {
          text: "Admin",
          value: "admin",
          class: "header-table__color title"
        },
        { text: "Action", align: "center", class: "header-table__color title" }
      ],
      listUsers: [],
      dialog: false,
      cachedItem: {
        userId: "",
        // groupsName: "",
        account: "",
        // password: "",
        name: "",
        email: "",
        phone: "",
        // note: "",
        // userCreate: JSON.parse(localStorage.getItem("userInfo")).hoTen,
        admin: false
      },
      search: "",
      isActionSuccess: false,
      StatusItem: [true, false],
      isUpdateClick: false,
      dialogDel: false,
      titleDialog: "Are you sure you want to delete the user?",
      lstGroups: []
    };
  },
  async mounted() {
    console.log("test", localStorage.getItem("userInfo"));
    this.loadItems();
    let list = [...this.$store.getters["groups/getGroups"]];

    list.forEach(item => {
      this.lstGroups.push(item.tenNhomNguoiDung);
    });
    console.log("this.lstGroups", this.lstGroups);
  },
  methods: {
    initcachedItem() {
      this.cachedItem = {
        userId: "",
        // groupsName: "",
        account: "",
        // password: "",
        name: "",
        email: "",
        phone: "",
        // note: "",
        // userCreate: JSON.parse(localStorage.getItem("userInfo")).hoTen,
        admin: false
      };
    },
    async loadItems() {
      this.listUsers = [];
      try {
        const res = await UsersService.getListUsers();
        if (res.success) {
          this.listUsers = res.body.lstQtNguoiDung;
          console.log("this.listUsers", this.listUsers);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClickBtn(userId) {
      console.log('ddddd', userId)
      if (!userId) {
        this.$router.push({ name: "AddUser" })
        return
      }
      this.$router.push({ name: "UpdateUser", params: { userId: userId } })
    },
    confirmDeleteItem(item) {
      this.cachedItem = item;
      this.dialogDel = true;
    },
    async deleteUserGroup(flag) {
      if (flag) {
        const res = await UsersService.deleteUserById({
          id: this.cachedItem.id
        });
        if (res) {
          this.initcachedItem();
          this.loadItems();
        }
      }
      this.dialogDel = false;
    }
  }
};
</script>
<style>
.user-dashboard {
  min-height: calc(100vh - 319px);
}

i.el-icon-success {
  color: #67c23a;
  width: 40px;
}
i.el-icon-error {
  color: #f56c6c;
}
</style>
