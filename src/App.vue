<template>
  <div id="app">
    <component :is="pageType"></component>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
export default {
  name: 'App',
  computed:{
    pageType:function(){
      if(this.$route.path.indexOf('oasis')==-1){
         return 'Nav';
      }else{
         return 'router-view';
      }
    }
  },
  components:{
    Nav
  } 
}
</script>

<style>
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  } */
</style>
