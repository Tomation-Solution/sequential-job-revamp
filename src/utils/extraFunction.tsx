import jwt_decode from "jwt-decode";
import {UserType} from "../redux/api/authentication.api";


export type StyleTpe = {
    'style'?: {
        [Key: string]: string,
    }
}

export const createExternalStyle = (props: StyleTpe) => {
    let styles = ''
    if (props.style) {
        const all_keys = Object.keys(props.style)
        all_keys.map((key => {
            if (props.style) {
                styles = styles + ` ${key}:${props.style[key]}`
            }
            return key
        }))
    }
    return styles
}


export const getUser = (): UserType | null => {
    try {
        let data: any = localStorage.getItem('user')
        const logged_in_user: UserType = jwt_decode(JSON.parse(data)?.access)
        return logged_in_user
    } catch (err: any) {
        return null
    }
}

export const setUser = (data: { 'refresh': string, 'access': string }) => {
    localStorage.setItem('user', JSON.stringify(data))

    return getUser()
}

export const removeUserCred = (): void => {
    localStorage.removeItem('user')
}
