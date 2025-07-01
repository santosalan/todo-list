<template>
  <div class="theme-selector">
    <label for="theme-select">Theme:</label>
    <select id="theme-select" v-model="selectedTheme" @change="changeTheme" class="theme-select">
      <option v-for="(theme, key) in themes" :key="key" :value="key">
        {{ theme.name }}
      </option>
    </select>
  </div>
</template>

<script>
import Bus from '@/bus';
import { getCurrentTheme, themes } from '@/themes';

export default {
  name: 'ThemeSelector',
  data() {
    return {
      themes,
      selectedTheme: getCurrentTheme()
    }
  },
  mounted() {
    // Solicitar progresso atual para aplicar tema com background correto
    Bus.requestProgress();
  },
  methods: {
    changeTheme() {
      // Notificar mudança de tema para que o componente Todo aplique com progresso atual
      Bus.themeChanged(this.selectedTheme);
    }
  }
}
</script>

<style scoped>
.theme-selector {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-selector label {
  color: #FFF;
  font-size: 0.9rem;
  font-weight: 500;
}

.theme-select {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #FFF;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.theme-select:hover {
  background: rgba(255, 255, 255, 0.2);
}

.theme-select:focus {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.theme-select option {
  background: #333;
  color: #FFF;
}
</style>
