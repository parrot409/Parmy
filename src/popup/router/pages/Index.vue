<template>
  <div class="main-container" action="javascript:alert()">
    <label class="checkbox-input">
      <input type="checkbox" v-model="isScoped"  />
      <span></span>
      Use scopes
    </label>
    <div class="text-input">
      <input v-model="domain" @keyup="validateDomain()" :disabled="isScoped ? false : true" :class="{'addpadd':isScoped}" ref="domainInput" type="text" placeholder="Scope: *.google.com" />
      <div :class="{'open':isScoped,'close':isScoped === false,'valid':isDomainValid == true,'notvalid':isDomainValid == false}" class="text-input-status" >
        <i class="fas fa-check" aria-hidden="true"></i>
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div> 
    <div class="checkbox-input multiple">
      <label >
        <input v-model="collectGet" type="checkbox"/>
        <span></span>
        GET
      </label>
      <label>
        <input v-model="collectPost" type="checkbox" />
        <span></span>
        POST
      </label>
      <label>
        <input v-model="collectCookies" type="checkbox" />
        <span></span>
        Cookies
      </label>
    </div>
    <div class="radio-input">
      <label><div><input v-model="output" value="json" type="radio" name="A" checked/><span></span>JSON</div></label>
      <label><div><input v-model="output" value="lines" type="radio" name="A"/><span></span>Lines</div></label>
    </div>
    <!-- <label class="checkbox-input">
      <input type="checkbox" v-model="includeTypes" />
      <span></span>
      Include parameter types
    </label> -->
    <div @click="startAction()" class="circle" >
      <i class="fas fa-power-off"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isScoped: null,
      domain: "",
      isDomainValid: false,
      collectGet: false,
      collectPost: false,
      collectCookies: false,
      output: "json"
    }
  },
  methods: {
    validateDomain: function(){
      let domain = this.$refs["domainInput"].value;

      let hasStar = !(domain.indexOf("*") == -1)

      let domainReg = /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/
      let hostReg = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/

      if( !hasStar && domainReg.test(domain) || hostReg.test(domain) ){
        this.isDomainValid = true;
        return;
      } else if(hasStar){
        let parts = domain.split(".")
        let noStar = parts.slice(1).join(".")
        if(parts[0] == "*" && domainReg.test(noStar)){
          this.isDomainValid = true;
          return;
        }
      }
      this.isDomainValid = false;
    },
    startAction: function(){
      if(this.isScoped && !this.isDomainValid){
        return;
      }
      let domain = ( (this.isScoped == true) ? this.domain : false)
      let data = {"action":"start","scope":this.domain,"params":{"get":this.collectGet,"post":this.collectPost,"cookies":this.collectCookies}}
      chrome.runtime.sendMessage({"data":data},function(r){});
      chrome.storage.local.set({'running':true});
      chrome.storage.local.set({"pool": {"post":[],"get":[],"cookies":[]}});
      chrome.storage.local.set({"output": this.output});
      chrome.storage.local.set({"time": Math.round(new Date()/1000)});
      this.$router.replace({name:'collecting'});
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../../css/vars";
@mixin custom-input {
  margin-top: 15px;
  user-select: none;
  input{
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ span:after {
    display:block;
  }

  span{
    display: block;
    height: 20px;
    width: 20px;
    background-color: $checkboxColor;
    float: left;
    border: 1px solid darken($checkboxColor,10%);
    margin-right: 10px;
  }

  span:after {
    content: "";
    position: absolute;
    display: none;
  }
}

@keyframes textInputTransitionOpen {
    0%  {right: -40px;}
    20% {right: -40px;}
    40% {right: -30px;}
    60% {right: -20px;}
    80% {right: -10px;}
    100% {right:  0px;}
}

@keyframes textInputTransitionClose {
    0%  {right:   0px;}
    20% {right:   0px;}
    40% {right: -10px;}
    60% {right: -20px;}
    80% {right: -30px;}
    100% {right:-40px;}
}

.main-container{
  width: 260px;
  overflow: hidden;
  position: absolute;
  left: 45px;
}

.checkbox-input{
  @include custom-input;
  display:block;
  span{
    border-radius: 4px;
  }

  &:not(div):hover input ~ span {
    background-color: lighten($checkboxColor,5%);
  }

  span:after {
    margin-top: 2.5px;
    margin-left: 6.5px;
    width: 4px;
    height: 9px;
    border: solid $accentColor;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &.multiple{
    display:flex;
    & *:nth-child(1){
      margin-left: 0px;
    }

    span{
      margin-right: 7px;
    }

    label{
      display:block;
      float:left;
      margin-left: 18px;
    }
    
    label:hover input ~ span {
      background-color: lighten($checkboxColor,5%);
    }
  }
}

.text-input{
  margin-top: 15px;
  position: relative;
  input{
    width: 250px;
    border-radius: 6px;
    height: 40px;
    background-color: $secondaryColor;
    padding-left: 10px;
    color: lighten($darkTextColor,20%);
    font-size: 16px;
    box-sizing: border-box;
    padding-right: 10px;
  }

  ::placeholder{
    color: $darkTextColor;
  }

  .addpadd{
    padding-right: 45px;
  }

  .text-input-status{
    position: absolute;
    top:  0px;
    height: 100%;
    width: 40px;
    border-radius: 0px 6px 6px 0px;
    right: -40px;
  }

  .text-input-status.close{
    right: -40px;
    animation: textInputTransitionClose 0.3s alternate;
  }

  .text-input-status.open{
    right: 0px;
    animation: textInputTransitionOpen 0.3s alternate;
  }

  .text-input-status.valid{
    background-color: #31c35a;
    & svg:nth-child(2){
      display: none;
    }
  }

  .text-input-status.notvalid {
    background-color: rgb(216, 3, 3);
    & svg:nth-child(1){
      display: none;
    }
  }

  .text-input-status svg{
    display: block;
    height: 24px;
    width: 24px;
    margin-top: 8px;
    margin-left: 8px;
  }
}

.radio-input{
  @include custom-input;
  div{
    width: 100%;
    margin-top: 5px;
  }
 
  span{
    border-radius: 50%;
  }

  div:hover input ~ span {
    background-color: lighten($checkboxColor,5%);
  }

  span:after {
    width: 10px;
    height: 10px;
    margin-top: 5px;
    margin-left: 5px;
    border-radius: 50%;
    background: $accentColor;
  }
}

.circle{
  background-color: $secondaryColor;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  margin: auto;
  margin-top: 32px;
  box-shadow: -5px 5px 10px #161c43;
  margin-bottom: 10px;
  cursor: pointer;

  .fa-power-off{
    height: 24px;
    width: 24px;
    color: $accentColor;
    margin-left: 33px;
    margin-top: 33px;
  }
  &:hover{
    box-shadow: -6px 6px 7px darken(#161c43,2%);
  }
}

</style>