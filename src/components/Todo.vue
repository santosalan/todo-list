<template>
  <div class="todo">
    <div class="progress">
      <div class="bar" :style="{width: percent}">
        <span class="value">{{ percent }}</span>
      </div>
    </div>

    <TodoAdd />

    <TodoList :items="items"/>
  </div>
</template>

<script>  import Bus from '@/bus';
import TodoAdd from '@/components/TodoAdd';
import TodoList from '@/components/TodoList';
import { applyTheme, getCurrentTheme, getDynamicBackground } from '@/themes';

  export default {
    components: {
      TodoAdd,
      TodoList
    },
    data() {
      return {
        items: [],
      }
    },
    computed: {
      percent() {
        const base = this.items.filter(i => { return !i.archived });
        const pcnt = Math.round((base.filter(i => { return i.done }).length * 100 / base.length));

        // Obter tema atual e aplicar background dinâmico baseado no progresso
        const currentTheme = getCurrentTheme();
        const dynamicBackground = getDynamicBackground(currentTheme, pcnt || 0);
        
        let el = document.querySelector('body');
        el.style.background = dynamicBackground;

        return  pcnt ? pcnt + '%' : '';
      },
      currentProgress() {
        const base = this.items.filter(i => { return !i.archived });
        return Math.round((base.filter(i => { return i.done }).length * 100 / base.length)) || 0;
      }
    },
    watch: {
      items: {
        deep: true,
        handler() {
          const tasks = JSON.stringify(this.items);
          localStorage.setItem("TodoListItems", tasks);
        }
      }
    },
    created() {
      Bus.onAttachItem(a => {
        const fn = i => { return i.action.toLowerCase() === a.trim().toLowerCase() };

        if (!this.items.filter(fn).length) {
          this.items.push({
                      action: a.trim(),
                      done: false,
                      archived: false,
                    });
        }
      });

      Bus.onDetachItem(i => {
        const filteredItems = this.items.filter((item) => {return item != i});
        this.items = filteredItems;
      });

      Bus.onDoneItem(i => {
        this.items.map(item => {
          if (item.action === i.action) {
            item.done = !item.done;
          }
        });
      });

      Bus.onArchiveItem(i => {
        this.items.map(item => {
          if (item.action === i.action) {
            item.archived = !item.archived;
          }
        });
      });

      Bus.onClearArchived(filter => {
        const filteredItems = this.items.filter(i => {
                                return filter === 'all'
                                              ? !i.archived
                                              : !i.archived || i.done === !(filter === 'done')
                              });

        this.items = filteredItems;
      });

      Bus.onUpdateItem((item, newAction) => {
        this.items.map(i => {
          if (i.action === item.action) {
            i.action = newAction;
          }
        });
      });

      Bus.onThemeChanged((themeName) => {
        // Quando o tema muda, aplicar o tema com o progresso atual
        applyTheme(themeName, this.currentProgress);
      });

      Bus.onRequestProgress(() => {
        // Retornar progresso atual quando solicitado
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme, this.currentProgress);
      });
    },
    mounted() {
      let tasks = JSON.parse(localStorage.getItem("TodoListItems"));

      this.items = tasks ? tasks : [];
    }
  }
</script>

<style scoped>
  .todo {
    width: 80%;
    max-width: 980px;
  }

  .progress {
    display: block;
    height: 50px;
    border: solid 1px var(--theme-progress-border);
    border-left-width: 5px;
    border-right-width: 5px;
    text-align: center;
    width: 100%;
    border-radius: 50px;
    background: var(--theme-progress-bg);
  }

  .progress .value {
    float: right;
    margin: 0 auto;
    padding: 5px 10px;
    font-size: 2em;
  }

  .progress .bar {
    display: block;
    width: 0%;
    height: 100%;
    background: var(--theme-progress-bar);
    border-radius: 50px;
  }
</style>
