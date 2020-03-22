<template>
  <span class="item" :class="{done: item.done, archived: item.archived}" @click="doneItem">
    <button class="close" @click.stop="deleteItem">x</button>

    <div class="action">{{ item.action }}</div>

    <button class="archive" @click.stop="archiveItem">
      {{ item.archived ? 'unarchive' : 'archive' }}
    </button>
  </span>
</template>

<script>
  import Bus from '@/bus';

  export default {
    props: {
      item: Object
    },
    methods: {
      doneItem() {
        !this.item.archived && Bus.doneItem(this.item);
      },
      archiveItem() {
        Bus.archiveItem(this.item)
      },
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
    user-select: none;
  }

  .item .close {
    cursor: pointer;
    background: inherit;
    font-size: 0.7em;
    border: inherit;
    border-radius: 5px 5px 5px 50px;
    float: right;
    padding: 0px 10px;
    color: #FFF;
  }

  .item .archive {
    cursor: pointer;
    background: inherit;
    font-size: 0.7rem;
    border: inherit;
    border-radius: 50px 5px 5px 5px;
    float: right;
    padding: 0px 10px;
    color: #FFF;
  }

  .action {
    margin: 15px 0 5px;
    padding: 5px 20px 5px;
  }

  .done {
    background: #0FF3;
    border: solid 1px #0FF4;
    border-left: solid 5px #0FF6;
    text-decoration: line-through;
  }

  .archived {
    /*background: #9998;*/
    opacity: 0.5;
  }

  .archived:hover {
    opacity: 0.8;
  }

  .item.done .close {
    text-decoration: none;
  }

</style>
