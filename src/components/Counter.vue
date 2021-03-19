<template>
    <div>
        <button v-bind:disabled="minus_isDisabled" @click="minus()">-</button>
        <input v-model="info" v-bind:class="{ input1: isDisabled }" />
        <button v-bind:disabled="plus_isDisabled" @click="plus()">+</button>
    </div>
</template>

<script>
export default {
  name: 'Counter',
  data () {
    return {
      info: null,
      isDisabled: null,
      minus_isDisabled: null,
      plus_isDisabled: null
    }
  },
  created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
  },
  methods: {
    minus: function() {
      this.info = this.info - 1
      if ( this.info == 0) {
        this.isDisabled = true
        this.minus_isDisabled = true
      } else {
        this.isDisabled = false
        this.plus_isDisabled = false
      }
      //this.$emit('parentShow',this.info)
      this.axios.patch('http://apitest.hzeven.com/api/counter',{value: this.info})
    },
    plus: function() {
      this.info = this.info + 1
      if ( this.info == 10 ) {
        this.isDisabled = true
        this.plus_isDisabled = true
      } else {
        this.isDisabled = false
        this.minus_isDisabled = false
      }
      //this.$emit('parentShow',this.info)
      this.axios.patch('http://apitest.hzeven.com/api/counter',{value: this.info})
    },
    fetchData () {
      this.axios.get('http://apitest.hzeven.com/api/counter').then(response => {
        this.info = response.data
        if ( this.info == 0) {
          this.isDisabled = true
          this.minus_isDisabled = true
        } else {
          this.isDisabled = false
          this.plus_isDisabled = false
        }
        if ( this.info == 10 ) {
          this.isDisabled = true
          this.plus_isDisabled = true
        } else {
          this.isDisabled = false
          this.minus_isDisabled = false
        }
      })
    }
  }
}
</script>

<style>
  .input1 {
    background-color: red
  }
</style>
