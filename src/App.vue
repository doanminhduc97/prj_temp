<template>
  <div>
    <template v-if="!$route.meta.allowAnonymous">
      <v-app id="inspire">
        <div class="app-container">
          <toolbar @toggleNavigationBar="drawer = !drawer" />
          <navigation :toggle="drawer" />
          <v-content>
            <router-view />
            <page-footer />
          </v-content>
        </div>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style lang="css">
.v-btn:hover:before {
  color: transparent !important;
}
.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 16px;
  color: #ffffff;

  background: #44a4fc;
  border-left: 5px solid #187fe7;
}
.vue-notification .success {
  background: #68cd86;
  border-left-color: #42a85f;
}
.vue-notification .warn {
  background: #ffb648;
  border-left-color: #f48a06;
}
.vue-notification .error {
  background: #e54d42;
  border-left-color: #b82e24;
}
</style>
