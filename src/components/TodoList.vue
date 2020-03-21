<template>
  <div class="list">
    <TodoItem v-for="item in items" :key="item.action" :item="item"/>
  </div>
</template>

<script>
  import Bus from '@/bus';
  import TodoItem from '@/components/TodoItem';

  export default {
    components: {
      TodoItem
    },
    props: {
      items: Array
    }
  }
</script>

<style scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
