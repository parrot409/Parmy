class monitor{
    constructor(scope,includeTypes,params){
        this.scope = scope;
        this.includePs = includeTypes;
        this.params = params;
        this.tempPool={"post":[],"get":[],"cookies":[]};
        this.scopeReg = /.*/;
        this.generateScopeReg(scope);
        this.setTimer();
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

    handleResult(namesArr,category){
        namesArr.forEach((item)=>{
            if(!this.tempPool[category].includes(item))
                this.tempPool[category].push(item)
        });
    }

    setTimer(){
        this.intervalId = window.setInterval(function(){
            monitorObj.updateResult();
        }, 1000);
    }

    updateResult(){
        let tempPool = this.tempPool;
        chrome.storage.local.get(['pool'], function(r) {
            let pool = r.pool;
            let categories= Object.keys(tempPool);
            
            categories.forEach((category)=>{
                tempPool[category].forEach((item)=>{
                    if(!pool[category].includes(item))
                        pool[category].push(item)
                });
            })
            chrome.storage.local.set({"pool": pool});
        });
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
        this.handleResult(params,"get");
    }

    handlePOST(req,handleGet){
        let body = req.requestBody;
        let result;
        if(req.url.indexOf("?") != -1 && handleGet == true) this.handleGET(req.url);

        if(body.error !== undefined){
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
        this.handleResult(result,"post");
    }

    checkScope(url){

        if(this.scope == false) return true;
        else {
            let hn = new URL(url).hostname;
            return this.scopeReg.test(hn)
        }
    }

    handleCookies(url){
        chrome.cookies.getAll({"url":url},function(r){
            let names = []
            r.forEach((item)=>{
                names.push(item.name);
            });
            monitorObj.handleResult(names,"cookies");
        });
    }

    handleRequest(req){
        if(this.params.get == true && req.method == "GET" && req.url.indexOf("?") != -1 && this.checkScope(req.url) ) this.handleGET(req.url);
        if(this.params.post == true && req.method == "POST" && ( (req.url.indexOf("?") !== -1 && this.params.get == true ) || (req.requestBody !== undefined && req.requestBody.error == undefined) ) && this.checkScope(req.url) ) this.handlePOST(req,this.params.get == true);
        if(this.params.cookies == true && this.checkScope(req.url) ) this.handleCookies(req.url);
    }
}

var monitorObj = null;

function startMonitor(data){
    monitorObj = new monitor(data.scope,data.includeTypes,data.params);
    monitorObj.startMonitoring();
}

function stopMonitor(){
    if(monitorObj != null){
        monitorObj.updateResult();
        window.clearInterval(monitorObj.intervalId);
        monitorObj = null;
    }
}

function handleMessage(request,sender){
    //TODO: Validate the request sender after getting ID from chrome webstore
    if(!request.data || typeof request.data != "object") return false;
    if(request.data.action == "start") startMonitor(request.data);
    else if(request.data.action == "stop") stopMonitor("A");
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
