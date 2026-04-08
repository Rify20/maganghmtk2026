const DB_MAGANG = [
    { nama: "DAVIN NUGROHO", status: "LULUS", divisi: "HUMAS" },
    { nama: "Ahsanal Fuadi", status: "LULUS", divisi: "HUMAS" },
    { nama: "IHSANU RIZKI", status: "LULUS", divisi: "HUMAS" },
    { nama: "Prajabhakti Nurrachman", status: "LULUS", divisi: "HUMAS" },
    { nama: "Reyzie Karrenina", status: "LULUS", divisi: "KOMINFO" },
    { nama: "Muhamad Ajri Hasan ", status: "LULUS", divisi: "KOMINFO" },
    { nama: "dedy chandra", status: "LULUS", divisi: "EKRAF" },
    { nama: "Muhamad rafi saepudin", status: "LULUS", divisi: "EKRAF" },
    { nama: "Hari Dwi Yulianto", status: "LULUS", divisi: "PSDM : MINBA" },
    { nama: "Hanin Nurfitri", status: "LULUS", divisi: "PSDM : MINBA" },
    { nama: "Neyla Intan Nur Ramadhan", status: "LULUS", divisi: "PSDMN : MINBA" },
    { nama: "Sulis Putri Arti", status: "LULUS", divisi: "PSDMN : MINBA" },
    { nama: "Fadhil Althaf Athallah", status: "GAGAL" }
    { nama: "Soleh", status: "GAGAL" }
    { nama: "Isyraaq aaisy aziizah", status: "GAGAL" }
    { nama: "Robi'ah Al ''Adawiyah, status: "GAGAL" }
    { nama: "Rifki, status: "GAGAL" }
];

function eksekusiCek() {
    const inputNama = document.getElementById('namaInput').value.trim();
    if (!inputNama) return alert("Masukkan nama kamu dulu ya!");

    // Fitur 1 HP 1 Nama
    const userTerdaftar = localStorage.getItem('lock_device');
    if (userTerdaftar && userTerdaftar.toLowerCase() !== inputNama.toLowerCase()) {
        alert("Maaf, HP ini sudah terdaftar untuk mengecek nama lain.");
        return;
    }

    const data = DB_MAGANG.find(d => d.nama.toLowerCase() === inputNama.toLowerCase());
    const searchDiv = document.getElementById('search-content');
    const resultDiv = document.getElementById('result-content');

    // Animasi Transisi Keluar
    searchDiv.classList.add('animate__animated', 'animate__fadeOutLeft');
    
    setTimeout(() => {
        searchDiv.style.display = 'none';
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('animate__animated', 'animate__fadeInRight');

        if (!data) {
            renderHTML("TIDAK DITEMUKAN", inputNama, "Cek ejaan nama anda kembali.", "bg-gagal");
        } else {
            localStorage.setItem('lock_device', data.nama);
            if (data.status === "LULUS") {
                renderHTML("SELAMAT, ANDA LULUS!", data.nama, "Divisi: " + data.divisi, "bg-lulus");
            } else {
                renderHTML("MOHON MAAF", data.nama, "Tetap semangat, dan nantikan pemilihan ke 3", "bg-gagal");
            }
        }
    }, 500);
}

function renderHTML(status, nama, detail, cssClass) {
    const resultDiv = document.getElementById('result-content');
    resultDiv.innerHTML = `
        <div class="result-box">
            <span class="status-badge ${cssClass}">HASIL SELEKSI</span>
            <h2 style="font-size: 24px; color: var(--primary); margin-bottom: 5px;">${status}</h2>
            <p style="font-size: 16px; font-weight: 700; margin-bottom: 25px;">${nama.toUpperCase()}</p>
            
            <div style="background: white; padding: 20px; border-radius: 16px; margin-bottom: 30px;">
                <p style="font-size: 14px; color: #555;">${detail}</p>
            </div>

            <button onclick="location.reload()" class="btn-main" style="background: transparent; color: var(--primary); border: 2px solid var(--primary);">
                Kembali
            </button>
        </div>
    `;
}
