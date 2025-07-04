<template>
  <div class="view-selector">
    <button 
      class="view-btn" 
      :class="{active: currentView === 'cards'}"
      @click="changeView('cards')"
      title="Visualização em Cards"
    >
      <span class="icon">⬛</span>
      Cards
    </button>
    <button 
      class="view-btn" 
      :class="{active: currentView === 'list'}"
      @click="changeView('list')"
      title="Visualização em Lista"
    >
      <span class="icon">☰</span>
      List
    </button>
  </div>
</template>

<script>
import Bus from '@/bus';

export default {
  name: 'ViewSelector',
  data() {
    return {
      currentView: 'cards'
    }
  },
  created() {
    // Carregar a visualização salva
    this.currentView = localStorage.getItem('viewMode') || 'cards';
    // Emitir o evento inicial
    Bus.changeView(this.currentView);
  },
  methods: {
    changeView(view) {
      this.currentView = view;
      localStorage.setItem('viewMode', view);
      Bus.changeView(view);
    }
  }
}
</script>

<style scoped>
.view-selector {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 5px;
  z-index: 1000;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: 1px solid var(--theme-card-border);
  background: var(--theme-card-bg);
  color: var(--theme-card-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.view-btn:hover {
  opacity: 0.8;
}

.view-btn.active {
  background: var(--theme-btn-edit-bg);
  color: var(--theme-btn-edit-color);
  border-color: var(--theme-card-border-left);
}

.icon {
  font-size: 1rem;
}
</style>
