// src/App.tsx
import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Config from '../config/config'

function ConsulHelper() {
    const onChange = (event) => {
        const arg = event.target.value.split('.')
        const [dbType, ms, env] = [arg[0], arg[1], arg[2]]
		console.log(dbType, ms, env)
        const url = `http://127.0.0.1:8500/v1/kv/storage/${dbType}/${ms}/promote-ms?dc=dc1&flags=0`

        invoke('fetch',{ invokeMessage: Config[`${dbType}_${env}`], url }).then((message) => console.log("heyhet", message))
		return
    }

	const onChangeRMQ = (event) => {
        const url = `http://127.0.0.1:8500/v1/kv/storage/rmq/promote-ms?dc=dc1&flags=0`

        invoke('fetch',{ invokeMessage: config[event.target.value], url }).then((message) => console.log("heyhet", message))
		return
    }

	return (
		<div style={{padding: '20px 0 0 10px'}}>
				<div style={{display: 'flex'}}>
					<div style={{flexBasis: '150px'}}>
						<span>MySQL-Master</span>
					</div>
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
				</div>

				<div style={{display: 'flex'}}>
					<div style={{flexBasis: '150px'}}>
						<span>MySQL-Slave</span>
					</div>
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

				<div style={{display: 'flex'}}>
					<div style={{flexBasis: '150px'}}>
						<span>Mongo-Master</span>
					</div>
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

				<div style={{display: 'flex'}}>
					<div style={{flexBasis: '150px'}}>
						<span>Mongo-Slave</span>
					</div>
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
				</div>

				<div style={{display: 'flex'}}>
					<div style={{flexBasis: '150px'}}>
						<span>RMQ-MS</span>
					</div>
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
	)
}

export default ConsulHelper