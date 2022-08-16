<template>
  <v-container fluid>
    <div class="user-dashboard">
      <v-card>
        <v-card-title>
          <h1>Tài Liệu</h1>
          <div class="border-title-header"></div>
        </v-card-title>
        <v-card-title>
          <!-- this dialog is used for both create and update -->
          <template>
            <div class="d-flex justify-end">
              <div>
                <v-btn
                  color="primary"
                  dark
                  class="ml-auto ma-3 btn-radius"
                  style="width: 100px; padding: 0 60px"
                  @click="onClickBtn()"
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
            label="Tìm kiếm nội dung"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <div style="margin: 30px">
          <el-table
            style="width: 100%"
            row-key="id"
            :data="tableDataFilter"
            :style="{
              'border-top-right-radius': '10px',
              'border-top-left-radius': '10px'
            }"
            border
          >
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column
              prop="trichYeuNoiDung"
              label="Nội dung"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ngayBanHanh"
              label="Ngày ban hành"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ngayHieuLuc"
              label="Ngày hiệu lực"
              align="left"
            >
            </el-table-column>
            <el-table-column prop="nguoiTao" label="Người Tạo" align="center">
            </el-table-column>
            <el-table-column prop="ngayTao" label="Ngày Tạo" align="center">
              <template slot-scope="scope">
                <span>{{
                  moment(scope.row.ngayTao).format("YYYY-MM-DD")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="nguoiCapNhat"
              label="Người Cập Nhật"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ngayCapNhat"
              label="Ngày Cập Nhật"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{
                  moment(scope.row.ngayCapNhat).format("YYYY-MM-DD")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="ngayDuyet"
              label="Ngày Duyệt"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{
                  moment(scope.row.ngayDuyet).format("YYYY-MM-DD")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="nguoiDuyet"
              label="Người Duyệt"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="arrFileDinhKem"
              label="File"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="trangThai"
              label="Trạng Thái"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.trangThai"></i>
                <i class="el-icon-error" v-else></i>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Tác vụ" width="160">
              <template slot-scope="scope">
                <div>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :disabled="scope.row.trangThai === '1'"
                        small
                        class="mr-2"
                        @click="onClickBrowse(scope.row.id)"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-checkbox-marked-circle
                      </v-icon>
                    </template>
                    <span>Phê duyệt</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :disabled="scope.row.trangThai === '2'"
                        class="mr-2"
                        small
                        @click="onClickConfirmRefuse(scope.row.id)"
                        color="pink"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-close-circle
                      </v-icon>
                    </template>
                    <span>Từ chối</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        class="mr-2"
                        small
                        color="#b1ae02"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-lock
                      </v-icon>
                    </template>
                    <span>ABC</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon small color="#0f7402" v-bind="attrs" v-on="on">
                        mdi-history
                      </v-icon>
                    </template>
                    <span>DBC</span>
                  </v-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Action" width="80">
              <template slot-scope="scope">
                <v-icon
                  small
                  class="mr-2"
                  @click="onClickBtn(scope.row.id)"
                  color="primary"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="confirmDeleteItem(scope.row.id)"
                  color="pink"
                >
                  mdi-delete
                </v-icon>
              </template>
            </el-table-column>
          </el-table>
          <v-flex class="justify-end d-flex" style="padding: 20px 0">
            <el-pagination
              layout="prev, pager, next"
              background
              :total="this.tableData.length"
              @current-change="setPage"
              :page-size="pageSize"
              style="flex: 0 1 auto !important"
            >
            </el-pagination>
          </v-flex>
        </div>
      </v-card>
    </div>
    <confirm-delete
      :title="titleDialog"
      v-model="dialogDel"
      @deleteItem="deleteDocument"
    />
    <v-dialog v-model="dialogRefuse" persistent max-width="600">
      <v-card>
        <v-card-title class="title-dialog">
          Từ chối phê duyệt
        </v-card-title>
        <!-- <v-card-actions> -->
        <v-layout wrap class="pl-4 pr-4">
          <v-flex sm3 md3 xl3 class="align-self-center">
            <p>Lý do<span class="text-red">(*)</span></p>
          </v-flex>
          <v-flex sm9 md9 xl9>
            <v-textarea
              box
              rows="4"
              v-model="cachedItem.reason"
              @click="
                () => {
                  isShowTextareaMess = false;
                }
              "
            ></v-textarea>
            <p v-show="isShowTextareaMess" class="textarea-mess">
              Không được bỏ trống!
            </p>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <div class="text-sm-right pb-2 pr-4">
          <v-btn
            color="darken-1"
            text
            @click="
              () => {
                dialogRefuse = false;
              }
            "
          >
            Hủy bỏ
          </v-btn>
          <v-btn
            class="mr-0"
            color="error darken-1"
            text
            @click="onClickRefuse()"
          >
            Từ chối
          </v-btn>
        </div>
        <!-- </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { DocumentService } from "../../sevices/document.service";
import ConfirmDelete from "../../components/dialog/ConfirmDelete.vue";
import util from "../../common/util/util";

export default {
  name: "ManageDocument",
  components: {
    ConfirmDelete
  },
  data() {
    return {
      id: "",
      listDocument: [],
      dialog: false,
      search: "",
      isActionSuccess: false,
      StatusItem: [true, false],
      isUpdateClick: false,
      dialogDel: false,
      rowsPerPageItems: [10, 15, 20, 25],
      pagination: {
        rowsPerPage: 10
      },
      titleDialog: "Are you sure you want to delete the document?",
      expand: true,
      isLoading: false,
      tableData: [],
      page: 1,
      pageSize: 10,
      cachedItem: {
        id: "",
        reason: ""
      },
      dialogRefuse: false,
      isShowTextareaMess: false
    };
  },
  mounted() {
    this.loadItems();
  },
  computed: {
    pagedTableData() {
      if (!this.tableData || this.tableData.length === 0) return [];
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
    tableDataFilter() {
      return this.pagedTableData.filter(
        data =>
          !this.search ||
          data.trichYeuNoiDung.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  watch: {
    tableDataFilter(newValue) {
      console.log("new", newValue);
      // this.tableData = newValue;
    }
  },
  methods: {
    initcachedItem() {
      this.cachedItem = {
        id: "",
        reason: ""
      };
    },
    async loadItems() {
      this.listDocument = [];
      try {
        this.listDocument = await DocumentService.getListDocument();
        this.tableData = util.deepClone(this.listDocument.body.lstTaiLieu);
        console.log("tableData", this.tableData);
      } catch (error) {
        console.log(error);
      }
    },
    confirmDeleteItem(id) {
      this.id = id;
      this.dialogDel = true;
    },
    async deleteDocument(flag) {
      if (flag) {
        try {
          this.isLoading = true;
          const res = await DocumentService.deleteDocument({
            id: this.id
          });
          if (res) {
            this.loadItems();
          }
          this.$notify({
            type: "success",
            title: "Xóa",
            message: "Xóa tài liệu thành công!",
            position: "bottom right",
            duration: 2000
          });
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Xóa",
            message: "Xóa tài liệu thất bại!",
            position: "bottom right",
            duration: 2000
          });
          console.error(error);
        }
      }
      this.isLoading = false;
      this.dialogDel = false;
    },
    setPage(val) {
      this.page = val;
    },
    onClickBtn(id) {
      if (!id) {
        this.$router.push({ name: "AddDocumentPage" });
        return;
      }
      this.$router.push({ name: "UpdateDocument", params: { id: id } });
    },
    onClickBrowse(id) {
      DocumentService.browseDocument(id)
        .then(res => {
          if (res.body.trangThai) {
            this.$notify({
              type: "success",
              title: "Phê duyệt",
              message: "Phê duyệt tài liệu thành công!",
              position: "bottom right",
              duration: 2000
            });
            this.initcachedItem();
            this.loadItems();
          }
        })
        .catch(e => {
          console.log(e);
          this.$notify({
            type: "error",
            title: "Phê duyệt",
            message: "Phê duyệt tài liệu thất bại!",
            position: "bottom right",
            duration: 2000
          });
        });
    },
    onClickConfirmRefuse(id) {
      this.cachedItem.id = id;
      this.dialogRefuse = true;
    },
    onClickRefuse() {
      if (!this.cachedItem.reason.trim()) {
        this.isShowTextareaMess = true;
        return;
      }
      const param = {
        id: this.cachedItem.id,
        lyDoTuChoi: this.cachedItem.reason
      };
      DocumentService.refuseDocument(param)
        .then(res => {
          this.dialogRefuse = false;
          this.isShowTextareaMess = false;
          this.$notify({
            type: "success",
            title: "Từ chối phê duyệt",
            message: "Từ chối phê duyệt tài liệu thành công!",
            position: "bottom right",
            duration: 2000
          });
          this.initcachedItem();
          this.loadItems();
        })
        .catch(e => {
          console.log(e);
          this.$notify({
            type: "error",
            title: "Từ chối phê duyệt",
            message: "Từ chối phê duyệt tài liệu thất bại!",
            position: "bottom right",
            duration: 2000
          });
        });
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
