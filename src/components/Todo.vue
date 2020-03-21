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

<script>
  import Bus from '@/bus';
  import TodoAdd from '@/components/TodoAdd';
  import TodoList from '@/components/TodoList';

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
        const pcnt = Math.round((this.items.filter(i => {
                                    return i.status;
                                }).length * 100 / this.items.length));

        let el = document.querySelector('body');
        el.style.background = 'linear-gradient(to right, rgb(00, 50, 00)' + (-100 + pcnt*2) + '%, rgb(58, 0, 0))';

        return  pcnt ? pcnt + '%' : '';
      }
    },
    watch: {
      items() {
        this.updateLocalStorage();
      }
    },
    methods: {
      updateLocalStorage() {
        const tasks = JSON.stringify(this.items);
        localStorage.setItem("TodoListItems", tasks);
      }
    },
    created() {
      Bus.onAttachItem(a => {
        const fn = i => { return i.action.toLowerCase() === a.trim().toLowerCase() };

        if (!this.items.filter(fn).length) {
          this.items.push({action: a.trim(), status: false});
        }
      });

      Bus.onDetachItem(i => {
        const filteredItems = this.items.filter((item) => {return item != i});
        this.items = filteredItems;
      });

      Bus.onToggleItem(i => {
        this.items.map(item => {
          if (item.action === i.action) {
            item.status = !item.status;
          }
        });

        this.updateLocalStorage();
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
    border: solid 1px #FFF;
    text-align: center;
    width: 100%;
    border-radius: 50px;
    background: #FFF1;
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
    background: green;
    border-radius: 50px;
  }

</style>
