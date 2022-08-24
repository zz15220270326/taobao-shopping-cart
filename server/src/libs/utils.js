/**
 * 获取淘宝列表的数据
 */
function getRecomendItems(className = 'recommend-item') {
	const oItems = [].slice.call(document.getElementsByClassName(className)),
				itemList = oItems.reduce((list, oItem) => {
					let oLink = oItem.getElementsByTagName('a')[0],
							oImg = oItem.getElementsByTagName('img')[0],
							oSpan = oItem.getElementsByTagName('span')[0],
							item = {};

					oLink.getAttributeNames().forEach(attr => {
						item[`a_${attr}`] = oLink.getAttribute(attr);
					});
					oImg.getAttributeNames().forEach(attr => {
						item[`img_${attr}`] = oImg.getAttribute(attr);
					});

					item.title = oSpan.innerText;

			    list.push(item);

					return list;
				}, []);

	return itemList.sort(function (a, b) {
		if (a.hasOwnProperty('a_data-index') && b.hasOwnProperty('a_data-index')) {
			if (a['a_data-index'] > b['a_data-index']) {
				return b;
			}
		}
		return a;
	});
}