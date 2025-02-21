import { cookies } from 'next/headers'

export async function getTheme() {
    const cookieStore = await cookies()
    return cookieStore.has('theme') ? cookieStore.get('theme')?.value : 'dark'
}