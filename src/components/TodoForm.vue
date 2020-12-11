<template>
	<form v-on:submit.prevent="addTodo(newTodo)">
		<div class="form-group">
			<!--事先改好newTodo.title-->
			<input type="text" v-model="newTodo.title" class="form-control">
		</div>
		<div class="form-group">
			<button class="btn btn-success" type="submit">Add Todo</button>
		</div>
	</form>
</template>

<script>
	export default{
		props: ['todos'],
		data(){
			return {
				newTodo:{id:null,title:'',completed:false}
			}
		},
		methods: {
			addTodo: function (newTodo) {
				this.axios.post('http://vue.test/api/todo/create',{title: this.newTodo.title}).then(response => {
					console.log(response.data)
					this.todos.push(response.data)
				})
				this.newTodo = {id:null,title:'',completed:false} //达到清空的效果。同时记住不要漏写completed，会导致后续的newTodo出错
			},
			//此处忘记“,”分隔会导致很多意想不到的问题
		}
	}
</script>