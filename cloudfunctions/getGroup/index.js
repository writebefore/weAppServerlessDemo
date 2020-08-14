// 云函数入口文件
const cloud = require('wx-server-sdk')
// 环境
const env = "writebefore-ifk65"

cloud.init()
const db = cloud.database({env})

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(context);
  const wxContext = cloud.getWXContext()
  return await db.collection("group").where({
    createBy:wxContext.OPENID,
    deleted:false
  }).get().then(
    res => res
  ).catch(err => err);
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}