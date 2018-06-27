<template>
	<div class="index-content">
		<h2 class="title-header">新增文章 <small> —— New Article</small></h2>
		<br>
		<div style="width: 75%;">

			<Form :model="article" :label-width="90">
				<FormItem label="文章标题">
					<Input v-model="article.title" placeholder="输入文章标题..."></Input>
				</FormItem>
				<FormItem label="所属栏目">
					<Select v-model="article.columnId1">
						<Option v-for="nav in navsLevel1" :key="nav.id" value="nav.id">{{nav.title}}</Option>
					</Select>

					<Select v-model="article.columnId2">
						<Option v-show="navsLevel2.length > 0" v-for="nav in navsLevel2" :key="nav.id" value="nav.id">{{nav.title}}</Option>
					</Select>


				</FormItem>
				<FormItem label="DatePicker">
					<Row>
						<Col span="11">
							<DatePicker type="date" placeholder="Select date" v-model="article.date"></DatePicker>
						</Col>
						<Col span="2" style="text-align: center">-</Col>
						<Col span="11">
							<TimePicker type="time" placeholder="Select time" v-model="article.time"></TimePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="Radio">
					<RadioGroup v-model="article.radio">
						<Radio label="male">Male</Radio>
						<Radio label="female">Female</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="Checkbox">
					<CheckboxGroup v-model="article.checkbox">
						<Checkbox label="Eat"></Checkbox>
						<Checkbox label="Sleep"></Checkbox>
						<Checkbox label="Run"></Checkbox>
						<Checkbox label="Movie"></Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem label="Switch">
					<i-switch v-model="article.switch" size="large">
						<span slot="open">On</span>
						<span slot="close">Off</span>
					</i-switch>
				</FormItem>
				<FormItem label="Slider">
					<Slider v-model="article.slider" range></Slider>
				</FormItem>
				<FormItem label="Text">
					<Input v-model="article.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
				</FormItem>
				<FormItem>
					<Button type="primary">Submit</Button>
					<Button type="ghost" style="margin-left: 8px">Cancel</Button>
				</FormItem>
			</Form>
		</div>
		
	</div>
</template>

<script>

export default {
	name: 'UserCMD_NewArticle',
	data () {
		return {
			article: {
				input: '',
				select: '',
				radio: 'male',
				checkbox: [],
				switch: true,
				date: '',
				time: '',
				slider: [20, 50],
				textarea: ''
			}
		}
	},
	mounted(){
		
	},
	methods : {

	}
}
</script>


<style scoped>

.index-content{
	padding: 16px 16px;
}
</style>
