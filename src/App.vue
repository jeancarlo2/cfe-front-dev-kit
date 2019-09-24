<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "@/js/all.js"
import "@/js/jquery.min.js"
import "@/js/js.cookie.min.js"
export default {}
</script>
<style lang="scss">
@import "~bulma/sass/utilities/_all";
// @import "@/theme/_variables.scss";
// @import "@/theme/_overrides.scss";

// $primary: #8c67ef;
// $primary-invert: findColorInvert($primary);
// $bg: #2B3E50;
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
);

@import "~bulma";
@import "~buefy/src/scss/buefy";
.progress-wrapper .progress-value{
  top: 5px;
  right: 0!important;
  left: initial!important;
}
.progress-wrapper .progress.is-large + .progress-value{
  margin-top: 5px;
}
// .modal-card-body{
//   background: $bg;
// }
// .field .label{
//   color:#fff
// }
#datepicker{
  display: none;
}
.modal-card{
  padding:10px
}
.modal .box{
  height: 100%;
}
.box{
  padding: 10px 10px 2px;
}
.box.despesa{
  border-bottom: 3px solid $danger
}
.box.receita{
  border-bottom: 3px solid $success
}
.box hr{
  height: 1px;
  margin: 10px 80px;
  background:rgba(255,255,255,0.7)
}
.box span.icon{
  margin-right:5px;
  height:100%;
}
.box span.titulo{
  margin-left:5px;
}
#login{
  padding:40px;
  min-height: 100vh;
}
.box-list{
  padding: 10px
}
.flutuante{
  float: right;
  position: fixed;
  bottom: 70px;
  right: 25px;
}
</style>
