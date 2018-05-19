<template>
	<div id="app" class="layout">
		<Menu mode="horizontal" :theme="theme" active-name="1">

			<div style="float: left;width: 48px;" pc>
				&emsp;
			</div>
			<div class="layout-logo" @click.prevent="toggleTheme">
				<img src="static/images/logo.png" alt="">
			</div>

			<div style="float: right; width: 32px;" pc>
				&emsp;
			</div>
			<div v-if="!login" class="layout-nav" >
				<MenuItem name="btnRegist">
					<a href="" @click.prevent="modalRegist = true">注 册</a>
				</MenuItem>
				<MenuItem name="btnLogin">
					<a href="" @click.prevent="modalLogin = true">登 录</a>
				</MenuItem>
			</div>
			<div v-else class="layout-nav">
				<MenuItem name="btnBlog_PC" pc>
					<router-link to="/">我的博客</router-link>
				</MenuItem>
				<Submenu name="btnMenu">
                    <template slot="title">
                        <Avatar :src="user.iconPath" />
                        &nbsp;<a href="javascript:;">{{user.nickName}}</a>
                    </template>
                    <MenuItem name="btnMenu_Console">
						<router-link to="/">我的控制台</router-link>
					</MenuItem>
					<MenuItem style="display:block !important;" name="btnBlog_Mobile" mobile>
						<router-link to="/">我的博客</router-link>
					</MenuItem>
                    <MenuItem name="btnMenu_Logout">
						<a href="" @click.prevent="logout">注销登录</a>
					</MenuItem>
                </Submenu>
			</div>
		</Menu>
		<Row :style="{backgroundColor: (theme === 'dark'? '#495060':'') }">
			<Col ref="sidebar" :lg="5" :md="8" :sm="0" :xs="0" :style="{height: sidebarHeight + 'px'}">
				<Menu width="auto" :theme="theme" :style="{height: sidebarHeight + 'px', paddingLeft:'72px'}">
					<MenuGroup title="热门搜索关键词">
						<MenuItem name="keywordMenu_1">
							<a href="javascript:;">C/C++</a>
						</MenuItem>
						<MenuItem name="keywordMenu_2">
							<a href="javascript:;">Unity脚本</a>
						</MenuItem>
						<MenuItem name="keywordMenu_3">
							<a href="javascript:;">SpringMVC</a>
						</MenuItem>
						<MenuItem name="keywordMenu_4">
							<a href="javascript:;">3D动画制作</a>
						</MenuItem>
						<MenuItem name="keywordMenu_5">
							<a href="javascript:;">Spring Boot</a>
						</MenuItem>
					</MenuGroup>
					<MenuGroup title="推荐阅读主题">
						<MenuItem name="keywordMenu_6">
							<a href="javascript:;">C++ Boost库</a>
						</MenuItem>
						<MenuItem name="keywordMenu_7">
							<a href="javascript:;">Java服务端开发</a>
						</MenuItem>
						<MenuItem name="keywordMenu_8">
							<a href="javascript:;">Spring 全家桶</a>
						</MenuItem>
						<MenuItem name="keywordMenu_9">
							<a href="javascript:;">Python Flask</a>
						</MenuItem>
						<MenuItem name="keywordMenu_9">
							<a href="javascript:;">3D动画制作</a>
						</MenuItem>
					</MenuGroup>
					<MenuGroup title="便捷入口">
						<MenuItem name="toolMenu_1">
							<a href="javascript:;">意见反馈</a>
						</MenuItem>
						<MenuItem name="toolMenu_2">
							<a href="javascript:;">友情链接</a>
						</MenuItem>
						<MenuItem name="toolMenu_3">
							<a href="javascript:;">捐赠/Donate!</a>
						</MenuItem>
					</MenuGroup>
				</Menu>
			</Col>

			<!-- 主体 -->
			<Col ref="content" :lg="19" :md="16" :sm="24" :xs="24">

				<div class="main-content">
					<router-view/>
				</div>
				

				<div class="footer">
					<!-- 底部固定区域 -->
					© 2017 blog.noobug.org 闽ICP备17017285
					<p>转载文章请注明出处</p>
				</div>
			</Col>
		</Row>
		<Row>
			
		</Row>
		<!-- 登录模态框 -->
		<Modal v-model="modalLogin" title="登 录" @on-ok="formLoginSubmit" width="25" loading>
			<Form :model="formLogin" :label-width="40">
				<FormItem label="帐号">
					<Input v-model="formLogin.account" placeholder="请输入帐号..."></Input>
				</FormItem>
				<FormItem label="密码">
					<Input v-model="formLogin.password" placeholder="请输入密码..."></Input>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
export default {
	name: 'App',
	data(){
		return {
			theme:"dark",
			modalLogin: false,
			modalRegist: false,
			login: false,
			user: {
				iconPath: "static/images/default_icon.png",
				nickName: "游客"
			},
			formLogin:{
				account: "",
				password: ""
			},
			sidebarHeight: 1000
		}
	},
	mounted(){
		var token = this.$localStorage.get("token");
		var user = this.$localStorage.get("user");
		if(token){
			this.login = true;
			this.user = this.fixUserInfo(JSON.parse(user));
		}

		this.fixSidebarHeight();
	},
	methods:{
		fixUserInfo(u){
			if(u.iconPath){
				u.iconPath = this.$http.options.root + u.iconPath;
			}
			return u;
		},
		formLoginSubmit(){
			this.$http.post("api/user/login", this.formLogin)
				.then((res) => {
					let result = res.body;

					if(result.success){
						this.$localStorage.set("token", result.data);
						let header = {"Authorization": "Bearer " + result.data};

						// 获取登录用户信息
						this.$http.get("api/user/info", {headers:header})
							.then((res) => {
								let result = res.body;
								
								if(result.success){
									this.$localStorage.set("user", JSON.stringify(result.data));
									
									this.modalLogin = false;
									this.user = this.fixUserInfo(result.data);
									this.login = true;
									this.$Message.info("登录成功");
								}else{
									this.$Message.error(result.msg);
								}
							},
							(err) => {
								this.$Message.error("网络异常");
							});
					}else{
						this.$Message.error(result.msg);
					}
				},(err) => {
					this.$Message.error("网络异常");
				});
		},
		logout() {
			this.$localStorage.remove("user", null);
			this.$localStorage.remove("token", null);

			this.$router.go();
		},
		toggleTheme() {
			this.theme = this.theme === 'light' ? "dark" : "light";
		},
		fixSidebarHeight(){
			console.log(this.$refs.sidebar.height)
			this.sidebarHeight = this.$refs.content.$el.offsetHeight
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.layout-logo{
    width: 160px;
    height: 42px;
    float: left;
    position: relative;
    top: 8px;
    left: 12px;
}

.layout-logo img{
	width: 160px;
	height: 42px;
	cursor: pointer;
}

.layout-nav{
	float: right;
	margin: 0 auto;
}

.layout-nav a{
	font-size: 14px;
}

.ivu-menu-item-group-title{
	margin-left:-24px;
	font-weight: bold;
	font-size: 16px !important;
}

.ivu-menu-dark .ivu-menu-submenu-title a {
	color: lightseagreen;
}

.ivu-menu-dark:not(.ivu-menu-vertical) .ivu-menu-item a{
	color: lightseagreen;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item a{
	color: lightgray;
}

.ivu-menu-dark .ivu-menu-item-group-title{
	color: lightseagreen !important;
}

.main-content{
	min-height: 720px;
	background-color: white;
}

</style>
