<template>
<div>

 <el-col :span="18">
<el-card class="box-card">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
       

          <el-form-item label="姓名" prop="name" class="w-50">
            <el-input v-model="ruleForm.name" size="100"></el-input>
          </el-form-item> 
       
      
          <el-form-item label="称呼" prop="othername" class="w-50">
            <el-input v-model="ruleForm.othername" size="100"></el-input>
          </el-form-item> 
       
        
          <el-form-item label="性别" prop="sex" class="w-50">
            <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="未知"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" prop="date" class="w-50">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
      
          <el-form-item label="来源" prop="from" class="w-50">
            <el-select v-model="ruleForm.from" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分组" prop="group" class="w-50">
            <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
   
         
        
        <!-- <el-form-item label="职务" prop="job" class="w-50">
            <el-input v-model="ruleForm.job" size="100"></el-input>
        </el-form-item> -->
        <el-form-item label="手机" prop="phone"  class="w-50">
            <el-input v-model="ruleForm.phone" size="100"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" class="w-50">
            <el-input v-model="ruleForm.email" size="100"></el-input>
        </el-form-item>
      
        <!-- <el-form-item label="座机" prop="tel"  class="w-50">
            <el-input v-model="ruleForm.tel" size="100"></el-input>
        </el-form-item> -->
      
        <el-form-item label="行业" prop="delivery">
            <el-input v-model="ruleForm.delivery" size="100"></el-input>
        </el-form-item>
       <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address" size="100"></el-input>
        </el-form-item>
      
        <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" :rows="10"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
  </el-form>
</el-card>
</el-col>
<el-col :span="6">
<el-card class="card-right">
  <div slot="header" class="clearfix">
    <span>客户标签</span>
    
    <el-popover
  placement="bottom"
  width="400"
  height="500"
  v-model="visible2">
  <el-row>
    <div>
      <el-checkbox v-model="checked" style="color:#5199EB">例子来源</el-checkbox>
      <i class="el-icon-arrow-up"></i>
    </div>
    <div>
      <el-button class="btnn" size="mini" v-for="item in btns[0]" :key="item.id" @click="btnn(item.id,item.name)">{{item.name}}</el-button>
    </div>
  </el-row>
  <el-row>
    <div>
      <el-checkbox v-model="checked2" style="color:#54B983">电话状态</el-checkbox>
      <i class="el-icon-arrow-up"></i>
    </div>
     <div>
      <el-button class="btnn" size="mini" v-for="item in btns[1]" :key="item.id" @click="btnn(item.id,item.name)">{{item.name}}</el-button>
    </div>
    
  </el-row>
  <el-row>
    <div>
      
      <el-checkbox v-model="checked3" style="color:#E7A12A">消费能力</el-checkbox>
      <i class="el-icon-arrow-up"></i>
    </div>
    <div>
      <el-button  class="btnn" :class="{'color':isColor}" size="mini" v-for="item in btns[2]" :key="item.id" @click="btnn(item.id,item.name)">{{item.name}}</el-button>
    </div>
    
  </el-row>
  <el-row>
    <div>
      <el-checkbox v-model="checked4" style="color:#9568CE">家长角色</el-checkbox>
      <i class="el-icon-arrow-up"></i>
    </div>
    <div>
      <el-button class="btnn" size="mini" v-for="item in btns[3]" :key="item.id" @click="btnn(item.id,item.name)">{{item.name}}</el-button>
    </div>
    
  </el-row>
  <div style="text-align: right; margin: 0">
    <el-button type="primary" size="mini" @click="addTag">确定</el-button>
    <el-button size="mini" type="text" @click="clearTag">取消</el-button>
    
  </div>
   <el-button slot="reference" style="float: right; padding: 3px 50px 3px 5px" type="text">添加</el-button>
</el-popover>
   
    
  </div>

</el-card>

  <el-tag
      :key="tag"
      v-for="tag in Tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
  </el-tag>

</el-col>
</div>
</template>
<script>
  export default {
    data() {
      return {
        visible2: false,
        checked:true,
        checked2:false,
        checked3:false,
        checked4:false,
        isColor:false,

        Tags:[],
        Temp:[],
        btns:[
          [
            {name:'phone in',id:'1'},
            {name:'web in',id:'2'},
            {name:'商场活动',id:'3'},
            {name:'转介绍',id:'4'},
            {name:'它中心转入',id:'5'},
            {name:'walk in',id:'6'},
            {name:'小区地推',id:'7'},
          ],
          [
            {name:'暂时未接通',id:'11'},
            {name:'暂时无人接听',id:'21'},
            {name:'挂断',id:'31'},
            {name:'已深入沟通',id:'41'},
            {name:'仅粗略沟通',id:'51'},
            {name:'尚未破冰',id:'61'},
            {name:'破冰后略沟通',id:'71'},
          ],
          [
            {name:"消费力强",id:'12'},
            {name:"消费力弱",id:'22'},
          ],
          [
            {name:"独立决策者",id:'13'},
            {name:"决策干预者",id:'23'},
            {name:"重要人物",id:'33'}
          ],
        ],
        ruleForm: {
          name: '',
          othername:'',
          from: '',
          date: '',
          delivery: '',
          type: [],
          sex: '',
          desc: '',
          email:'',
          // tel:'',
          phone:'',
          job:'',
          address:'',
          group:'',
          

         
        },
        rules: {
          name: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          from: [
            { required: true, message: '请选择客户来源', trigger: 'change' }
          ],
          group: [
            { required: true, message: '请选择分组', trigger: 'change' }
          ],
          phone:[
            { required: true, message: '请输入手机号',trigger:'blur'}
          ],
          email:[
            { required: true, message: '请输入邮箱',trigger:'blur'}
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '选择性别', trigger: 'change' }
          ],
          
        }
      };
    },
    methods: {
      clearTag(){
        this.Temp = [];
        this.visible2 = false;
      },
      addTag(){
        this.Tags = this.Temp;
        this.visible2 =false;
      },
      handleClose(tag){
        this.Tags.splice(this.Tags.indexOf(tag), 1);
      },
      btnn(id,name){
        console.log(id,name);
       
        if(this.Temp.indexOf(name)==-1){
          console.log(111);
          this.Temp.push(name);
        }
        
        // if(id)  
        // this.isColor = !this.isColor; 
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script> 


<style lang="scss" scoped>
  .color{
    color:#409eff;
    background-color: #ecf5ff;
    border-color: #c6e2ff;
  }
  .box-card{
    
    .w-50{
      width: 48%;
      display: inline-block;
    }
    
    // width: 70%;
  }
  .card-right{
    height:100%;
    box-shadow:none;
    border-bottom: none;
    border-right: none;
    position: relative;
   
  }
  .btnn{
      margin: 10px 5px 5px 10px !important;
    }
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>

