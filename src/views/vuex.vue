<template>
  <div id="vuex">
    <div class="margin">
      <pre v-html="syntaxHighlight(json)"></pre>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    methods:{
      syntaxHighlight(json) {
        if (!json){
          return json
        }
        if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 4);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        });
      }
    },
    computed:{
      ...mapGetters(['token','user_phone','user_avatar']),
      json(){
        return{
          token:this.token,
          user_phone:this.user_phone
        }
      }
    }
  }
</script>
<style>
  #vuex>.margin{
    width: 1000px;
    margin: 0 auto;
  }
  #vuex .box{
    width: 50%;
    height: 100px;
    background-color: snow;
  }
  #vuex pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
  #vuex .string { color: green; }        /*字符串的样式*/
  #vuex .number { color: darkorange; }    /*数字的样式*/
  #vuex .boolean { color: blue; }        /*布尔型数据的样式*/
  #vuex .null { color: magenta; }        /*null值的样式*/
  #vuex .key { color: red; }            /*key值的样式*/
</style>
