<template>
  <div class="vuex">
    vuex数据
    <ul>
      <li>
        <p>count = {{count}}</p>
        <button @click='countAddOne'>count+1</button>
        <button @click='addOneAction'>addOneAction</button>
        <button @click="addOneAsync">addOneAsync</button>
      </li>
      <li>
        <p>{{todos}}</p>
        <input type="text" v-model="todo">
        <button @click='addTodo'>addTodo</button>
      </li>
      <li>
        <p>{{doneTodos}}</p>
      </li>
      <li>
        <p>{{doneTodosCount}}</p>
      </li>
      <li>
        <p>{{getTodoById}}</p>
      </li>
      <button @click='handelActionA'>actionA</button>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

export default {
  data(){
    return {
      todo:''
    }
  },
  computed: {
    //state
    ...mapState([
      'count',
      'todos'
    ]),
    //getter
    ...mapGetters([
      'doneTodos',
      'doneTodosCount'
    ]),
    getTodoById(){
      console.log(this.$store.getters.getTodoById);
      return this.$store.getters.getTodoById(2)
    },
    // doneTodos(){
    //   return this.$store.getters.doneTodos
    // },
    // doneTodosCount () {
    //   return this.$store.getters.doneTodosCount
    // }
  },

  methods:{
    addTodo(){
      this.$store.commit('SOME_MUTATION')
      if(!this.todo) return ;
      this.$store.commit('addTodos',this.todo);
      console.log(this.$store.state.todos);
    },
    // SOME_MUTATION(){
    //   this.$store.commit('SOME_MUTATION')
    // },
    countAddOne(){
      this.$store.commit('increment')
    },
    addOneAction(){
      this.$store.dispatch('increment');
    },
    addOneAsync(){
      this.$store.dispatch('incrementAsync');
    },
    handelActionA(){
      this.$store.dispatch('actionA').then((status)=>{
        console.log(status);
      })
    },
    myCountAddOne(){
      store.commit('increment')
    }
  },

  created(){
    // this.$store.commit('addTodos',{ id: 3, text: '...', done: true })
    // console.log(this.$store.state,'created');
    // this.$store.dispatch('increment');
    // console.log(this.$store.state.count,'async0')
    // this.$store.dispatch('incrementAsync');
    // console.log(this.$store.state.count,'async1')
  }
}
</script>

<style scoped>
.vuex{
  
}
ul{

}
li{
  display: flex; 
  margin: 10px auto;
}
button{
}
</style>


