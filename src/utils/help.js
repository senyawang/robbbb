export const number_format = (val) => {
　　/*
　　 * 参数说明：
　　 * number：要格式化的数字
　　 * decimals：保留几位小数
　　 * dec_point：小数点符号
　　 * thousands_sep：千分位符号
　　 * */
  var str = (val / 100).toFixed(2) + '';
  var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
  var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
  var ret = intSum + dot;
  return ret;
}


/**
 * 获得地址栏传递参数
 * @returns {null}
 */
export const getLocationParams = (loc = location) => {
  let { search } = loc;
  if (search && search.length > 1) {
    const params = {};
    search = search.substring(1);
    search.split('&').forEach(item => {
      const tempParam = item.split('=');
      params[tempParam[0]] =
        tempParam[1] === '' ? null : decodeURIComponent(tempParam[1]);
    });
    return params;
  }
  return null;
};
