<template>
<div>

 <el-col :span="18">
<el-card class="box-card">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
       

          <el-form-item ref="username" label="姓名" prop="name" class="w-50">
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
          <el-form-item label="生日" prop="birth" class="w-50">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
          </el-form-item>
      
          <el-form-item label="来源" prop="from" class="w-50">
            <el-select v-model="ruleForm.from" filterable placeholder="请选择">
                <el-option v-for="c of channels" :key="c.id" :label="c.name" :value="c.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分组" prop="group" class="w-50">
            <el-select v-model="ruleForm.group" filterable placeholder="请选择">
              <el-option v-for="(g,index) of clientlGrps" :key="index" :label="g.name" :value="g.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机" prop="phone"  class="w-50">
              <el-input v-model="ruleForm.phone" size="100"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email" class="w-50">
              <el-input v-model="ruleForm.email" size="100"></el-input>
          </el-form-item>
      
        <!-- <el-form-item label="座机" prop="tel"  class="w-50">
            <el-input v-model="ruleForm.tel" size="100"></el-input>
        </el-form-item> -->
      
        <el-form-item label="行业" prop="industry">
            <el-input v-model="ruleForm.industry" size="100"></el-input>
        </el-form-item>
       <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address" size="100"></el-input>
        </el-form-item>
      
        <el-form-item label="备注" prop="memo">
            <el-input type="textarea" v-model="ruleForm.memo" :rows="10"></el-input>
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
      
        <el-row  :key="index" v-for="(item,index) of labelGrps">
          <div>
            <el-checkbox v-model="item.checked" :style="'color:'+color[index%3]">{{item.name}}</el-checkbox>
            <i class="el-icon-arrow-up"></i>
          </div>
          <div>
            <el-button  class="btnn" autofocus :disabled="!item.checked" :class="{'color':tag.iscolor,'nocolor':!tag.iscolor}" size="mini" :key="i" v-for="(tag,i) of item.tags"  @click="addTag(index,i)">{{tag.name}}</el-button>
          </div>
        </el-row>

        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="saveTage">确定</el-button>
          <el-button size="mini" type="text" @click="clearTag">取消</el-button>
          
        </div>
        <el-button slot="reference" style="float: right; padding: 3px 50px 3px 5px" type="text" @click="setTag()">添加</el-button>
      </el-popover>
   
  </div>

</el-card>

  <el-tag
      :key="id"
      v-for="(tag,id) in Tags"
      closable
      :disable-transitions="false"
      @close="handleClose(id)">
      {{tag.label}}
  </el-tag>

</el-col>
</div>
</template>
<script>
import { mapState } from 'vuex';
  export default {
    data() {
      var validate_phone = (rule, value, callback) => {
        var reg =/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (!(reg).test(value)) {
          //console.log(11)
          callback(new Error('手机格式不正确！'));
        }else{
          callback();
        } 
      };
      var validate_mail = (rule, value, callback) => {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
        if (!(reg).test(value)) {
          //console.log(11)
          callback(new Error('邮箱格式不正确！'));
        }else{
          callback();
        }  
      };
 
      return {
        visible2: false,
        Tags:[],
        color:[
          "#5199EB",
          "#54B983",
          "#E7A12A",
          "#9568CE"
        ],
        labelGrps:[],
        clientlGrps:[],
        channels:[],
        ruleForm: {
          name: '',
          othername:'',
          from: '',
          birth: '',
          industry: '',
          sex: '',
          memo: '',
          email:'',
          phone:'',
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
            { required: true, message: '请输入手机号',trigger:'blur'},
            { validator: validate_phone, trigger: 'blur' }
            
          ],
          email:[
            { required: true, message: '请输入邮箱',trigger:'blur'},
            { validator: validate_mail, trigger: 'blur' }
            
          ],
          birth: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '选择性别', trigger: 'change' }
          ]
        }
      };
    },
    computed:{
      ...mapState([
        'account'
      ]),
      Temp:function(){
        var self=this;
        var arr=self.labelGrps.map(function(o){
          if(o.checked){
            var tag =o.tags.find(function(t){
                return t.iscolor;
            })
            if(tag){
                return {"key":o.name,"label":tag.name}
            }
          }
        })
        return self.clearNullAr(arr);
      }
    },
    methods: {
      setTag(){
        if(this.labelGrps.length>0) return;
        this.$confirm('请先设置标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/setting'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已放弃'
          });          
        });
      },
      clearTag(){
        this.visible2 = false;
      },
      saveTage(){
        //console.log("save",JSON.stringify(this.Temp))
        this.Tags = this.Temp;
        this.visible2 =false;
      },
      handleClose(id){
       this.Tags.splice(id, 1);
      },
      addTag(index,i){
        this.labelGrps[index].tags.map(function(t,j){
          //console.log(i+"||"+j)
          if(j==i){
            t.iscolor=!t.iscolor;
          }else{
            t.iscolor=false;
          }
        }) 
      },
      submitForm(formName) {
        var self=this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
              self.saveUser(formName);
          } else { 
              this.$message({
                type: 'error',
                message: `内容输入不正确！`
              });
              return false;
          }
        });
      },
      saveUser(formName){
        var self=this;
        var sql_createuser = "declare @data varchar(max)=quot;@formquot;;insert into crm_zdytable_238592_27128_238592(org_id,cust_id,crm_syrID,create_time,crm_name/*phone*/,crmzdy_82068889/*name*/,crmzdy_82068921/*othername*/,crmzdy_82068894/*sex*/,crmzdy_82068891/*birth*/,crmzdy_82068892/*email*/,crmzdy_82068895/*addr*/,crmzdy_82068918/*industry*/,crmzdy_82068893/*group*/,crmzdy_82068919/*label*/,crmzdy_82068896/*memo*/)";
        sql_createuser += "select top 1 238592,quot;@iduserquot;,quot;@iduserquot;,getdate(),JSON_VALUE(@data,quot;$.phonequot;),JSON_VALUE(@data,quot;$.namequot;),JSON_VALUE(@data,quot;$.othernamequot;),JSON_VALUE(@data,quot;$.sexquot;),JSON_VALUE(@data,quot;$.birthquot;),JSON_VALUE(@data,quot;$.emailquot;),JSON_VALUE(@data,quot;$.addressquot;),JSON_VALUE(@data,quot;$.industryquot;),JSON_VALUE(@data,quot;$.groupquot;),JSON_VALUE(@data,quot;$.labelquot;),JSON_VALUE(@data,quot;$.memoquot;) from crm_yh_238592_view;";
        sql_createuser += "select 0 errmsg for json path";
        var label_string = self.Tags.reduce(function(prev, cur, index, array){
          if(typeof prev==="object"){
            return prev.key+":"+prev.label+";"+cur.key+":"+cur.label;
          }else if(prev==""){
            return prev+cur.label;
          }else{
            return prev+";"+cur.key+":"+cur.label;
          }
        },"")
        
        var obj=this.extend({label:label_string,birth:self.fmtDate(self.ruleForm.birth)},self.ruleForm);
        //console.log(JSON.stringify(obj));
        sql_createuser = self.convertor.toUni(sql_createuser.replace('@form',JSON.stringify(obj)));
        self.$store.commit({
            type:"get_data",
            sql:sql_createuser,
            func:function(data){
              if(data&&data[0].errmsg==0){
                  self.$message({
                    showClose: true,
                    message: '保存成功！',
                    type: 'success'
                  });
                  self.resetForm(formName);
              }else{
                  self.$message({
                    showClose: true,
                    message: '保存失败！',
                    type: 'error'
                  });
              }
            }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.Tags=[];
        this.$refs.username.$el.querySelector('input').focus();
      },
      getChannel(){
        var self=this;
        var sql = "select crm_name name,id from crm_zdytable_238592_25112_238592_view where crmzdy_81755551=1 and crmzdy_81620405_id=0 union all select crm_name,id from crm_zdytable_238592_25112_238592_view where crmzdy_81755551=1 and crmzdy_81620405_id=@idgym for json path;";
        self.$store.commit({
            type:"get_data",
            sql:sql,
            func:function(data){
              self.channels=data;
            }
        })
      },
      init(){
        this.get_tag();
        this.getChannel();
        this.get_clie_group();
      }
    },
    watch:{
        account:function(){
          this.get_tag();
          this.init();
        }
    },
    mounted(){
      this.init();
      //console.log(JSON.stringify(this.$store.state.client))
      if(this.$store.state.client){
         this.ruleForm=this.$store.state.client;
      }
    },
    destroyed(){
         this.$store.state.client=this.ruleForm;
    }
  }
</script> 


<style lang="scss" scoped>
  .color{
    color:#409eff;
    background-color: #ecf5ff;
    border-color: #c6e2ff;
  }
  .nocolor{
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
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

