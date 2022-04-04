<template>
  <v-container fluid>
    <div class="user-dashboard">
      <v-card>
        <v-data-table
          :headers="headersTable"
          :items="listUsers"
          mobile-breakpoint="800"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.maNhomNguoiDung }}</td>
            <td class="text-xs-left">{{ props.item.tenNhomNguoiDung }}</td>
            <td class="text-xs-left">{{ props.item.ghiChu }}</td>
            <td class="text-xs-left">{{ props.item.nguoiTao }}</td>
            <td class="text-xs-left">
              {{ moment(props.item.ngayTao).format("YYYY-MM-DD") }}
            </td>
            <td class="text-xs-left">{{ props.item.nguoiCapNhat }}</td>
            <td class="text-xs-left">
              {{ moment(props.item.ngayCapNhat).format("YYYY-MM-DD") }}
            </td>
            <td class="text-xs-left">{{ props.item.trangThai }}</td>
            <td class="d-flex justify-center">
              <v-icon
                small
                class="mr-2"
                @click="showEditDialog(props.item)"
                color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(props.item)" color="pink">
                mdi-delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
        <!-- this dialog is used for both create and update -->
        <v-dialog v-model="dialog" persistent max-width="500px">
          <template v-slot:activator="{ on }">
            <div class="d-flex justify-end">
              <div>
                <v-btn
                  color="primary"
                  dark
                  class="ml-auto ma-3"
                  v-on="on"
                  style="width: 100px"
                >
                  New
                  <v-icon small>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span v-if="editedItem.id">Edit {{ editedItem.id }}</span>
              <span v-else>Create</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="editedItem.Name"
                    label="Group Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="editedItem.Details"
                    label="Note"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.URL"
                    label="Creator"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="date created"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showEditDialog()"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- this dialog is delete user group -->
        <v-dialog v-model="dialogDel" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Bạn có chắc chắn muốn xóa nhóm?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="darken-1" text @click="cancelDel()"> Cancel </v-btn>
              <v-btn color="error darken-1" text @click="deleteUserGroup()">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { UserGroup } from "../../sevices/users.service";
export default {
  name: "UsersDashboard",
  components: {
    // ClearIcon
  },
  data() {
    return {
      headersTable: [
        { text: "ID", value: "id" },
        { text: "Mã nhóm người dùng", value: "maNhomNguoiDung" },
        { text: "Tên nhóm người dùng", value: "tenNhomNguoiDung" },
        { text: "Ghi chú", value: "ghiChu", width: "200px" },
        { text: "Người tạo", value: "nguoiTao" },
        { text: "Ngày tạo", value: "ngayTao", width: "220px" },
        { text: "Người cập nhật", value: "nguoiCapNhat" },
        { text: "Ngày cập nhật", value: "ngayCapNhat" },
        { text: "Trạng thái", value: "trangThai" },
        { text: "Action", align: "center" },
      ],
      listUsers: [],
      dialog: false,
      dialogDel: false,
      editedItem: {},
      delItem: {},
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    async loadItems() {
      this.listUsers = [];
      try {
        this.listUsers = await this.$store.dispatch("users/setUsers");
        console.log(this.listUsers);
      } catch (error) {
        console.log(error);
      }
    },
    saveItem(item) {},
    deleteItem(item) {
      this.dialogDel = !this.dialogDel;
      this.delItem = item;
    },
    cancelDel() {
      this.dialogDel = false;
    },
    async deleteUserGroup() {
      try {
        const res = await UserGroup.deleteGroupById({
          id: this.delItem.id,
        });
        // if (res.status === "204") {
        this.dialogDel = false;
        this.loadItems();
        // }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.user-dashboard {
  height: calc(100vh - 319px);
}
</style>
