<template>
	<el-row style="margin-bottom: 18px">
			<el-col :span='3'>&nbsp;</el-col>
			<el-col :span='3'>
				<levelnav/>
			</el-col>
			<el-col :span='15'>
				<roomlist/>
			</el-col>
			<el-col :span='3'>&nbsp;</el-col>
	</el-row>
		
		
</template>
<script>
import Levelnav from './Levelnav'
import RoomList from './RoomList'
	export default {
  		components:{
  			levelnav:Levelnav,
  			roomlist:RoomList
  		}
	}
</script>