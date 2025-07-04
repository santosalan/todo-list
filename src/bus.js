import Vue from 'vue';

export default new Vue({
  methods: {
    attachItem(action) {
      this.$emit('ATTACH_ITEM', action);
    },
    onAttachItem(fn) {
      this.$on('ATTACH_ITEM', fn);
    },

    doneItem(item) {
      this.$emit('DONE_ITEM', item);
    },
    onDoneItem(fn) {
      this.$on('DONE_ITEM', fn);
    },

    archiveItem(item) {
      this.$emit('ARCHIVE_ITEM', item);
    },
    onArchiveItem(fn) {
      this.$on('ARCHIVE_ITEM', fn);
    },

    clearArchived(filter) {
      this.$emit('CLEAR_ARCHIVED', filter);
    },
    onClearArchived(fn) {
      this.$on('CLEAR_ARCHIVED', fn);
    },

    detachItem(item) {
      this.$emit('DETACH_ITEM', item);
    },
    onDetachItem(fn) {
      this.$on('DETACH_ITEM', fn);
    },

    editItem(item) {
      this.$emit('EDIT_ITEM', item);
    },
    onEditItem(fn) {
      this.$on('EDIT_ITEM', fn);
    },

    updateItem(item, newAction) {
      this.$emit('UPDATE_ITEM', item, newAction);
    },
    onUpdateItem(fn) {
      this.$on('UPDATE_ITEM', fn);
    },

    themeChanged(themeName) {
      this.$emit('THEME_CHANGED', themeName);
    },
    onThemeChanged(fn) {
      this.$on('THEME_CHANGED', fn);
    },

    requestProgress() {
      this.$emit('REQUEST_PROGRESS');
    },
    onRequestProgress(fn) {
      this.$on('REQUEST_PROGRESS', fn);
    },

    changeView(viewMode) {
      this.$emit('CHANGE_VIEW', viewMode);
    },
    onChangeView(fn) {
      this.$on('CHANGE_VIEW', fn);
    }
  }
});
