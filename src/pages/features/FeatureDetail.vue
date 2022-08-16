<template>
  <div>
    <v-card>
      <v-card-title>
        <h1><i class="el-icon-info"></i> Chi tiết chức năng</h1>
        <div class="border-title-header"></div>
      </v-card-title>
      <v-container grid-list-md>
        <v-layout wrap style="overflow-x: auto;">
          <table width="100%" style="text-align: left" class="table-detail">
            <tr style="padding: 20px 10px">
              <th width="15%">Mã chức năng</th>
              <td width="30%">{{ cachedItem.maChucNang }}</td>
              <th width="15%">Tên chức năng</th>
              <td width="30%">{{ cachedItem.tenChucNang }}</td>
            </tr>
            <tr>
              <th>Chức năng cha</th>
              <td>{{ cachedItem.valueChucNangCha }}</td>
              <th>Action</th>
              <td>{{ cachedItem.valueListAction }}</td>
            </tr>
            <tr>
              <th>Thứ tự</th>
              <td>{{ cachedItem.thuTu }}</td>
              <th>icon</th>
              <td>{{ cachedItem.icon }}</td>
            </tr>
            <tr>
              <th>Hiển thị menu</th>
              <td>
                <i class="el-icon-error" v-if="!cachedItem.displayMenu"></i> 
                <i class="el-icon-success" v-else></i> 
              </td>
              <th>Trạng Thái</th>
              <td>
                <i class="el-icon-error" v-if="!cachedItem.trangThai"></i> 
                <i class="el-icon-success" v-else></i>
              </td>
            </tr>
            <tr>
              <th>Ghi chú</th>
              <td colspan="3">{{ cachedItem.ghiChu }}</td>
            </tr>
          </table>
        </v-layout>
        <v-layout wrap>
          <v-flex
            md12
            class="text-md-right text-lg-right text-sm-center theme-dark"
          >
            <v-btn class="radius-btn" @click="backToList()">Trở về</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
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
    <loading v-if="isLoading" />
  </div>
</template>
<script>
import { FeatureService } from "../../sevices/features.service";
import Loading from "../../components/Loading";
export default {
  name: "FeatureDetail",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      cachedItem: {},
      dialog: false,
      messagePopup: "Chức năng không tồn tại!"
    };
  },
  created() {
    this.isLoading = true;
    if (
      this.$route.params.featureId &&
      this.$route.path.includes("/detailFeature")
    ) {
      const featureId = this.$route.params.featureId;
      FeatureService.getDetailFeature(featureId)
        .then(res => {
          console.log(res);
          this.cachedItem = {
            id: res.body.id,
            maChucNang: res.body.maChucNang,
            tenChucNang: res.body.tenChucNang,
            icon: res.body.icon,
            thuTu: res.body.thuTu,
            ghiChu: res.body.ghiChu,
            displayMenu: res.body.menu,
            valueChucNangCha: res.body.chucNangCha.label,
            valueListAction: res.body.action.label,
            deleted: res.body.deleted,
            trangThai: res.body.trangThai,
            chiTiet: res.body.chiTiet
          };
        })
        .catch(() => {
          this.isLoading = false;
          this.dialog = true
        });
    }
    this.isLoading = false;
  },
  methods: {
    backToList() {
      this.$router.push({ name: "Features" });
    }
  }
};
</script>
<style>
.table-detail {
  table-layout: fixed;
  word-wrap: break-word;
  border: 1px solid rgb(228, 228, 228);
}
.table-detail,
.table-detail th,
.table-detail td {
  border: 1px solid rgb(228, 228, 228);
  border-collapse: collapse;
  padding-left: 15px;
  overflow: hidden;
  height: 80px;
}
.table-detail th,
.table-detail td {
  text-align: left;
}
.theme-dark {
  background-color: rgb(241, 241, 241);
}
.el-icon-info {
  color: rgb(131, 130, 130);
}
i.el-icon-success {
  color: #67c23a;
  width: 40px;
}
i.el-icon-error {
  color: #f56c6c;
}
</style>
