<template>
	<div class="top-nav">
		<div class="login-wrapper">
		<router-link to="/login" class="nav-login-btn" tag="button">登陆</router-link>
		</div>
		<div class="register-wrapper">
		<router-link to="register" class="nav-register-btn" tag="button">注册</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.top-nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 60px;
		width: 100%;
		// border: 1px solid red;
		background-color: white;
		box-shadow: 0 0 20px lightgrey;
		z-index: 100;
	}

	.login-wrapper, .register-wrapper {
		height: 60px;
		line-height: 60px;
		float: right;
		margin-right: 20px;
	}

	.nav-login-btn, .nav-register-btn {
		width: 85px;
		height: 32px;
		line-height: 32px;
		border: 1px solid #00a0ff;
		border-radius: 4px;
		color: white;
		background-color: #00a0ff;
		cursor: pointer;
		font-size: 14px;
	}
</style>