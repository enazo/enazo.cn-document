# API 说明文档

## 基础地址
https://enazo.cn/api/

## token
调用 API 时，部分地址需要在 `QueryString` 中接待 `token`，`token` 格式为 五至十位英文数字 `/^\w{5,10}$/` 
建议使用能简短描述服务名称的 `token` 字串

## 获取房间列表

 - 请求类型：`GET`
 - 请求地址：`draw/rooms`
 - token：需携带

### 示例
获取所有房间信息列表
```javascript
fetch('https://enazo.cn/api/draw/rooms?token=touhou').then(r=>r.json()).then(data=>{
	console.log(data.rooms); // 公开房间信息列表
	console.log(data.onLineNum); // 在线用户数
});
```


获取所有词库为 `东方project` 的房间信息列表，使用 `token` 为 `touhou`
```javascript
fetch('https://enazo.cn/api/draw/rooms?token=touhou').then(r=>r.json()).then(data=>{

	const { onLineNum, roomsNum, rooms } = data;

	const thoRooms = rooms.filter(room=>room.libName==='东方project');
	
	console.log(thoRooms);
	thoRooms.filter(room=>{
		console.log(
			`名称：${room.name}\n`+
			`地址：https://enazo.cn/r/${room.rid}\n`+
			`人数：${room.onlineMemberLength}\n`+
			`成员：${room.nicknames.join('、')}`
		);
	});
});
```

```javascript
[
	{
		"rid": "9463ad", // 房间 rid
		"name": "仅测试不画画", // 房间名称
		"libName": "东方project", // 房间词库
		"onlineMemberLength": 2, // 在线用户人数
		"drawMembersLength": 2, // 在线绘画人数
		"watchMembersLength": 0, // 在线仅猜人数
		"limit": 15, // 结算分数
		"roundSecond": 3600, // 回合绘图时间
		"status": 0, // 游戏状态 0:等待 1:游戏中
		"turn": true, // 轮换状态 
		"libLock": false, // 词库锁定
		"allowDraw": 10, // 允许最大绘画人数
		"allowWatch": 8, // 允许最大仅猜人数
		"nicknames": [ // 房间在线成员昵称列表
			"(ಥ_ಥ)",
			"测试用户1"
		]
	},
]
```
```
名称：仅测试不画画
地址：https://enazo.cn/r/9463ad
人数：2
成员：(ಥ_ಥ)、测试用户1
```


## 用户统计信息

`https://enazo.cn/api/social/member/g4upckk3w1d/stat?pretty`
