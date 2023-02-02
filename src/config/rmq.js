export default {
    // Local
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
      
    // QA
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