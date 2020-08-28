<template>
  <div class="main-container">
    <h1 class="head-container">
      Parmy
    </h1>
    <label class="checkbox-input">
      <input @click="triggerTextInput()" ref="isScoped" type="checkbox" />
      <span></span>
      Use scopes
    </label>
    <div class="text-input">
      <input :class="{'addpadd':isScoped}" type="text" placeholder="Scope: *.google.com" />
      <div :class="{'open':isScoped,'close':isScoped === false}" class="text-input-status" >
        <i class="fa fa-times" aria-hidden="true"></i>
        <!--<i class="fas fa-check" aria-hidden="true"></i> -->
      </div>
    </div> 
    <div class="checkbox-input multiple">
      <label>
        <input type="checkbox" />
        <span></span>
        GET
      </label>
      <label>
        <input type="checkbox" />
        <span></span>
        POST
      </label>
      <label>
        <input type="checkbox" />
        <span></span>
        Cookies
      </label>
    </div>
    <div class="radio-input">
      <label><div><input type="radio" name="A"/><span></span>JSON</div></label>
      <label><div><input type="radio" name="A"/><span></span>Lines</div></label>
    </div>
    <label class="checkbox-input">
      <input type="checkbox" />
      <span></span>
      Include parameter types
    </label> 
    <div class="circle">
      <i class="fas fa-power-off"></i>
    </div>
    <div class="icons">
      <a href="https://twitter.com/0xParrot" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="https://github.com" target="_blank"><i class="fab fa-github"></i></a>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isScoped: null
    }
  },
  methods: {
    triggerTextInput: function(){
      this.isScoped = this.$refs["isScoped"].checked
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
  margin: auto;
  overflow: hidden;
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
    background-color: rgb(216, 3, 3);
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

.icons{
  position: absolute;
  bottom: 5px;
  left: 149px;
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





</style>
