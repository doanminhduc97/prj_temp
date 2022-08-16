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
                <p>Mã nhóm <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  :readonly="isEditGroup"
                  v-model="cachedItem.grId"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Tên nhóm <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.grName"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Nhóm Cha</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-select
                  :items="listGroups"
                  v-model="cachedItem.key"
                  label="select Groups"
                ></v-select>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5"> 
                <p>Trạng Thái </p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-checkbox v-model="cachedItem.status"></v-checkbox>
              </v-flex>
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
                  <span v-if="!isEditGroup">Thêm mới</span>
                  <span v-if="isEditGroup">Cập nhật</span>
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
import { GroupsService } from "../../sevices/groups.service";

export default {
  name: "AddGroupPage",
  data() {
    return {
      StatusItem: [true, false],
      cachedItem: {
        id: "",
        grId: "",
        grName: "",
        note: "",
        key: null,
        status: false
      },
      listGroups: [],
      rules: {
        required: value => !!value || "Không được bỏ trống!"
      },
      dialog: false,
      messagePopup: "",
      isEditGroup: false,
      titlePage: ""
    };
  },
  created() {
    this.titlePage = "Thêm mới nhóm người dùng";
    // case edit user
    if (this.$route.params.groupId) {
      this.titlePage = "Cập nhật nhóm người dùng";
      const grId = this.$route.params.groupId
      GroupsService.getGroupById(grId).then(res => {
        if (!res.body.id) {
          this.$router.push({ name: "Error" });
        }

        this.isEditGroup = true;
        this.cachedItem = {
          id: res.body.id,
          grId: res.body.maNhomNguoiDung,
          grName: res.body.tenNhomNguoiDung,
          note: res.body.ghiChu,
          key: res.body.khoaChaId,
          status: res.body.trangThai
        };
        console.log("this.cachedItem", this.cachedItem);
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
      if (this.cachedItem.grId == "" || this.cachedItem.grName == "") {
        this.dialog = true;
        this.messagePopup = "Bạn không được bỏ trống các trường bắt buộc!";
        return;
      }

      // param
      const requestBody = {
        maNhomNguoiDung: this.cachedItem.grId,
        tenNhomNguoiDung: this.cachedItem.grName,
        khoaChaId: this.cachedItem.key,
        ghiChu: this.cachedItem.note,
        trangThai: this.cachedItem.status
      };

      // case add
      if (!this.isEditGroup) {
        const res = await GroupsService.addGroup(requestBody);
        if (res.success) {
          this.$notify({
            group: "notify",
            type: "success",
            title: "Thêm mới",
            message: "Thêm mới nhóm người dùng thành công!",
            position: "bottom",
            duration: 2000
          });
        }
        // case update
      } else {
        requestBody.id = this.cachedItem.id;
        const res = await GroupsService.updateGroup(requestBody);
        if (res.success) {
          this.$notify({
            group: "notify",
            type: "success",
            title: "Cập nhật",
            message: "Cập nhật nhóm người dùng thành công!",
            position: "bottom",
            duration: 2000
          });
        }
      }
      this.backToList();
    },
    backToList() {
      this.$router.push({ name: "Groups" });
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
