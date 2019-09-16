<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "@/js/all.js"
import "@/js/jquery.min.js"
export default {}
</script>
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// @import "@/theme/_variables.scss";
// @import "@/theme/_overrides.scss";

// Set your colors
// $primary: #8c67ef;
// $primary-invert: findColorInvert($primary);
// $bg: #2B3E50;
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
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

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
.progress-wrapper .progress-value{
  top: 5px;
  right: 0!important;
  left: initial!important;
}
// .modal-card-body{
//   background: $bg;
// }
#datepicker{
  display: none;
}
.modal-card{
  padding:10px
}
// .field .label{
//   color:#fff
// }
.modal .box{
  height: 100%;
}
.box{
  padding: 10px 10px 2px;
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
  bottom: 25px;
  right: 25px;
}
</style>
