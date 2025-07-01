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
    created() {
      // Escutar mudanças de tema para atualizar os estilos
      Bus.onThemeChanged(() => {
        this.$forceUpdate();
      });
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
    border: solid 1px var(--theme-card-border);
    border-left-width: 5px;
    border-radius: 5px 0 0 5px;
    background: var(--theme-card-bg);
    color: var(--theme-card-color);
    font-size: 1.3em;
    padding: 5px;
  }

  .addItem input[type=text]:focus {
    outline: none;
    border-color: var(--theme-card-border-left);
  }

  button {
    width: 10%;
    background: var(--theme-btn-edit-bg);
    border: solid 1px var(--theme-card-border);
    border-right-width: 5px;
    border-radius: 0 5px 5px 0;
    font-size: 2em;
    color: var(--theme-btn-edit-color);
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }
</style>
