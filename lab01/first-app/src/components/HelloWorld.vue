<template>
  <div class="hello">
    <div style="padding:40px;">
      <h1>
        Hello from
        <span style="color:#29558C">Middleware[i</span>
        <span style="color:#AD5353">]nventory</span>
      </h1>
      <p>
        It is good to have you here this is a Simple Page in
        <span class="bg-info">Vue JS</span> and Running on
        <span class="bg-success">Docker Container</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>