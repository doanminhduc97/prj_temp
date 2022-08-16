<template>
  <v-container fluid>
    <div class="user-dashboard">
      <v-card>
        <v-card-title>
          <h1>Groups</h1>
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
                  style="width: 100px"
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
            label="Tìm kiếm mã nhóm người dùng"
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
            <el-table-column prop="id" label="ID" align="center" sortable>
            </el-table-column>
            <el-table-column
              prop="tenChuyenMuc"
              label="Tên Chuyên Mục"
              align="center"
              sortable
            >
            </el-table-column>
            <el-table-column prop="noiDung" label="Ghi Chú" align="center">
            </el-table-column>
            <el-table-column
              prop="nguoiTao"
              label="Người Tạo"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="ngayTao"
              label="Ngày Tạo"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{
                  moment(scope.row.ngayTao).format("YYYY-MM-DD")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="nguoiDuyet"
              label="Người Duyệt"
              width="140"
              align="center"
            >
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
            <el-table-column prop="khoaChaId" label="Khóa Cha" align="center">
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
                        @click="confirmDeleteItem(scope.row)"
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
                      <v-icon
                        small
                        @click="confirmDeleteItem(scope.row)"
                        color="#0f7402"
                        v-bind="attrs"
                        v-on="on"
                      >
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
                  @click="confirmDeleteItem(scope.row)"
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
              :total="this.categoriesList.length"
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
      @deleteItem="deleteUserGroup"
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
import { Categories } from "../../sevices/categories.service";
import ConfirmDelete from "../../components/dialog/ConfirmDelete.vue";
import util from "../../common/util/util";
export default {
  name: "CategoryPage",
  components: {
    ConfirmDelete
  },
  data() {
    return {
      categoriesList: [],
      dialog: false,
      cachedItem: {
        id: "",
        reason: ""
      },
      search: "",
      dialogDel: false,
      titleDialog: "Bạn có chắc chắn muốn xóa ?",
      lstGroups: [],
      tableData: [],
      page: 1,
      pageSize: 10,
      dialogRefuse: false,
      isShowTextareaMess: false
    };
  },
  async mounted() {
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
          data.tenChuyenMuc.toLowerCase().includes(this.search.toLowerCase())
      );
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
      this.categoriesList = [];
      try {
        const res = await Categories.getCategoriesList();
        if (res.success) {
          this.categoriesList = res.body.lstChuyenMuc;
          console.log("categoriesList", this.categoriesList);
          this.tableData = util.deepClone(this.categoriesList);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClickBtn(catId) {
      console.log("ddddd", catId);
      if (!catId) {
        this.$router.push({ name: "AddCategory" });
        return;
      }
      this.$router.push({ name: "UpdateCategory", params: { catId: catId } });
    },
    confirmDeleteItem(item) {
      this.cachedItem = item;
      this.dialogDel = true;
    },
    async deleteUserGroup(flag) {
      if (flag) {
        try {
          const res = await Categories.deleteCategoriesById(this.cachedItem.id);
          if (res) {
            this.$notify({
              type: "success",
              title: "Xóa",
              message: "Xóa chuyên mục thành công!",
              position: "bottom right",
              duration: 2000
            });
            this.initcachedItem();
            this.loadItems();
          }
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Xóa",
            message: "Xóa chuyên mục thất bại !",
            position: "bottom right",
            duration: 2000
          });
        }
      }
      this.dialogDel = false;
    },
    setPage(val) {
      this.page = val;
    },
    onClickBrowse(id) {
      Categories.browseCategory(id)
        .then(res => {
          console.log("phê duyệt", res);
          if (res.body.trangThai) {
            this.$notify({
              type: "success",
              title: "Phê duyệt",
              message: "Phê duyệt chuyên mục thành công!",
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
            message: "Phê duyệt chuyên mục thất bại!",
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
      Categories.refuseCategory(param)
        .then(res => {
          this.dialogRefuse = false;
          this.isShowTextareaMess = false;
          this.$notify({
            type: "success",
            title: "Từ chối phê duyệt",
            message: "Từ chối phê duyệt chuyên mục thành công!",
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
            message: "Từ chối phê duyệt chuyên mục thất bại!",
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
.title-dialog {
  font-weight: 600;
  font-size: 1.2rem;
}
.textarea-mess {
  color: #f56c6c;
  font-size: 1rem;
  margin-top: -22px;
  margin-bottom: 0px;
}
</style>
