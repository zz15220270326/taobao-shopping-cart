const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

module.exports = ({
	filename = 'xxx.json',
}) => {

	const getFile = () => {
		const jsonStr = readFileSync(resolve(__dirname, `../../../database/${filename}`), 'utf-8');

		return JSON.parse(jsonStr);
	}

  const setFile = (data = [], callback) => {
  	const jsonStr = JSON.stringify(data);

  	writeFileSync(resolve(__dirname, `../../../database/${filename}`), data, (...args) => {
  		callback && callback.apply(this, ...args);
  	})
  }

  const clearFile = (callback) => {
  	writeFileSync(resolve(__dirname, `../../../database/${filename}`), '[]', (...args) => {
  		callback && callback.apply(this, ...args);
  	});
  }

	return [
    getFile,
    setFile,
    clearFile
	];
}