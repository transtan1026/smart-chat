<template>
  <q-form>
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      class="q-mb-md"
      outlined
      label="姓名"
    />
    <q-input
      v-model="formData.email"
      class="q-mb-md"
      outlined
      label="電子郵件"
      type="email"
      placeholder="example@email.com"
    />
    <q-input
      v-model="formData.password"
      class="q-mb-md"
      outlined
      label="密碼"
      type="password"
    />
    <div class="row">
      <q-space />
      <q-btn
        @click="submitForm"
        color="primary"
        label="確認"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        name: '',
        email: 'young@gmail.com',
        password: '123456'
      }
    }
  },
  methods: {
    ...mapActions('store', ['registerUser', 'loginUser']),
    submitForm() {
      if (this.tab == 'login') {
        this.loginUser(this.formData)
      }
      else {
        this.registerUser(this.formData)
      }
    }
  }
}
</script>

