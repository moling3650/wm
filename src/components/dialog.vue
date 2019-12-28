<template>
<div>
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{dialogObj['title']}}</strong></div>
        <div class="weui-dialog__bd">{{dialogObj['content']}}</div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">{{dialogObj['okText']}}</a>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'dialog',
    props: {
        dialogObj: {
            type: Object,
            require:true
        }
    }
}
</script>  
<style>
</style>