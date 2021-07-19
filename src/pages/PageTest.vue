<template>
  <q-page
    ref="pageChat"
    class="page-chat flex column"
  >
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center fixed-top"
    >
      {{ otherUserDetails.name }} is offline.
    </q-banner>
    <div
      :class="{ 'invisible' : !showMessages }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          @submit="sendMessage"
          class="full-width"
        >
          <q-input
            v-model="newMessage"
            @blur="scrollToBottom"
            ref="newMessage"
            bg-color="white"
            outlined
            rounded
            label="Message"
            dense
          >

            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                type="submit"
                color="white"
                icon="send"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'

export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: '',
      showMessages: false
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails'])
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.otherUserId
      })
      this.clearMessage()
    },
    clearMessage() {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20);
    }
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
        setTimeout(() => {
          this.showMessages = true
        }, 200)
      }
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId)
  },
  destroyed() {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style lang="scss">
/*
.page-chat {
  background: #e2dfd5;
  &:after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.1;
    background-image: radial-gradient(
        circle at 100% 150%,
        #c0c0c0 24%,
        #fff 25%,
        #fff 28%,
        #c0c0c0 29%,
        #c0c0c0 36%,
        #fff 36%,
        #fff 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 0 150%,
        #c0c0c0 24%,
        #fff 25%,
        #fff 28%,
        #c0c0c0 29%,
        #c0c0c0 36%,
        #fff 36%,
        #fff 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 50% 100%,
        #fff 10%,
        #c0c0c0 11%,
        #c0c0c0 23%,
        #fff 24%,
        #fff 30%,
        #c0c0c0 31%,
        #c0c0c0 43%,
        #fff 44%,
        #fff 50%,
        #c0c0c0 51%,
        #c0c0c0 63%,
        #fff 64%,
        #fff 71%,
        transparent 71%,
        transparent
      ),
      radial-gradient(
        circle at 100% 50%,
        #fff 5%,
        #c0c0c0 6%,
        #c0c0c0 15%,
        #fff 16%,
        #fff 20%,
        #c0c0c0 21%,
        #c0c0c0 30%,
        #fff 31%,
        #fff 35%,
        #c0c0c0 36%,
        #c0c0c0 45%,
        #fff 46%,
        #fff 49%,
        transparent 50%,
        transparent
      ),
      radial-gradient(
        circle at 0 50%,
        #fff 5%,
        #c0c0c0 6%,
        #c0c0c0 15%,
        #fff 16%,
        #fff 20%,
        #c0c0c0 21%,
        #c0c0c0 30%,
        #fff 31%,
        #fff 35%,
        #c0c0c0 36%,
        #c0c0c0 45%,
        #fff 46%,
        #fff 49%,
        transparent 50%,
        transparent
      );
    background-size: 100px 50px;
  }
}
*/
.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
.q-message {
  z-index: 1;
}
</style>
