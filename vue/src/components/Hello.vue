<template>
  <div class="hello">
    第{{data}}页<br/>
    {{ msg.split('').join(',') }}<br/>
    {{ number+1 }}<br/>
    <span>{{ok ? 'YES' : 'NO'}}</span><br/>

     <div v-if="show">进入if</div> 
    <div v-else>进入else</div> 

    <br/><input type='button' value='change1' @click='dian(1)'/>
    <input type='button' value='change2' @click='dian(2)'/>
    <input type='button' value='change3' @click='dian(3)'/>
    <div v-if="ii==1">第一页</div>
    <div v-if="ii==2">第二页</div>
    <div v-if="ii==3">第三页</div>
    <table border='1'>
      <template v-for="(item,index) in items">
      <tr v-if='index%2==0'><td>{{item.a}}</td><td v-html="item.b"></td></tr>
      </template>
    </table>
  </div>
  
</template>

<script>
export default {
  created:function(){ 
       
  }, 
  mounted:function(){ 
       
  },
  data () {
    return {
      msg: '<font size="7">hello</font>',
      number:10,
      url:'http://www.sina.com.cn',
      cc:'color:red',
      aa:'aa',
      ok:true,
      show:false,
      ii:1,
      items:[
        {a:'aaaaaaaaaaaa',b:'<font size="7">bbbbb</font>'},
        {a:'tttttttt',b:'<font size="7">tttttt</font>'},
        {a:'rrrrrr',b:'<font size="7">eeeeee</font>'}
      ]
    }
  },
  methods:{
    dian:function(data){
      this.ii=data;
    }
  },
  computed:{
    data:function(){
      return this.ii;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aa{
  border:1px solid blue;
}
</style>
