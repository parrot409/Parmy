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

    handleGET(req){
        console.log(req);
    }

    handlePOST(req){
        console.log(req.requestBody,"POST");   
    }

    checkScope(url){
        if(this.scope == false) return true;
        else {
            let hn = new URL(url).hostname;
            return this.scopeReg.test(hn)
        }
    }

    handleRequest(req){
        if(this.params.get == true && req.method == "GET" && req.url.indexOf("?") != -1 && this.checkScope(req.url) ) this.handleGET(req);
        if(this.params.post == true && req.method == "POST" && ( req.url.indexOf("?") !== -1 || req.requestBody.error == undefined) && this.checkScope(req.url) ) this.handlePOST(req);
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