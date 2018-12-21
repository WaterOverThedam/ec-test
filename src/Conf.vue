<script>
        const env_cur="prod";
        const requestUrl="https://bbk.800app.com/uploadfile/staticresource/238592/279833/api_auto_json.aspx";
        const ecUrl="https://bbk.800app.com/uploadfile/staticresource/238592/279833/dataInterface_sync_ec.aspx";
        const evnData={
                //test:{baseUrl:"http://localhost:8888"},
                test:{baseUrl:"http://localhost"},
                local:{baseUrl:"http://localhost"},
                prod:{baseUrl:"http://interface.thelittlegym.com.cn"}
                };
        var res=[];        
        export default
        {
            env_cur,
            evnData,
            requestUrl,
            ecUrl
        }
</script>




 