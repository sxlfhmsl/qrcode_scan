class TableElem {
	/**
	 * @description 表格元素
	 * @param {Object} classContent 类
	 * @param {Object} styleContent 样式
	 * @param {Object} content 内容
	 */
	constructor(classContent, styleContent, content) {
	    this.classContent = classContent;
		this.styleContent = styleContent;
		this.content = content;
		this.cols = [];
	}
};

export default TableElem;