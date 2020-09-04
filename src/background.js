class monitor{
    constructor(scope,includeTypes,params){
        this.scope = scope;
        this.includePs = includeTypes;
        this.params = params;
        this.tempPool=[];
        this.scopeReg = /.*/;
        this.generateScopeReg(scope);
    }

    generateScopeReg(scope){
        if(scope.indexOf("*") === 0){
            let parts = scope.split(".")
            let noStar = parts.slice(1).join(".")
            this.scopeReg = new RegExp(`^([a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.)*${noStar}$`,"i");
        } else {
            this.scopeReg = new RegExp(`^${scope}$`,"i");
        }
    }

    startMonitoring(){
        this.accpetNetwork = true;
    }

    handleResult(namesArr){
        console.log(namesArr)
    }

    handleGET(url){
        if(url.indexOf("?") == (url.length - 1)) return;

        url = url.substr(url.indexOf("?"))
        let paramsIterator = new URLSearchParams(url).keys();
        let params = [];

        while(true){
            let item = paramsIterator.next();
            if(item.done == true) break;
            params.push(item.value)
        }

        this.handleResult(params);
    }

    handlePOST(req){
        let body = req.requestBody;
        let result;
        if(body.error !== undefined){
            this.handleGET(req.url);
            return;
        }else if(body.formData != undefined){
            result = body.formData;
        } else if(body.raw != undefined && body.raw[0] != undefined && body.raw[0].bytes != undefined){
            let decode = new TextDecoder("utf-8").decode(body.raw[0].bytes);
            let isJson = ((x)=>{try{JSON.parse(x);return true;}catch(e){return false}})
            if(isJson(decode)){
                result = JSON.parse(decode);
            } else return;
        } else return;
        
        result = Object.keys(result);
        this.handleResult(result);
    }

    checkScope(url){

        if(this.scope == false) return true;
        else {
            let hn = new URL(url).hostname;
            return this.scopeReg.test(hn)
        }
    }

    handleRequest(req){
        if(this.params.get == true && req.method == "GET" && req.url.indexOf("?") != -1 && this.checkScope(req.url) ) this.handleGET(req.url);
        if(this.params.post == true && req.method == "POST" && ( req.url.indexOf("?") !== -1 || (req.requestBody !== undefined && req.requestBody.error == undefined) ) && this.checkScope(req.url) ) this.handlePOST(req);
    }
}

var monitorObj = null;

function startMonitor(data){
    monitorObj = new monitor(data.scope,data.includeTypes,data.params);
    monitorObj.startMonitoring();
}

function handleMessage(request,sender){
    //TODO: Validate the request sender after getting ID from chrome webstore
    
    if(!request.data || typeof request.data != "object") return false;
    startMonitor(request.data);
    return true;   
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let status = handleMessage(request,sender)
        sendResponse(status);
    }
);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if(monitorObj !=  null && monitorObj.accpetNetwork == true ) monitorObj.handleRequest(details);
},{urls: ["*://*/*"]},["requestBody"]);