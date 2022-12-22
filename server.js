const express = require("express")
const redis = require("redis");

//레디스 클라이언트 생성
const client = redis.createClient({
    socket : {
        host : "redis-server", //도커 Compose를 사용할 때는 docker-compose.yml에 명시한 컨테이너 이름으로 부여
        port : 6379
    }
});

const app = express();

//client.set("number", 0);

// app.get('/', async (req, res) => {
//     client.get("number", (err, number) => {
//         //현재 숫자를 가져온 후에 1씩 증가
//         client.set("number", parseInt(number) + 1)
//         res.send("숫자가 1씩 올라갑니다. 숫자 : " + number);
//     })
// })

app.get('/', async (req, res) => {
    await client.connect();

    let number = await client.get('number');

    if(number === null) {
        number = 0;
    }

    console.log('Number : ' + number);

    res.send("숫자가 1씩 올라갑니다. 숫자 : " + number);

    await client.set("number", parseInt(number) + 1);
    await client.disconnect();;;
})

app.listen(8080);
console.log('Server is running');