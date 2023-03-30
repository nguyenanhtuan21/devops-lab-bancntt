<template>
  <div :class="['content-layout', [modeBg ? 'light' : 'dark']]">
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ContentComp",
  setup() {
    const modeBg = ref(true);
    const handleChangeMode = () => {
      modeBg.value = !modeBg.value;
    };
    return {
      modeBg,
      handleChangeMode,
    };
  },
};
</script>

<style scoped>
.content-layout {
  max-width: 600px;
  margin: 0 auto;
  padding: 12px;
  border: 1px #ccc solid;
  border-radius: 5px;
}
:deep(.home > p) {
  margin: 0;
}
</style>