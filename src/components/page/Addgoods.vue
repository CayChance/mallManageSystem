<template>
  <div class="add-goods">
    <el-form ref="form" :rules="goodsRules" :model="goods" label-width="80px" size="small">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goods.name"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input v-model="goods.price"></el-input>
      </el-form-item>

      <el-form-item label="商品介绍" prop="intro">
        <el-input v-model="goods.intro"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="goods.imageUrl" :src="goods.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品分类" prop="categoryId">
        <el-select clearable v-model="goods.categoryId" placeholder="请选择商品分类id" prop="categoryId">
          <el-option v-for="(item,index) in categoriesList" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="推荐人id" prop="referrerId">
        <el-select clearable v-model="goods.referrerId" placeholder="推荐人id" prop="referrerId">
          <el-option v-for="(item,index) in referrerIdList" :label="item.name" :value="item.id" :key=index></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="createGoods">创建商品基本信息</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-form ref="form" :rules="goodsSKURules" :model="goodsSKU" label-width="80px" size="small">
        <el-form-item label="总数量" prop="totalCount">
          <el-input v-model="goodsSKU.totalCount"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createGoodsSKU">增加总数量</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

      <div class="height">
      </div>

      <el-form ref="form" :rules="goodsExtRules" :model="goodsExt" label-width="80px" size="small">
        <el-form-item label="banner图片" prop="bannerUrls">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="goodsExt.bannerUrls"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="image图片" prop="imageUrls">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="goodsExt.imageUrls"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createGoodsExt">立即创建</el-button>
          <el-button type="primary" @click="release">发布商品</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
const qiniu = require('qiniu-js')

const POST_GOODS_LIST = `/api/goods`;
const GET_CATEGORIES_LIST = `/api/categories`;
const GET_REFERERS_LIST = `/api/referrers`
const RELEASE_GOODS = `/api/goods/status`;
const POST_GOODS_SKU = `/api/goods-sku`;
const POST_GOODS_EXT = `/api/goods-ext`;

export default {
  data() {
    return {
      goodsList: [],
      categoriesList: [],
      referrerIdList: [],
      goods: {
        name: "",
        price: "",
        intro: "",
        imageUrl: "",
        categoryId: "",
        referrerId: ""
      },
      goodsSKU: {
        totalCount: "",
      },
      goodsExt: {
        bannerUrls: [],
        imageUrls: []
      },
      
      goodsRules: {
        name: [{ required: true, message: "请输入商品名", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        intro: [{ required: true, message: "请输入商品介绍", trigger: "blur" }],
        imageUrl: [{ required: true, message: "请上传图片", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择商品分类id", trigger: "change" }
        ],
        referrerId: [
          { required: true, message: "请选择推荐人id", trigger: "change" }
        ]
      },
      goodsSKURules: {
        totalCount: [{ required: true, message: "请输入总数量", trigger: "blur" }],
      },
      goodsExtRules: {
        bannerUrls: [{ required: true, message: "请输入商品名", trigger: "blur" }],
        imageUrls: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
      },
      search: "",
      select: "",
      dialogFormVisible: false,
      totalCount: undefined,
      goodsId: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.goods.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    init(){
      this.getCategoriesList();
      this.getReferrersList();
    },

    //获取分类列表
    async getCategoriesList() {
      let { code, data } = await axios.get(GET_CATEGORIES_LIST);
      if (code === 2000) {
        this.categoriesList = data;
      }
    },

    //获取推荐人列表
    async getReferrersList() {
      let { code, data } = await axios.get(GET_REFERERS_LIST);
      if (code === 2000) {
        this.referrerIdList = data;
        console.log('adas',data);
        console.log(this.referrerIdList);
      }
    },

    //创建商品基本信息
    async createGoods() {
      let { code, data, message } = await axios.post(POST_GOODS_LIST, this.goods);
      if (code === 2000) {
        this.$message({
          showClose: true,
          message: message,
          type: 'success'
        });
        this.goodsId = data;
      }
      else{
        this.$message({
          showClose: true,
          message: message,
          type: 'warning'
        });
      }
    },

    //商品总量
    async createGoodsSKU(){
      Object.assign(this.goodsSKU,{goodsId:this.goodsId});
      let {code,data,message} = await axios.post(POST_GOODS_SKU, this.goodsSKU);
      this.$message({
        showClose: true,
        message: message,
      });
    },
    
    //商品相关图片
    async createGoodsExt(){
      Object.assign(this.goodsExt,{goodsId:this.goodsId});
      let {code,data,message} = await axios.post(POST_GOODS_EXT, this.goodsExt);
      this.$message({
        showClose: true,
        message: message,
      });
    },

    //上架商品
    async release() {
      let { code, data, message } = await axios.patch(`${RELEASE_GOODS}?id=${this.goodsId}`);
      this.$message({
        showClose: true,
        message: message,
      });
    }
  },

  created() {
    this.init();
  }
};
</script>

<style scoped>
.add-goods {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
}
.el-input-group {
  width: 40%;
}
.el-form-item {
  width: 400px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.height{
  height: 160px
}
</style>
