<template>
  <footer>
    <!-- 訂閱區 -->
    <div class="subscribe">
      <div class="subscribe-container">
        <div class="subscribe-text">
          <img src="~/static/image/logo-light.svg" alt="" class="logo">
          <div class="text">訂閱你我的甜蜜郵件</div>
        </div>
        <div class="input-item">
          <div class="icon-mail"><i class="material-icons">mail</i></div>
          <input type="text">
          <div class="submit"><i class="material-icons">arrow_forward</i></div>
        </div>
      </div>
    </div>
    <!-- 連絡資訊區 -->
    <div class="sweet-info">
      <div class="info-container">
        <div class="sweetaste-image">
          <img src="~/static/image/logotype-lg-dark.svg" alt="" class="sweetaste">
          <img src="~/static/image/sm-今天是個吃甜點的好日子.svg" alt="" class="good-day">
        </div>
        <div class="info">
          <div class="tel">07-1234-5678</div>
          <div class="email">sweetaste@email.com</div>
          <div class="address">800 高雄市新興區幸福路 520 號</div>
        </div>
        <div class="footer-bottom">
          <div class="icon">
            <a href="javascript:" class="icon-line">
              <img src="~/static/image/ic-line@.svg" alt="">
            </a>
            <a href="javascript:" class="icon-facebook">
              <img src="~/static/image/ic-facebook.svg" alt="">
            </a>
          </div>
          <div class="copyright">© 2018 Sweetaste* All Rights Reserved</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  margin-top: 60px;
  @include media($mobile) {
    margin-top: 30px;
  }
  > .subscribe {
    background-color: $primary;
    > .subscribe-container {
      height: 116px;
      width: 100%;
      max-width: 1024px;
      margin: 0 auto;
      @include flex(row, space-between, center);
      @include media($tablet) {
        height: 186px;
        @include flex(column, center, center);
      }
      @include media($mobile) {
        @include flex(column, space-between, center);
      }
      > .subscribe-text {
        @include flex(row, center, center);
        margin-left: 122px;
        @include media($tablet) {
          margin-left: 0;
        }
        @include media($mobile) {
          margin-top: 30px;
        }
        > img {
          width: 40px;
        }
        > div {
          font-size: 24px;
          color: #ffffff;
          margin-left: 20px;
        }
      }
      > .input-item {
        @include flex(row, center, center);
        margin-right: 122px;
        @include media($tablet) {
          margin-top: 20px;
          margin-right: 0;
        }
        @include media($mobile) {
          margin-bottom: 30px;
          width: calc(100% - 60px);
          max-width: 360px;
        }
        > .icon-mail {
          width: 64px;
          height: $input-height;
          color: $primary;
          background-color: $secondary;
          @include flex(row, center, center);
        }
        > input {
          width: 252px;
          height: $input-height;
          border-width: 0;
          background-color: $secondary;
          outline: none;
          color: $primary;
          font-weight: bold;
          @include media($mobile) {
            width: calc(100% - 128px);
          }
        }
        > .submit {
          width: 64px;
          height: $input-height;
          color: $primary;
          background-color: #ffe180;
          @include flex(row, center, center);
        }
      }
    }
  }
  > .sweet-info {
    background-color: $secondary;
    color: $primary;
    font-size: 16px;
    font-weight: bold;
    > .info-container {
      height: 341px;
      max-width: 1024px;
      margin: 0 auto;
      padding-top: 38.9px;
      padding-left: 122px;
      padding-right: 122px;
      @include media($mobile) {
        height: 311px;
        padding-top: 38.9px;
        padding-left: 30px;
        padding-right: 0;
        background-color: $secondary;
        color: $primary;
        font-size: 16px;
        font-weight: bold;
      }
      > .sweetaste-image {
        height: 27px;
        @include flex(row, space-between, center);
        > .sweetaste {
          width: 172px;
          height: 27px;
        }
        > .good-day {
          width: 60px;
          height: 219px;
          align-self: flex-start;
          margin-top: -8.9px;
          @include media($mobile) {
            display: none;
          }
        }
      }
      > .info {
        width: 230px;
        height: 68px;
        margin-top: 115px;
        @include flex(column, space-between);
        @include media($mobile) {
          width: 230px;
          height: 68px;
          margin-top: 39.5px;
        }
      }
      > .footer-bottom {
        margin-top: 30px;
        height: 32px;
        @include flex(row, space-between);
        @include media($mobile) {
          margin-top: 37px;
          height: 71px;
          flex-direction: column;
        }
        > .icon {
          font-size: 0;
          > a {
            text-decoration: none;
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }
        }
        > .copyright {
          height: 16px;
          font-family: Times;
          font-weight: normal;
          align-self: flex-end;
          @include media($mobile) {
            align-self: flex-start;
          }
        }
      }
    }
  }
}
</style>
