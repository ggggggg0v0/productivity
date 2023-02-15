export default {

	// Local
	"mysql_local": `host = "127.0.0.1:3306"
account = "root"
password = "testtest"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,

	// DEV
	"mysql_dev": `host = "10.30.4.114:3306"
account = "PTDNecessitas_seed"
password = "7MHuMgbIJeN_cc"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,

	// QA
	"mysql_qa": `host = "10.30.5.115:3306"
account = "PTDNecessitas_rain"
password = "7MHuMgbIJeN_ubr"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,

	// SIT
	"mysql_sit": `host = "10.30.2.131:3306"
account = "PTDNecessitas_bravo"
password = "7MHuMgbIJeN_Orz"
dbname = "promoteMS"
max_open_conns = 50
max_idle_conns = 25
max_conn_lifetime = "60s"`,

}