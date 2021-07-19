<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          to="/"
          icon="arrow_back"
          flat
          dense
          no-caps
        />
        <q-toolbar-title class="absolute-center">
          <q-chip
            v-if="$route.fullPath.includes('/chat')"
            color="green-4"
            icon="account_circle"
          >{{ title }}</q-chip>
          <q-badge
            v-else
            class="text-h6"
          >
            {{ title }}
          </q-badge>

        </q-toolbar-title>
        <q-btn
          v-if="!this.userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          label="尚未登入"
          no-caps
          flat
          dense
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          登出<br>
          {{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'

export default {
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState('store', ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return '純聊'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath == '/auth') return '純聊'
    }
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  }

}
</script>
<style lang="scss">
q-toolbar {
  .q-btn {
    line-height: 1.2;
  }
}
</style>