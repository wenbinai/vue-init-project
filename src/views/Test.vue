<template>
  <div class="test">
    <Header title='流动党员管理系统' :is-back="true" ></Header>
    <alert-dialog></alert-dialog>
  </div>
</template>
<script>
import Header from '@/components/Header'
import AlertDialog from '@/components/AlertDialog'

export default {
  name: 'Test',
  components: {
    Header,
    AlertDialog
  }
}
</script>

<style scoped>

</style>
