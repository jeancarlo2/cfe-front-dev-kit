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
@import "@/theme/_variables.scss";
@import "@/theme/_overrides.scss";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);

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
</style>
