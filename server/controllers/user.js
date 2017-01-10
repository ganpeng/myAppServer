import co from 'co'

import User from '../models/user'
import utils from '../utils'



export function getVcode(req, res) {
  co(function*() {
      const { phone } = req.body
      const user = yield User.findOne({phone})

      if (user && user.isRegist) {
        return res.json({
          success: false,
          message: "手机号已注册，请尝试登录"
        })
      } else if(user && !user.isRegist) {
        const vcode = utils.getCode()
        user.vcode = vcode
        yield user.save()
        return res.json({
          success: true,
          vcode
        })
      } else {
        const vcode = utils.getCode()
        yield User.create({phone, vcode})
        return res.json({
          success: true,
          vcode
        })
      }
  })
  .catch((err) => {
    console.log(err)
  })
}



export function createUser(req, res) {
  co(function* () {
    const { phone, vcode, password } = req.body
    const user = yield User.findOne({phone})

    console.log(req.body)
    console.log(vcode)
    user && console.log(user.vcode)

    if (!user) {
      return res.json({
        success: false,
        message: "手机号不存在，请输入正确的手机号"
      })
    }

    if(user && user.vcode !== vcode) {
      return res.json({
        success: false,
        message: "验证码输入不正确"
      })
    }

    if (user && user.vcode === vcode) {
      user.password = password
      user.isRegist = true
      yield user.save()

      return res.json({
        success: true,
        message: "注册成功"
      })
    }

  })
  .catch((err) => {
    console.log(err)
  })
}



export default {
  createUser,
  getVcode
}
