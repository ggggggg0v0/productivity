export default {
    
    // DEV
    "mongo_local": `host=[
"localhost:27017"
]
dbname="admin"
poollimit=50
maxIdleTimeMS=300000
minPoolSize=25
account="root"
password="testtest"
pool_size=10`,
    
    // DEV
    "mongo_dev": `host=[
"10.30.4.116:27017"
]
dbname="admin"
poollimit=50
maxIdleTimeMS=300000
minPoolSize=25
account="PTDNecessitas_seed"
password="7MHuMgbIJeN_cc"
pool_size=10`,

    // QA
    "mongo_qa": `host=[
"10.30.5.117:27017"
]
dbname="admin"
poollimit=50
maxIdleTimeMS=300000
minPoolSize=25
account="PTDNecessitas_rain"
password="7MHuMgbIJeN_ubr"
pool_size=10`,

    // SIT
    "mongo_sit": `host=[
"10.30.2.133:27017"
]
dbname="admin"
poollimit=50
maxIdleTimeMS=300000
minPoolSize=25
account="PTDNecessitas_bravo"
password="7MHuMgbIJeN_Orz"
pool_size=10`,
    
}
  