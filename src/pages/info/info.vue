<template>
  <div class="info-bg">
    <div class="line-20"></div>  
    <div class="header-username">
        <img src="../../../static/images/user.png"/>
        <span class="right-float">图标</span>     
    </div>  
    <div class="info-list">
        <span class="left-float">基督教的</span>
        <span class="right-float">ttu</span>
        <i>66</i>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.info-bg{
    background-color: #f5f5f5;
    
}
.line-20{
    height: 20px;
}
.header-username{
    padding: 10px 28px 12px 10px;
    border:1px solid #eee;
    border-right:0;
    border-left:0; 
    background-color: #fff;
    img{
        width: 46px;
        height: 46px;
        background-size: 100%;
        vertical-align: middle;
    }
}
.info-list{
    width: 100%;
    height: 47px;
    line-height: 47px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
}
.left-float{
    float: left;
}
.right-float{
    float: right;
}
</style>
   


