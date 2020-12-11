<template>
	<!--注意至少要1个root组件这件事-->
	<div id="todos">
	<!--v-for遍历以及对todos为空的额外处理-->
	<ul v-if="todos.length > 0">
		<!--index属性本身就存在；v-bind中，completed可改变真/假的状态。真即存在此style，假即不存在-->
		<li class="list-group-item"
			v-bind:class="{ 'completed' : todo.completed }"
			v-for="(todo,index) in todos">

			<!--此处的todo名称与vue-router有关，name应当和vue-router中index.js的name一栏中所填相同，大小写敏感-->
			<router-link :to="{ name: 'Todo', params: { id: todo.id }}">{{todo.title}}</router-link>

			<button class="btn btn-xs pull-right" 
				v-bind:class="[todo.completed ? 'btn-danger' : 'btn-success']"
				v-on:click="toggleCompletion(todo)">{{ todo.completed ? 'undo' : 'completed' }}</button>

			<!--delete方法需要用到todo（主要是删除需要使用todo.id）-->
			<button class="btn btn-warning btn-xs pull-right" v-on:click="deleteTodo(index, todo)">Delete</button>
		</li>
	</ul>
	<!--把TodoForm显现出来，不要忘了v-for的绑定；如果没有成功引入，检查标签有没有写错-->
	<todo-form :todos="todos"></todo-form>
	</div>
</template>

<style>
	.completed {
		color: #5cb85c;
		text-decoration: line-through;
	}
	.margin-right-10 {
			margin-right: 10px;
	}
</style>

<script>
	//把增加Todo项目的组件作为Todos的子组件，所以需要先导入（注意路径）
	import TodoForm from './TodoForm'

	export default{
		name: 'todos', //对应<template></template>中的<div id="todos"></div>
		props: ['todos'],
		methods: {
			//此处忘记“,”分隔会导致很多意想不到的问题
			deleteTodo: function (index, todo) {
				this.axios.delete('http://vue.test/api/todo/'+ todo.id +'/delete').then(response => {
					this.todos.splice(index,1) //从index号开始删除，删除1个
				})
			},
			toggleCompletion: function (todo) {
				this.axios.patch('http://vue.test/api/todo/'+ todo.id +'/completed').then(response => {
					todo.completed = ! todo.completed
				})
			},
		},
		//小心不要把components写错地方，不然会报类似“Method "components" has type "object" in the component definition”的错误
		components: {
			TodoForm
		}
	}
</script>