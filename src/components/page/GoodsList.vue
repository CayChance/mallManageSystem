<template>
  <div class="add-goods">
    <el-input
      clearable
      placeholder="请输入内容"
      v-model="search"
      @select="handleSelect"
      class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择查询类型">
        <el-option label="商品名称" value="name"></el-option>
        <el-option label="商品类别" value="category"></el-option>
      </el-select>
      <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-table
      :data="goodsList"
      style="width: 100%"
      stripe
      border
      highlight-current-row
      height="500">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="110">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="80">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="商品介绍"
        width="120">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="imageUrl"
        label="商品图片"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="updateAt"
        label="更新时间"
        width="120">
      </el-table-column>

      <el-table-column
        prop="category.id"
        label="分类id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="分类名称"
        width="120">
      </el-table-column>

      <el-table-column
        prop="referrer.id"
        label="推荐人id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="referrer.name"
        label="推荐人姓名"
        width="120">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="referrer.avatar"
        label="推荐人头像"
        width="200">
      </el-table-column>
      <el-table-column
        prop="referrer.reason"
        label="推荐理由"
        width="120">
      </el-table-column>
      <el-table-column
        prop="referrer.title"
        label="推荐title"
        width="120">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="260">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini"
          @click="addCount(scope.$index, scope.row)">增加库存</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="追加商品库存" :visible.sync="dialogFormVisible">
      <el-form :model="goods">
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="goods.count" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-count="pageCount">
    </el-pagination>
  </div>
</template>

<script>
  import axios from '../../utils/axios';
  const GET_GOODS_LIST = `/api/goods/all`;
  const UN_RELEASE_GOODS = `/api/goods/status`;
  const ADD_GOODS_COUNT = `/api/goods-sku/total-count`;


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
        totalCount: undefined,
        singleItems: 10,
        deleteGoodsId: '',
        addGoodsId: '',
        dialogFormVisible: false,
        goods: {
          count: '',
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      pageCount(){
        return Math.ceil(this.totalCount/this.singleItems);
      }
    },
    methods:{
      init(){
        this.getGoodsList({pageIndex:1,pageSize:this.singleItems});
      },

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
        console.log(index,row.id);
        this.$router.replace(`/updategoods?id=${row.id}`)
      },

      //增加库存
      addCount(index,row){
        this.addGoodsId = row.id;
        this.dialogFormVisible = true
      },

      //确认增加库存
      async confirm(){
        let {code,data} = await axios.put(`${ADD_GOODS_COUNT}?count=${this.goods.count}&goodsId=${this.addGoodsId}`);
        if (code === 2000) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          });

          this.dialogFormVisible = false;
        }
        else{
          this.$message({
            showClose: true,
            message: message,
            type: 'warning'
          });
        }
      },

      //删除
      async handleDelete(index,row){
        this.deleteGoodsId = row.id;
        return this.$confirm(`确定要删除吗？`,{
          callback: this.callback
        });
      },

      //删除的回调  下架商品
      async callback(action){
        if(action==='confirm'){
          let {code,data} = await axios.patch(`${UN_RELEASE_GOODS}?id=${this.deleteGoodsId}`);
          if(code === 2000){
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            });
            this.init();
          }
        }
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
            console.log(data.data,'123');
            data.data.forEach(item=>{
              item.createdAt = this.formatTime(new Date(item.createdAt));
              item.updateAt = this.formatTime(new Date(item.updateAt));
            })
            console.log(data.data);
            this.goodsList = data.data;
            this.totalCount = data.totalCount;
          }
        }
        else{
          this.$message({
            message: '请先选择查询类型~',
            type: 'warning'
          })
        }
      },

      onSubmit() {
        console.log('submit!');
      },

      //格式化时间戳
      formatTime(time){
        return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
      },
    },

    created(){
      this.init();
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
    width: 160px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-pagination{
    text-align: center;
    margin-top: 30px;
  }
</style>
