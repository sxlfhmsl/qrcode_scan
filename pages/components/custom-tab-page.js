const TabPage = {
	data() {
		return {
			TabPage_tabInfo: {
				TabCur: 0,
				scrollLeft: 0
			}
		}
	},
	methods: {
		TabPage_tabSelect(e) {
			this.TabPage_TabCur = e.currentTarget.dataset.id;
			this.TabPage_scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	},
};
export default TabPage;