<template>
    <ul class="detail-list">
        <li class="detail-item">
            <div class="detail-text">阿里</div>
            <div class="slider"></div>
            <div>70%</div>
            <div>赞</div>
        </li>
        <li class="detail-item">
            <div class="detail-text">蚂蚁金服</div>
            <div class="slider"></div>
            <div>70%</div>
            <div>赞</div>
        </li>
         <li class="detail-item">
            <div class="detail-text">蚂蚁金服大家都觉得</div>
            <div class="slider"></div>
            <div>70%</div>
            <div>赞</div>
        </li>
    </ul>
</template>
<script>
export default {
    name:'detailList'
}
</script>
<style lang="css" scoped>
.detail-list {
  margin: 22px 18px 0;
}
.detail-item {
  margin-bottom: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
}
.slider {
  display: inline-block;
  width: 200px;
  height: 25px;
  background: #4A90E2;
  vertical-align: text-top;
}
.detail-text {
  width: 70px;
  text-align: left;
  font-size: 14px;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

