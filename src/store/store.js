import Vue from 'vue'
import Vuex from 'vuex'
import conf_ from '../conf';
import qs from 'qs';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);
Vue.use(Vuex)
 

 
const getDataAsync=function(data,func,type){
    if (data && typeof data!='object'){
        console.log("参数应该是对象类型")
        return null;
    }
    if(type=='post'){
        axios({
            method:'post',
            url: conf_.requestUrl,
            data:qs.stringify(data)
        }).then((response)=>{
                var res = response.data;
                if(!res instanceof Array){
                    res=null;
                }
                //alert(JSON.stringify(func))
                if(typeof func === "function"){
                    func(res);
                }
            })         
            .catch(function (error) {
                console.log(error);
            })
    }else if(type=='put'){
        axios({
            method:'post',
            url: conf_.ecUrl,
            data:qs.stringify(data)
        }).then((response)=>{
                var res = response.data;
                if(!res instanceof Array){
                    res=null;
                }
                //alert(JSON.stringify(func))
                if(typeof func === "function"){
                    func(res);
                }
            })         
            .catch(function (error) {
                console.log(error);
            })
    
    }else{
        if(!data||data=={}){
            Vue.jsonp (conf_.requestUrl).then(json => {
                // 返回数据 json， 返回的数据就是json格式
                json=JSON.parse(json) 
                if(json && typeof json=="object"){
                    if(json.errcode=="40013"){
                        json=null;
                    }else{
                       json=json;
                    }
                }else{
                    json=null;
                }
                if(typeof func === "function"){
                    func(json);
                }
            }).catch(err => {
            　　console.log(err);
            })
        }else{
            Vue.jsonp (conf_.requestUrl,data).then(json => {
                // 返回数据 json， 返回的数据就是json格式
                if(typeof json!="object"){
                    json=JSON.parse(json) 
                }
                if(json && typeof json=="object"){
                    if(json.errcode=="40013"){
                        json=null;
                    }else{
                       json=json;
                    }
                }else{
                    json=null;
                }
                if(typeof func === "function"){
                   func(json);
                }
            }).catch(err => {
            　　console.log(err);
            })
        }
    }

}

Vue.prototype.getDataAsync=getDataAsync;

export default new Vuex.Store({
  state:{
    account:{username:"",id:"",acl:"",gyms:[]},
    client:null,
    tbl:null
  },
  mutations:{
    log_auth (state,stark) {
        if(!state.account||state.account.id==""){
            var sql="select yh.crm_jiandang acl,yh.id,yh.crm_yhname username,(select crm_name name,crmzdy_80620116 code,id from crm_zdytable_238592_23594_238592_view gym where gym.crmzdy_82037329=1 and (charindex(gym.crm_name,yh.crmzdy_81611236)>0) order by case when gym.crm_name=yh.crmzdy_81757148 then 0 else 1 end,gym.crm_name for json path) gyms from crm_yh_238592_view yh where yh.id=iduser and yh.crm_yiqiyong=1 for json path";
            //sql = sql.replace("iduser",279833);
            getDataAsync({sql1:sql},function(data){
                if(data){
                   state.account=data[0];
                }else{
                   alert("请先登陆OASIS!");
                   window.location.href = "https://oasis.thelittlegym.com.cn";
                }
                console.log("res:"+JSON.stringify(state.account))
            })
        }
    },
    get_gyms(state,param){
        var sql="declare @str varchar(max)=(select crm_name name,crmzdy_80620116 code,id from crm_zdytable_238592_23594_238592_view @gym_where order by name for json auto);select @str;";
        if(state.account.acl=='系统管理员'){
            sql=sql.replace('@gym_where','');
        }else{
            sql=sql.replace('@gym_where',"where charindex(crm_name,'@gyms')>0");
        }
        this.commit({
            type:"get_data",
            sql:sql,
            func:param.func
        })

    },
    get_ls:function(state,param){    
        var cur_gym=param.cur_gym||state.account.gyms[0]&&state.account.gyms[0].name;
        if(cur_gym){
            var sql_get_ls ="select ls.crm_qm username,ls.id from crm_yh_238592_view ls where crm_yhname not like '50%' and crm_yiqiyong=1 and charindex('@cur_gym',crmzdy_81611236)>0 order by username for json auto";
            sql_get_ls = sql_get_ls.replace("@cur_gym",cur_gym);
            //console.log("ls:"+sql_get_ls)
            this.commit({
                type:"get_data",
                sql:sql_get_ls,
                func:param.func
            })
        }
	},
    get_data(state,param){
        // console.log(param.func)
        // console.log(JSON.stringify(param))
        // console.log(JSON.stringify(state.account))
        if(state.account && state.account.id){
            if(param && param.sql &&param.func){
                var sql = param.sql;
                sql = sql.replace(/@gyms/ig,JSON.stringify(state.account.gyms));
                sql = sql.replace(/@gymcode/ig,state.account.gyms[0].code||'');
                sql = sql.replace(/@idgym/ig,state.account.gyms[0].id||'');
                sql = sql.replace(/@iduser/ig,state.account.id);
                var requst_type = param.requst_type||'post';
                if(param.option) sql=Vue.prototype.fn_pager(sql,param.option);
                sql = Vue.prototype.convertor.toUni(sql);
                getDataAsync({sql1:sql},param.func,requst_type);
            }
        }
    }

  }
})

 