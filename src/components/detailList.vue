<template>
    <ul class="detail-list">
        <li class="detail-item">
            <h6 class="title">{{newList.title}}</h6>
            <!-- <p class="content" v-html="newList.content">{{newList.content}}</p> -->
            <h6 class="title">开导开导</h6>
            <p class="content" >酒店叫大家</p>
        </li>
    </ul>
</template>
<script>
export default {
    name:'detailList',
    props:{
        newList: {
            type: Object,
            // require:true,
            default:() => {}
        }
    },
}
</script>
<style lang="css" scoped>
.detail-list{
    margin: 0 18px;
}
.detail-item{
    text-align: left;
}
.title{
    margin: 7px 0 14px 0;
    font-size: 14px;
    color: #333;
}
.content{
    font-size: 12px;
    color: #000000;
}
</style>

