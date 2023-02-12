export type jwtPayload = {
    email: string
    userId: string
}
export type JwtPayloadWithRefreshtoken = jwtPayload & {
    refreshToken: string
}