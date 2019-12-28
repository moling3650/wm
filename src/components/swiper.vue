<template>
  <view>
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
      <!-- <view v-for="(item, index) in images" :key="index"> -->
      <swiper-item>
        <image :src="images" class="slide-image" />
      </swiper-item>
      <!-- <swiper-item>
        <image src="https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640" class="slide-image" />
      </swiper-item>
         <swiper-item>
        <image src="https://images.unsplash.com/photo-1551446591-142875a901a1?w=640" class="slide-image" />
      </swiper-item>
         <swiper-item>
        <image src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640" class="slide-image" />
      </swiper-item> -->
      <!-- </view> -->
    </swiper>
  </view>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      images: {
        type: String,
        default: "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
      }
    },
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 500
      };
    }
  };
</script>

<style scoped>
  .swiper {
    height: 186px !important;
  }

  image {
    height: 100%;
    width: 100%;
  }
</style>
