// src/App.tsx
import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

const config = {
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
}




function ConsulHelper() {

    const onChange = (event) => {
        // split `mysql.master.dev` to ['mysql', 'master', 'dev']
        const arg = event.target.value.split('.')
        const [dbType, ms, env] = [arg[0], arg[1], arg[2]]
        const url = `http://127.0.0.1:8500/v1/kv/storage/${dbType}/${ms}/promote-ms?dc=dc1&flags=0`


        invoke('fetch',{ invokeMessage: config[`${dbType}_${env}`], url }).then((message) => console.log("heyhet", message))



		return


        fetch(url, {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/json; charset=UTF-8",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-consul-token": "",
                "x-requested-with": "XMLHttpRequest",
                "Referrer-Policy": "strict-origin-when-cross-origin"
              },
            "body": config[`${dbType}_${env}`],
            "method": "PUT"
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Something went wrong');
          })
          .then((responseJson) => {
            // Do something with the response
          })
          .catch((error) => {
            console.log(error)
          });

        // fetch('/helper/consul', {
        //     method: 'POST',
        //     body: JSON.stringify({ "data": this.value }),
        //     headers: { 'Content-Type': 'application/json' },
        // })
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
          </div>
          </>
)


  }

  export default ConsulHelper