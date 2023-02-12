export type jwtPayload = {
    email: string
    userId: string
}
export type jwtPayloadWithRefreshtoken = {
    refreshToken: string
}