/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-19 17:39:39
 * @LastEditTime: 2020-11-20 20:31:09
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by Aaron on 2018/3/16.
 */
import valid from '../../../lib/pub_valid'

const validCode = {
  p_vldmod_000: valid.val_isnull, // 不能为空
  p_vldmod_100: valid.val_number100, // 非负整数
  p_vldmod_101: valid.val_number101, // 正整数
  p_vldmod_102: valid.val_number102, // 整数
  p_vldmod_103: valid.val_number103, // 非负小数
  p_vldmod_104: valid.val_number104, // 正小数
  p_vldmod_105: valid.val_number105, // 小数
  p_vldmod_106: valid.val_number106, // 数字
  p_vldmod_107: valid.val_number107, // 正一位小数
  p_vldmod_200: valid.val_date, // 日期格式
  p_vldmod_201: valid.val_englishchar, // 英文字符
  p_vldmod_202: valid.val_postcode, // 邮政编码
  p_vldmod_203: valid.val_phone, // 固定电话、传真
  p_vldmod_204: valid.val_mobile, // 手机格式
  p_vldmod_205: valid.val_mail, // 邮件格式
  p_vldmod_206: valid.val_mulmail, // 多个邮件地址
  p_vldmod_207: valid.val_IdCard, // 身份证格式
  p_vldmod_208: valid.val_lenIsGreaterThan,//'长度大于',
  p_vldmod_209: valid.val_lenIsGreatEquThan,//'长度大于等于',
  p_vldmod_210: valid.val_lenIsEqualThan,//'长度等于',
  p_vldmod_211: valid.val_lenIsLessThan,//'长度小于',
  p_vldmod_212: valid.val_lenIsLessEquThan,//'长度小于等于',
  p_vldmod_213: valid.val_pORmobile,//手机格式或者固定电话
  p_vldmod_300: valid.val_isGreaterThan,//'大于',
  p_vldmod_301: valid.val_isGreatEquThan,//'大于等于',
  p_vldmod_302: valid.val_isLessThan,//'小于',
  p_vldmod_303: valid.val_isLessEquThan,//'小于等于',
  p_vldmod_304: valid.val_numOrEn,//数字或者英文
  p_vldmod_305: valid.val_numAndEn,//密码
  p_vldmod_306: valid.val_chineseChar,// 中文
  p_vldmod_400: valid.val_numOrEnUpper,//数字或者大写英文
  p_vldmod_401: valid.val_oneToTen,//0-10之间
  p_sdate_666:  valid.val_dataLess,//日期时间戳比较 生效失效日期
  p_vldmod_402: valid.val_radixZOF,//整数 或者一位小数 小数点后 0||5
  p_vldmod_403: valid.val_twoNum,//保留两位小数
  p_vldmod_404: valid.val_threeCapital,//三位大写字母
  p_vldmod_405: valid.vld_nolesss_400,
  p_vldmod_406: valid.val_bankCardNum,//银行卡号
  p_vldmod_407: valid.val_socialCreditCode,//统一社会信用代码
  p_vldmod_408: valid.vld_lessThan_100,//不能大于100
  p_vldmod_409: valid.val_lessCurDate,//小于等于当前日期
  p_vldmod_410: valid.val_oneNum,//保留一位小数
}

export default validCode
