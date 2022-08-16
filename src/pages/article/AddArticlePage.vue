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
              <el-form
                :label-position="labelPosition"
                label-width="200px"
                :model="formLabelAlign"
                ref="ruleForm"
                :rules="rules"
                style="width: 100%"
              >
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Họ Tên" prop="hoTen">
                      <el-input v-model="formLabelAlign.hoTen"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item> </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="Email" prop="email">
                      <el-input v-model="formLabelAlign.email"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Tiêu đề" prop="tieuDe">
                      <el-input v-model="formLabelAlign.tieuDe"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item> </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="Chuyên mục" prop="categoryId">
                      <el-select v-model="formLabelAlign.categoryId" class="m-2" placeholder="Select" size="large" style="width: 100%">
                        <el-option
                          v-for="item in lstCategory"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="Nội dung" prop="noiDung">
                      <ckeditor
                        v-model="formLabelAlign.noiDung"
                        :editor="editor"
                        @ready="onReady"
                        :config="editorConfig"
                      ></ckeditor>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="24">
                    <el-form-item label="File đính kèm">
                      <vue-dropzone
                        ref="myVueDropzone"
                        id="dropzone"
                        :options="dropzoneOptions"
                        @vdropzone-complete="afterUploadComplete"
                        @vdropzone-sending="setParamUploadFile"
                      ></vue-dropzone>
                    </el-form-item>
                  </el-col>
                </el-row> -->
              </el-form>
            </v-layout>
            <v-layout wrap>
              <v-flex md12 class="text-md-right text-lg-right text-sm-center">
                <v-btn color="info" class="radius-btn" @click="onClickBtnAdd()">
                  <span v-if="!isEditArticle">Thêm mới</span>
                  <span v-if="isEditArticle">Cập nhật</span>
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
import { Article } from "../../sevices/Article.service";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import UploadAdapter from "../../sevices/uploadAdapter.service";
import { Categories } from "../../sevices/categories.service";
import EventBus from "../../common/util/EventBus";
export default {
  name: "AddArticlePage",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      StatusItem: [true, false],
      cachedItem: {
        id: "",
        tieuDe: "",
        chuyenMucId: "0",
        moTaNgan: "",
        noiDung: "",
        anhDaiDien: "",
        noiBat: "",
        thuTuSapXep: "",
        trangThai: "",
        ghiChu: "",
        arrFileDinhKem: [],
      },
      lstArticle: [],
      // rules: {
      //   required: (value) => !!value || "Không được bỏ trống!",
      // },
      dialog: false,
      messagePopup: "",
      isEditArticle: false,
      titlePage: "",
      flag: false,
      emptyCategory: false,
      formLabelAlign: {
        hoTen: "",
        email: "",
        tieuDe: "",
        noiDung: "",
        arrFileDinhKem: [],
        categoryId: ""
      },
      labelPosition: "top",
      editor: DecoupledEditor,
      dropzoneOptions: {
        url: "http://27.118.23.55:8080/temproject/uploadMultipleFiles",
        thumbnailWidth: 150,
        maxFilesize: 2,
        parallelUploads: 3,
        maxFiles: 3,
        uploadMultiple: false,
        autoProcessQueue: true,
      },
      editorConfig: {
        extraPlugins: [this.uploader],
        language: "nl",
      },
      rules: {
        hoTen: [
          {
            required: true,
            message: "Không được để trống họ tên",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Không được để trống email",
            trigger: "blur",
          },
        ],
        tieuDe: [
          {
            required: true,
            message: "Không được để trống tiêu đề",
            trigger: "blur",
          },
        ],
        noiDung: [
          {
            required: true,
            message: "Không được để trống nội dung",
            trigger: "blur",
          },
        ],
        categoryId: [
          {
            required: true,
            message: "Không được để trống chuyên mục",
            trigger: "blur",
          },
        ],
      },
      lstCategory: [],
    };
  },
  created() {
    // Listening the event send-file-success
    EventBus.$on("send-file-success", this.handler);
    this.titlePage = "Thêm mới bài viết";
    // case edit article
    if (this.$route.params.catId) {
      // try {
      //   this.titlePage = "Cập nhật nhóm người dùng";
      //   const catId = this.$route.params.catId;
      //   Article.getArticleById(catId).then((res) => {
      //     if (!res.body.id) {
      //       this.$router.push({ name: "Error" });
      //     }

      //     this.isEditArticle = true;
      //     this.cachedItem = {
      //       id: res.body.id,
      //       tieuDe: res.body.tieuDe,
      //       chuyenMucId: res.body.chuyenMucId,
      //       moTaNgan: res.body.moTaNgan,
      //       noiDung: res.body.noiDung,
      //       anhDaiDien: res.body.anhDaiDien,
      //       noiBat: res.body.noiBat,
      //       thuTuSapXep: res.body.thuTuSapXep,
      //       trangThai: res.body.trangThai,
      //       ghiChu: res.body.ghiChu,
      //       arrFileDinhKem: [],
      //     };
      //     console.log("this.cachedItem", this.cachedItem);
      //   });
      // } catch (error) {
      //   this.$router.push({ name: "Error" });
      // }
    }
    try {
      Categories.getCategoriesList().then(res => {
        if (res.success) {
          res.body.lstChuyenMuc.forEach(item => {
            this.lstCategory.push({
              label: item.tenChuyenMuc,
              value: item.id
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    // authorization() {
    //   if (localStorage.getItem("jwt")) {
    //     return "Bearer " + localStorage.getItem("jwt");
    //   }
    //   return "";
    // },
  },
  mounted() {
    // this.$refs.myVueDropzone.setOption("headers", {
    //   Authorization: this.authorization,
    // });
  },
  methods: {
    checkCurrency(rule, value, callback) {
      if (!value) {
        return callback(new Error('Please input the age'));
      }
    },
    initcachedItem() {
      this.cachedItem = {
        id: "",
        tieuDe: "",
        chuyenMucId: "0",
        moTaNgan: "",
        noiDung: "",
        anhDaiDien: "",
        noiBat: "",
        thuTuSapXep: "",
        trangThai: "",
        ghiChu: "",
        arrFileDinhKem: [],
      };
    },
    onClickBtnAdd() {
      this.flag = true;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          this.flag = false;
        }
      });
      if (!this.flag) {
        return;
      }
      let number = 0;
      let tempNoiDung = this.formLabelAlign.noiDung.replace(
        /<img>/g,
        function () {
          return `{${number++}}`;
        }
      );
      for (let i = 0; i < this.formLabelAlign.arrFileDinhKem.length; i++) {
        let x = new RegExp("(\\{" + i + "\\})", "g");
        tempNoiDung = tempNoiDung.replace(x, `<img src="${this.formLabelAlign.arrFileDinhKem[i]}" alt="image upload"/>`);
      }
      // param
      const requestBody = {
        chuyenMucId: this.formLabelAlign.categoryId,
        tieuDe: this.formLabelAlign.tieuDe,
        moTaNgan: "",
        noiDung: tempNoiDung,
        ghiChu: "",
        anhDaiDien: "",
        noiBat: 1,
        thuTuSapXep: 1,
        arrFileDinhKem: this.formLabelAlign.arrFileDinhKem,
        trangThai: 2,
      };
      Article.addArticle(requestBody).then((res) => {
        if (res.success) {
          this.$notify({
            group: "notify",
            type: "success",
            title: "Cập nhật",
            message: "Cập nhật bài viết thành công!",
            position: "bottom",
            duration: 2000,
          });
          this.backToList();
        }
      });
    },
    backToList() {
      this.$router.push({ name: "Article" });
    },
    onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      editor.model.document.on("change", () => {
        const changes = editor.model.document.differ.getChanges();
        console.log(changes);
        for (const change of changes) {
          if (change.name == "image") {
            console.log("The image has been inserted.");
          }
        }
      });
    },
    async afterUploadComplete(response) {
      this.$refs.myVueDropzone.processQueue();
    },
    async shootMessage() {},
    setParamUploadFile(file, xhr, formData) {
      console.log("file", file, xhr, formData);
    },
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
    handler(response) {
      this.formLabelAlign.arrFileDinhKem.push("http://" + response[0].pathFile);
    },
  },
  destroyed() {
    // Stop listening the event send-file-success with handler
    EventBus.$off("send-file-success", this.handler);
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
.el-form-item__label {
  font-weight: 600;
  font-size: 16px;
}

textarea {
  border: 1px solid rgb(199, 194, 194);
  border-top: none;
  width: 100%;
  min-height: 200px;
  max-height: 800px;
}
.ck.ck-editor__editable_inline[dir="ltr"] {
  border: 1px solid rgb(199, 194, 194);
  border-top: none;
  width: 100%;
  min-height: 200px;
  max-height: 800px;
  resize: vertical;
}
.border-red {
  border: 1px solid rgb(255, 67, 67);
  border-radius: 5px;
}
</style>
