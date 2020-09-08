<template>
  <div class="main-container" action="javascript:alert()">
    <div class="stats-container">
        <div class="box">
            <span class="paramName">POST</span>
            <span class="paramNum">{{ pool.post }}</span>
        </div>
        <div class="box">
            <span class="paramName">GET</span>
            <span class="paramNum">{{ pool.get }}</span>
        </div>
        <div class="box">
            <span class="paramName">Cookies</span>
            <span class="paramNum">{{ pool.cookies }}</span>
        </div>
    </div>
    <div class="time-container">
        <div>
            <i class="far fa-clock"></i>
            <span>120 : 20</span>
        </div>
    </div>
    <div class="circle" @click="stopMonitoring">
      <i class="fas fa-power-off"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pool : {"get":0,"post":0,"cookies":0}
    }
  },
  methods: {
    stopMonitoring : function(){
      chrome.storage.local.set({'running':false}, function(r) {});
      chrome.runtime.sendMessage({"data":{"action":"stop"}},function(r){});
    },
    updateStats : function(){
      let self = this;
      chrome.storage.local.get(['pool'], function(r) {
        self.pool.get = r.pool.get.length;
        self.pool.post = r.pool.post.length;
        self.pool.cookies = r.pool.cookies.length;
      });
    }
  },
  created: function () {
    this.updateStats();
    monitorInterval(true);
  }
}

function monitorInterval(isStart){
  if(isStart) window.setInterval(()=>window.vm.$root.$children[0].$children[0].updateStats(),1000)
}

</script>

<style lang="scss" scoped>
@import "./../../css/vars";


.main-container{
  width: 260px;
  margin: auto;
  overflow: hidden;
}

.stats-container{
    width: 100%;
    font-family: $mainFont;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 20px;
    .box{
        background-color: $secondaryColor;
        width: 75px;
        text-align: center;
        padding: 10px 0px;
        border-radius: 6px;
        display: inline-block;
        margin-left: 12px;
        
        &:nth-child(1){
            margin-left: 0px;
        }
        .paramName{
            display: block;
            width: 100%;
        }
        
        .paramNum{
            display: block;
            font-weight: bold;
            color: $accentColor;
            margin-top: 10px;
        }
    }
}

.time-container{
    background-color: $secondaryColor;
    width: 134px;
    margin: 25px auto;
    border-radius: 6px;
    font-family: $mainFont;
    box-sizing: border-box;
    div{
        display: table;
        margin: 0px auto;
        padding-top: 14px;
        padding-bottom: 15px;
        height: 27px;
        svg{
            width: 24px;
            height: 24px;
        }
        span{
            margin-left: 15px;
            display: block;
            float:right;
            height: 100%;
            line-height: 25px;
            font-size:16px;
            font-weight: bold;
        }
    }
}

.circle{
  background-color: $secondaryColor;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  margin: auto;
  margin-top: 52px;
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