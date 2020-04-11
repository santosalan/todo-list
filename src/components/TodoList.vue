<template>
  <div class="list">
    <div class="area">
      <transition-group name="fade-rotate" mode="out-in">
        <TodoItem v-for="item in tasks" :key="item.action" :item="item"/>
        <div class="no-tasks" key="notasks" v-if="!tasks.length">
          No tasks to do.
        </div>
      </transition-group>
    </div>

    <hr />
    <h3>
      Archive
      <button class="btn clear" @click="clear">Clear archive</button>
    </h3>
    <div class="area">
      <transition-group name="fade-rotate" mode="out-in">
        <TodoItem v-for="item in archiveds" :key="item.action" :item="item"/>
      </transition-group>
    </div>

    <Modal title="Clear Archive" :fnClose="closeModalClear" v-if="modalClearShow">
      <div slot="body">
        Select below which tasks will be destroyed...
      </div>
      <div slot="actions">
        <button class="btn" @click="clearArchived('all')">All</button>
        <button class="btn" @click="clearArchived('done')">Done</button>
        <button class="btn" @click="clearArchived('undone')">Undone</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Bus from '@/bus';
  import TodoItem from '@/components/TodoItem';
  import Modal from '@/components/Modal';

  export default {
    components: {
      TodoItem,
      Modal,
    },
    props: {
      items: Array
    },
    data() {
      return {
        modalClearShow: false,
      }
    },
    computed: {
      tasks() {
        return this.items.filter(i => { return !i.archived });
      },
      archiveds() {
        return this.items.filter(i => { return i.archived });
      }
    },
    methods: {
      clear() {
        this.modalClearShow = true;
      },
      clearArchived(filter) {
        Bus.clearArchived(filter);

        this.closeModalClear();
      },

      closeModalClear() {
        this.modalClearShow = false;
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

  .clear {
    float: right;
    border-color: #F009;
    background: #F003;
    padding: 5px;
    color: #FFF;
    cursor: pointer;
  }

  .clear:hover {
    background: #F006;
  }

  @keyframes rotate-in {
    from { transform: rotateY(90deg); }
    to { transform: rotateY(0deg); }
  }

  @keyframes rotate-out {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(90deg); }
  }

  .fade-rotate-enter, .fade-rotate-leave-to {
    opacity: 0;
  }

  .fade-rotate-enter-active {
    animation: rotate-in .5s ease;
    transition: opacity .5s;
  }

  .fade-rotate-leave-active {
    position: absolute;
    animation: rotate-out .5s ease;
    transition: opacity .5s;
  }

  .fade-rotate-move {
    transition: transform .7s;
  }
</style>
