/**
 * 当前项目的后端接口
 */
// const BASE_URL = 'http://localhost:9001';
const BASE_URL = 'http://43.142.103.23:9001';

/**
 * 首页获取数据的接口集合
 */
const INDEX_APIS = {
	GET_LIST_DATA: '/goods/get-goods-list'
};
/**
 * 详情页获取数据的接口集合
 */
const DETAIL_APIS = {

};
/**
 * 购物车页面获取数据的接口集合
 */
const CART_APIS = {

};

/**
 * 本地缓存的购物车key值
 */
const STORAGE_CART_KEY = 'STORAGE_CART_KEY';

export {
	BASE_URL,
	INDEX_APIS,
	DETAIL_APIS,
	CART_APIS,
	STORAGE_CART_KEY,
};
