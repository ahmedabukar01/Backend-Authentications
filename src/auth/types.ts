export type PayloadJwt = {
    email: string,
    userId: string,
}

export type PayloadWithRefreshToken = PayloadJwt & {
    refreshToken: string,
}