<template>
  <div></div>
</template>

<script>
export default {
  name: 'AlertDialog',
  data () {
    return {
      exception: {
        message: ''
      }
    }
  },
  watch: {
    exception (val) {
<<<<<<< HEAD
      // console.log('alertdialog 的 val' + val)
      // console.log('弹出弹窗开始')
=======
      console.log('alertdialog 的 val' + val)
      console.log('弹出弹窗开始')
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
      this.exception.message = val
      if (this.exception.message !== '') {
        alert(`${this.exception.message}`)
        this.exception.message = ''
      }
      console.log('弹出弹窗结束')
    }
  },
  computed: {
    exceptions () {
      return this.$store.state.exception.message
    }
  }
}

</script>

<style scoped>

</style>
