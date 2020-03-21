import Vue from 'vue';

export default new Vue({
    methods: {
        attachItem(action) {
            this.$emit('ATTACH_ITEM', action);
        },
        onAttachItem(fn) {
            this.$on('ATTACH_ITEM', fn);
        },
        detachItem(item) {
            this.$emit('DETACH_ITEM', item);
        },
        onDetachItem(fn) {
            this.$on('DETACH_ITEM', fn);
        }
    }
});
