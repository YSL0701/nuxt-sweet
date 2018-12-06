<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style lang="scss" scoped>
div {
  font-size: 20px;
  font-weight: bold;
  color: #f00;
}
</style>
