<template>
  <v-container fluid>
    <div class="user-dashboard">
      <v-card>
        <v-card-title>
          <h1>Danh Sách Chức Năng</h1>
          <div class="border-title-header"></div>
        </v-card-title>
        <v-card-title>
          <div
            class="d-flex justify-end"
            style="padding-top: 12px; margin-top: 4px"
          >
            <div>
              <v-btn
                color="primary"
                dark
                class="ml-auto ma-3 btn-radius"
                style="width: 100px"
                @click="onClickNewFeature"
              >
                New
                <v-icon small style="padding-left: 5px"
                  >mdi-plus-circle-outline</v-icon
                >
              </v-btn>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm tên chức năng"
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
              'border-top-left-radius': '10px',
            }"
            border
            sortable
          >
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column
              label="Tên chức năng"
              header-align="center"
              align="left"
              width="400"
              sortable
              class-name="el-column-link"
            >
              <template slot-scope="props">
                <span class="hoverId"
                @click="handleRowClick(props.row.id)">
                  {{ props.row.tenChucNang }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="action"
              label="Action"
              header-align="center"
              align="left"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="icon"
              label="Icon"
              header-align="center"
              align="left"
            >
            </el-table-column>
            <el-table-column
              prop="trangThai"
              label="Trạng thái"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.trangThai"></i>
                <i class="el-icon-error" v-else></i>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Action" width="100">
              <template slot-scope="scope">
                <v-icon
                  small
                  class="mr-2"
                  @click="editFeature(scope.row.id)"
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
      @deleteItem="deleteFeature"
    />
  </v-container>
</template>
<script>
import { FeatureService } from "../../sevices/features.service";
import ConfirmDelete from "../../components/dialog/ConfirmDelete.vue";
import util from "../../common/util/util";

export default {
  name: "Features",
  components: {
    ConfirmDelete,
  },
  data() {
    return {
      listFeature: [],
      search: "",
      isActionSuccess: false,
      StatusItem: [true, false],
      isUpdateClick: false,
      dialogDel: false,
      rowsPerPageItems: [10, 15, 20, 25],
      pagination: {
        rowsPerPage: 10,
      },
      titleDialog: "Are you sure you want to delete the feature?",
      expand: true,
      isLoading: false,
      tableData: [],
      page: 1,
      pageSize: 10,
      idItem: null,
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
        (data) =>
          !this.search ||
          data.tenChucNang.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  watch: {
    tableDataFilter(newValue) {
      console.log("new", newValue);
      // this.tableData = newValue;
    },
  },
  methods: {
    editFeature(id) {
      this.$router.push({ name: "UpdateFeature", params: { featureId: id } });
    },
    async loadItems() {
      this.listFeature = [];
      try {
        this.listFeature = await FeatureService.getListFeatures();
        this.tableData = util.deepClone(this.listFeature.body.listChucNang);
      } catch (error) {
        console.log(error);
      }
    },
    confirmDeleteItem(item) {
      this.idItem = item.id;
      this.dialogDel = true;
    },
    async deleteFeature(flag) {
      if (flag && this.idItem) {
        try {
          this.isLoading = true;
          const res = await FeatureService.deleteFeature({
            id: this.idItem,
          });
          if (res) {
            this.idItem = null;
            this.loadItems();
          }
          this.$notify({
            type: "success",
            title: "Xóa",
            message: "Xóa chức năng thành công!",
            position: "bottom right",
            duration: 2000,
          });
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Xóa",
            message: "Xóa chức năng thất bại!",
            position: "bottom right",
            duration: 2000,
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
    onClickNewFeature() {
      console.log("=======redirect to new page==========");
      this.$router.push({ path: `/feature/add` });
    },
    handleRowClick(id) {
      this.$router.push({ name:"FeatureDetail", params: { featureId: id } });
    }
  },
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
.el-column-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
