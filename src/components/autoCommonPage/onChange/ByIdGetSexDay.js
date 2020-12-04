const byIdGetSexBirth = {
  getBirth(idCard) {
    if (idCard.length == 18) {
      let birthday = "";
      if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
          birthday = "19" + idCard.slice(6, 12);
        } else if (idCard.length == 18) {
          birthday = idCard.slice(6, 14);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        //通过正则表达式来指定输出格式为:1990-01-01
      }
      return birthday;
    }
  },
  getSex(idCard) {
    if (idCard.length == 18) {
      let sexStr = '';
      if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
        sexStr = '01male';
      } else {
        sexStr = '02female';
      }
      return sexStr;
    }
  }
}

export default byIdGetSexBirth
