// src/App.tsx
import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

const config = {
	// Mysql Local
	"mysql_local": `host = "localhost:3306"
account = "PTDNecessitas_seed"
password = "7MHuMgbIJeN_cc"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,

	// Mysql DEV
	"mysql_dev": `host = "10.30.4.114:3306"
account = "PTDNecessitas_seed"
password = "7MHuMgbIJeN_cc"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,
	// Mysql QA
	"mysql_qa": `host = "10.30.5.115:3306"
account = "PTDNecessitas_rain"
password = "7MHuMgbIJeN_ubr"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,
	// Mysql SIT
	"mysql_sit": `host = "10.30.2.131:3306"
account = "PTDNecessitas_bravo"
password = "7MHuMgbIJeN_Orz"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,

	// Mongo DEV
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

	// Mongo DEV
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
	// Mongo QA
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
	// Mongo SIT
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

	// RMQ Local
	"rmq-ms_local": `host="127.0.0.1"
account="guest"
password="guest"
port=30671

[queue]
source="source"
bet_accumulator="betAccumulator"
mission="mission"
free_ticket = "freeTicket"
pay_addition_card = "payAdditionCard"

[qos]
source=32768
broadcast=32768
bet_accumulator=32768
free_ticket=32768
pay_addition_card=32768`,

	// RMQ DEV
	"rmq-ms_dev": `host="10.30.78.47"
account="guest"
password="guest"
port=30671

[queue]
source="source"
bet_accumulator="betAccumulator"
mission="mission"
free_ticket = "freeTicket"
pay_addition_card = "payAdditionCard"

[qos]
source=32768
broadcast=32768
bet_accumulator=32768
free_ticket=32768
pay_addition_card=32768`,

	// RMQ QA
	"rmq-ms_qa": `host="10.30.78.88"
account="guest"
password="guest"
port=30671

[exchange]
source=""
broadcast="ms.broadcast"

[exchangeType]
source="direct"
broadcast="fanout"

[queue]
source="source"
bet_accumulator="betAccumulator"
mission="mission"
free_ticket = "freeTicket"
pay_addition_card = "payAdditionCard"

[qos]
source=32768
broadcast=32768
bet_accumulator=32768
free_ticket=32768
pay_addition_card=32768`,

	// RMQ SIT
	"rmq-ms_sit": `host="10.30.78.63"
account="guest"
password="guest"
port=30671

[exchange]
source=""
broadcast="ms.broadcast"

[exchangeType]
source="direct"
broadcast="fanout"

[queue]
source="source"
bet_accumulator="betAccumulator"
mission="mission"
free_ticket = "freeTicket"
pay_addition_card = "payAdditionCard"

[qos]
source=32768
broadcast=32768
bet_accumulator=32768
free_ticket=32768
pay_addition_card=32768`

}




function ConsulHelper() {
    const onChange = (event) => {
        const arg = event.target.value.split('.')
        const [dbType, ms, env] = [arg[0], arg[1], arg[2]]
		console.log(dbType, ms, env)
        const url = `http://127.0.0.1:8500/v1/kv/storage/${dbType}/${ms}/promote-ms?dc=dc1&flags=0`

        invoke('fetch',{ invokeMessage: config[`${dbType}_${env}`], url }).then((message) => console.log("heyhet", message))
		return
    }

	const onChangeRMQ = (event) => {
        const url = `http://127.0.0.1:8500/v1/kv/storage/rmq/promote-ms?dc=dc1&flags=0`

        invoke('fetch',{ invokeMessage: config[event.target.value], url }).then((message) => console.log("heyhet", message))
		return
    }

	return (
		<>
				<span>MySQL-Master</span>
				<div>
					<div>
					<input name="mysql_master" value="mysql.master.dev" type="radio" onChange={onChange} required />
					<label>Dev</label>
					</div>
					<div>
					<input name="mysql_master" value="mysql.master.qa" type="radio" onChange={onChange} required />
					<label>QA</label>
					</div>
					<div>
						<input name="mysql_master" value="mysql.master.sit" type="radio" onChange={onChange} required />
						<label>Sit</label>
					</div>

					<span>MySQL-Slave</span>
				<div>
					<div>
					<input name="mysql_slave" value="mysql.slave.dev" type="radio" onChange={onChange} required />
					<label>Dev</label>
					</div>
					<div>
					<input name="mysql_slave" value="mysql.slave.qa" type="radio" onChange={onChange} required />
					<label>QA</label>
					</div>
					<div>
						<input name="mysql_slave" value="mysql.slave.sit" type="radio" onChange={onChange} required />
						<label>Sit</label>
					</div>
				</div>

					<span>Mongo-Master</span>
				<div>
					<div>
						<input name="mongo_master" value="mongo.master.local" type="radio" onChange={onChange} required />
						<label>Local</label>
					</div>
					<div>
						<input name="mongo_master" value="mongo.master.dev" type="radio" onChange={onChange} required />
						<label>Dev</label>
					</div>
					<div>
						<input name="mongo_master" value="mongo.master.qa" type="radio" onChange={onChange} required />
						<label>QA</label>
					</div>
					<div>
						<input name="mongo_master" value="mongo.master.sit" type="radio" onChange={onChange} required />
						<label>Sit</label>
					</div>
				</div>

					<span>Mongo-Slave</span>
				<div>
				<div>
					<input name="mongo_slave" value="mongo.slave.local" type="radio" onChange={onChange} required />
					<label>Local</label>
				</div>
				<div>
					<input name="mongo_slave" value="mongo.slave.dev" type="radio" onChange={onChange} required />
					<label>Dev</label>
				</div>
				<div>
					<input name="mongo_slave" value="mongo.slave.qa" type="radio" onChange={onChange} required />
					<label>QA</label>
				</div>
				<div>
					<input name="mongo_slave" value="mongo.slave.sit" type="radio" onChange={onChange} required />
					<label>Sit</label>
				</div>

				<span>RMQ-MS</span>
				<div>
					<div>
						<input name="rmq-ms" value="rmq-ms_local" type="radio" onChange={onChangeRMQ} required />
						<label>Local</label>
					</div>
					<div>
						<input name="rmq-ms" value="rmq-ms_dev" type="radio" onChange={onChangeRMQ} required />
						<label>Dev</label>
					</div>
					<div>
						<input name="rmq-ms" value="rmq-ms_qa" type="radio" onChange={onChangeRMQ} required />
						<label>QA</label>
					</div>
					<div>
						<input name="rmq-ms" value="rmq-ms_sit" type="radio" onChange={onChangeRMQ} required />
						<label>Sit</label>
					</div>
				</div>

			</div>
			</div>
		</>
	)
}

export default ConsulHelper