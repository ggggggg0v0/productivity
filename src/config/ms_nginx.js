const basicLocation = (res) =>
    `
server {
    listen       8080;
    server_name  _ ;
    client_max_body_size 50M;

    proxy_connect_timeout 600;
    proxy_read_timeout 600;
    proxy_send_timeout 600;

    charset utf-8;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    error_page  404 /404.html;
    location = /404.html {
        root /usr/share/nginx/html;
        internal;
    }

    error_page  500 502 503 504 /500.html;
    location = /500.html {
        root /usr/share/nginx/html;
        internal;
    }

    ${res}
}
`

const locationTemplate =
    `
    location /servername {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-forwarded-for $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_pass http://localhost_ip:port/servername;
    }
`

const GenerateNginxConfig = (localIP, configList) => {
    let str = ''

    for (const [key, value] of Object.entries(configList)) {
        const nginxConfig = locationTemplate
            .replaceAll("servername", key)
            .replace("localhost_ip", localIP)
            .replace("port", value)

        str += nginxConfig
    }

    return basicLocation(str)
}

export default GenerateNginxConfig