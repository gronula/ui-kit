<template lang="pug">
  #app.wrapper-p
    router-view
</template>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    padding-top: $offset-mobile;
    padding-bottom: $offset-mobile;

    @include respond-min(tablet) {
      padding-top: $offset-desktop;
      padding-bottom: $offset-desktop;
    }
  }
</style>
