<template>
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
</template>
<script>
import ConfirmDelete from "./ConfirmDelete.vue";
export default {
  name: "ConfirmRefuse",
  components: {
    ConfirmDelete
  },
  model: {
    prop: 'dialogDel',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    dialogDel: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      cachedItem: {
        id: "",
        reason: ""
      },
      isShowTextareaMess: false
    }
  },
  methods: {
    deleteItem(flag) {
      this.$emit("deleteItem", flag)
    }
  }
};
</script>
<style></style>
