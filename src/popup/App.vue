<template>
  <div>
    <router-view></router-view>
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

@import "/css/vars";

*{
  margin: 0px;
  padding: 0px;
}

input{
  outline: none ;
  // -webkit-appearance: none ;
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
</style>

