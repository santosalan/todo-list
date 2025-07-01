<template>
  <div id="app">
    <ThemeSelector />
    <h1>Tasks</h1>
    <ToDo></ToDo>
  </div>
</template>

<script>
import ThemeSelector from '@/components/ThemeSelector';
import ToDo from '@/components/Todo';

export default {
  components: {
    ToDo,
    ThemeSelector
  }
}
</script>

<style>
  :root {
    --theme-background: linear-gradient(to right, rgb(00, 50, 00) -100%, rgb(58, 0, 0));
    --theme-card-bg: #F003;
    --theme-card-border: #F004;
    --theme-card-border-left: #F006;
    --theme-card-color: #FFF;
    --theme-done-bg: #0FF3;
    --theme-done-border: #0FF4;
    --theme-done-border-left: #0FF6;
    --theme-editing-bg: #0CF4;
    --theme-editing-border: #0CFD;
    --theme-editing-border-left: #0CFD;
    --theme-btn-close-bg: inherit;
    --theme-btn-close-color: #FFF;
    --theme-btn-edit-bg: inherit;
    --theme-btn-edit-color: #FFF;
    --theme-btn-archive-bg: inherit;
    --theme-btn-archive-color: #FFF;
    --theme-btn-clear-bg: #F003;
    --theme-btn-clear-border: #F009;
    --theme-btn-clear-color: #FFF;
    --theme-progress-bg: #FFF2;
    --theme-progress-border: #FFFA;
    --theme-progress-bar: green;
  }

  body {
    font-family: 'Lato', sans-serif;
    background: var(--theme-background);
    color: #FFF;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .btn {
    border: solid 1px #0009;
    border-left: solid 5px #0009;
    border-radius: 15px;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
  }

  #app {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    height: 100vh;
  }

  #app h1 {
    margin-bottom: 5px;
    font-weight: 300;
    font-size: 3rem;
  }
</style>
