<template>
  <div class="addItem">
    <input type="text" placeholder="add new task" v-model="action" @keypress.enter="addItem">
    <button @click="addItem">+</button>
  </div>
</template>

<script>
  import Bus from '@/bus';

  export default {
    data() {
      return {
        action: null
      }
    },
    methods: {
      addItem() {
        if (this.action) {
          Bus.attachItem(this.action);
          this.action = null;
        }
      }
    }
  }
</script>

<style scoped>
  .addItem {
    width: 95%;
    display: flex;
    margin: 20px;
  }

  .addItem input[type=text] {
    width: 100%;
    border: solid 1px #FF36;
    border-left-width: 5px;
    border-radius: 5px 0 0 5px;
    background: #FF33;
    color: #FFF;
    font-size: 1.3em;
    padding: 5px;
  }

  .addItem button {
    width: 10%;
    background: #FF36;
    border: solid 1px #FF36;
    border-right-width: 5px;
    border-radius: 0 5px 5px 0;
    font-size: 2em;
    color: #FFF;
  }
</style>
