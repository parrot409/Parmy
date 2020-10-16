<template>
  <div>
    <h1 class="head-container">
      Parmy
    </h1>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <div class="icons">
      <a href="https://github.com" target="_blank"><i class="fas fa-bug"></i></a>
      <a href="https://github.com" target="_blank"><i class="fab fa-github"></i></a>
    </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import "/css/vars";
@font-face {
  font-family: "Open Sans SemiBold";
  src: url("./fonts/OpenSans-SemiBold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "Open Sans";
  src: url("./fonts/OpenSans-Regular.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.slide-leave-active{
  transition: 0.3s;
}

.slide-enter-active {
  transition: 0.4s;
}

.slide-enter {
  transform: translate(100%, 0);
}

.slide-leave-to {
  transform: translate(-100%, 0);
}

.slide > *{
  display: none!important;
}

*{
  margin: 0px;
  padding: 0px;
}

input{
  outline: none ;
  appearance: none ;
  box-shadow: none ;
  border: none;
}

body {
  width: $appwidth;
  height: $appheight;
  background-color: $primaryColor;
  color: white;
  font-family: $mainFont;
  font-size: $mainfontSize;
}

.icons{
  position: absolute;
  bottom: 5px;
  left: 152px;
  user-select: none;
  *:not(a){
    width: 19px;
    margin-left: 5px;
    height: 19px;
    color: $accentColor;
    cursor: pointer
  }

  *:hover{
    color: darken($accentColor,6%);
  }
}

.head-container{
  font-size: 20px;
  font-weight: 400;
  font-family: $secondaryFont;
  font-style: italic;
  display: block;
  margin-top: 15px;
  text-align: center;
}
</style>

