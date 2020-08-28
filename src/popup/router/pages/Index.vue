<template>
  <div class="main-container">
    <h1 class="head-container">
      <input type="radio" name="A"/>
      Parmy
    </h1>
    <label class="checkbox-input">
      <input type="checkbox" />
      <span></span>
      Use scopes
    </label>
    <div class="text-input">
      <input type="text" placeholder="scope: *.google.com" />
    </div> 
    <div>
      <label class="radio-input"><input type="radio" name="A"/><span></span>JSON</label>
      <label class="radio-input"><input type="radio" name="A"/><span></span>Lines</label>
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

<style lang="scss" scoped>
@import "./../../css/vars";

@mixin hide-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.main-container{
  width: 260px;
  margin: auto;
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
  display:block;
  user-select: none;
  margin-top: 15px;
  input{
    @include hide-input;
  }

  span{
    display: block;
    height: 20px;
    width: 20px;
    background-color: $checkboxColor;
    border-radius: 4px;
    float: left;
    border: 1px solid darken($checkboxColor,10%);
    margin-right: 10px;
  }

  &:hover input ~ span {
    background-color: lighten($checkboxColor,5%);
  }

  span:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
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
}

.text-input{
  margin-top: 15px;
  input{
    width: 100%;
    border-radius: 6px;
    height: 40px;
    background-color: $secondaryColor;
    padding-left: 10px;
    color: lighten($darkTextColor,20%);
    font-size: 16px;
  }

  ::placeholder{
    color: $darkTextColor;
  }
}

.radio-input{
  width: 100%;
  input{
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span {
    display:block;
    height: 20px;
    width: 20px;
    background-color: $checkboxColor;
    border-radius: 50%;
  }

  &:hover input ~ span {
    background-color: lighten($checkboxColor,5%);
  }

  span:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  span:after {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
}












</style>
