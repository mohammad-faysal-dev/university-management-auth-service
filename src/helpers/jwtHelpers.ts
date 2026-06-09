import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  paylod: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(paylod, secret, { expiresIn: expireTime } as jwt.SignOptions)
}

export const jwtHelpers = {
  createToken,
}
