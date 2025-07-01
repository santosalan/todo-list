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
    background: var(--theme-card-bg);
    margin: 20px;
    color: var(--theme-card-color);
    border: solid 1px var(--theme-card-border);
    border-left: solid 5px var(--theme-card-border-left);
    border-radius: 5px;
    user-select: none;
    max-width: 195px;
    vertical-align: top;
  }

  .item .close {
    cursor: pointer;
    background: var(--theme-btn-close-bg);
    font-size: 0.7em;
    border: inherit;
    border-radius: 5px 5px 5px 50px;
    float: right;
    padding: 0px 10px;
    color: var(--theme-btn-close-color);
  }

  .item .archive {
    cursor: pointer;
    background: var(--theme-btn-archive-bg);
    font-size: 0.7rem;
    border: inherit;
    border-radius: 50px 5px 5px 5px;
    float: right;
    padding: 0px 10px;
    color: var(--theme-btn-archive-color);
  }

  .edit {
    cursor: pointer;
    background: var(--theme-btn-edit-bg);
    font-size: 0.7rem;
    border: inherit;
    border-radius: 5px 50px 5px 5px;
    float: left;
    padding: 0px 10px;
    color: var(--theme-btn-edit-color);
    border-right-width: 5px;
    border-left-width: 1px;
    border-left-color: var(--theme-card-border);
    border-right-color: var(--theme-card-border-left);
  }

  .action {
    margin: 15px 0 5px;
    padding: 5px 20px 5px;
  }

  .done {
    background: var(--theme-done-bg);
    border: solid 1px var(--theme-done-border);
    border-left: solid 5px var(--theme-done-border-left);
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
    background: var(--theme-editing-bg) !important;
    border: solid 1px var(--theme-editing-border) !important;
    border-left: solid 5px var(--theme-editing-border-left) !important;
  }

  .editing .edit {
    background: var(--theme-btn-edit-bg);
    color: var(--theme-btn-edit-color);
    border-right-width: 5px;
    border-left-width: 1px;
    border-left-color: var(--theme-editing-border);
    border-right-color: var(--theme-editing-border-left);
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
