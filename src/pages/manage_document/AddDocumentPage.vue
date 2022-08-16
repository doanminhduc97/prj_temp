<template>
  <div class="app-container">
    <v-container fluid ma-0 pa-0>
      <div>
        <v-card>
          <v-card-title>
            <h1 v-if="!isEditDocument">Thêm mới tài liệu</h1>
            <h1 v-if="isEditDocument">Chỉnh sửa tài liệu</h1>
            <div class="border-title-header"></div>
          </v-card-title>
          <v-container grid-list-md>
            <v-layout wrap align-end>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Số văn bản <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  :readonly="isInvalidDocument"
                  v-model="cachedItem.soVanBan"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Trích yếu nội dung <span class="text-red">(*)</span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-text-field
                  :readonly="isInvalidDocument"
                  v-model="cachedItem.trichYeuNoiDung"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Ngày hiệu lực <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-menu
                  ref="menu2"
                  v-model="menuNgayHieuLuc"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="cachedItem.ngayHieuLucStr"
                      label="Ngày hiệu lực"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="cachedItem.ngayHieuLucStr"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menuNgayHieuLuc = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(cachedItem.ngayHieuLucStr)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Ngày ban hành <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-menu
                  ref="menu1"
                  v-model="menuNgayBanHanh"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="cachedItem.ngayBanHanhStr"
                      label="Ngày ban hành"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="cachedItem.ngayBanHanhStr"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menuNgayBanHanh = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(cachedItem.ngayBanHanhStr)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>File đính kèm <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <div class="d-flex document__file-upload">
                  <el-upload
                    :action="urlUploadFile"
                    :before-upload="beforeFileUpload"
                    :auto-upload="false"
                    :headers="requestHeader"
                    :on-change="handleChange"
                    :limit="limitFile"
                    :with-credentials="withCredentials"
                    accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    :on-error="onError"
                  >
                    <el-button size="small" type="primary"
                      >Click to upload</el-button
                    >
                  </el-upload>
                  <div v-if="fileList.length !== 0">
                    <el-button
                      type="primary"
                      @click="submitFile"
                      size="small"
                      >submit</el-button
                    >
                  </div>
                </div>
              </v-flex>
              <v-flex sm2 md2 xl2 class="pl-5">
                <p>Trạng Thái <span class="text-red"></span></p>
              </v-flex>
              <v-flex sm4 md4 xl4>
                <v-checkbox
                  v-model="cachedItem.trangThai"
                  :disabled="isInvalidDocument"
                ></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex md12 class="text-md-right text-lg-right text-sm-center">
                <v-btn
                  color="info"
                  class="radius-btn"
                  @click="onClickBtnSave()"
                  :disabled="isInvalidDocument"
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
import { DocumentService } from "../../sevices/document.service";
import moment from "moment";
// import axios from "../../commom/api/axios"
export default {
  name: "AddDocumentPage",
  data() {
    return {
      StatusItem: [true, false],
      cachedItem: {
        soVanBan: "",
        trichYeuNoiDung: "",
        fileDinhKem: "",
        ngayBanHanhStr: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        ngayHieuLucStr: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        trangThai: false,
      },
      rules: {
        required: (value) => !!value || "Không được bỏ trống!",
      },
      dialog: false,
      isEditDocument: false,
      isInvalidDocument: false,
      menuNgayBanHanh: false,
      menuNgayHieuLuc: false,
      messagePopup: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      fileList: [],
      urlUploadFile: "http://27.118.23.55:8080/temproject/uploadMultipleFiles",
      requestHeader: {},
      limitFile: 2097152, // 2MB
      withCredentials: true,
    };
  },
  created() {
    // edit ducument
    console.log(
      this.$route.params.id,
      this.$route.path.includes("/updateDocument")
    );
    if (this.$route.params.id && this.$route.path.includes("/updateDocument")) {
      const idDocument = parseInt(this.$route.params.id);
      this.isEditDocument = true;
      console.log("vao day", idDocument);
      DocumentService.getDetailDocument(idDocument)
        .then((res) => {
          console.log("res", res);
          this.cachedItem = {
            soVanBan: res.body.soVanBan,
            trichYeuNoiDung: res.body.trichYeuNoiDung,
            fileDinhKem: res.body.fileDinhKem,
            ngayBanHanhStr: moment(res.body.ngayBanHanhStr || this.date).format(
              "YYYY-MM-DD"
            ),
            ngayHieuLucStr: moment(res.body.ngayHieuLucStr || this.date).format(
              "YYYY-MM-DD"
            ),
            trangThai: res.body.trangThai,
          };
        })
        .catch(() => {
          this.isInvalidDocument = true;
        });
    } else {
      this.isEditDocument = false;
    }
  },
  mounted() {
    if (localStorage.getItem("jwt")) {
      this.requestHeader = {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
    } else {
      this.requestHeader = {};
    }
  },
  methods: {
    initCachedItem() {
      this.cachedItem = {
        soVanBan: "",
        trichYeuNoiDung: "",
        fileDinhKem: "",
        ngayBanHanhStr: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        ngayHieuLucStr: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        trangThai: false,
      };
    },
    backToList() {
      this.$router.push("/document");
    },
    onClickBtnSave() {
      if (
        this.cachedItem.soVanBan == "" ||
        this.cachedItem.trichYeuNoiDung == "" ||
        !this.cachedItem.ngayBanHanhStr ||
        !this.cachedItem.ngayHieuLucStr
      ) {
        this.dialog = true;
        this.messagePopup = "Bạn không được bỏ trống các trường bắt buộc!";
        return;
      }
      //case add
      if (!this.isEditDocument) {
        const requestBody = {
          soVanBan: this.cachedItem.soVanBan,
          trichYeuNoiDung: this.cachedItem.trichYeuNoiDung,
          fileDinhKem: this.cachedItem.fileDinhKem,
          ngayBanHanhStr: this.cachedItem.ngayBanHanhStr,
          ngayHieuLucStr: this.cachedItem.ngayHieuLucStr,
          arrFileDinhKem: [],
          trangThai: this.cachedItem.trangThai,
        };
        DocumentService.addDocument(requestBody)
          .then((res) => {
            if (res.success) {
              this.$notify({
                group: "notify",
                type: "success",
                title: "Thêm mới",
                message: "Thêm mới tài liệu thành công!",
                position: "bottom right",
                duration: 2000,
              });
              this.backToList();
            }
          })
          .catch((e) => {
            this.$notify({
              group: "notify",
              type: "error",
              title: "Thêm mới",
              message: "Thêm mới tài liệu thất bại!",
              position: "bottom right",
              duration: 2000,
            });
          });

        // case update
      } else {
        const requestBody = {
          soVanBan: this.cachedItem.soVanBan,
          trichYeuNoiDung: this.cachedItem.trichYeuNoiDung,
          fileDinhKem: this.cachedItem.fileDinhKem,
          ngayBanHanhStr: this.cachedItem.ngayBanHanhStr,
          ngayHieuLucStr: this.cachedItem.ngayHieuLucStr,
          arrFileDinhKem: [],
          trangThai: this.cachedItem.trangThai,
        };
        DocumentService.updateDocument(requestBody)
          .then((res) => {
            if (res.success) {
              this.$notify({
                group: "notify",
                type: "success",
                title: "Cập nhật",
                message: "Cập nhật tài liệu thành công!",
                position: "bottom right",
                duration: 2000,
              });
              this.backToList();
            }
          })
          .catch((e) => {
            this.$notify({
              group: "notify",
              type: "error",
              title: "Cập nhật",
              message: "Cập nhật tài liệu thất bại!",
              position: "bottom right",
              duration: 2000,
            });
          });
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    beforeFileUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("File size can not exceed 2MB!");
      }
      return isLt2M;
    },
    handleSuccess(res, file, listFile) {
      console.log("handleSuccess", res);
    },
    submitFile() {
      const files = new FormData();
      this.fileList.forEach((file) => {
        files.append("files", file.raw);
      });
      DocumentService.uploadFile(files).then((res) => {
        console.log("res up file", res);
        let arr = []
        res.body.forEach(arrFile => {
          arr.push(arrFile.pathFile)
        });
        this.cachedItem.arrFileDinhKem = [ ...arr ]
      });
    },
    onError() {
      console.log("error");
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
.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
  margin-bottom: 4px;
}
.document__file-upload {
  margin-top: 40px;
}
</style>
