# Tauri + React

dev: `npm run tauri dev`
build: `cargo tauri build`

TODO:
- countdown:
  - [ ] write down the note:
    - [ ] background color: #3D76C1
    - [ ] format
    - [ ] record: period time, note
  - [ ] end: play sound
- [ ] update console url: local develop helper, it could be easier start server with new port
  - [x] start the server in new iTerm window. (cause want to see server log)
    - [ ] close the iTerm window when unchecked. (is available?)
  - [x] click server name and modify consul url with new port
  - [ ] add nginx for postman to proxy localhost/{server} -> {server}:port 

## Step

Prepare
- npm i

Start
- cargo tauri dev

Build
- cargo tauri build