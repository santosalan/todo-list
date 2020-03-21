<template>
  <span class="item" :class="{done: item.status}" @click="item.status = !item.status">
    <button class="close" @click.stop="deleteItem">x</button>
    <div class="action">{{ item.action }}</div>
  </span>
</template>

<script>
  import Bus from '@/bus';

  export default {
    props: {
      item: Object
    },
    methods: {
      deleteItem() {
        Bus.detachItem(this.item)
      }
    }
  }
</script>

<style scoped>
  .item {
    cursor: pointer;
    background: #F003;
    margin: 20px;
    color: #FFF;
    border: solid 1px #F004;
    border-left: solid 5px #F006;
    border-radius: 5px;
  }

  .item .close {
    cursor: pointer;
    background: inherit;
    font-size: 0.7;
    border: inherit;
    border-radius: 5px 5px 5px 50px;
    float: right;
    padding: 0px 10px;
    color: #FFF;
  }

  .action {
    margin: 15px 0 0 0;
    padding: 5px 20px 20px;
  }

  .done {
    background: #0FF3;
    border: solid 1px #0FF4;
    border-left: solid 5px #0FF6;
    text-decoration: line-through;
  }

  .item.done .close {
    text-decoration: none;
  }

</style>
