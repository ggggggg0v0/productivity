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
        .invoke_handler(tauri::generate_handler![my_custom_command, fetch])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
