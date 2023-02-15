import { invoke } from '@tauri-apps/api/tauri'

export async function UpdateConsul (url, content) {
    return invoke('fetch',{ content, url })
}

export async function StartServer (serverPath, port) {
    return invoke('start_server',{ serverPath, port })
}

export async function StopServer (port) {
    return invoke('stop_server',{ port: port })
}

