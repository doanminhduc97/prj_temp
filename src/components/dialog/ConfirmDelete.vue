<template>
  <v-dialog v-model="dialogDel" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="deleteItem(false)">
          Cancel
        </v-btn>
        <v-btn color="error darken-1" text @click="deleteItem(true)">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ConfirmDelete from "../../components/dialog/ConfirmDelete.vue";
export default {
  name: "ConfirmDelete",
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
  methods: {
    deleteItem(flag) {
      this.$emit("deleteItem", flag)
    }
  }
};
</script>
<style></style>
