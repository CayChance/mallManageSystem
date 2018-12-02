<template>
    <div class="add-goods">
        <el-input
            clearable
            placeholder="请输入内容"
            v-model="search"
            @select="handleSelect"
            class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
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
                width="160">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-count="6">
        </el-pagination>

        <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
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
        </el-dialog>
    </div>
</template>

<script>
    import axios from '../../utils/axios';
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
                dialogFormVisible: false
            }
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
                    }
                }
            },

            onSubmit() {
                console.log('submit!');
            }
        },

        created(){
            this.getGoodsList({pageIndex:1,pageSize:10});
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
