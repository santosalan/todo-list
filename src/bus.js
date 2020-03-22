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
    }

  }
});
