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
                <p>Tên chuyên mục <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.tenChuyenMuc"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Chuyên mục cha</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-select
                  :items="lstCategory"
                  v-model="cachedItem.khoaChaId"
                  label="Chọn chuyên mục cha"
                ></v-select>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Mô tả</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field v-model="cachedItem.moTa"></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Nội dung</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field v-model="cachedItem.noiDung"></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Thứ tự</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  type="number"
                  v-model="cachedItem.thuTuSapXep"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Icon <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field v-model="cachedItem.icon"></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Trạng Thái</p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-checkbox v-model="cachedItem.trangThai"></v-checkbox>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5"> </v-flex>
              <v-flex sm4 md4 xl4> </v-flex>
              <v-layout wrap align-center>
                <v-flex sm2 md2 xl2 class="pl-5" align-center>
                  <p>Ghi chú</p>
                </v-flex>
                <v-flex sm10 md10 xl10>
                  <v-textarea box v-model="cachedItem.ghiChu"></v-textarea>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-layout wrap>
              <v-flex md12 class="text-md-right text-lg-right text-sm-center">
                <v-btn color="info" class="radius-btn" @click="onClickBtnAdd()">
                  <span v-if="!isEditCategory">Thêm mới</span>
                  <span v-if="isEditCategory">Cập nhật</span>
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
import { Categories } from "../../sevices/categories.service";
export default {
  name: "AddCategoryPage",
  data() {
    return {
      StatusItem: [true, false],
      cachedItem: {
        id: "",
        tenChuyenMuc: "",
        khoaChaId: "",
        moTa: "",
        noiDung: "",
        thuTuSapXep: null,
        icon: "",
        trangThai: false,
        ghiChu: ""
      },
      lstCategory: [],
      rules: {
        required: value => !!value || "Không được bỏ trống!"
      },
      dialog: false,
      messagePopup: "",
      isEditCategory: false,
      titlePage: "",
      flag: false
    };
  },
  created() {
    this.titlePage = "Thêm mới chuyên mục";
    // case edit user
    if (this.$route.params.catId) {
      try {
        this.titlePage = "Cập nhật nhóm người dùng";
        const catId = this.$route.params.catId;
        Categories.getCategoryById(catId).then(res => {
          if (!res.body.id) {
            this.$router.push({ name: "Error" });
          }

          this.isEditCategory = true;
          this.cachedItem = {
            id: res.body.id,
            tenChuyenMuc: res.body.tenChuyenMuc,
            khoaChaId: res.body.khoaChaId,
            moTa: res.body.moTa,
            noiDung: res.body.noiDung,
            thuTuSapXep: res.body.thuTuSapXep,
            icon: res.body.thuTuSapXep,
            trangThai: res.body.trangThai,
            ghiChu: res.body.ghiChu
          };
          console.log("this.cachedItem", this.cachedItem);
        });
      } catch (error) {
        this.$router.push({ name: "Error" });
      }
    }
    try {
      Categories.getCategoriesList().then(res => {
        if (res.success) {
          res.body.lstChuyenMuc.forEach(item => {
            this.lstCategory.push({
              text: item.tenChuyenMuc,
              value: item.id
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    initcachedItem() {
      this.cachedItem = {
        id: "",
        tenChuyenMuc: "",
        khoaChaId: "",
        moTa: "",
        noiDung: "",
        thuTuSapXep: null,
        icon: "",
        trangThai: false,
        ghiChu: ""
      };
    },
    onClickBtnAdd() {
      //
      this.flag = false;

      // check required
      if (this.cachedItem.tenChuyenMuc == "") {
        this.dialog = true;
        this.messagePopup = "Bạn không được bỏ trống các trường bắt buộc!";
        return;
      }

      // param
      const requestBody = {
        tenChuyenMuc: this.cachedItem.tenChuyenMuc,
        khoaChaId: this.cachedItem.khoaChaId || 0,
        moTa: this.cachedItem.moTa,
        noiDung: this.cachedItem.noiDung,
        thuTuSapXep: this.cachedItem.thuTuSapXep,
        icon: this.cachedItem.icon,
        trangThai: this.cachedItem.trangThai,
        ghiChu: this.cachedItem.ghiChu
      };

      // case add
      if (!this.isEditCategory) {
        try {
          Categories.addCategory(requestBody).then(res => {
            if (res.success) {
              this.$notify({
                group: "notify",
                type: "success",
                title: "Thêm mới",
                message: "Thêm mới chuyên mục thành công !",
                position: "bottom",
                duration: 2000
              });
            }
          });
          this.flag = true;
        } catch (error) {
          this.$notify({
            group: "notify",
            type: "error",
            title: "Thêm mới",
            message: "Thêm mới chuyên mục thất bại !",
            position: "bottom",
            duration: 2000
          });
        }
        // case update
      } else {
        requestBody.id = this.cachedItem.id;
        Categories.updateCategory(requestBody).then(res => {
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
        });
        this.flag = true;
      }

      if (this.flag) {
        this.initcachedItem();
        this.backToList();
      }
    },
    backToList() {
      this.$router.push({ name: "Categories" });
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
