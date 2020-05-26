const RequestType = {
	// 每一位需独立标识
	NORMAL:     0x00000000,                      // 普通请求
	NEED_TOKEN: 0x00000001,                      // 需要加入TOKEN的请求
};

export default RequestType;