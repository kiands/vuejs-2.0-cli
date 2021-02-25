import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Todos from '@/components/Todos'
import Todo from '@/components/Todo'
import Counter from '@/components/Counter'

Vue.use(Router)

export default new Router({
  routes: [
    //{
    //path: '/',
    //name: 'HelloWorld',
    //component: HelloWorld
    //},
    {
      path: '/',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todo/:id',
      name: 'Todo', //此处命名有关<router-link></router-link>，大小写敏感
      component: Todo
    },
    {
      path: '/Counter',
      name: 'Counter', //此处命名有关<router-link></router-link>，大小写敏感
      component: Counter
    }
  ]
})