<template>
    <ul class="hisrory">
      <li class="history-list" v-for="item in listData" :key="item" @click="query(item)">
        # {{ item }} #
      </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "historyList",
    props: {
      listData: {
        type: Array,
        required: true
      }
    },
    methods: {
      query (name) {
        this.$emit('query', name)
      }
    }
  };
</script>

<style scoped lang="css">
.hisrory {
  margin-left: 10px;
}
.history-list{
  margin-top: 13px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 15px;
  color: #4A90E2;
  text-align: left;
}
</style>
