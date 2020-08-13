// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = "writebefore-ifk65"


cloud.init()
const db = cloud.database({env})
exports.main = async (event, context) =>{
  console.log(event);
  const userInfo = event.userInfo;
  // 连通数据库
  return await db.collection("group").add({
    data:{
      name:event.groupName,
      createBy:userInfo.openId,
      createTime:new Date(),
      deleted:false,
      updateTime:new Date()
    }
  }).then(res =>{
   return db.collection('userGroup').add({
      data:{
        groupId:res._id,
        userId:userInfo.openId,
        invalid:false
      }
    })
  })
}

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }