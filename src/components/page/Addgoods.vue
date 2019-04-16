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
        <input ref="imageUrl" type="file" @click="uploadImage('imageUrl')">
      </el-form-item>

      <el-form-item label="商品分类" prop="categoryId">
        <el-select clearable v-model="goods.categoryId" placeholder="请选择商品分类id" prop="categoryId">
          <el-option
            v-for="(item,index) in categoriesList"
            :label="item.name"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="推荐人id" prop="referrerId">
        <el-select clearable v-model="goods.referrerId" placeholder="推荐人id" prop="referrerId">
          <el-option
            v-for="(item,index) in referrerIdList"
            :label="item.name"
            :value="item.id"
            :key="index"
          ></el-option>
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

      <div class="height"></div>

      <el-form ref="form" :rules="goodsExtRules" :model="goodsExt" label-width="120px" size="small">
        <el-form-item label="banner图片" prop="bannerUrls">
          <input
            v-for="(item,index) in bannerUrls"
            :key="index"
            :id="'bannerUrls'+index"
            :ref="'bannerUrls'+index"
            type="file"
            @click="uploadImage(`bannerUrls${index}`)"
          >
        </el-form-item>

        <el-form-item label="image图片" prop="imageUrls">
          <input
            v-for="(item,index) in imageUrls"
            :key="index"
            :ref="'imageUrls'+index"
            type="file"
            @click="uploadImage(`imageUrls${index}`)"
          >
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

const qiniuUrl = `http://qiniu.wxdut.com`;
const qiniu = require("qiniu-js");

const POST_GOODS_LIST = `/api/goods`;
const GET_CATEGORIES_LIST = `/api/categories`;
const GET_REFERERS_LIST = `/api/referrers`;
const RELEASE_GOODS = `/api/goods/status`;
const POST_GOODS_SKU = `/api/goods-sku`;
const POST_GOODS_EXT = `/api/goods-ext`;
const GET_UPLOAD_TOKEN = `/api/files/upload-token`;
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
        totalCount: ""
      },
      goodsExt: {
        bannerUrls: [],
        imageUrls: []
      },

      bannerUrls: [""],
      imageUrls: [""],

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
        totalCount: [
          { required: true, message: "请输入总数量", trigger: "blur" }
        ]
      },
      goodsExtRules: {
        bannerUrls: [
          { required: true, message: "请输入商品名", trigger: "blur" }
        ],
        imageUrls: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ]
      },
      search: "",
      select: "",
      dialogFormVisible: false,
      totalCount: undefined,
      goodsId: ""
    };
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.singleItems);
    }
  },

  watch: {
    status: {
      handler: function(newVal, oldVal) {
        this.currentStatus = this[`${newVal}`];
      },
      immediate: true
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    init() {
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
      }
    },

    //创建商品基本信息
    async createGoods() {
      let { code, data, message } = await axios.post(
        POST_GOODS_LIST,
        this.goods
      );
      if (code === 2000) {
        this.$message({
          showClose: true,
          message: message,
          type: "success"
        });
        this.goodsId = data;
      } else {
        this.$message({
          showClose: true,
          message: message,
          type: "warning"
        });
      }
    },

    //商品总量
    async createGoodsSKU() {
      Object.assign(this.goodsSKU, { goodsId: this.goodsId });
      let { code, data, message } = await axios.post(
        POST_GOODS_SKU,
        this.goodsSKU
      );
      this.$message({
        showClose: true,
        message: message,
        type: "success"
      });
    },

    //商品相关图片
    async createGoodsExt() {
      Object.assign(this.goodsExt, { goodsId: this.goodsId });
      let { code, data, message } = await axios.post(
        POST_GOODS_EXT,
        this.goodsExt
      );
      this.$message({
        showClose: true,
        message: message,
        type: "success"
      });
    },

    //上架商品
    async release() {
      let { code, data, message } = await axios.patch(
        `${RELEASE_GOODS}?id=${this.goodsId}`
      );
      this.$message({
        showClose: true,
        message: message,
        type: "success"
      });
    },

    //上传图片
    uploadImage(ref) {
      let input = undefined;
      if (ref === "imageUrl") {
        input = this.$refs[ref];
      } else {
        input = this.$refs[ref][0];
      }
      input.onchange = () => {
        let _this = this;
        let localFileName = input.value;
        let suffix = localFileName.substring(
          localFileName.lastIndexOf("."),
          localFileName.length
        ); //后缀名
        let fileName = localFileName.substring(
          localFileName.lastIndexOf("\\") + 1,
          localFileName.lastIndexOf(".")
        );
        let file = input.files[0];

        axios.get(`${GET_UPLOAD_TOKEN}?fileName=${fileName}`).then(response => {
          console.log(response);
          if (response.code === 2000) {
            const token = response.data;
            const observer = {
              next(response) {
                let process = Math.floor(response.total.percent) + "%";
                if (process === "100%") {
                  _this.$message({
                    showClose: true,
                    message: "上传成功~",
                    type: "success"
                  });

                  if (ref === "imageUrl") {
                    _this.goods.imageUrl = `${qiniuUrl}/${fileName}`;

                    console.log(_this.goods.imageUrl);
                  }
                  if (ref.indexOf("bannerUrls") >= 0) {
                    _this.goodsExt.bannerUrls.push(`${qiniuUrl}/${fileName}`);
                    _this.bannerUrls.push("");
                    console.log(_this.goodsExt.bannerUrls);
                  }
                  if (ref.indexOf("imageUrls") >= 0) {
                    _this.goodsExt.imageUrls.push(`${qiniuUrl}/${fileName}`);
                    _this.imageUrls.push("");
                    console.log(_this.goodsExt.imageUrls);
                  }
                }
              },
              error(err) {
                console.log(err);
              },
              complete(res1) {
                console.log(res1);
              }
            };
            const key = fileName; //上传文件名
            const putExtra = {
              fname: fileName,
              params: {},
              mimeType: ["image/png", "image/jpeg", "image/gif"]
            };
            const config = {
              useCdnDomain: true,
              region: qiniu.region.z0
            };

            let observable = qiniu.upload(file, key, token, putExtra, config);
            observable.subscribe(observer); // 上传开始
          }
        });
      };
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
.height {
  height: 100px;
}
</style>
