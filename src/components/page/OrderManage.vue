<template>
  <div class="add-goods">
    <el-input
      clearable
      placeholder="请输入内容"
      v-model="search"
      @select="handleSelect"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择查询类型">
        <el-option label="订单号" value="id"></el-option>
        <el-option label="手机号" value="telNumber"></el-option>
        <el-option label="订单状态" value="status"></el-option>
      </el-select>
      <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-table :data="ordersList" stripe border highlight-current-row>
      <el-table-column fixed prop="id" label="订单号" width="110"></el-table-column>
      <el-table-column prop="statusText" label="订单状态" width="120"></el-table-column>
      <!-- <el-table-column
        prop="status"
        label="订单状态"
        width="120">
      </el-table-column>-->
      <el-table-column prop="formatedCreatedTime" label="订单日期" width="90"></el-table-column>
      <!-- <el-table-column
        prop="createdAt"
        label="订单日期时间戳"
        width="80">
      </el-table-column>-->
      <el-table-column prop="provinceName" label="省" width="60"></el-table-column>
      <el-table-column prop="cityName" label="市" width="60"></el-table-column>
      <el-table-column prop="countyName" label="区/县" width="60"></el-table-column>
      <el-table-column prop="detailInfo" label="详细地址" width="120"></el-table-column>
      <el-table-column prop="postalCode" label="邮编" width="80"></el-table-column>
      <el-table-column prop="telNumber" label="手机号" width="100"></el-table-column>
      <el-table-column prop="userId" label="用户Id" width="110"></el-table-column>
      <el-table-column prop="amount" label="商品金额" width="80"></el-table-column>
      <el-table-column prop="carriage" label="运费" width="80"></el-table-column>
      <el-table-column prop="totalAmount" label="总金额" width="80"></el-table-column>
      <el-table-column prop="expressNo" label="快递单号" width="100"></el-table-column>
      <el-table-column prop="payTransactionId" label="支付订单号" width="130"></el-table-column>
      <el-table-column prop="prepayId" label="预支付下单号" width="150"></el-table-column>

      <el-table-column show-overflow-tooltip prop="goodsImages" label="商品图片" width="200"></el-table-column>
      <el-table-column prop="formatedUpdateTime" label="更新时间" width="90"></el-table-column>
      <!-- <el-table-column
        prop="updateAt"
        label="更新时间戳"
        width="120">
      </el-table-column>-->

      <el-table-column fixed="right" label="操作" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="no-border"
            :disabled="scope.row.status !== 1"
            @click="addExpressNo(scope.$index, scope.row)"
          >发货</el-button>
          <el-button
            size="mini"
            class="no-border"
            :disabled="scope.row.status !== 3"
            @click="refundFirst(scope.$index, scope.row)"
          >申请退款</el-button>
          <el-button
            size="mini"
            class="no-border"
            :disabled="scope.row.status !== 5"
            @click="refundApproval(scope.$index, scope.row)"
          >退款审批</el-button>
          <el-button
            size="mini"
            class="no-border"
            :disabled="scope.row.status !== 6"
            @click="refunding(scope.$index, scope.row)"
          >填写退货快递单号</el-button>
          <el-button
            size="mini"
            class="no-border"
            :disabled="scope.row.status !== 7"
            @click="refund(scope.$index, scope.row)"
          >退款</el-button>
          <el-button
            size="mini"
            class="no-border"
            @click="orderDetail(scope.$index, scope.row)"
          >订单详情</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="goodsList.length" :data="goodsList" style="width: 100%;">
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
            <el-form-item label="订单状态">
              <span>{{ props.row.goods.status }}</span>
            </el-form-item>
            <el-form-item label="创建">
              <span>{{ props.row.goods.createdAt }}</span>
            </el-form-item>
            <el-form-item label="更新">
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
            <el-form-item label="商品类别名称创建">
              <span>{{ props.row.goods.category.createdAt }}</span>
            </el-form-item>
            <el-form-item label="商品类别名称更新">
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
            <el-form-item label="推荐人创建">
              <span>{{ props.row.goods.referrer.createdAt }}</span>
            </el-form-item>
            <el-form-item label="推荐人更新">
              <span>{{ props.row.goods.referrer.updateAt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="goodsCount" prop="goodsCount"></el-table-column>
      <el-table-column label="goodsUP" prop="goodsUP"></el-table-column>
      <el-table-column label="createdAt" prop="createdAt"></el-table-column>
      <el-table-column label="updateAt" prop="updateAt"></el-table-column>
    </el-table>

    <el-dialog title="添加快递单号" :visible.sync="dialogFormVisible">
      <el-input v-model="expressNo" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="请输入退货快递单号" :visible.sync="refundingFormVisible">
      <el-input v-model="refundingExpressNo" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="refundingConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="请输入退款理由" :visible.sync="reasonFormVisible">
      <el-input v-model="reason" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reasonFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="refundFirstConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-count="pageCount"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "../../utils/axios";
const GET_ORDER_LIST = `/api/orders/all`;
const DELETE_ORDER = `/api/orders`;
const REFUND_APPROVAL = `/api/orders/refund-approve`;
const ADD_EXPRESS_NO = `/api/orders/shipped`;
const REDUND = `/api/wx-pay/refund`;
const REFUNDING = `/api/orders/refunding`;
const REFUND_FIRST = `/api/orders/refund`;

export default {
  data() {
    return {
      ordersList: [],
      goodsList: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      search: "",
      select: "",
      totalCount: undefined,
      singleItems: 10,
      isOrdersAllApi: false,
      deleteOrderId: "",
      addGoodsId: "",
      dialogFormVisible: false,
      reasonFormVisible: false,
      refundingFormVisible: false,
      goods: {
        count: ""
      },
      formLabelWidth: "120px",
      expressNo: "",
      refundingExpressNo: "",
      reason: ""
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.singleItems);
    },

    computedStatus(status) {
      console.log(status);
    }
  },
  methods: {
    //初始请求所有列表
    init() {
      this.getOrderList({ pageIndex: 1, pageSize: this.singleItems });
    },

    handleSelect() {
      console.log(this.search);
    },

    //分页器
    currentChange(index) {
      console.log("currentChange", index);
      if (this.isOrdersAllApi) {
        this.searchByStatusOrTel(this.select, this.search, index, 10);
      } else {
        this.getOrderList({ pageIndex: index, pageSize: 10 });
      }
    },

    //根据status、tel或者订单号查询
    async searchByStatusOrTel(type, content, pageIndex, pageSize) {
      let param = "";
      if (pageIndex && pageSize) {
        param = `${GET_ORDER_LIST}?${type}=${content}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
      } else {
        param = `${GET_ORDER_LIST}?${type}=${content}`;
      }
      let { code, data, message } = await axios.get(param);
      if (code === 2000) {
        if (data.totalCount > 10) this.isOrdersAllApi = true;
        this.dataProcess(data);
      }
    },

    //搜索
    handleSearch() {
      if (!this.select || !this.search)
        return this.$message({
          message: "请先选择查询类型~",
          type: "warning"
        });
      let param = {};
      param[this.select] = this.search;
      this.searchByStatusOrTel(this.select, this.search);
      // if(this.select === 'telNumber' || this.select === 'status'){
      // }
      // else{
      //   this.searchOneOrder(param);
      // }
    },

    //查询单个order
    async searchOneOrder(obj) {
      if (obj.hasOwnProperty("id")) {
        let {
          code,
          data: { expireTime, goodsList, order }
        } = await axios.get(`${GET_ORDER_LIST}?id=${obj.id}`);
        if (code === 2000) {
          console.log(order);
          // this.ordersList.length = 0;
          // let formatedCreatedTime = new Date(order.createdAt);
          // let formatedUpdateTime = new Date(order.updateAt);
          // order['formatedCreatedTime'] = this.formatTime(formatedCreatedTime);
          // order['formatedUpdateTime'] = this.formatTime(formatedUpdateTime);
          // this.ordersList.push(order);
          // this.goodsList = goodsList;
        }
      } else {
        this.$message({
          message: "请先选择查询类型~",
          type: "warning"
        });
      }
    },

    //退款操作
    async refund(index, row) {
      let { code, data, message } = await axios.post(
        `${REDUND}?orderId=${row.id}`
      );
      if (code === 2000) {
        this.$message({
          showClose: true,
          message: "操作成功！",
          type: "success"
        });
        this.init();
      } else {
        this.$message({
          showClose: true,
          message: message,
          type: "warning"
        });
      }
    },

    //填写退款快递单号
    refunding(index, row) {
      this.addGoodsId = row.id;
      this.refundingFormVisible = true;
    },

    //填写退款快递单号 确认按钮
    async refundingConfirm() {
      if (!this.refundingExpressNo) return;
      let { code, data, message } = await axios.post(
        `${REFUNDING}/${this.addGoodsId}?expressNo=${this.refundingExpressNo}`
      );
      if (code === 2000) this.init();
      this.refundingFormVisible = false;
    },

    //申请退款
    async refundFirst(index, row) {
      console.log(row);
      this.addGoodsId = row.id;
      this.reasonFormVisible = true;
    },

    //申请退款 确认按钮
    async refundFirstConfirm() {
      if (!this.reason) return;
      let { code, data } = await axios.post(
        `${REFUND_FIRST}/${this.addGoodsId}?reason=${this.reason}`
      );
      if (code === 2000) this.init();
      this.reasonFormVisible = false;
    },

    //退款审批操作
    async refundApproval(index, row) {
      let { code, data, message } = await axios.patch(
        `${REFUND_APPROVAL}/${row.id}`
      );
      if (code === 2000) {
        this.$message({
          showClose: true,
          message: "操作成功！",
          type: "success"
        });
        this.init();
      } else {
        this.$message({
          showClose: true,
          message: message,
          type: "warning"
        });
      }
    },

    //添加订单的快递单号
    addExpressNo(index, row) {
      this.addGoodsId = row.id;
      this.dialogFormVisible = true;
    },

    //确认增加快递单号
    async confirm() {
      if (!this.expressNo) return;
      let { code, data, message } = await axios.patch(
        `${ADD_EXPRESS_NO}/${this.addGoodsId}?expressNo=${this.expressNo}`
      );
      if (code === 2000) {
        this.$message({
          showClose: true,
          message: "操作成功！",
          type: "success"
        });

        this.dialogFormVisible = false;
        this.init();
      } else {
        this.$message({
          showClose: true,
          message: message,
          type: "warning"
        });
      }
    },

    //删除
    async handleDelete(index, row) {
      this.deleteOrderId = row.id;
      return this.$confirm(`确定要删除吗？`, {
        callback: this.callback
      });
    },

    //删除的回调  下架商品
    async callback(action) {
      if (action === "confirm") {
        let { code, data } = await axios.delete(
          `${DELETE_ORDER}?id=${this.deleteOrderId}`
        );
        if (code === 2000) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success"
          });
          this.init();
        }
      }
    },

    //格式化时间戳
    formatTime(time) {
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    },

    //获取所有order
    async getOrderList(obj) {
      if (obj) {
        let param = ``;
        Object.entries(obj).forEach(item => {
          param += `&${item[0]}=${item[1]}`;
        });
        param = param.slice(1);
        let { code, data } = await axios.get(`${GET_ORDER_LIST}?${param}`);
        if (code === 2000) {
          this.dataProcess(data);
        }
      }
    },

    //请求到的数据进行处理
    dataProcess(data) {
      data.data.forEach(order => {
        let formatedCreatedTime = new Date(order.createdAt);
        let formatedUpdateTime = new Date(order.updateAt);
        order["formatedCreatedTime"] = this.formatTime(formatedCreatedTime);
        order["formatedUpdateTime"] = this.formatTime(formatedUpdateTime);
        order["statusText"] = this.numIntoText(order.status);
      });
      this.ordersList = data.data;
      this.totalCount = data.totalCount;
    },

    numIntoText(num) {
      let map = {
        0: "创建订单",
        1: "已付款",
        2: "已发货",
        3: "已签收",
        4: "已取消",
        5: "申请退货中",
        6: "退货申请已审批",
        7: "退货中",
        8: "已退货",
        9: "申请换货中",
        10: "换货申请已审批",
        11: "换货中",
        12: "已换货",
        13: "支付超时自动取消"
      };
      return map[num];
    },

    onSubmit() {
      console.log("submit!");
    },

    orderDetail(index, row) {
      this.$router.replace(`/orderdetail?id=${row.id}`);
    }
  },

  created() {
    this.init();
  }
};
</script>

<style>
.add-goods {
  width: 100%;
  height: 100%;
  position: relative;
}
.el-input-group {
  width: 40%;
}
.el-select .el-input {
  width: 160px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-pagination {
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
.no-border {
  border: none;
  padding: 0;
  margin-left: 5px;
}
</style>
