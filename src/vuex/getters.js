/**
 * Created by chenchen on 2018/12/28.
 */

export default {
  changePeople: (state)=>{
    return state.people.filter(item=>{
      if(item.age>30){
        return true;
      }
    })
  }
}