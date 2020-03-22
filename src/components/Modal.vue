<template>
  <div class="mirror">
    <div class="modal">
      <button class="btn close" @click="close">x</button>
      <div class="header">
        <h2>{{ title }}</h2>
      </div>

      <div class="body">
        <slot name="body"></slot>
      </div>

      <div class="footer">
        <slot name="footer">

        </slot>

        <div class="actions">
          <slot name="actions">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      fnClose: {
        type: Function,
        required: true,
      },
      title: {
        type: String,
        required: true,
      }
    },
    methods: {
      close() {
        this.fnClose();
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin: 0;
    font-weight: 300;
  }

  .mirror {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #0008;
  }

  .modal {
    position: relative;
    padding: 20px;
    font-weight: 300;
    border: solid 1px #FFF;
    border-radius: 20px;
    min-width: 300px;
    max-width: 90%;
    background: #07F6;
  }

  .btn {
    background: #07F9;
    border-color: #FFF;
    color: #FFF;
    padding: 5px 10px;
  }

  .close {
    position: absolute;
    top: 0px;
    right: -10px;
    border-radius: 0px 20px;
  }

  .body {
    margin: 10px 0;
    padding: 20px;
    border-top: solid 1px #FFF;
    border-bottom: solid 1px #FFF;
  }

  .footer {

  }

  .actions {
    display: flex;
    justify-content: space-between;
  }
</style>
