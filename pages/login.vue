<template>
  <div class="main">
    <div class="login-area">
      <div class="title">會員登入</div>
      <div class="mobile-other-account">
        <div @click="otherAccountLogin('fb')"><img
            src="~/static/image/ic-facebook-logotype.svg"
            alt=""
            class="facebook"
          ></div>
        <div
          @click="otherAccountLogin('google')"
          class="google-area"
        ><img
            src="~/static/image/ic-google.svg"
            alt=""
            class="google"
          ></div>
        <div
          @click="otherAccountLogin('twitter')"
          class="twitter"
        >Twitter</div>
      </div>
      <div class="login-info">
        <div class="account">
          <div class="account-icon"><i class="material-icons">assignment_ind</i></div>
          <input
            type="email"
            placeholder="電子信箱"
            v-model="email"
            @blur="focused.email = true"
          >
        </div>
        <validateText
          class="validate"
          text="請輸入正確格式的emial"
          v-show="!emailValidate && focused.email"
        />
        <div class="password">
          <div class="password-icon"><i class="material-icons">vpn_key</i></div>
          <input
            type="password"
            placeholder="請輸入使用者密碼"
            v-model="password"
            @blur="focused.password = true"
            maxlength="12"
          >
        </div>
        <validateText
          class="validate"
          text="請輸入正確格式的密碼"
          v-show="!passwordValidate && focused.password"
        />
        <label
          for="remember"
          class="remember"
        >
          <input
            type="checkbox"
            id="remember"
            class="checkbox"
          >
          <span class="ischeck"><i class="material-icons">check_box</i></span>
          <span class="uncheck"><i class="material-icons">check_box_outline_blank</i></span>
          記住我
        </label>
        <nuxt-link
          to="/registered"
          class="registered"
        >
          <div class="triangle"></div>
          <span>註冊新帳號</span>
        </nuxt-link>
      </div>
      <div
        class="login"
        @click="emailLogin"
      >登入帳號</div>
    </div>
    <div class="other-account">
      <div class="title">—— 連結社群帳號 ——</div>
      <div class="other-account-icon">
        <div
          class="facebook"
          @click="otherAccountLogin('fb')"
        ><img
            src="~/static/image/ic-facebook-logotype.svg"
            alt=""
          ></div>
        <div
          class="google"
          @click="otherAccountLogin('google')"
        ><img
            src="~/static/image/ic-google.svg"
            alt=""
          ></div>
        <div
          class="twitter"
          @click="otherAccountLogin('twitter')"
        >Twitter</div>
      </div>
    </div>
  </div>
</template>

<script>
import validateText from '~/components/validateText.vue'
export default {
  data() {
    return {
      email: '',
      password: '',
      focused: {
        email: false,
        password: false
      }
    }
  },
  methods: {
    emailLogin() {
      if (this.emailValidate && this.passwordValidate) {
        this.$store.commit('loadingStatus', true)
        this.$store
          .dispatch('emailLogin', { email: this.email, password: this.password })
          .then(user => {
            this.setLoginCookie(user.uid)
            this.$store.commit('loadingStatus', false)
            this.loginMessage(true)
          })
          .catch(err => {
            this.$store.commit('loadingStatus', false)
            this.loginMessage(false, err)
          })
      } else {
        this.focused.email = true
        this.focused.password = true
      }
    },
    otherAccountLogin(via) {
      this.$store.commit('loadingStatus', true)
      this.$store
        .dispatch(`${via}Login`)
        .then(user => {
          return this.$store.dispatch('setUserToDb', user)
        })
        .then(user => {
          this.setLoginCookie(user.uid)
          this.$store.commit('loadingStatus', false)
          this.loginMessage(true)
        })
        .catch(err => {
          this.$store.commit('loadingStatus', false)
          this.loginMessage(false)
        })
    },
    setLoginCookie(uid) {
      this.$cookies.set('uid', uid, {
        path: '/',
        // maxAge: 60 * 60 * 24 * 7
        maxAge: 60 * 60 * 24
      })
    },
    loginMessage(success, falseMessage = '登入失敗，請檢查登入資訊') {
      this.$store.commit('removeAllMessage')
      if (success) {
        this.$store.commit('addMessage', {
          content: `登入成功，歡迎回來！`,
          id: 'loginSuccess',
          type: 'normal'
        })
      } else {
        this.$store.commit('addMessage', {
          content: falseMessage,
          id: 'loginFalse',
          type: 'error'
        })
      }
    }
  },
  computed: {
    emailValidate() {
      var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      if (emailRule.test(this.email) && this.email) {
        return true
      } else {
        return false
      }
    },
    passwordValidate() {
      var passwordRule = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/
      if (passwordRule.test(this.password) && this.password.length > 5 && this.password.length < 13) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    validateText
  },
  watch: {
    '$store.state.auth.user'() {
      if (this.$store.state.auth.user) {
        this.$router.push('/')
      }
    }
  },
  head() {
    return {
      title: '登入'
    }
  },
  middleware: 'authCheck'
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
  @include media($mobile) {
    margin-top: 0;
    margin-bottom: -30px;
  }
  @include flex(row, center, center);
  @include media($tablet) {
    flex-flow: wrap;
  }
  @include media($mobile) {
    width: 100%;
  }
  > .login-area {
    background-color: $primary;
    width: 390px;
    // height: 406px;
    @include flex(column, flex-start, center);
    @include media($mobile) {
      width: 100%;
      // height: 537px;
    }
    > .title {
      height: 50px;
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
      margin-top: 40px;
      @include flex(row, center, center);
      @include media($mobile) {
        margin-top: 30px;
      }
    }
    > .mobile-other-account {
      display: none;
      @include media($mobile) {
        display: block;
        width: 100%;
        height: 116px;
        margin-top: 30px;
        background-color: $secondary;
        @include flex(row, center, center);
      }
      > div {
        width: 33%;
        max-width: 200px;
        height: 56px;
        background-color: #ffffff;
        cursor: pointer;
        @include flex(row, center, center);
        > .facebook {
          width: 90px;
        }
        > .google {
          width: 70px;
          margin-top: 5px;
        }
      }
      > .twitter {
        color: #8da291;
        font-size: 22px;
        font-weight: bold;
      }
      > .google-area {
        border-left: 1px solid $secondary;
        border-right: 1px solid $secondary;
      }
    }
    .login-info {
      margin-top: 40px;
      width: calc(100% - 60px);
      @include media($mobile) {
        margin-top: 30px;
        max-width: 500px;
      }
      > .account {
        position: relative;
        @include flex(row, flex-start, center);
        > div {
          position: absolute;
          width: 64px;
          height: $input-height;
          color: $primary;
          background-color: $secondary;
          @include flex(row, center, center);
        }
        > input {
          width: 100%;
          height: $input-height;
          color: $primary;
          background-color: $secondary;
          outline: none;
          border: none;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: 64px;
          padding-right: 0;
        }
      }
      > .password {
        position: relative;
        @include flex(row, flex-start, center);
        margin-top: 16px;
        > div {
          position: absolute;
          width: 64px;
          height: $input-height;
          color: $primary;
          background-color: $secondary;
          @include flex(row, center, center);
        }
        > input {
          width: 100%;
          height: $input-height;
          color: $primary;
          background-color: $secondary;
          outline: none;
          border: none;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: 64px;
          padding-right: 0;
        }
      }
      > .remember {
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        align-self: flex-start;
        margin-top: 16px;
        position: relative;
        @include flex(row, flex-start, center);
        > input {
          opacity: 0;
          position: absolute;
          left: 70px;
          &:checked ~ .ischeck {
            display: inline-block;
          }
          &:checked ~ .uncheck {
            display: none;
          }
        }
        > span {
          width: 24px;
          height: 24px;
        }
        > .ischeck {
          display: none;
        }
      }
      > .registered {
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
        width: 120px;
        height: 16px;
        margin-top: 10px;
        text-decoration: none;
        @include flex(row, flex-start, center);
        > span {
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          margin-left: 5px;
        }
        > .triangle {
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left: 12px solid #ffffff;
          border-right: none;
        }
      }
      > .validate {
        margin-top: 10px;
        margin-bottom: -6px;
        align-self: flex-start;
      }
    }
    > .login {
      width: 390px;
      height: 65px;
      margin-top: 17px;
      cursor: pointer;
      background-color: #ffe180;
      color: $primary;
      font-size: 24px;
      font-weight: bold;
      transition: background-color, 0.3s;
      @include flex(row, center, center);
      @include media($mobile) {
        width: 100%;
        margin-top: 22px;
      }
      @include media($desktop) {
        &:hover {
          background-color: darken(#ffe180, 10%);
        }
      }
    }
  }
  > .other-account {
    width: 390px;
    height: 350px;
    background-color: $secondary;
    @include media($mobile) {
      display: none;
    }
    > .title {
      height: 33px;
      font-size: 24px;
      color: #8da291;
      margin-top: 40px;
      margin-bottom: 36px;
      @include flex(row, center, center);
    }
    > .other-account-icon {
      > div {
        width: 330px;
        height: 56px;
        margin-bottom: 16px;
        margin-left: auto;
        margin-right: auto;
        background-color: #ffffff;
        cursor: pointer;
        @include flex(row, center, center);
      }
      > .facebook {
        img {
          height: 20px;
        }
      }
      > .google {
        img {
          height: 30px;
        }
      }
      > .twitter {
        color: #8da291;
        font-size: 27px;
        font-weight: bold;
      }
    }
  }
}
</style>
