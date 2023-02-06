// src/App.tsx
import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Config from '../config/config'

const serverList = [
	"bet-accumulator",
	"bet-accumulator-audit",
	"code",
	"config",
	"cron-job",
	"decoration",
	"external",
	"ez-login",
	"fortune-recommend",
	"free-ticket",
	"i18n",
	"marquee",
	"mission",
	"ms",
	"ms-panel",
	"ms_tool",
	"notify",
	"order-filter",
	"pay-addition-card",
	"point",
	"reward",
	"tool",
	"user",
	"user-profile",
]

const coolInfoStyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
const coolWarnStyle = 'background-color: darkred; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'

const copyToClipboard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
}

function ConsulHelper() {
	const [checkBox, setCheckBox] = useState({})

    const onChange = (event) => {
        const arg = event.target.value.split('.')
        const [dbType, ms, env] = [arg[0], arg[1], arg[2]]
        const url = `http://127.0.0.1:8500/v1/kv/storage/${dbType}/${ms}/promote-ms?dc=dc1&flags=0`

        invoke('fetch',{ invokeMessage: Config.Config[`${dbType}_${env}`], url }).then((message) => message && console.log(":)", message))
		return
    }

	const onChangeRMQ = (event) => {
        const url = `http://127.0.0.1:8500/v1/kv/storage/rmq/promote-ms?dc=dc1&flags=0`

        invoke('fetch',{ invokeMessage: Config.Config[event.target.value], url }).then((message) => message && console.log(":)", message))
		return
    }

	const onChangeServer = (serverName) => {
        const url = `http://127.0.0.1:8500/v1/kv/url/ms?dc=dc1&flags=0`
		let port = Config.serverURLConfig.GeneratePort(serverName)

		setCheckBox((value) => {
			let newCheckBox = {
				...value,
			}

			if (value[serverName]) {
				delete newCheckBox[serverName]
				invoke('stop_server',{ port: `${port}` }).then((message) => message && console.log(":-)", message))

			} else {
				newCheckBox[serverName] = true
			}

			return newCheckBox
		})

		let command = checkBox[serverName] ?
		`lsof -i :${port} | awk '{ if (NR!=1) { print $2;}}' | xargs kill -9` :
		`cd /Users/peter/p/ptd/backend/ms/${serverName}; go run main.go -p ${port}`

		copyToClipboard(command);
		console.log(`%c${command}`, checkBox[serverName] ? coolWarnStyle : coolInfoStyle)

        invoke('fetch',{ invokeMessage: Config.serverURLConfig.GetNewSetting(), url }).then((message) => message && console.log(":)", message))
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
				
				<div style={{display: 'flex', flexWrap: 'wrap'}}>
					{
						serverList.map( serverName => {
							return (
								<div key={serverName} style={{flexBasis: '180px'}} onClick={() => {onChangeServer(serverName)}} >
									<input type="checkbox" checked={!!checkBox[serverName]} onChange={(e) => {e.stopPropagation() && onChangeServer(serverName);}} />
									<label>{serverName}</label>
								</div>
							)
						})
					}
				</div>
		</div>
	)
}

export default ConsulHelper