<template>
  <div id="app">
    <h1>TODOS</h1>
    <router-view :todos="todos"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
        return {
            todos: [],
        }
      },
      computed: {
          todoCount() {
              return this.todos.length; //显示有几条todo
          }
      },
  mounted() {
    //注意laravel跨域的配置
    this.axios.get('http://vue.test/api/todos').then(response =>{
      //todos的获取源头改为api传递的
      this.todos = response.data
      //console.log(response.data)
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
