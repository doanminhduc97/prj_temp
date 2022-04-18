<template>
  <div class="app-container">
    <v-container fluid ma-0 pa-0>
      <div>
        <v-card>
          <v-card-title>
            <h1>Thêm mới chức năng</h1>
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
                  :readonly="isEditFeature"
                  v-model="cachedItem.tenChucNang"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Chức năng cha <span class="text-red">(*)</span></p>
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
                <p>Action <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-select
                  :items="listAction"
                  item-value="value"
                  v-model="cachedItem.valueListAction"
                  item-text="label"
                ></v-select>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Icon <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.icon"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Thứ tự <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  v-model="cachedItem.thuTu"
                  :rules="[rules.required]"
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
              <v-flex sm2 md2 xl2 class="pl-5" align-center>
                <p>Hiển thị menu</p>
              </v-flex>
              <v-flex sm10 md10 xl10>
                <span>{{ cachedItem.displayMenu }}</span>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex md12 class="text-md-right text-lg-right text-sm-center">
                <v-btn color="info" class="radius-btn" @click="onClickBtnAdd()">
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
        maChucNang: "",
        tenChucNang: "",
        icon: "",
        thuTu: "",
        ghiChu: "",
        displayMenu: "",
        valueChucNangCha: null,
        valueListAction: null,
      },
      listChucNangCha: [],
      listAction: [],
      listGroups: [],
      rules: {
        required: (value) => !!value || "Không được bỏ trống!",
      },
      dialog: false,
      messagePopup: "",
    };
  },
  created() {
    console.log("!@3", this.$route.params.id, this.$route.path);
    // edit feature
    if (this.$route.params.id && this.route.path === "/feature/edit") {
    } else {
      // add feature
      FeatureService.getDropdownKey().then((res) => {
        this.listChucNangCha = [...res.body.listDropdownKhoaChaId];
      });
      FeatureService.getDropdownAction().then((res) => {
        this.listAction = [...res.body.listDropdownAction];
      });
    }
  },
  methods: {
    backToList() {
      this.$router.push("/features");
    },
    onClickBtnSave() {},
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
</style>
