const TabPage = {
	data() {
		return {
			tabInfo: {
				TabCur: 0,
				scrollLeft: 0
			}
		}
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	},
};
export default TabPage;