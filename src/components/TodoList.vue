<template>
  <div class="list">
    <div class="area">
      <TodoItem v-for="item in tasks" :key="item.action" :item="item"/>
    </div>
    <div class="no-tasks" v-if="!tasks.length">
      No tasks to do.
    </div>
    <hr />
    <h3>Archive</h3>
    <div class="area">
      <TodoItem v-for="item in archiveds" :key="item.action" :item="item"/>
    </div>
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
    },
    computed: {
      tasks() {
        return this.items.filter(i => { return !i.archived });
      },
      archiveds() {
        return this.items.filter(i => { return i.archived });
      }
    }
  }
</script>

<style scoped>
  h3 {
    font-weight: 300;
  }

  .area {
    display: flex;
    flex-wrap: wrap;
  }

  .no-tasks {
    padding: 30px;
    font-size: 1.5em;
    font-weight: 300;
    text-align: center;
  }
</style>
