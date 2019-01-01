<template>
  <div class="add-goods">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from '../../utils/axios';
  import {mapState} from 'vuex';

  const GET_GOODS_LIST = `/api/goods`;

  export default {
    data() {
      return {
        goodsList: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        search: '',
        select: '',
        dialogFormVisible: false,
        totalCount: undefined
      }
    },

    computed: {
      ...mapState([
        'title'
      ])
    },

    methods:{
      handleSelect(){
        console.log(this.search);
      },

      //分页器
      currentChange(index){
        console.log('currentChange',index);
        this.getGoodsList({pageIndex:index,pageSize:10});
      },

      //搜索
      handleSearch(){
        let param = {};
        param[this.select] = this.search;
        this.getGoodsList(param);
      },

      //编辑
      handleEdit(index,row){
        console.log(index,row);
        this.dialogFormVisible = true;
      },

      //删除
      handleDelete(index,row){
        return this.$confirm(`确定要删除吗？`);
        console.log(index,row);
      },

      async getGoodsList(obj){
        if(obj){
          let param = ``;
          Object.entries(obj).forEach((item)=>{
            param+=`&${item[0]}=${item[1]}`;
          });
          param = param.slice(1);
          let {code,data} = await axios.get(`${GET_GOODS_LIST}?${param}`);
          if(code === 2000){
            this.goodsList = data.data;
            this.totalCount = data.totalCount;
          }
        }
      },

      onSubmit() {
        console.log('submit!');
      }
    },

    created(){
      this.getGoodsList({pageIndex:1,pageSize:10});
      console.log(this.title);
    }
  }
</script>

<style>
  .add-goods{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .el-input-group{
    width: 40%;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-pagination{
    text-align: center;
    margin-top: 30px;
  }
</style>
