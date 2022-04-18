<template>
  <div class="app-container">
    <v-container fluid ma-0 pa-0>
      <div class="user-dashboard">
        <v-card>
          <v-card-title>
            <h1>{{ titlePage }}</h1>
            <div class="border-title-header"></div>
          </v-card-title>
          <v-container grid-list-md>
            <v-layout wrap align-end>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Mã người dùng <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  :readonly="isEditUser"
                  v-model="cachedItem.userId"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Tài Khoản <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  :readonly="isEditUser"
                  v-model="cachedItem.account"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Mật khẩu <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  type="password"
                  v-model="cachedItem.pass"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5" v-if="!isEditUser">
                <p>Xác nhận mật khẩu <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4 v-if="!isEditUser">
                <v-text-field
                  type="password"
                  v-model="cachedItem.confPass"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Họ Và Tên <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Email <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.email"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Di Động</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field v-model="cachedItem.phone"></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Admin</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-checkbox v-model="cachedItem.admin"></v-checkbox>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Nhóm người dùng</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-select
                  :items="listGroups"
                  v-model="cachedItem.lstGroup"
                  label="select Groups"
                  multiple
                ></v-select>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5" v-if="!isEditUser"></v-flex>
              <v-flex sm4 md4 xl4 v-if="!isEditUser"></v-flex>
              <v-layout wrap align-center>
                <v-flex sm2 md2 xl2 class="pl-5" align-center>
                  <p>Ghi chú</p>
                </v-flex>
                <v-flex sm10 md10 xl10>
                  <v-textarea box v-model="cachedItem.note"></v-textarea>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-layout wrap>
              <v-flex md12 class="text-md-right text-lg-right text-sm-center">
                <v-btn color="info" class="radius-btn" @click="onClickBtnAdd()">
                  <span v-if="!isEditUser">Thêm mới</span>
                  <span v-if="isEditUser">Cập nhật</span>
                </v-btn>
                <v-btn class="radius-btn" @click="backToList">Trở về</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
    </v-container>
    <v-dialog v-model="dialog" max-width="350" max-height="300">
      <v-card>
        <v-card-title class="text-h5">
          {{ messagePopup }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error darken-1"
            text
            @click="
              () => {
                dialog = !dialog;
              }
            "
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { UsersService } from "../../sevices/users.service";

export default {
  name: "AddUserPage",
  data() {
    return {
      StatusItem: [true, false],
      cachedItem: {
        id: "",
        userId: "",
        account: "",
        pass: "",
        confPass: "",
        name: "",
        email: "",
        phone: "",
        note: "",
        admin: false,
        lstGroup: []
      },
      listGroups: [],
      rules: {
        required: value => !!value || "Không được bỏ trống!"
      },
      dialog: false,
      messagePopup: "",
      isEditUser: false,
      titlePage: ""
    };
  },
  created() {
    this.titlePage = "Thêm mới người dùng"
    // case edit user
    if (this.$route.params.userId) {
      this.titlePage = "Cập nhật người dùng"
      const requestBody = {
        sMaNguoiDung: this.$route.params.userId
      };
      UsersService.getUserById(requestBody).then(res => {
        if (res.body.lstQtNguoiDung.length === 0) {
          this.$router.push({ name: "Error" });
        }

        this.isEditUser = true;

        this.cachedItem = {
          id: res.body.lstQtNguoiDung[0].id,
          userId: res.body.lstQtNguoiDung[0].maNguoiDung,
          account: res.body.lstQtNguoiDung[0].taiKhoan,
          pass: res.body.lstQtNguoiDung[0].matKhau,
          confPass: "",
          name: res.body.lstQtNguoiDung[0].hoTen,
          email: res.body.lstQtNguoiDung[0].email,
          phone: res.body.lstQtNguoiDung[0].diDong,
          note: res.body.lstQtNguoiDung[0].ghiChu,
          admin: res.body.lstQtNguoiDung[0].admin,
          lstGroup: res.body.lstQtNguoiDung[0].lstNhomNguoiDungId
        };
      });
    }

    this.$store.dispatch("groups/getGroups").then(res => {
      res.forEach(item => {
        this.listGroups.push({
          text: item.tenNhomNguoiDung,
          value: item.id
        });
      });
    });
  },
  methods: {
    async onClickBtnAdd() {
      // check required
      if (
        this.cachedItem.userId == "" ||
        this.cachedItem.account == "" ||
        this.cachedItem.pass == "" ||
        this.cachedItem.name == "" ||
        this.cachedItem.email == ""
      ) {
        this.dialog = true;
        this.messagePopup = "Bạn không được bỏ trống các trường bắt buộc!";
        return;
      }

      // param
      const requestBody = {
        maNguoiDung: this.cachedItem.userId,
        taiKhoan: this.cachedItem.account,
        matKhau: this.cachedItem.pass,
        hoTen: this.cachedItem.name,
        email: this.cachedItem.email,
        diDong: this.cachedItem.phone,
        admin: this.cachedItem.admin,
        lstNhomNguoiDungId: this.cachedItem.lstGroup,
        note: this.cachedItem.note
      };

      // case add
      if (!this.isEditUser) {
        if (this.cachedItem.pass !== this.cachedItem.confPass) {
          this.dialog = true;
          this.messagePopup = "Xác nhận mật khẩu sai!";
          return;
        }
        const res = await UsersService.addUser(requestBody);
        if (res.success) {
          this.$notify({
            group: "notify",
            type: "success",
            title: "Thêm mới người dùng",
            message: "Thêm mới người dùng thành công!",
            position: "bottom",
            duration: 2000
          });
        }
        // case update
      } else {
        requestBody.id = this.cachedItem.id;
        console.log("request", requestBody);
        const res = await UsersService.updateUser(requestBody);
        if (res.success) {
          this.$notify({
            group: "notify",
            type: "success",
            title: "Cập nhật người dùng",
            message: "Cập nhật người dùng thành công!",
            position: "bottom",
            duration: 2000
          });
        }
      }
      this.backToList();
    },
    backToList() {
      console.log("bakc to list");
      this.$router.push({ name: "Users" });
    }
  }
};
</script>
<style>
.app-container {
  display: -webkit-flex;
  display: flex;
  padding: 16px;
  /* background-color: #fafbfd; */
}
/* .layout {
  align-items: end;
} */
.text-red {
  color: rgb(204, 60, 60);
}
i.el-icon-success {
  color: #67c23a;
  width: 40px;
}
i.el-icon-error {
  color: #f56c6c;
}
</style>
