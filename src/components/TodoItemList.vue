<template>
  <div class="item-list" :class="{done: item.done, archived: item.archived, editing: isEditing}">
    <div class="item-content">
      <div class="checkbox-container">
        <input 
          type="checkbox" 
          :checked="item.done" 
          @change="doneItem"
          :disabled="item.archived || isEditing"
          class="task-checkbox"
        >
      </div>
      
      <div class="task-content" @click="!item.archived && !isEditing && doneItem()">
        <div class="action" v-if="!isEditing">{{ item.action }}</div>
        <textarea 
          v-if="isEditing" 
          class="edit-input" 
          v-model="editedAction" 
          @click.stop
          @keypress.enter.prevent="saveItem"
          @keyup.esc="cancelEdit"
          @input="autoResize"
          ref="editTextarea"
          rows="1"
        ></textarea>
      </div>

      <div class="actions-container">
        <button class="action-btn edit-btn" v-if="!item.archived && !item.done" @click.stop="isEditing ? saveItem() : editItem()">
          {{ isEditing ? 'save' : 'edit' }}
        </button>

        <button class="action-btn archive-btn" @click.stop="isEditing ? cancelEdit() : archiveItem()">
          {{ (isEditing && !item.archived && !item.done) ? 'cancel' : (item.archived ? 'unarchive' : 'archive') }}
        </button>

        <button class="action-btn close-btn" v-if="!isEditing" @click.stop="deleteItem">
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/bus';

export default {
  name: 'TodoItemList',
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

<style scoped>
.item-list {
  display: flex;
  width: 100%;
  margin: 8px 0;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-card-border);
  border-left: 4px solid var(--theme-card-border-left);
  border-radius: 5px;
  color: var(--theme-card-color);
  transition: all 0.3s ease;
}

.item-list:hover {
  background: var(--theme-card-bg);
  opacity: 0.9;
}

.item-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  gap: 12px;
}

.checkbox-container {
  flex-shrink: 0;
}

.task-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--theme-card-border-left);
}

.task-content {
  flex: 1;
  cursor: pointer;
  min-height: 20px;
  display: flex;
  align-items: center;
}

.action {
  font-size: 1rem;
  line-height: 1.4;
  word-break: break-word;
}

.edit-input {
  width: 100%;
  background: transparent;
  border: 1px solid var(--theme-card-border);
  border-radius: 3px;
  color: var(--theme-card-color);
  font-size: 1rem;
  padding: 5px 8px;
  outline: none;
  resize: vertical;
  min-height: 20px;
}

.edit-input:focus {
  border-color: var(--theme-card-border-left);
}

.actions-container {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.action-btn {
  padding: 6px 12px;
  border: 1px solid var(--theme-card-border);
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.edit-btn {
  background: var(--theme-btn-edit-bg);
  color: var(--theme-btn-edit-color);
}

.archive-btn {
  background: var(--theme-btn-archive-bg);
  color: var(--theme-btn-archive-color);
}

.close-btn {
  background: var(--theme-btn-close-bg);
  color: var(--theme-btn-close-color);
}

.action-btn:hover {
  opacity: 0.8;
}

.done {
  background: var(--theme-done-bg);
  border-color: var(--theme-done-border);
  border-left-color: var(--theme-done-border-left);
}

.done .action {
  text-decoration: line-through;
}

.done .task-checkbox {
  accent-color: var(--theme-done-border-left);
}

.archived {
  opacity: 0.5;
}

.archived:hover {
  opacity: 0.8;
}

.editing {
  background: var(--theme-editing-bg) !important;
  border-color: var(--theme-editing-border) !important;
  border-left-color: var(--theme-editing-border-left) !important;
}
</style>
