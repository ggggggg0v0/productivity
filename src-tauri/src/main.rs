#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn my_custom_command(invoke_message: String) -> String {
    format!("{}{}", "Hello from Rust!", invoke_message).into()
}

use reqwest::Client;
use std::process::{Command, Output};
use std::str;
// use std::thread;
// use std::time::Duration;
use reqwest;

#[tauri::command]
async fn fetch(url: String, content: String) {
    let client = Client::new();
    let res = client.put(url).body(content).send().await.unwrap();

    println!("Response status: {}", res.status());
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            my_custom_command,
            fetch,
            stop_server,
            start_server
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// lsof -i :${port} | awk '{ if (NR!=1) { print $2;}}' | xargs kill -9
#[tauri::command]
fn stop_server(port: i64) {
    let output = Command::new("lsof")
        .arg("-i")
        .arg(format!(":{}", port))
        .output()
        .expect("failed to execute process");

    let output_str = str::from_utf8(&output.stdout).expect("invalid utf-8 string");
    let lines = output_str.lines();

    let pid_strings: Vec<&str> = lines
        .skip(1)
        .map(|line| line.split_whitespace().nth(1).unwrap())
        .collect();

    for pid_string in pid_strings {
        let pid = pid_string.parse::<i32>().expect("invalid pid");
        Command::new("kill")
            .arg("-9")
            .arg(format!("{}", pid))
            .output()
            .expect("failed to execute process");
    }
}

// open -a iTerm . && sleep 1 && osascript -e 'tell application "iTerm2" to activate' -e 'tell application "iTerm2" to set currentSession to current session of current window' -e 'tell application "iTerm2" to tell currentSession to write text "cd /Users/peter/p/ptd/backend/ms/user"' -e 'tell application "iTerm2" to tell currentSession to write text "go run main.go"'
#[tauri::command]
fn start_server(server_path: String, port: i64) {
    println!("sfsdf{}{}", server_path, port);
    let _ = Command::new("open")
        .arg("-a")
        .arg("iTerm")
        .arg(".")
        .output()
        .expect("failed to execute process");

    let _ = Command::new("sleep")
        .arg("1")
        .output()
        .expect("failed to execute process");

    let output = Command::new("osascript")
        .arg("-e")
        .arg("tell application \"iTerm2\" to activate")
        .arg("-e")
        .arg("tell application \"iTerm2\" to set currentSession to current session of current window")
        .arg("-e")
        .arg(format!("tell application \"iTerm2\" to tell currentSession to write text \"cd {}\"", server_path))
        .arg("-e")
        .arg(format!("tell application \"iTerm2\" to tell currentSession to write text \"go run main.go -p {}\"", port))
        .output()
        .expect("failed to execute process");

    match check_output(output) {
        Ok(_) => println!("go run main finished"),
        Err(e) => println!("error: {}", e),
    }
}

fn check_output(output: Output) -> Result<(), String> {
    if output.status.success() {
        Ok(())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

// TODO 啟動後檢查，成功後返回前端
// #[tauri::command]
// fn checkServer(server_name: String, port: String) {
//     let mut success = false;
//     while !success {
//         let client = reqwest::Client::new();
//         let res = client
//             .get(format!("http://127.0.0.1:{}/{}/version",port,server_name))
//             .header("systoken", "52560494360086037e1a2ee2fe5273b9")
//             .send();

//         match res {
//             Ok(res) => {
//                 println!("The request was successful and the response code is: {}", res.status());
//                 success = true;
//             }
//             Err(err) => {
//                 println!("The request failed with error: {}", err);
//             }
//         }

//         if !success {
//             thread::sleep(Duration::from_secs(5));
//         }
//     }
// }
