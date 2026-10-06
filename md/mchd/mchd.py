# Bismillahir Rahmanir Rahim
# El Hamdu Lillahi Rabbul Alemin
# Es selatu VesSelamu ala rasulina Muhammedin
# Suphan Allah i Azim ve Bihamdihi VEL HAMDU LİLLAH
# LA İLAHE İLL ALLAH U VAHDEHU(ESMA UL HUSNA) LA ŞERİKE LEH, LEHUL MULKU VE LEHUL HAMDU.
# ALLAH U EKBER VE LİLLAHİL HAMD



#/usr/bin/env python3
"""
Burp Suite'i Tor üzerinden başlatır — Tkinter GUI.
Tor çalışmıyorsa otomatik başlatır, sonra Burp'ü Tor SOCKS ile açar.
proxychains KULLANMAZ — Java'da güvenilir çalışmadığı için
Burp'ün kendi --user-config-file mekanizması kullanılır.
"""

import json
import queue
import shutil
import socket
import subprocess
import sys
import threading
import time
import tkinter as tk
from pathlib import Path
from tkinter import ttk

TOR_HOST = "127.0.0.1"
TOR_PORT = 9050
BURP_JAR = "/opt/BurpSuite/burpsuite.jar"
CONFIG_PATH = Path.home() / ".burp-tor-config.json"

TOR_START_CMD = ["sudo", "systemctl", "start", "tor"]
TOR_STATUS_CMD = ["systemctl", "is-active", "tor"]
START_TIMEOUT = 30


def tor_port_open(host=TOR_HOST, port=TOR_PORT) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(2)
        return s.connect_ex((host, port)) == 0


def tor_service_active() -> bool:
    try:
        r = subprocess.run(TOR_STATUS_CMD, capture_output=True, text=True, timeout=5)
        return r.stdout.strip() == "active"
    except Exception:
        return False


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Burp over Tor")
        self.geometry("640x420")
        self.minsize(560, 380)

        self.log_queue: "queue.Queue[str]" = queue.Queue()
        self.worker: threading.Thread | None = None

        self._build_ui()
        self.after(100, self._drain_log)

    def _build_ui(self):
        frm = ttk.Frame(self, padding=10)
        frm.pack(fill="both", expand=True)

        row = ttk.Frame(frm)
        row.pack(fill="x", pady=(0, 8))

        self.btn = ttk.Button(row, text="Tor'u Başlat + Burp'ü Aç", command=self.on_start)
        self.btn.pack(side="left")

        self.quit_btn = ttk.Button(row, text="Çıkış", command=self.destroy)
        self.quit_btn.pack(side="right")

        info = ttk.Label(
            frm,
            text=f"Tor: {TOR_HOST}:{TOR_PORT}   •   Burp: {BURP_JAR}",
            foreground="#555",
        )
        info.pack(fill="x", pady=(0, 6))

        logf = ttk.LabelFrame(frm, text="Durum", padding=6)
        logf.pack(fill="both", expand=True)

        self.log = tk.Text(logf, wrap="word", height=14, state="disabled", background="#111", foreground="#0f0")
        self.log.pack(side="left", fill="both", expand=True)

        sb = ttk.Scrollbar(logf, command=self.log.yview)
        sb.pack(side="right", fill="y")
        self.log.configure(yscrollcommand=sb.set)

    def log_msg(self, msg: str):
        self.log_queue.put(msg)

    def _drain_log(self):
        try:
            while True:
                msg = self.log_queue.get_nowait()
                self.log.configure(state="normal")
                self.log.insert("end", msg + "\n")
                self.log.see("end")
                self.log.configure(state="disabled")
        except queue.Empty:
            pass
        self.after(100, self._drain_log)

    def on_start(self):
        if self.worker and self.worker.is_alive():
            self.log_msg("[!] Zaten çalışıyor...")
            return
        self.btn.configure(state="disabled")
        self.worker = threading.Thread(target=self.run_pipeline, daemon=True)
        self.worker.start()

    def run_pipeline(self):
        try:
            if not self.start_tor():
                return
            self.write_burp_config()
            self.launch_burp()
        finally:
            self.after(0, lambda: self.btn.configure(state="normal"))

    def start_tor(self) -> bool:
        if tor_port_open():
            self.log_msg(f"[+] Tor zaten çalışıyor ({TOR_HOST}:{TOR_PORT}).")
            return True

        if not tor_service_active():
            self.log_msg("[*] Tor servisi aktif değil, başlatılıyor...")
            try:
                r = subprocess.run(TOR_START_CMD, capture_output=True, text=True)
            except FileNotFoundError:
                self.log_msg("[!] 'systemctl' bulunamadı. Tor'u elle başlat.")
                return False
            if r.returncode != 0:
                self.log_msg("[!] Tor başlatılamadı:")
                self.log_msg(r.stderr.strip() or r.stdout.strip())
                self.log_msg("    sudo yetkisi gerekiyor olabilir.")
                return False

        self.log_msg("[*] Tor SOCKS portu bekleniyor...")
        deadline = time.time() + START_TIMEOUT
        while time.time() < deadline:
            if tor_port_open():
                self.log_msg("[+] Tor hazır.")
                return True
            time.sleep(1)

        self.log_msg(f"[!] Tor {START_TIMEOUT}s içinde {TOR_HOST}:{TOR_PORT} üzerinde açılmadı.")
        return False

    def write_burp_config(self):
        config = {"proxy": {"socks_proxy": {"host": TOR_HOST, "port": TOR_PORT}}}
        CONFIG_PATH.write_text(json.dumps(config, indent=2))
        self.log_msg(f"[+] Burp config yazıldı: {CONFIG_PATH}")

    def launch_burp(self):
        if not Path(BURP_JAR).is_file():
            self.log_msg(f"[!] Burp jar bulunamadı: {BURP_JAR}")
            return
        java = shutil.which("java")
        if not java:
            self.log_msg("[!] 'java' PATH'te bulunamadı.")
            return
        cmd = [java, "-jar", BURP_JAR, f"--user-config-file={CONFIG_PATH}"]
        self.log_msg(f"[+] Çalıştırılıyor: {' '.join(cmd)}")
        try:
            subprocess.Popen(cmd)
        except Exception as e:
            self.log_msg(f"[!] Başlatma hatası: {e}")


if __name__ == "__main__":
    App().mainloop()