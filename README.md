修复火狐浏览器回滚问题 :persevere: 
使用方法
new SimSwiper("#swiper-demo", {
	button: {// 前进后退按钮
		prev: "#prev", 
		next: "#next",
		},
		autoplay: false, // 自动轮播
		easing:'ease',// 过渡效果
		duration:300, // 过渡时长
		loop: true,// 循环轮播
		lazy:{
			prop:'_src',// 懒加载图片属性 xxx 替换 src
		},
		disableTouch:false,// 关闭触摸滑动 默认开启
		pagination: {
			el: ".pagination",// 指示点容器
			click: true, // 是否可以点击
		}
  });
