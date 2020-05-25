class TableEgAElem {
	/**
	 * @param {Object} title 标题
	 * @param {Object} content 内容
	 * @param {Object} titleWidth 标题宽度
	 * @param {Object} contentWidth 内容宽度
	 * @param {Object} titleColor 标题颜色
	 * @param {Object} contentColor 内容颜色
	 */
	constructor(title, content, titleWidth, contentWidth, titleColor, contentColor) {
	    this.title = title;
		this.content = content;
		this.titleWidth = titleWidth;
		this.contentWidth = contentWidth;
		this.titleColor = titleColor;
		this.contentColor = contentColor;
	}
};

export default TableEgAElem;