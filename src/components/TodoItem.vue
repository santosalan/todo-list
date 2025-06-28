<template>
  <div class="item" :class="{done: item.done, archived: item.archived, editing: isEditing}" @click="doneItem">
    <button class="close" v-if="!isEditing" @click.stop="deleteItem">x</button>

    <div class="action" v-if="!isEditing">{{ item.action }}</div>
    <textarea 
      v-if="isEditing" 
      class="edit-input" 
      v-model="editedAction" 
      @click.stop
      @keypress.enter.prevent="saveItem"
      @input="autoResize"
      ref="editTextarea"
      rows="1"
    ></textarea>

    <button class="edit" v-if="!item.archived && !item.done" @click.stop="isEditing ? saveItem() : editItem()">
      {{ isEditing ? 'save' : 'edit' }}
    </button>

    <button class="archive" @click.stop="isEditing ? cancelEdit() : archiveItem()">
      {{ (isEditing && !item.archived && !item.done) ? 'cancel' : (item.archived ? 'unarchive' : 'archive') }}
    </button>
  </div>
</template>

<script>
  import Bus from '@/bus';

  export default {
    props: {
      item: Object,
      fnDelete: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        isEditing: false,
        editedAction: ''
      }
    },
    methods: {
      doneItem() {
        !this.item.archived && !this.isEditing && Bus.doneItem(this.item);
      },
      archiveItem() {
        Bus.archiveItem(this.item)
      },
      deleteItem() {
        this.fnDelete(this.item);
      },
      editItem() {
        if (this.item.archived || this.item.done) return;
        this.isEditing = true;
        this.editedAction = this.item.action;
        this.$nextTick(() => {
          this.autoResize();
          this.$refs.editTextarea.focus();
        });
      },
      saveItem() {
        if (this.editedAction.trim()) {
          Bus.updateItem(this.item, this.editedAction.trim());
          this.isEditing = false;
        }
      },
      cancelEdit() {
        this.isEditing = false;
        this.editedAction = '';
      },
      autoResize() {
        const textarea = this.$refs.editTextarea;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }
    }
  }
</script>

<style>
  .item {
    display: inline-block;
    cursor: pointer;
    background: #F003;
    margin: 20px;
    color: #FFF;
    border: solid 1px #F004;
    border-left: solid 5px #F006;
    border-radius: 5px;
    user-select: none;
    max-width: 195px;
    vertical-align: top;
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

  .edit {
    cursor: pointer;
    background: inherit;
    font-size: 0.7rem;
    border: inherit;
    border-radius: 5px 50px 5px 5px;
    float: left;
    padding: 0px 10px;
    color: #FFF;
    border-right-width: 5px;
    border-left-width: 1px;
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

  .editing {
    background: #0CF4 !important;
    border: solid 1px #0CFD !important;
    border-left: solid 5px #0CFD !important;
  }

  .edit-input {
    margin: 15px 0 5px;
    padding: 5px 20px 5px;
    background: transparent;
    border: none;
    color: #FFF;
    font-size: inherit;
    width: calc(100% - 40px);
    outline: none;
  }

  .item.done .close {
    text-decoration: none;
  }
</style>
