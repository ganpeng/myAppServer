import speakeasy from 'speakeasy'


export function getCode() {
  const secret = speakeasy.generateSecret({length: 20})
  const code = speakeasy.totp({
    secret: secret.base32,
    digits: 6
  })
  return code
}


export default {
  getCode
}
