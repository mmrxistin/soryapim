# Bismillahirahmanirahim
# Elhamdulillahirabbulalemin
# Esselatu vesselamu ala rasulillah
# La ilahe illAllahu vahdehu (Esma ul Husna) la sharika leh, lehu'l-mulku ve lehu'l-hamdu,


# yuhyi ve yumit

# bîyadîhîl xayr ve huve ala kulli şey'in kadir
# Allah u Ekber, Allahu Ekber, Allahu Ekber
# La ilahe illAllah, Allahu Ekber, Allahu Ekber ve lillahi'l-hamd

from __future__ import annotations

import hashlib
import shutil
import subprocess
import threading
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

TARGET_MODEL = "2406APNFAG"
DOWNLOAD_LIMIT = 2 * 1024 * 1024 * 1024


class XiaomiRootAssistant(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.title("Xiaomi Root Assistant")
        self.geometry("720x520")
        self.minsize(620, 460)
        self.selected_image: Path | None = None
        self.detected_model = ""
        self._build_ui()
        self._refresh_tools()

    def _build_ui(self) -> None:
        style = ttk.Style(self)
        style.configure("Title.TLabel", font=("TkDefaultFont", 16, "bold"))
        style.configure("Muted.TLabel", foreground="#666666")

        main = ttk.Frame(self, padding=18)
        main.pack(fill="both", expand=True)
        main.columnconfigure(0, weight=1)
        main.rowconfigure(5, weight=1)

        ttk.Label(main, text="Xiaomi Root Assistant", style="Title.TLabel").grid(
            row=0, column=0, sticky="w"
        )
        ttk.Label(
            main,
            text=f"Hedef model: {TARGET_MODEL} | Güvenli, kullanıcı onaylı yardımcı araç",
            style="Muted.TLabel",
        ).grid(row=1, column=0, sticky="w", pady=(4, 16))

        tools = ttk.LabelFrame(main, text="Bağlantı ve araçlar", padding=12)
        tools.grid(row=2, column=0, sticky="ew")
        tools.columnconfigure(1, weight=1)
        self.adb_status = ttk.Label(tools, text="ADB: kontrol ediliyor...")
        self.adb_status.grid(row=0, column=0, sticky="w")
        self.fastboot_status = ttk.Label(tools, text="Fastboot: kontrol ediliyor...")
        self.fastboot_status.grid(row=1, column=0, sticky="w", pady=(8, 0))
        self.device_status = ttk.Label(tools, text="Cihaz: aranıyor...", style="Muted.TLabel")
        self.device_status.grid(row=2, column=0, sticky="w", pady=(8, 0))
        ttk.Button(tools, text="Yenile", command=self._refresh_tools).grid(
            row=0, column=2, rowspan=3, padx=(16, 0)
        )

        image_frame = ttk.LabelFrame(main, text="Magisk boot imajı", padding=12)
        image_frame.grid(row=3, column=0, sticky="ew", pady=14)
        image_frame.columnconfigure(1, weight=1)
        self.image_label = ttk.Label(image_frame, text="Henüz imaj seçilmedi", style="Muted.TLabel")
        self.image_label.grid(row=0, column=0, columnspan=2, sticky="w")
        ttk.Button(image_frame, text="İmaj seç", command=self._choose_image).grid(
            row=0, column=2, padx=(12, 0)
        )
        ttk.Label(image_frame, text="HTTPS imaj URL'si:").grid(row=1, column=0, sticky="w", pady=(12, 0))
        self.url_entry = ttk.Entry(image_frame)
        self.url_entry.grid(row=1, column=1, columnspan=2, sticky="ew", pady=(12, 0))
        ttk.Label(image_frame, text="Beklenen SHA-256 (önerilir):").grid(
            row=2, column=0, sticky="w", pady=(8, 0)
        )
        self.expected_hash_entry = ttk.Entry(image_frame)
        self.expected_hash_entry.grid(row=2, column=1, sticky="ew", pady=(8, 0))
        ttk.Button(image_frame, text="İnternetten indir", command=self._download_image).grid(
            row=2, column=2, padx=(12, 0), pady=(8, 0)
        )

        log_frame = ttk.LabelFrame(main, text="İşlem günlüğü", padding=8)
        log_frame.grid(row=5, column=0, sticky="nsew")
        log_frame.columnconfigure(0, weight=1)
        log_frame.rowconfigure(0, weight=1)
        self.log = tk.Text(log_frame, height=10, state="disabled", wrap="word")
        self.log.grid(row=0, column=0, sticky="nsew")
        scrollbar = ttk.Scrollbar(log_frame, command=self.log.yview)
        scrollbar.grid(row=0, column=1, sticky="ns")
        self.log.configure(yscrollcommand=scrollbar.set)

        actions = ttk.Frame(main)
        actions.grid(row=6, column=0, sticky="ew", pady=(14, 0))
        row1 = ttk.Frame(actions)
        row1.pack(fill="x")
        row2 = ttk.Frame(actions)
        row2.pack(fill="x", pady=(6, 0))
        ttk.Button(row1, text="Cihaz bilgisi al", command=self._device_info).pack(side="left")
        ttk.Button(row1, text="Fastboot durumunu kontrol et", command=self._fastboot_info).pack(
            side="left", padx=8
        )
        ttk.Button(row1, text="Wine aç", command=self._open_wine).pack(side="left", padx=8)
        ttk.Button(row1, text="Mi Unlock başlat", command=self._start_unlock).pack(side="left")
        ttk.Button(row2, text="Mi Unlock (Wine)", command=self._run_mi_unlock_wine).pack(side="left")
        ttk.Button(row2, text="🔓 Unlock Tool Aç", command=self._launch_unlock_tool).pack(side="left", padx=8)
        ttk.Button(row2, text="İmaj SHA-256", command=self._hash_image).pack(side="left")
        ttk.Button(row2, text="Root yükle", command=self._install_root).pack(side="right")

        self._write_log("Hazır. Bootloader kilidi açma ve flash işlemleri bu yardımcı araçta otomatik çalıştırılmaz.")

    def _write_log(self, message: str) -> None:
        self.log.configure(state="normal")
        self.log.insert("end", f"{message}\n")
        self.log.see("end")
        self.log.configure(state="disabled")

    def _refresh_tools(self) -> None:
        adb = shutil.which("adb")
        fastboot = shutil.which("fastboot")
        self.adb_status.configure(text=f"ADB: {'bulundu' if adb else 'bulunamadı'}")
        self.fastboot_status.configure(text=f"Fastboot: {'bulundu' if fastboot else 'bulunamadı'}")
        self._write_log("ADB/Fastboot araçları kontrol edildi.")
        threading.Thread(target=self._detect_device_worker, daemon=True).start()

    def _detect_device_worker(self) -> None:
        if shutil.which("adb"):
            try:
                devices = subprocess.run(
                    ["adb", "devices"], capture_output=True, text=True, timeout=10, check=True
                ).stdout.splitlines()
                connected = [line.split("\t", 1)[0] for line in devices if "\tdevice" in line]
                if connected:
                    device_id = connected[0]
                    model = self._adb_property("ro.product.model", device_id)
                    product = self._adb_property("ro.product.device", device_id)
                    self.after(0, self._set_device_status, f"{model} ({product})", model, product)
                    return
            except (OSError, subprocess.SubprocessError) as error:
                self.after(0, self._write_log, f"ADB taraması başarısız: {error}")
        if shutil.which("fastboot"):
            try:
                result = subprocess.run(
                    ["fastboot", "getvar", "product"],
                    capture_output=True,
                    text=True,
                    timeout=10,
                )
                output = f"{result.stdout}\n{result.stderr}"
                for line in output.splitlines():
                    if "product:" in line.lower():
                        product = line.split(":", 1)[1].strip()
                        self.after(0, self._set_device_status, f"Fastboot ({product})", product, product)
                        return
            except (OSError, subprocess.SubprocessError) as error:
                self.after(0, self._write_log, f"Fastboot taraması başarısız: {error}")
        self.after(0, self._set_device_status, "Bağlı cihaz bulunamadı", "", "")

    @staticmethod
    def _adb_property(name: str, device_id: str) -> str:
        result = subprocess.run(
            ["adb", "-s", device_id, "shell", "getprop", name],
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
        )
        return result.stdout.strip() or "bilinmiyor"

    def _set_device_status(self, label: str, model: str, product: str) -> None:
        self.detected_model = product or model
        matches_target = TARGET_MODEL.lower() in {model.lower(), product.lower()}
        suffix = " | hedef eşleşti" if matches_target else " | hedef model değil"
        self.device_status.configure(text=f"Cihaz: {label}{suffix}")
        self._write_log(f"Otomatik cihaz taraması: {label}{suffix}")

    def _choose_image(self) -> None:
        path = filedialog.askopenfilename(
            title="Magisk ile yamalanmış boot imajını seç",
            filetypes=[("Boot imajı", "*.img"), ("Tüm dosyalar", "*.*")],
        )
        if path:
            self.selected_image = Path(path)
            self.image_label.configure(text=str(self.selected_image))
            self._write_log(f"İmaj seçildi: {self.selected_image.name}")

    def _hash_image(self) -> None:
        if not self.selected_image:
            messagebox.showwarning("İmaj yok", "Önce bir .img dosyası seçin.")
            return
        digest = hashlib.sha256(self.selected_image.read_bytes()).hexdigest()
        self._write_log(f"SHA-256: {digest}")
        messagebox.showinfo("SHA-256", digest)

    def _download_image(self) -> None:
        url = self.url_entry.get().strip()
        parsed = urlparse(url)
        expected_hash = self.expected_hash_entry.get().strip().lower()
        if parsed.scheme != "https" or not parsed.netloc:
            messagebox.showerror("Geçersiz URL", "İmaj için HTTPS kullanan geçerli bir URL girin.")
            return
        if not parsed.path.lower().endswith(".img"):
            messagebox.showerror("Geçersiz dosya", "URL bir .img dosyasına işaret etmelidir.")
            return
        if expected_hash and (len(expected_hash) != 64 or any(char not in "0123456789abcdef" for char in expected_hash)):
            messagebox.showerror("Geçersiz SHA-256", "SHA-256 değeri 64 karakterlik hexadecimal olmalıdır.")
            return
        destination = Path.home() / "Downloads" / Path(parsed.path).name
        destination.parent.mkdir(parents=True, exist_ok=True)
        self._write_log(f"İmaj indiriliyor: {url}")
        threading.Thread(
            target=self._download_worker,
            args=(url, destination, expected_hash),
            daemon=True,
        ).start()

    def _download_worker(self, url: str, destination: Path, expected_hash: str) -> None:
        temporary = destination.with_suffix(destination.suffix + ".part")
        try:
            request = Request(url, headers={"User-Agent": "XiaomiRootAssistant/1.0"})
            with urlopen(request, timeout=30) as response, temporary.open("wb") as output:
                content_length = response.headers.get("Content-Length")
                if content_length and int(content_length) > DOWNLOAD_LIMIT:
                    raise ValueError("İmaj boyutu izin verilen 2 GiB sınırını aşıyor.")
                total = 0
                digest = hashlib.sha256()
                while chunk := response.read(1024 * 1024):
                    total += len(chunk)
                    if total > DOWNLOAD_LIMIT:
                        raise ValueError("İmaj boyutu izin verilen 2 GiB sınırını aşıyor.")
                    output.write(chunk)
                    digest.update(chunk)
            actual_hash = digest.hexdigest()
            if expected_hash and actual_hash != expected_hash:
                raise ValueError(f"SHA-256 eşleşmedi. Beklenen: {expected_hash}, bulunan: {actual_hash}")
            temporary.replace(destination)
            self.after(0, self._image_downloaded, destination, actual_hash)
        except Exception as error:
            temporary.unlink(missing_ok=True)
            self.after(0, self._write_log, f"İndirme başarısız: {error}")

    def _image_downloaded(self, destination: Path, digest: str) -> None:
        self.selected_image = destination
        self.image_label.configure(text=str(destination))
        self._write_log(f"İmaj indirildi ve doğrulandı. SHA-256: {digest}")
        messagebox.showinfo("İndirme tamamlandı", f"İmaj kaydedildi:\n{destination}")

    def _run_command(self, command: list[str], label: str) -> None:
        def worker() -> None:
            try:
                result = subprocess.run(command, capture_output=True, text=True, timeout=20)
                output = (result.stdout or result.stderr).strip() or "Çıktı yok."
                self.after(0, self._write_log, f"{label}:\n{output}")
            except (OSError, subprocess.TimeoutExpired) as error:
                self.after(0, self._write_log, f"{label} başarısız: {error}")

        threading.Thread(target=worker, daemon=True).start()

    def _device_info(self) -> None:
        if not shutil.which("adb"):
            self._write_log("ADB bulunamadı. Android platform-tools kurun.")
            return
        self._run_command(["adb", "shell", "getprop", "ro.product.device"], "Cihaz kodu")
        self._run_command(["adb", "shell", "getprop", "ro.product.model"], "Cihaz modeli")

    def _fastboot_info(self) -> None:
        if not shutil.which("fastboot"):
            self._write_log("Fastboot bulunamadı. Android platform-tools kurun.")
            return
        self._run_command(["fastboot", "getvar", "product"], "Fastboot ürün bilgisi")

    def _open_wine(self) -> None:
        if not shutil.which("wine"):
            self._write_log("Wine bulunamadı. Önce Wine kurulumu yapın.")
            return
        try:
            subprocess.Popen(["wine", "explorer"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            self._write_log("Wine açıldı.")
        except OSError as error:
            self._write_log(f"Wine açılamadı: {error}")

    def _start_unlock(self) -> None:
        self._run_mi_unlock_wine()

    def _old_start_unlock(self) -> None:
        if not shutil.which("adb") or not shutil.which("fastboot"):
            messagebox.showerror(
                "Platform-Tools eksik",
                "Mi Unlock hazırlığı için adb ve fastboot komutları kurulu olmalıdır.",
            )
            return
        try:
            state = subprocess.run(
                ["adb", "get-state"], capture_output=True, text=True, timeout=10, check=True
            ).stdout.strip()
            locked = subprocess.run(
                ["adb", "shell", "getprop", "ro.boot.flash.locked"],
                capture_output=True,
                text=True,
                timeout=10,
                check=True,
            ).stdout.strip()
        except (OSError, subprocess.SubprocessError) as error:
            messagebox.showerror("ADB hatası", f"Cihaz kontrol edilemedi:\n{error}")
            return
        if state != "device":
            messagebox.showerror("Cihaz hazır değil", "Telefon ADB üzerinden yetkili olarak bağlı değil.")
            return
        if locked != "1":
            messagebox.showinfo("Bootloader durumu", "Bootloader zaten kilitsiz görünüyor.")
            return
        if not messagebox.askyesno(
            "Veri silme uyarısı",
            "Bootloader kilidini açma işlemi cihazdaki tüm verileri silebilir.\n\n"
            "Yedek aldın mı ve Mi Unlock işlemini başlatmak istiyor musun?",
            icon="warning",
        ):
            return
        unlock_path = filedialog.askopenfilename(
            title="Mi Unlock .exe dosyasını seç",
            filetypes=[("Windows uygulaması", "*.exe"), ("Tüm dosyalar", "*.*")],
        )
        if not unlock_path:
            return
        try:
            subprocess.run(["adb", "reboot", "bootloader"], check=True, timeout=10)
            subprocess.Popen(["wine", unlock_path])
            self._write_log("Telefon fastboot moduna yeniden başlatıldı; Mi Unlock Wine ile açıldı.")
        except (OSError, subprocess.SubprocessError) as error:
            self._write_log(f"Mi Unlock başlatılamadı: {error}")

    MI_UNLOCK_NAMES = ("miflash_unlock.exe", "mi_unlock.exe", "MiUnlock.exe")
    MI_UNLOCK_EXE = Path.home() / "md" / "mi-unlock" / "miflash_unlock.exe"
    MI_UNLOCK_PREFIX = Path.home() / ".wine32"  # 32-bit prefix (miflash_unlock 32-bit)

    def _mi_unlock_command(self, exe: Path | None = None) -> list[str]:
        """Chromium tabanlı unlock aracının Wine altında donmaması için
        GPU/LCID bayraklarıyla çalıştırılır (32-bit prefix öncelikli)."""
        cmd = [
            "env",
            "LC_ALL=tr_TR.UTF-8",
            "WINEDEBUG=-all",
            "WINEDLLOVERRIDES=mscoree,webio=n",
        ]
        if self.MI_UNLOCK_PREFIX.is_dir():
            cmd.append(f"WINEPREFIX={self.MI_UNLOCK_PREFIX}")
        cmd += [
            "wine",
            str(exe or self.MI_UNLOCK_EXE),
            "--disable-gpu",
            "--disable-gpu-compositing",
            "--lang=tr",
        ]
        return cmd

    def _find_mi_unlock_exe(self) -> Path | None:
        """Wine prefix ve bilinen indirme klasörlerinde Mi Unlock .exe arar."""
        search_roots: list[Path] = []
        wineprefix = Path.home() / ".wine"
        if wineprefix.is_dir():
            search_roots.append(wineprefix / "drive_c")
        search_roots += [Path.home() / "Downloads", Path.home() / "md", Path.home()]
        for root in search_roots:
            if not root.is_dir():
                continue
            for name in self.MI_UNLOCK_NAMES:
                matches = list(root.rglob(name))
                if matches:
                    return matches[0]
        for root in search_roots:
            if root.is_dir():
                matches = [p for p in root.rglob("*.exe") if "unlock" in p.name.lower()]
                if matches:
                    return matches[0]
        return None

    def _run_mi_unlock_wine(self) -> None:
        """Mi Unlock .exe dosyasını Wine ile doğrudan çalıştırır."""
        if not shutil.which("wine"):
            messagebox.showerror("Wine yok", "Wine kurulu değil. Önce Wine kurun.")
            return
        exe_path = self.MI_UNLOCK_EXE if self.MI_UNLOCK_EXE.is_file() else self._find_mi_unlock_exe()
        if not exe_path:
            self._write_log("Mi Unlock .exe otomatik bulunamadı. Lütfen dosyayı seçin.")
            exe_path_str = filedialog.askopenfilename(
                title="Mi Unlock .exe dosyasını seç",
                filetypes=[("Windows uygulaması", "*.exe"), ("Tüm dosyalar", "*.*")],
            )
            if not exe_path_str:
                self._write_log("Mi Unlock iptal edildi: dosya seçilmedi.")
                return
            exe_path = Path(exe_path_str)
        self._write_log(f"Mi Unlock Wine ile başlatılıyor: {exe_path}")
        try:
            log_path = Path("/tmp/mu32.log")
            with log_path.open("ab") as log_file:
                subprocess.Popen(
                    self._mi_unlock_command(exe_path),
                    stdout=log_file,
                    stderr=subprocess.STDOUT,
                    cwd=str(exe_path.parent),
                    start_new_session=True,
                )
            self._write_log(f"Wine log: {log_path}")
            self._write_log(
                "Mi Unlock Wine ile açıldı. Telefonu fastboot moduna alıp "
                "(adb reboot bootloader) uygulamadan hesap girişi yapın."
            )
            messagebox.showinfo(
                "Mi Unlock başlatıldı",
                f"Wine ile çalıştırıldı:\n{exe_path}\n\n"
                "Telefon fastboot modundayken uygulamadan bağlanıp kilidi açabilirsiniz.",
            )
        except OSError as error:
            self._write_log(f"Mi Unlock başlatılamadı: {error}")
            messagebox.showerror("Başlatılamadı", f"Mi Unlock Wine ile açılamadı:\n{error}")

    def _launch_unlock_tool(self) -> None:
        """Hazır kurulu ~/md/mi-unlock/miflash_unlock.exe'yi doğrudan çalıştırır (arka plan, log /tmp/mu32.log)."""
        if not shutil.which("wine"):
            messagebox.showerror("Wine yok", "Wine kurulu değil.")
            return
        exe = self.MI_UNLOCK_EXE
        if not exe.is_file():
            messagebox.showerror("Bulunamadı", f"Unlock tool bulunamadı:\n{exe}\n\n'Mi Unlock (Wine)' butonuyla exe seçin.")
            return
        log_path = Path("/tmp/mu32.log")
        try:
            with log_path.open("ab") as log_file:
                subprocess.Popen(
                    self._mi_unlock_command(),
                    stdout=log_file,
                    stderr=subprocess.STDOUT,
                    cwd=str(exe.parent),
                    start_new_session=True,
                )
            self._write_log(f"Unlock Tool başlatıldı: {exe}")
            self._write_log(f"Prefix: {self.MI_UNLOCK_PREFIX if self.MI_UNLOCK_PREFIX.is_dir() else '~/.wine (64-bit)'} | Log: {log_path}")
        except OSError as error:
            self._write_log(f"Unlock Tool başlatılamadı: {error}")
            messagebox.showerror("Hata", f"Unlock Tool açılamadı:\n{error}")

    def _install_root(self) -> None:
        if not self.selected_image or self.selected_image.suffix.lower() != ".img":
            messagebox.showwarning("İmaj yok", "Önce cihaza uygun Magisk ile yamalanmış .img dosyasını seçin.")
            return
        if not self.selected_image.is_file():
            messagebox.showerror("İmaj bulunamadı", "Seçilen imaj dosyası artık mevcut değil.")
            return
        if not shutil.which("fastboot"):
            messagebox.showerror("Fastboot yok", "Android SDK Platform-Tools içindeki fastboot komutunu kurun.")
            return
        if not messagebox.askyesno(
            "Root yükleme onayı",
            "Bu işlem boot bölümünü değiştirebilir, veri kaybına veya cihazın açılmamasına neden olabilir.\n\n"
            f"Dosya: {self.selected_image.name}\nHedef: {TARGET_MODEL}\n\nDevam edilsin mi?",
            icon="warning",
        ):
            return
        self._write_log("Fastboot cihazı ve ürün kodu doğrulanıyor...")
        threading.Thread(target=self._install_root_worker, daemon=True).start()

    def _install_root_worker(self) -> None:
        try:
            devices = subprocess.run(
                ["fastboot", "devices"], capture_output=True, text=True, timeout=10, check=True
            ).stdout.splitlines()
            serials = [line.split()[0] for line in devices if line.strip()]
            if not serials:
                raise RuntimeError("Fastboot modunda cihaz bulunamadı.")
            serial = serials[0]
            product_result = subprocess.run(
                ["fastboot", "-s", serial, "getvar", "product"],
                capture_output=True,
                text=True,
                timeout=10,
            )
            product_output = f"{product_result.stdout}\n{product_result.stderr}"
            product = self._parse_fastboot_value(product_output, "product")
            if product.lower() != TARGET_MODEL.lower():
                raise RuntimeError(
                    f"Yanlış veya tanınmayan cihaz: {product or 'bilinmiyor'}. Beklenen: {TARGET_MODEL}."
                )
            image = str(self.selected_image)
            self.after(0, self._write_log, f"{TARGET_MODEL} doğrulandı. boot imajı yazılıyor...")
            result = subprocess.run(
                ["fastboot", "-s", serial, "flash", "boot", image],
                capture_output=True,
                text=True,
                timeout=180,
            )
            output = f"{result.stdout}\n{result.stderr}".strip()
            if result.returncode != 0:
                raise RuntimeError(output or "fastboot flash başarısız.")
            self.after(0, self._root_install_finished, output)
        except (OSError, subprocess.SubprocessError, RuntimeError) as error:
            self.after(0, self._write_log, f"Root yükleme başarısız: {error}")
            self.after(0, messagebox.showerror, "Root yüklenemedi", str(error))

    @staticmethod
    def _parse_fastboot_value(output: str, name: str) -> str:
        for line in output.splitlines():
            if f"{name}:" in line.lower():
                return line.lower().split(f"{name}:", 1)[1].strip()
        return ""

    def _root_install_finished(self, output: str) -> None:
        self._write_log(f"Root yükleme tamamlandı:\n{output}")
        messagebox.showinfo(
            "Root yükleme tamamlandı",
            "boot imajı yazıldı. Cihazı yeniden başlatmadan önce işlem günlüğünü kontrol edin.",
        )


if __name__ == "__main__":
    XiaomiRootAssistant().mainloop()
