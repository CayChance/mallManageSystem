<template>
  <div class="add-categories">
    <el-form ref="form" :model="goods" label-width="120px" size="small">
      <el-form-item label="商品类别名称">
        <el-input v-model="goods.categoryName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addCategory">创建商品类别</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "../../utils/axios";

const ADD_CATEGORIES = `/api/categories`;


export default {
  data() {
    return {
      goods: {
        categoryName: "",
      }
    };
  },

  computed: {
    
  },


  watch: {
    
  },


  methods: {
    init(){
      this.addCategory();
    },

    //新建商品类别
    async addCategory() {
      let param = {
        name: this.goods.categoryName
      };
      let { code, data, message } = await axios.post(ADD_CATEGORIES,param);
      if(code === 2000){
        this.$message({
          showClose: true,
          message: message,
          type: 'success'
        });
      }
      else{
        this.$message({
          showClose: true,
          message: message,
          type: 'warning'
        });
      }
    }
  },

  created() {}
};
</script>

<style scoped>
.add-categories {
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
