<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card color="blue lighten-2">
        <v-icon>info</v-icon>
        <v-toolbar-title>Thong Tin Chi Tiet</v-toolbar-title>
      </v-toolbar>

      <v-layout row>
        <v-flex xs12 sm6 md6>
          <v-card-title class="text-h2">
            <span style="font-size: 18px; font-weight: 550"
              >Thong Tin Chung</span
            >
          </v-card-title>
          <v-card-text>
            <table style="width: 100%" class="table-vertical--fixed">
              <tr>
                <th style="width: 200px">Tên nhóm người dùng</th>
                <td style="min-width: 200px">
                  {{ group.tenNhomNguoiDung }}
                </td>
              </tr>
              <tr>
                <th>Ho Ten</th>
                <td>{{ group.ghiChu }}</td>
              </tr>
              <tr>
                <th>Trang Thai</th>
                <td style="color: red">
                  <span v-if="group.trangThai">Dang su dung</span>
                  <span v-else>Khong su dung</span>
                </td>
              </tr>
            </table>
          </v-card-text>
        </v-flex>

        <v-divider vertical></v-divider>

        <v-flex xs12 sm6 md6>
          <v-card-title class="text-h2">
            <span style="font-size: 18px; font-weight: 550"
              >Phan Quyen Chuc Nang</span
            >
          </v-card-title>
          <v-card-text>
            <template v-if="listTreeShow.length > 0">
              <v-treeview
                v-model="tree"
                :items="items"
                activatable
                active-class="grey lighten-4 indigo--text"
                selected-color="indigo"
                open-on-click
                selectable
                item-text="tenChucNang"
                expand-icon="mdi-chevron-down"
              >
              </v-treeview>
            </template>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-card-actions style="padding: 25px">
        <v-spacer></v-spacer>

        <v-btn
          class="white--text btn-radius"
          color="primary"
          v-if="groupId !== undefined"
          @click.native="onClickUpdate"
        >
          <v-icon right>mdi-content-save</v-icon>
          <span style="padding-left: 10px">Cap Nhat</span>
        </v-btn>
        <v-btn
          class="btn-radius"
          depressed
          style="color: black !important"
          @click="backToList"
        >
          <span>Tro Ve</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { GroupsService } from "../../sevices/groups.service";
import { FeatureService } from "../../sevices/features.service";
import util from "../../common/util/util";
export default {
  name: "DetailGroupPage",
  data() {
    return {
      listTreeShow: [],
      isLoading: false,
      tree: [],
      types: [],
      groupId: "",
      group: {},
    };
  },
  created() {
    this.groupId = this.$route.params.id || undefined;
    this.getGroupById(this.groupId)
      .then((res) => {
        this.group = util.deepClone(res.body);
      })
      .catch((e) => {
        console.error(e);
        this.groupId = undefined;
        this.user = {};
      });
    this.getListFeature().then(res => {
      this.listTreeShow = util.deepClone(res.body.listChucNang);
    }).catch(e => {
      console.error(e);
      this.listTreeShow = undefined
    })
  },
  computed: {
    items() {
      const children = this.listTreeShow.map((type) => ({
        id: type.id,
        tenChucNang: type.tenChucNang,
        children: type.children,
      }));
      return [
        {
          id: "tempId",
          tenChucNang: "Tat ca chuc nang",
          children,
        },
      ];
    },
  },
  watch: {},

  methods: {
    async getGroupById(id) {
      const param = { id };
      return await GroupsService.getGroupById(param);
    },
    async getListFeature() {
      return await FeatureService.getListFeatures();
    },
    backToList() {
      this.$router.push("/users");
    },
    onClickUpdate() {
      const listIdTicked = this.tree.filter((data) => {
        return data !== "tempId";
      });
      const requestBody = {
        id: this.groupId,
        listIdTicked: listIdTicked,
      };
      console.log(requestBody, "aaaa");
      GroupsService.updateRoleGroup(requestBody)
        .then((res) => {
          this.$notify({
            type: "success",
            title: "Phân quyền Nhóm",
            message: "Cập nhật quyền nhóm thành công!",
            position: "bottom right",
            duration: 2000,
          });
          this.backToList();
        })
        .catch((e) => {
          this.$notify({
            type: "error",
            title: "Phân quyền Nhóm",
            message: "Cập nhật quyền nhóm thất bại!",
            position: "bottom right",
            duration: 2000,
          });
        });
    },
  },
  beforeDestroy() {
    this.groupId = undefined;
  },
};
</script>

<style lang="css" scoped>
table,
th,
td {
  border: 1.5px solid rgb(209, 205, 205);
  border-collapse: collapse;
}
th,
td {
  padding: 15px;
  text-align: left;
}
.table-vertical--fixed {
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}
.v-icon--right {
  margin-left: 0 !important;
}
</style>
