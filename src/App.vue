<template>
	<div id="app">
		<h1>Tasks</h1>
		<ToDo></ToDo>
	</div>
</template>

<script>
import ToDo from '@/components/Todo';

export default {
	components: {
		ToDo
	}
}
</script>

<style>
	body {
		font-family: 'Lato', sans-serif;
		background: linear-gradient(to right, rgb(00, 50, 00) -100%, rgb(58, 0, 0));
		color: #FFF;
	}

	#app {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: top;
		align-items: center;
		height: 100vh;
	}

	#app h1 {
		margin-bottom: 5px;
		font-weight: 300;
		font-size: 3rem;
	}
</style>
