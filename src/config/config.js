import mongo from './mongo.js'
import mysql from './mysql.js'
import rmq from './rmq.js'

const Config = {
    ...mongo,
    ...mysql,
    ...rmq,
}

export default Config