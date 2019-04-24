<template>
  <div>
    <el-input clearable placeholder="请输入内容" v-model="search" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择查询类型">
        <el-option label="订单号" value="id"></el-option>
      </el-select>
      <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-table :data="orderData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.telNumber }}</span>
            </el-form-item>
            <el-form-item label="总金额">
              <span>{{ props.row.totalAmount }}</span>
            </el-form-item>
            <el-form-item label="用户id">
              <span>{{ props.row.userId }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="订单id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="预支付单号">
              <span>{{ props.row.prepayId }}</span>
            </el-form-item>
            <el-form-item label="支付订单号">
              <span>{{ props.row.payTransactionId }}</span>
            </el-form-item>
            <el-form-item label="省">
              <span>{{ props.row.provinceName }}</span>
            </el-form-item>
            <el-form-item label="市">
              <span>{{ props.row.cityName }}</span>
            </el-form-item>
            <el-form-item label="区/县">
              <span>{{ props.row.countyName }}</span>
            </el-form-item>
            <el-form-item label="详细地址">
              <span>{{ props.row.detailInfo }}</span>
            </el-form-item>
            <el-form-item label="邮编">
              <span>{{ props.row.postalCode }}</span>
            </el-form-item>
            <el-form-item label="商品金额">
              <span>{{ props.row.amount }}</span>
            </el-form-item>
            <el-form-item label="运费">
              <span>{{ props.row.carriage }}</span>
            </el-form-item>
            <el-form-item label="快递单号">
              <span>{{ props.row.expressNo }}</span>
            </el-form-item>

            <el-form-item label="创建时间">
              <span>{{ props.row.createdAt }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.updateAt }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <ul class="img-wrapper">
                <li class="single-img" v-for="(item,index) in props.row.goodsImages" :key="index">
                  <img class="img" :src="item" alt>
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="手机号" prop="telNumber"></el-table-column>
    </el-table>

    <el-table class="table" :data="goodsList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="120px" label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ props.row.goods.id }}</span>
            </el-form-item>
            <el-form-item label="介绍">
              <span>{{ props.row.goods.intro }}</span>
            </el-form-item>
            <el-form-item label="商品名">
              <span>{{ props.row.goods.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.goods.price }}</span>
            </el-form-item>
            <el-form-item label="status">
              <span>{{ props.row.goods.status }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.goods.createdAt }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.goods.updateAt }}</span>
            </el-form-item>
            <el-form-item label="merchant">
              <span>{{ props.row.goods.merchant }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img class="img" :src="props.row.goods.imageUrl" alt="商品图片">
            </el-form-item>
            <hr>
            <el-form-item label="类别ID">
              <span>{{ props.row.goods.category.id }}</span>
            </el-form-item>
            <el-form-item label="类别名称">
              <span>{{ props.row.goods.category.name }}</span>
            </el-form-item>
            <el-form-item label-width="120px" label="类别创建时间">
              <span>{{ props.row.goods.category.createdAt }}</span>
            </el-form-item>
            <el-form-item label-width="120px" label="类别更新时间">
              <span>{{ props.row.goods.category.updateAt }}</span>
            </el-form-item>
            <hr>
            <el-form-item label="推荐人ID">
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
            <el-form-item label-width="120px" label="推荐人创建时间">
              <span>{{ props.row.goods.referrer.createdAt }}</span>
            </el-form-item>
            <el-form-item label-width="120px" label="推荐人更新时间">
              <span>{{ props.row.goods.referrer.updateAt }}</span>
            </el-form-item>
            <el-form-item label="推荐人头像">
              <img class="avatar-img" :src="props.row.goods.referrer.avatar" alt="推荐人头像">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="goods.name"></el-table-column>
      <el-table-column label="单价" prop="goodsUP"></el-table-column>
      <el-table-column label="数量" prop="goodsCount"></el-table-column>
      <el-table-column label="金额" prop="sumCount"></el-table-column>
      <!-- <el-table-column label="图片" prop="goods.imageUrl"></el-table-column> -->
    </el-table>
    <div>总金额：{{totalAmount}}</div>
  </div>
</template>
<script>
import axios from "utils/axios";
const GET_ORDER_DETAIL = `/api/orders/admin`;

export default {
  data() {
    return {
      id: this.$route.query.id,
      orderData: [],
      order: {},
      goodsList: [],
      expireTime: undefined,
      search: "",
      select: "",
      totalAmount: 0
    };
  },

  methods: {
    init() {
      this.id && this.getOrderDetail(this.id);
    },

    //格式化时间戳
    formatTime(time) {
      time = new Date(time);
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
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

    //搜索
    handleSearch() {
      if (!this.select || !this.search) {
        return this.$message({
          message: "请先选择查询类型~",
          type: "warning"
        });
      }
      this.orderData = [];
      this.goodsList = [];
      this.totalAmount = 0;
      this.getOrderDetail(this.search);
    },

    getData(data) {
      Object.entries(data).forEach(subItem => {
        let temKey = subItem[0];
        if (temKey === "updateAt" || temKey === "createdAt") {
          data[temKey] = this.formatTime(subItem[1]);
        }
        if (subItem[1] instanceof Object) {
          this.getData(subItem[1]);
        }
      });
    },

    async getOrderDetail(id) {
      let {
        code,
        data: { expireTime, order, goodsList }
      } = await axios.get(`${GET_ORDER_DETAIL}/${id}`);
      order.status = this.numIntoText(order.status);
      this.orderData.push(order);
      goodsList.forEach(item => {
        item.goodsUP = item.goodsUP / 100;
        item.sumCount = item.goodsUP * item.goodsCount;
        this.getData(item);
        this.totalAmount += item.sumCount;
      });
      this.goodsList = goodsList;
    }
  },

  mounted() {},

  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.img-wrapper {
  display: flex;
  flex-direction: row;
  .single-img {
    list-style-type: none;
    .img {
      width: 100px;
      height: 100px;
    }
  }
}

.table {
  margin-top: 50px;
}
.avatar-img,
.img {
  width: 50px;
  height: 50px;
}
.el-input-group {
  width: 40%;
}
.el-input-group__prepend {
  width: 100px;
}
</style>