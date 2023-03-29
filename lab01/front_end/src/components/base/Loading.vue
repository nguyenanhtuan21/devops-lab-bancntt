<template>
    <div class="overlay" id="loadingID">
        <div class="loading"></div>
    </div>
</template>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(51, 51, 51, 0.497);
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.loading {
    background-image: url('./../../assets/loading.svg');
    background-size: cover;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    /* z-index: 1000; */
}
.loading {
  animation: spin 1.4s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<script>
export default {
    name: 'loadingID',

}
</script>