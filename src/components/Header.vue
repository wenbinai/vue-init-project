<template>
  <div class="headerContainer">
    <van-nav-bar
      :title="title"
      :left-arrow="isBack"
      @click-left="$router.back()"
    >
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title', 'isBack']
}
</script>

<style scoped>

</style>
