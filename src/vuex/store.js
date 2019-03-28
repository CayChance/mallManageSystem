import Vue from 'vue';
import Vuex from 'vuex';

//注册 Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
  //数据
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'this is 1', done: true },
      { id: 2, text: 'this is 2', done: false }
    ]
  },

  //getters
  getters: {
    //返回todos中done为true的数据
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    },
    //返回doneTodos的length
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    //返回一个函数，函数的入参是一个id，执行该函数返回相应id的数据
    getTodoById: (state)=>(id)=>state.todos.find(todo => todo.id === id)
  },

  //操作修改state
  mutations: {
    //count+1
    increment (state) {
      state.count++
    },
    //为todos里面push一条数据
    addTodos(state,todo){
      state.todos.push(todo);
    },
    //为todos里面push一条数据
    ['SOME_MUTATION'] (state) {
      // mutate state
      state.todos.push({ id: 3, text: 'this is 3', done: true })
    }
  },

  //异步操作
  actions: {
    //异步操作还是去执行increment
    increment (context) {
      context.commit('increment')
    },
    //异步执行increment
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    //异步中使用promise
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('SOME_MUTATION')
          resolve('success')
        }, 1000)
      })
    }
  }
})

export default store;
