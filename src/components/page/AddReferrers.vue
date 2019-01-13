<template>
  <div class="add-referrers">
    <el-form ref="form" :rules="referrerRules" :model="referrer" label-width="120px" size="small">
      <el-form-item label="推荐人姓名" prop="name">
        <el-input v-model="referrer.name"></el-input>
      </el-form-item>

      <el-form-item label="推荐理由" prop="reason">
        <el-input v-model="referrer.reason"></el-input>
      </el-form-item>

      <el-form-item label="推荐人title" prop="title">
        <el-input v-model="referrer.title"></el-input>
      </el-form-item>

      <el-form-item label="推荐人头像" prop="avatar">
        <input ref='avatar' type="file" @click="uploadImage('avatar')">
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addReferrer">创建推荐人</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "../../utils/axios";

const qiniuUrl = `http://qiniu.wxdut.com`
const qiniu = require('qiniu-js')

const ADD_REFERERS = `/api/referrers`
const GET_UPLOAD_TOKEN = `/api/files/upload-token`;

export default {
  data() {
    return {
      referrer: {
        name: "",
        reason: "",
        title: "",
        avatar: ""
      },
      referrerRules: {
        name: [{ required: true, message: "请输入推荐人姓名", trigger: "blur" }],
        reason: [{ required: true, message: "请输入推荐理由", trigger: "blur" }],
        title: [{ required: true, message: "请输入推荐人title", trigger: "blur" }],
        avatar: [{ required: true, message: "请上传推荐人头像", trigger: "blur" }]
      },
     
    };
  },

  computed: {
    
  },


  watch: {
    
  },


  methods: {
    init(){
      this.getCategoriesList();
      this.getReferrersList();
    },

    //上架商品
    async addReferrer() {
      let { code, data, message } = await axios.post(ADD_REFERERS,this.referrer);
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
    },

    //上传图片
    uploadImage(ref) {
      let input = undefined;
      if(ref === 'avatar'){
        input = this.$refs[ref];
      }
      else{
        input = this.$refs[ref][0];
      }
      input.onchange = ()=>{
        let _this = this;
        let localFileName = input.value;
        let suffix = localFileName.substring(localFileName.lastIndexOf("."),localFileName.length);//后缀名
        let fileName = localFileName.substring(localFileName.lastIndexOf("\\")+1,localFileName.lastIndexOf("."));
        let file = input.files[0];

        axios.get(`${GET_UPLOAD_TOKEN}?fileName=${fileName}`).then((response)=>{
          console.log(response);
          if(response.code === 2000){
            const token = response.data;
            const observer = {
              next(response){
                let process = Math.floor(response.total.percent)+'%';
                if(process === '100%'){
                  _this.$message({
                    showClose: true,
                    message: '上传成功~',
                    type: 'success'
                  });

                  if(ref === 'avatar'){
                    _this.referrer.avatar = `${qiniuUrl}/${fileName}`;

                    console.log(_this.referrer.avatar);
                  }
                }
              },
              error(err){
                console.log(err);
              },
              complete(res1){
                console.log(res1);
              }
            };
            const key = fileName;//上传文件名
            const putExtra = {
                fname: fileName,
                params: {},
                mimeType:["image/png", "image/jpeg", "image/gif"]
            };
            const config = {
              useCdnDomain: true,
              region: qiniu.region.z0
            };

            let observable = qiniu.upload(file, key, token, putExtra, config);
            observable.subscribe(observer) // 上传开始
          }
        })
      }
    }, 
  },

  created() {}
};
</script>

<style scoped>
.add-referrers {
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
