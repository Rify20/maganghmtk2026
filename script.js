// DATABASE PESERTA (Update di sini)
const listPeserta = [
    { nama: "Budi Santoso", status: "LOLOS", pilihan: 1, departemen: "Media & Informasi" },
    { nama: "Siti Rahma", status: "LOLOS", pilihan: 2, departemen: "Hubungan Masyarakat" },
    { nama: "Andi Wijaya", status: "TIDAK_LOLOS" },
    { nama: "Rina Astuti", status: "TIDAK_LOLOS" }
];

function eksekusiCek() {
    const inputRaw = document.getElementById('namaInput').value;
    const inputNama = inputRaw.trim().toLowerCase();
    const inputSect = document.getElementById('input-section');
    const resultSect = document.getElementById('result-section');
    const footerAct = document.getElementById('footer-action');

    if (!inputNama) {
        alert("Silakan masukkan nama lengkap Anda!");
        return;
    }

    // --- FITUR KEAMANAN: DEVICE LOCK (1 HP 1 NAMA) ---
    const savedName = localStorage.getItem('user_locked_name');
    
    if (savedName && savedName.toLowerCase() !== inputNama) {
        alert("Akses Ditolak! Perangkat ini sudah digunakan untuk mengecek nama lain. Sesuai kebijakan, 1 perangkat hanya untuk 1 user.");
        return;
    }

    const data = listPeserta.find(p => p.nama.toLowerCase() === inputNama);

    // Transisi Animasi
    inputSect.classList.add('animate__animated', 'animate__fadeOut');
    
    setTimeout(() => {
        inputSect.style.display = 'none';
        resultSect.classList.remove('hidden');
        footerAct.classList.remove('hidden');

        if (!data) {
            renderHTML("DATA TIDAK DITEMUKAN", inputRaw, "gray-card", "Mohon periksa kembali penulisan nama Anda atau hubungi admin.");
        } else {
            // KUNCI PERANGKAT KE NAMA INI
            localStorage.setItem('user_locked_name', data.nama);

            if (data.status === "LOLOS") {
                renderHTML("SELAMAT ANDA LOLOS!", data.nama, "blue-card", `Diterima di Pilihan ${data.pilihan}:`, data.departemen);
            } else {
                renderHTML("MOHON MAAF...", data.nama, "red-card", "Silakan mengikuti pemilihan terakhir.", "Jadwal Menyusul");
            }
        }
    }, 500);
}

function renderHTML(judul, nama, tema, subText, mainText = "") {
    const target = document.getElementById('result-section');
    let content = `
        <div class="result-box ${tema}">
            <span class="status-tag">${tema === 'blue-card' ? 'Success' : (tema === 'red-card' ? 'Notice' : 'Warning')}</span>
            <h2 style="font-size: 22px; margin-bottom: 5px;">${judul}</h2>
            <p style="font-size: 16px; font-weight: 600; opacity: 0.9; margin-bottom: 20px;">${nama.toUpperCase()}</p>
            
            <div style="background: rgba(0,0,0,0.1); padding: 15px; border-radius: 12px;">
                <p style="font-size: 13px; opacity: 0.8;">${subText}</p>
                <h3 style="font-size: 18px; margin-top: 5px;">${mainText}</h3>
            </div>
        </div>
    `;
    target.innerHTML = content;
}