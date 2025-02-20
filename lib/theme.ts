
import { cookies } from 'next/headers'

export function getTheme() {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    return theme?.value || 'light'
}