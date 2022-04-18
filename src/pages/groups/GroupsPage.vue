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
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column
              prop="maNhomNguoiDung"
              label="Mã Nhóm"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="tenNhomNguoiDung"
              label="Tên Nhóm"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ghiChu"
              label="Ghi Chú"
              width="250"
              align="left"
            >
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
                  moment(scope.row.ngayCapNhat).format("YYYY-MM-DD")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="nguoiCapNhat"
              label="Người Cập Nhật"
              width="140"
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
                  moment(scope.row.ngayTao).format("YYYY-MM-DD")
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
      @deleteItem="deleteUserGroup"
    />
  </v-container>
</template>
<script>
import { GroupsService } from "../../sevices/groups.service";
import ConfirmDelete from "../../components/dialog/ConfirmDelete.vue";
import util from "../../common/util/util";

export default {
  name: "GroupsPage",
  components: {
    ConfirmDelete
  },
  data() {
    return {
      listUsers: [],
      dialog: false,
      cachedItem: {
        id: "",
        maNhomNguoiDung: "",
        tenNhomNguoiDung: "",
        ghiChu: "",
        khoaChaId: 0,
        trangThai: false
      },
      search: "",
      isActionSuccess: false,
      StatusItem: [true, false],
      isUpdateClick: false,
      dialogDel: false,
      rowsPerPageItems: [10, 15, 20, 25],
      pagination: {
        rowsPerPage: 10
      },
      titleDialog: "Are you sure you want to delete the group?",
      expand: true,
      isLoading: false,
      tableData: [],
      page: 1,
      pageSize: 10
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
          data.maNhomNguoiDung.toLowerCase().includes(this.search.toLowerCase())
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
    showEditDialog(item, type = "") {
      // this.cachedItem = item || {};
      console.log("item", item);
      if (item && type === "update") {
        console.log("update");
        this.cachedItem.id = item.id || null;
        this.cachedItem.maNhomNguoiDung = item.maNhomNguoiDung || "";
        this.cachedItem.tenNhomNguoiDung = item.tenNhomNguoiDung || "";
        this.cachedItem.ghiChu = item.ghiChu || "";
        this.cachedItem.khoaChaId = item.khoaChaId || "";
        this.cachedItem.trangThai = item.trangThai || false;
        this.isUpdateClick = true;
      } else {
        console.log("not update");
        this.initcachedItem();
        this.isUpdateClick = false;
      }
      this.dialog = !this.dialog;
    },
    initcachedItem() {
      this.cachedItem = {
        id: "",
        maNhomNguoiDung: "",
        tenNhomNguoiDung: "",
        ghiChu: "",
        khoaChaId: 0,
        trangThai: false
      };
    },
    async loadItems() {
      this.listUsers = [];
      try {
        this.listUsers = await this.$store.dispatch("groups/getGroups");
        this.tableData = util.deepClone(this.listUsers);
      } catch (error) {
        console.log(error);
      }
    },
    async saveItem(item, type = "") {
      this.isLoading = true;
      try {
        switch (type) {
          case "create":
            const requestBody = {
              maNhomNguoiDung: item.maNhomNguoiDung,
              tenNhomNguoiDung: item.tenNhomNguoiDung,
              ghiChu: item.ghiChu,
              khoaChaId: item.khoaChaId,
              trangThai: item.trangThai
            };
            await GroupsService.addGroup(requestBody)
              .then(() => {
                this.loadItems();
                this.initcachedItem();
                this.$notify({
                  group: "notify",
                  type: "success",
                  title: "Create Group",
                  message: "Create Group success!",
                  position: "bottom",
                  duration: 2000
                });
                this.dialog = !this.dialog;
              })
              .catch(error => {
                this.$notify({
                  group: "notify",
                  type: "error",
                  title: "Create Group",
                  message: "Create Group Failed!",
                  position: "bottom",
                  duration: 2000
                });
                return null;
              });

            break;
          case "update":
            console.log("id", item.id);
            const updateGroup = {
              id: item.id,
              maNhomNguoiDung: item.maNhomNguoiDung,
              tenNhomNguoiDung: item.tenNhomNguoiDung,
              ghiChu: item.ghiChu,
              khoaChaId: item.khoaChaId,
              trangThai: item.trangThai
            };
            await GroupsService.updateGroup(updateGroup)
              .then(() => {
                this.loadItems();
                this.initcachedItem();
                this.$notify({
                  group: "notify",
                  type: "success",
                  title: "Update Group",
                  message: "Update Group success!",
                  position: "bottom right",
                  duration: 2000
                });
                this.dialog = !this.dialog;
              })
              .catch(err => {
                this.$notify({
                  group: "notify",
                  type: "error",
                  title: "Update Group",
                  message: "Update Group Failed!",
                  position: "bottom right",
                  duration: 2000
                });
                return null;
              });

            break;
          default:
            break;
        }
      } catch (error) {
        console.log("save error", error);
      }
      this.isLoading = false;
    },
    confirmDeleteItem(item) {
      this.cachedItem = item;
      this.dialogDel = true;
    },
    async deleteUserGroup(flag) {
      if (flag) {
        try {
          this.isLoading = true;
          const res = await GroupsService.deleteGroupById({
            id: this.cachedItem.id
          });
          if (res) {
            this.initcachedItem();
            this.loadItems();
          }
          this.$notify({
            type: "success",
            title: "Info",
            message: "Delete Group success!",
            position: "bottom right",
            duration: 2000
          });
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Delete Group",
            text: "Delete Group Failed!",
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
    onClickBtn(groupId) {
      if (!groupId) {
        this.$router.push({ name: "AddGroup" })
        return
      }
      this.$router.push({ name: "UpdateGroup", params: { groupId: groupId } })
    },
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
