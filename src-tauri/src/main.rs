#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn my_custom_command(invoke_message: String) -> String {
  format!("{}{}","Hello from Rust!" , invoke_message).into()
}

use reqwest::Client;
use std::process::Command;
use std::str;

#[tauri::command]
async fn fetch(url: String, invoke_message: String)  {
  let client= Client::new();
  let res = client.put(url)
  .body(invoke_message)
  .send()
  .await
  .unwrap();


  println!("Response status: {}", res.status());
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command, fetch, stop_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


#[tauri::command]
fn stop_server(port: String) {
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