import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  paylod: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(paylod, secret, { expiresIn: expireTime } as jwt.SignOptions)
}
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelpers = {
  createToken,
  verifyToken,
}
