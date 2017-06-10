<template>
	<div>
		<el-row style="margin-bottom: 18px">
			<el-col :span='6' style='text-align: center'>&nbsp;</el-col>
			<el-col :span='12' style='text-align: center'>欢迎来斗地主</el-col>
			<el-col :span='6' style='text-align: center'>&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">&nbsp;</el-col>
			<el-col :span="12" style='align-content: center;border:1px solid #99a9bf;padding: 21px;'>
				<el-form ref="form" name='loginForm'>
					<el-form-item style='text-align: center;margin:0px;'>
						登陆
					</el-form-item>
				  <el-form-item >
				    <el-input placeholder="请输入email" style='margin-bottom:15px' name='email'></el-input>
				    <el-input placeholder="请输入密码" type='password' name='pwd'></el-input>
				  </el-form-item>
				  <el-form-item style='text-align: center'>
				    <el-button type="primary" @click='login'>登陆</el-button>
				    <router-link to="/register">
				    	<el-button>注册</el-button>
				    </router-link>
				  </el-form-item>
				</el-form>
			</el-col>
			<el-col :span="6">&nbsp;</el-col>
		</el-row>
	</div>
</template>
<script>
import {login} from '../vuex/actions/UserAction';

	export default {
	  data () {
	    return {
	      
	    }
	  },
	  methods:{
	  	login:function(e){
	  		login(loginForm,this);
	  	}
	  }
	}
</script>