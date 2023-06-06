<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3 text-center">
        <div class="card bg-danger text-light m-2">
          <br>
          <h2><strong>Unauthorized</strong></h2>
          <p>You are not authorized to access this page</p>
          <br>
        </div>
        <RouterLink to="/">Ir al Home</RouterLink>
      </div>
    </div>
  </div>
</template>
  
<script>
import { RouterLink } from 'vue-router';

export default {
  props: ["message"],
  components: { RouterLink }
};
</script>