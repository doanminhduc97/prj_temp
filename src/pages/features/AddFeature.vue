<template>
  <div class="app-container">
    <v-container fluid ma-0 pa-0>
      <div>
        <v-card>
          <v-card-title>
            <h1 v-if="!isEditFeature">Thêm mới chức năng</h1>
            <h1 v-if="isEditFeature">Chỉnh sửa chức năng</h1>
            <div class="border-title-header"></div>
          </v-card-title>
          <v-container grid-list-md>
            <v-layout wrap align-end>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Mã chức năng <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  :readonly="isEditFeature"
                  v-model="cachedItem.maChucNang"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Tên chức năng <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.tenChucNang"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Chức năng cha <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-select
                  :items="listChucNangCha"
                  item-value="value"
                  v-model="cachedItem.valueChucNangCha"
                  item-text="label"
                ></v-select>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Action <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-select
                  :items="listAction"
                  item-value="value"
                  v-model="cachedItem.valueListAction"
                  item-text="label"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Icon <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field v-model="cachedItem.icon"></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Thứ tự <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  type="number"
                  v-model="cachedItem.thuTu"
                ></v-text-field>
              </v-flex>
              <v-layout wrap align-center>
                <v-flex sm2 md2 xl2 class="pl-5" align-center>
                  <p>Ghi chú</p>
                </v-flex>
                <v-textarea
                  name="input-7-4"
                  :value="cachedItem.ghiChu"
                ></v-textarea>
              </v-layout>
            </v-layout>
            <v-layout>
              <v-flex sm3 md3 xl3 class="pl-5 el-checkbox">
                <p class="mb-0">Hiển thị menu</p>
                <v-checkbox v-model="cachedItem.displayMenu"></v-checkbox>
              </v-flex>
              <v-flex sm3 md3 xl3 class="pl-5 el-checkbox">
                <p class="mb-0">Chi Tiết</p>
                <v-checkbox v-model="cachedItem.chiTiet"></v-checkbox>
              </v-flex>
              <v-flex sm3 md3 xl3 class="pl-5 el-checkbox">
                <p class="mb-0">Deleted</p>
                <v-checkbox v-model="cachedItem.deleted"></v-checkbox>
              </v-flex>
              <v-flex sm3 md3 xl3 class="pl-5 el-checkbox">
                <p class="mb-0">Trạng Thái</p>
                <v-checkbox v-model="cachedItem.trangThai"></v-checkbox>
              </v-flex>
              <!-- <v-flex sm10 md10 xl10>
                <v-checkbox v-model="cachedItem.displayMenu"></v-checkbox>
              </v-flex> -->
            </v-layout>
            <v-layout wrap>
              <v-flex md12 class="text-md-right text-lg-right text-sm-center">
                <v-btn
                  color="info"
                  class="radius-btn"
                  @click="onClickBtnSave()"
                  :disabled="isShowBtn"
                >
                  <span>Lưu thay đổi</span>
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
import { FeatureService } from "../../sevices/features.service";

export default {
  name: "FeatureDetail",
  data() {
    return {
      StatusItem: [true, false],
      cachedItem: {
        id: null,
        maChucNang: "",
        tenChucNang: "",
        icon: "",
        thuTu: "",
        ghiChu: "",
        displayMenu: "",
        valueChucNangCha: null,
        valueListAction: null,
        deleted: false,
        trangThai: false,
        chiTiet: false,
      },
      listChucNangCha: [],
      listAction: [],
      rules: {
        required: (value) => !!value || "Không được bỏ trống!",
      },
      dialog: false,
      messagePopup: "",
      isEditFeature: false,
      isShowBtn: false
    };
  },
  watch: {
    "cachedItem.valueChucNangCha"(value) {
      console.log(value);
    },
  },
  created() {
    // edit feature
    if (
      this.$route.params.featureId &&
      this.$route.path.includes("/updateFeature")
    ) {
      const featureId = this.$route.params.featureId;
      FeatureService.getDetailFeature(featureId)
        .then((res) => {
          console.log(res);
          this.cachedItem = {
            id: res.body.id,
            maChucNang: res.body.maChucNang,
            tenChucNang: res.body.tenChucNang,
            icon: res.body.icon,
            thuTu: res.body.thuTu,
            ghiChu: res.body.ghiChu,
            displayMenu: res.body.menu,
            valueChucNangCha: res.body.khoaChaId,
            valueListAction: res.body.actionId,
            deleted: res.body.deleted,
            trangThai: res.body.trangThai,
            chiTiet: res.body.chiTiet,
          };
          this.isEditFeature = true;
        })
        .catch(() => {
          this.isShowBtn = true
          this.isEditFeature = false;
        });
    }
    FeatureService.getDropdownKey().then((res) => {
      this.listChucNangCha = [...res.body.listDropdownKhoaChaId];
    });
    FeatureService.getDropdownAction().then((res) => {
      this.listAction = [...res.body.listDropdownAction];
    });
  },
  methods: {
    backToList() {
      this.$router.push("/features");
    },
    onClickBtnSave() {
      if (
        this.cachedItem.maChucNang == "" ||
        this.cachedItem.tenChucNang == "" ||
        !this.cachedItem.valueListAction
      ) {
        this.dialog = true;
        this.messagePopup = "Bạn không được bỏ trống các trường bắt buộc!";
        return;
      }
      //case add feature
      if (!this.isEditFeature) {
        let requestBody = {
          maChucNang: this.cachedItem.maChucNang,
          id: 0,
        };
        //check maChucNang
        FeatureService.checkExistsFeatureId(requestBody).then((res) => {
          console.log("check", res);
          if (res.body) {
            this.dialog = true;
            this.messagePopup =
              "Mã chức năng đã tồn tại. Vui lòng nhập mã chức năng khác!";
            return;
          }
        });
        requestBody = {
          tenChucNang: this.cachedItem.tenChucNang,
          maChucNang: this.cachedItem.maChucNang,
          khoaChaId: this.cachedItem.valueChucNangCha || null,
          actionId: this.cachedItem.valueListAction || null,
          icon: this.cachedItem.icon,
          ghiChu: this.cachedItem.ghiChu,
          thuTu: this.cachedItem.thuTu,
          menu: this.cachedItem.displayMenu,
          chiTiet: this.cachedItem.chiTiet,
          deleted: this.cachedItem.deleted,
          trangThai: this.cachedItem.trangThai,
        };
        FeatureService.addFeature(requestBody).then((res) => {
          if (res.success) {
            this.$notify({
              group: "notify",
              type: "success",
              title: "Thêm mới",
              message: "Thêm mới chức năng thành công!",
              position: "bottom right",
              duration: 2000,
            });
          }
        });

        // case update
      } else {
        const requestBody = {
          id: this.cachedItem.id,
          tenChucNang: this.cachedItem.tenChucNang,
          maChucNang: this.cachedItem.maChucNang,
          khoaChaId: this.cachedItem.valueChucNangCha || null,
          actionId: this.cachedItem.valueListAction || null,
          icon: this.cachedItem.icon,
          ghiChu: this.cachedItem.ghiChu,
          thuTu: this.cachedItem.thuTu,
          menu: this.cachedItem.displayMenu,
          chiTiet: this.cachedItem.chiTiet,
          deleted: this.cachedItem.deleted,
          trangThai: this.cachedItem.trangThai,
        };
        FeatureService.updateFeature(requestBody).then((res) => {
          if (res.success) {
            this.$notify({
              group: "notify",
              type: "success",
              title: "Cập nhật",
              message: "Cập nhật chức năng thành công!",
              position: "bottom right",
              duration: 2000,
            });
          }
        });
      }
      this.backToList();
    },
  },
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
.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  margin-top: 0;
  max-height: 40px;
  min-height: 40px !important;
  display: flex !important;
  align-items: center !important;
}
.el-checkbox {
  display: flex;
  align-items: center;
}
p {
  /* margin: 0; */
  padding-right: 12px;
}
</style>
