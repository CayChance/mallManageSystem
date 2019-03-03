<template>
  <div class="add-goods">
    <el-input
      clearable
      placeholder="请输入内容"
      v-model="search"
      @select="handleSelect"
      class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="订单号" value="id"></el-option>
      </el-select>
      <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-table
      :data="ordersList"
      style="width: 100%"
      stripe
      border
      highlight-current-row>
      <el-table-column
        fixed
        prop="id"
        label="订单号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="70">
      </el-table-column>
      <el-table-column
        prop="formatedCreatedTime"
        label="订单日期"
        width="90">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="订单日期时间戳"
        width="80">
      </el-table-column>
      <el-table-column
        prop="provinceName"
        label="省"
        width="60">
      </el-table-column>
      <el-table-column
        prop="cityName"
        label="市"
        width="60">
      </el-table-column>
      <el-table-column
        prop="countyName"
        label="区/县"
        width="60">
      </el-table-column>
      <el-table-column
        prop="detailInfo"
        label="详细地址"
        width="120">
      </el-table-column>
      <el-table-column
        prop="postalCode"
        label="邮编"
        width="80">
      </el-table-column>
      <el-table-column
        prop="telNumber"
        label="手机号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="userId"
        width="110">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="amount"
        width="80">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="totalAmount"
        width="80">
      </el-table-column>
      <el-table-column
        prop="carriage"
        label="carriage"
        width="80">
      </el-table-column>
      <el-table-column
        prop="expressNo"
        label="expressNo"
        width="80">
      </el-table-column>
      <el-table-column
        prop="payTransactionId"
        label="payTransactionId"
        width="110">
      </el-table-column>
      <el-table-column
        prop="prepayId"
        label="prepayId"
        width="150">
      </el-table-column>
      
      
      

      <el-table-column
        show-overflow-tooltip
        prop="goodsImages"
        label="商品图片"
        width="200">
      </el-table-column>
      <el-table-column
        prop="formatedUpdateTime"
        label="更新时间"
        width="90">
      </el-table-column>
      <el-table-column
        prop="updateAt"
        label="更新时间戳"
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

    <el-table
      v-if="goodsList.length"
      :data="goodsList"
      style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ props.row.goods.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.goods.name }}</span>
            </el-form-item>
            <el-form-item label="商品介绍">
              <span>{{ props.row.goods.intro }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.goods.price }}</span>
            </el-form-item>
            <el-form-item label="status">
              <span>{{ props.row.goods.status }}</span>
            </el-form-item>
            <el-form-item label="createdAt">
              <span>{{ props.row.goods.createdAt }}</span>
            </el-form-item>
            <el-form-item label="updateAt">
              <span>{{ props.row.goods.updateAt }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>{{ props.row.goods.imageUrl }}</span>
            </el-form-item>

            <div style="height:30px"></div>

            <el-form-item label="商品类别id">
              <span>{{ props.row.goods.category.id }}</span>
            </el-form-item>
            <el-form-item label="商品类别名称">
              <span>{{ props.row.goods.category.name }}</span>
            </el-form-item>
            <el-form-item label="createdAt">
              <span>{{ props.row.goods.category.createdAt }}</span>
            </el-form-item>
            <el-form-item label="updateAt">
              <span>{{ props.row.goods.category.updateAt }}</span>
            </el-form-item>

            <div style="height:30px"></div>

            <el-form-item label="推荐人id">
              <span>{{ props.row.goods.referrer.id }}</span>
            </el-form-item>
            <el-form-item label="推荐人姓名">
              <span>{{ props.row.goods.referrer.name }}</span>
            </el-form-item>
            <el-form-item label="推荐人理由">
              <span>{{ props.row.goods.referrer.reason }}</span>
            </el-form-item>
            <el-form-item label="推荐人title">
              <span>{{ props.row.goods.referrer.title }}</span>
            </el-form-item>
            <el-form-item label="推荐人头像">
              <span>{{ props.row.goods.referrer.avatar }}</span>
            </el-form-item>
            <el-form-item label="推荐人createdAt">
              <span>{{ props.row.goods.referrer.createdAt }}</span>
            </el-form-item>
            <el-form-item label="推荐人updateAt">
              <span>{{ props.row.goods.referrer.updateAt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="goodsCount"
        prop="goodsCount">
      </el-table-column>
      <el-table-column
        label="goodsUP"
        prop="goodsUP">
      </el-table-column>
      <el-table-column
        label="createdAt"
        prop="createdAt">
      </el-table-column>
      <el-table-column
        label="updateAt"
        prop="updateAt">
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
  const GET_ORDER_LIST = `/api/orders`;
  // const GET_ORDER_LIST = `/api/orders`;
  const UN_RELEASE_GOODS = `/api/goods/status`;
  const ADD_GOODS_COUNT = `/api/goods-sku/total-count`;


  export default {
    data() {
      return {
        ordersList: [],
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
        this.getOrderList({pageIndex:1,pageSize:this.singleItems});
      },

      handleSelect(){
        console.log(this.search);
      },

      //分页器
      currentChange(index){
        console.log('currentChange',index);
        this.getOrderList({pageIndex:index,pageSize:10});
      },

      //搜索
      handleSearch(){
        let param = {};
        param[this.select] = this.search;
        this.searchOneOrder(param);
      },

      //查询单个order
      async searchOneOrder(obj){
        if(obj.hasOwnProperty('id')){
          let {code,data:{expireTime,goodsList,order}} = await axios.get(`${GET_ORDER_LIST}/${obj.id}`);
          if(code === 2000){
            this.ordersList.length = 0;
            let formatedCreatedTime = new Date(order.createdAt);
            let formatedUpdateTime = new Date(order.updateAt);
            order['formatedCreatedTime'] = this.formatTime(formatedCreatedTime);
            order['formatedUpdateTime'] = this.formatTime(formatedUpdateTime);
            this.ordersList.push(order);
            this.goodsList = goodsList;
          }
        }
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

      //格式化时间戳
      formatTime(time){
        return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
      },

      //获取所有order
      async getOrderList(obj){
        if(obj){
          console.log(obj);
          let param = ``;
          Object.entries(obj).forEach((item)=>{
            param+=`&${item[0]}=${item[1]}`;
          });
          param = param.slice(1);
          let {code,data} = await axios.get(`${GET_ORDER_LIST}?${param}`);
          if(code === 2000){
            data.data.forEach((order)=>{
              let formatedCreatedTime = new Date(order.createdAt);
              let formatedUpdateTime = new Date(order.updateAt);
              order['formatedCreatedTime'] = this.formatTime(formatedCreatedTime);
              order['formatedUpdateTime'] = this.formatTime(formatedUpdateTime);
            })
            this.ordersList = data.data;
            this.totalCount = data.totalCount;
          }
        }
      },

      onSubmit() {
        console.log('submit!');
      }
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
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-pagination{
    text-align: center;
    margin-top: 30px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
