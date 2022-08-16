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
                <th style="width: 200px">Tai khoan</th>
                <td style="min-width: 200px">
                  {{ user.taiKhoan }}
                </td>
              </tr>
              <tr>
                <th>Ho Ten</th>
                <td>{{ user.hoTen }}</td>
              </tr>
              <tr>
                <th>Trang Thai</th>
                <td style="color: red">
                  <span v-if="user.trangThai">Dang su dung</span>
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
                item-text="tenNhomNguoiDung"
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
          v-if="userId !== undefined"
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
import { UsersService } from "../../sevices/users.service";
import { GroupsService } from "../../sevices/groups.service";
import util from "../../common/util/util";
export default {
  name: "DetailUserPage",
  data() {
    return {
      listTreeShow: [],
      isLoading: false,
      tree: [],
      types: [],
      userId: "",
      user: {}
    };
  },
  created() {
    this.userId = this.$route.params.id || undefined;
    this.getUserById(this.userId)
      .then(res => {
        console.log(res);
        this.user = util.deepClone(res.body);
      })
      .catch(e => {
        console.error(e);
        this.userId = undefined;
        this.user = {};
      });
    this.getListGroup()
      .then(res => {
        this.listTreeShow = util.deepClone(res);
      })
      .catch(e => {
        console.error(e);
        this.listTreeShow = undefined;
      });
  },
  computed: {
    items() {
      const children = this.listTreeShow.map(type => ({
        id: type.id,
        tenNhomNguoiDung: type.tenNhomNguoiDung,
        children: type.children
      }));
      return [
        {
          id: "tempId",
          tenNhomNguoiDung: "Tat ca chuc nang",
          children
        }
      ];
    }
  },
  watch: {},

  methods: {
    async getUserById(id) {
      const param = { id };
      return await UsersService.getDetailUser(param);
    },
    async getListGroup() {
      return await this.$store.dispatch("groups/getGroups");
    },
    backToList() {
      this.$router.push("/users");
    },
    onClickUpdate() {
      const listIdTicked = this.tree.filter(data => {
        return data !== "tempId";
      });
      console.log("listIdTicked", listIdTicked);
      const requestBody = {
        id: this.userId,
        listIdTicked: listIdTicked
      };
      UsersService.updateRoleUser(requestBody)
        .then(res => {
          this.$notify({
            type: "success",
            title: "Phân quyền người dùng",
            message: "Cập nhật quyền người dùng thành công!",
            position: "bottom right",
            duration: 2000
          });
          this.backToList();
        })
        .catch(e => {
          this.$notify({
            type: "error",
            title: "Phân quyền người dùng",
            message: "Cập nhật quyền người dùng thất bại!",
            position: "bottom right",
            duration: 2000
          });
        });
    }
  },
  beforeDestroy() {
    this.userId = undefined;
  }
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
