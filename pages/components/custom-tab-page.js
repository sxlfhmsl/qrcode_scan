const TabPage = {
	data() {
		return {
			TabPage_tabInfo: {
				TabCur: 0,
				scrollLeft: 0,
				TabItems: []
			}
		}
	},
	methods: {
		TabPage_tabSelect(e) {
			this.TabPage_tabInfo.TabCur = e.currentTarget.dataset.id;
			this.TabPage_tabInfo.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	},
};
export default TabPage;