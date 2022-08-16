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
            <el-table-column label="ID" align="center">
              <template slot-scope="props">
                <span class="hoverId"
                @click="goToDetail(props.row.id)">
                  {{ props.row.id }}
                </span>
              </template>
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
                  moment(scope.row.ngayTao).format("YYYY-MM-DD")
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
                  moment(scope.row.ngayCapNhat).format("YYYY-MM-DD")
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
      titleDialog: "Bạn có chắc chắn muốn xóa ?",
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
      console.log("tableDataFilter", newValue);
    }
  },
  methods: {
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
            title: "Xóa",
            message: "Xóa nhóm người dùng thành công !",
            position: "bottom right",
            duration: 2000
          });
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Xóa",
            message: "Xóa nhóm người dùng thất bại !",
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
    goToDetail(id) {
      this.$router.push({ path: `/groups/${id}` });
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
.hoverId {
  cursor: pointer;
  text-decoration: underline;
}
</style>
