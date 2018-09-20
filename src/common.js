export default{
    methods:{
        tag_find(key,arr){
            if(typeof arr != "array") return -1
            return arr.findIndex(function(t){
              return t.name==key;
            })
        },
        get_tag(){
            var self=this;
            self.$store.commit({
                type:"get_data",
                sql:"select crmzdy_82069676 tag from crm_zdytable_238592_26580_238592_view yzx where crmzdy_82004682=@gymcode",
                func:function(data){
                //console.log(JSON.stringify(data)
                    if(data){
                        self.labelGrps=data;
                    }else{
                        self.labelGrps=[]; 
                    }
                }
            })
        },
        get_clie_group(){
            var self=this;
            self.$store.commit({
                type:"get_data",
                sql:"select crmzdy_82069677 groups from crm_zdytable_238592_26580_238592_view yzx where crmzdy_82004682=@gymcode",
                func:function(data){
                    if(data){
                        self.clientlGrps=data;
                        console.log(JSON.stringify(self.clientlGrps));
                    }else{
                        self.clientlGrps=[]; 
                    }
                    //console.log("down",JSON.stringify(self.clientlGrps))
                }
            })
        }
    }
    
}