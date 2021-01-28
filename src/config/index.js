let index = "";
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	index = "https://parent-api.jingyupeiyou.com";
	// socketUrl = "ws://8.129.186.35:6001/";
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	index = "https://parent-api.jingyupeiyou.com";
}
const courtConfig = {
	//微信公众号APPID
	publicAppId: "wx4e3748e71a685885",
	stsUrl: 'https://parent-api.jingyupeiyou.com/api/v1/referral/sd/upload/sign',
	Bucket: 'growth-1252525514',
	Region: 'ap-shanghai',
	//请求接口
	baseUrl: index,
	//平台名称
	platformName: "鲸鱼外教培优",
	//项目logo
	logoUrl: "https://qn.kemean.cn/upload/201906/19/3f3b4751f3ed4a97be804450c3ec4c79",
	//页面分享配置
	share: {
		title: '鲸鱼外教培优',
		// #ifdef MP-WEIXIN
		path: '/pages/home/home', //小程序分享路径
		// #endif
		// #ifdef H5 || APP-PLUS
		//公众号||APP分享
		desc: "鲸鱼外教培优小程序", // 分享描述
		link: "https://www.kemean.com/sameCity/18031201/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: "http://qn.kemean.cn/upload/201901/28/23bedfc34597482292ecd6dc107f6342", // 分享图标
		// #endif
	}
};
export default courtConfig

