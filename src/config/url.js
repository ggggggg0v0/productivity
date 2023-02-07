
const ServerList = [   
    'bet-accumulator',
    'bet-accumulator-audit',
    'config',
    'free-ticket',
    'mission',
    'ms',
    'external',
    'point',
    'user',
    'marquee',
    'decoration',
    'reward',
    'fortune-recommend',
    'ms-panel',
    'notify',
    'pay-addition-card',
    'i18n'
].sort()

const running =  {}

const config = {
    "local": "http://localhost:",
    "dev": "http://devgateway.ptd-k8sdev.guardians.one/dev",
    "qa": "http://devgateway.ptd-k8sqa.guardians.one/dev",
    "sit": "http://devgateway.ptd-k8ssit.guardians.one/dev",
}

const local = "local"
const dev = "dev"
const qa = "qa"
const sit = "sit"

const defaultEnv = dev
const targetEnv = local
let port = 1324

var generateEnv = () => {
    let setting = ""

    for (let i in ServerList) {
        setting += `${ServerList[i]} = "${config[defaultEnv]}"\n`
    }

    return setting
}

var replaceURL = (source, server, url) => {
    return source.replace(new RegExp(`^${server}\\s*=\\s*".+"$`, 'gm'), `${server} = "${url}"`);
}

const Generate = () => {
    let defaultURL = generateEnv()
    let setting = defaultURL

    for (const [server, port] of Object.entries(running)) {
        let newURL = config[targetEnv] + port
        setting = replaceURL(setting, server, newURL)
    }

    return setting
}


class Config {
    constructor() {
      this.defaultEnv = dev
      this.targetEnv = local
      this.running = {}
    }

    GeneratePort(serverName) {
        let newRunningList = { ...this.running }
        let serverPort

        let ok = newRunningList[serverName]
        if (!ok) {
            port ++
            serverPort = port
            newRunningList[serverName] = port
        } else {
            serverPort = newRunningList[serverName]
            delete newRunningList[serverName]
        }

        this.running = newRunningList
        return serverPort
    }

    GetNewSetting() {
        let defaultURL = generateEnv()
        let setting = defaultURL
    
        for (const [server, port] of Object.entries(this.running)) {
            let newURL = config[targetEnv] + port
            setting = replaceURL(setting, server, newURL)
        }
    
        return setting
    }
}

export  default new Config()