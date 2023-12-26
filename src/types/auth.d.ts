export interface RegisterI {
    name: string
    email: string
    password: string
    userType: string
}

export interface ProfileI {
    uid: string
    gender: string
    birthdate: Date
    phone: string
    skill_level: string
    municipality: string
    weekly_availability: string
    sport: string
}

export interface LoginI {
    email: string
    password: string
}

export interface DecodedData {
    uid: string
    name: string
    email: string
    id: string
    type: 'regular' | 'admin'
    exp: any
    iat: any
}

export interface SendCodeI {
    email: string, type:'repassword' | 'identity_verified'
}

export interface ValidateAccountI {
    email: string,
    code: string,
    type:'repassword' | 'identity_verified'
}

export interface ResetPasswordI {
    email: string, password: string
}

export interface UserSchemaI {
    uid?: string
    name?: string
    email?: string
    password?: string
    metadata?: MetadataI
    created_at?: Date
}

export interface MetadataI {
    userType: 'admin' | 'regular'
    code?: string
    repassword?: boolean
    identity_verified?: boolean
    expireIn?: any
    isBlocked?: boolean
}