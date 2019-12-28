<template>
    <ul class="tag-list">
      <li class="tag-item"
          v-for="(tag, index) in tagList"
          :key="tag"
          @click="clickTag(index)"
          :class="{ active: index == currentIndex }"
      >{{ tag }}</li>
    </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "tabTag",
    props: {
      tagList: {
        type: Array,
        required: true
      },
    },
    data () {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      clickTag(index) {
        this.currentIndex = index;
        this.$emit('change', this.tagList[index])
      }
    }
  };
</script>

<style scoped lang="css">
.tag-list {
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.tag-item {
  padding: 5px 14px;
  background: #F2F2F2;
  border: 1px solid #F5F5F9;
  border-radius: 100px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  margin-right: 8px;
  margin-top: 15px;
}
.active {
  background: #4A90E2;
  color: #fff;
}
</style>
