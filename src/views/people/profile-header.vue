<template>
  <div class="profile-header">
    <div class="user-cover">
      <!--<img style="width: 100%" src="https://pic4.zhimg.com/80/v2-28e2fd6519981f5c6f5609fe0987442b_r.jpg" alt="">-->
      <user-cover-editor></user-cover-editor>
    </div>
  </div>
</template>
<script>
  import UserCoverEditor from './profile-header/user-cover-editor'
  export default {
    components:{
      'user-cover-editor': UserCoverEditor
    }
  }
</script>
