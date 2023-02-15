import mongo from './mongo.js'
import mysql from './mysql.js'
import rmq from './rmq.js'
import serverURL from './url.js'
import GenerateNginxConfig from './ms_nginx.js'

const Config = {
    ...mongo,
    ...mysql,
    ...rmq,
}

export default {
    Config,
    serverURLConfig: serverURL,
    GenerateNginxConfig,
}