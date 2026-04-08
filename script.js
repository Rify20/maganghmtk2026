const DB_MAGANG = [
    { nama: "DAVIN NUGROHO", status: "LULUS", divisi: "HUMAS" },
    { nama: "AHSANAL FUADI", status: "LULUS", divisi: "HUMAS" },
    { nama: "IHSANU RIZKI", status: "LULUS", divisi: "HUMAS" },
    { nama: "PRAJABHAKTI NURRACHMAN", status: "LULUS", divisi: "HUMAS" },
    { nama: "REYZIE KARRENINA", status: "LULUS", divisi: "KOMINFO" },
    { nama: "MUHAMAD AJRI HASAN", status: "LULUS", divisi: "KOMINFO" },
    { nama: "DEDY CHANDRA", status: "LULUS", divisi: "EKRAF" },
    { nama: "MUHAMAD RAFI SAEPUDIN", status: "LULUS", divisi: "EKRAF" },
    { nama: "HARI DWI YULIANTO", status: "LULUS", divisi: "PSDM : MINBA" },
    { nama: "HANIN NURFITRI", status: "LULUS", divisi: "PSDM : MINBA" },
    { nama: "NEYLA INTAN NUR RAMADHAN", status: "LULUS", divisi: "PSDM : MINBA" },
    { nama: "SULIS PUTRI ARTI", status: "LULUS", divisi: "PSDM : MINBA" },
    { nama: "FADHIL ALTHAF ATHALLAH", status: "GAGAL", divisi: "-" },
    { nama: "SOLEH", status: "GAGAL", divisi: "-" },
    { nama: "ISYRAAC QAISY AZIIZAH", status: "GAGAL", divisi: "-" },
    { nama: "ROBIAH AL ADAWIYAH", status: "GAGAL", divisi: "-" },
    { nama: "RIFKI", status: "GAGAL", divisi: "-" }
];

// Normalisasi nama: hapus spasi berlebih, ubah ke uppercase, hapus karakter aneh
function normalizeName(nama) {
    return nama.trim().toUpperCase().replace(/\s+/g, ' ').replace(/[`'"]/g, '');
}

function eksekusiCek() {
    const inputNamaElement = document.getElementById('namaInput');
    if (!inputNamaElement) return;

    const inputNamaRaw = inputNamaElement.value.trim();
    if (!inputNamaRaw) {
        alert("Masukkan nama kamu dulu ya!");
        return;
    }

    const inputNama = normalizeName(inputNamaRaw);

    // Fitur 1 HP 1 Nama
    const userTerdaftar = localStorage.getItem('lock_device');
    if (userTerdaftar && normalizeName(userTerdaftar) !== inputNama) {
        alert("Maaf, HP ini sudah terdaftar untuk mengecek nama lain.");
        return;
    }

    // Cari data (sudah dalam uppercase semua)
    const data = DB_MAGANG.find(d => d.nama === inputNama);

    const searchDiv = document.getElementById('search-content');
    const resultDiv = document.getElementById('result-content');

    if (!searchDiv || !resultDiv) {
        console.error("Elemen HTML tidak ditemukan!");
        return;
    }

    // Animasi Transisi Keluar
    searchDiv.classList.add('animate__animated', 'animate__fadeOutLeft');
    
    setTimeout(() => {
        searchDiv.style.display = 'none';
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('animate__animated', 'animate__fadeInRight');

        if (!data) {
            renderHTML("TIDAK DITEMUKAN", inputNamaRaw, "Cek ejaan nama anda kembali.", "bg-gagal");
        } else {
            localStorage.setItem('lock_device', data.nama);
            if (data.status === "LULUS") {
                renderHTML("SELAMAT, ANDA LULUS!", data.nama, "Divisi: " + data.divisi, "bg-lulus");
            } else {
                renderHTML("MOHON MAAF", data.nama, "Tetap semangat, dan nantikan pendaftaran berikutnya.", "bg-gagal");
            }
        }
    }, 500);
}

function renderHTML(status, nama, detail, cssClass) {
    const resultDiv = document.getElementById('result-content');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
        <div class="result-box">
            <span class="status-badge ${cssClass}">HASIL SELEKSI</span>
            <h2 style="font-size: 24px; color: var(--primary); margin-bottom: 5px;">${status}</h2>
            <p style="font-size: 16px; font-weight: 700; margin-bottom: 25px;">${nama}</p>
            
            <div style="background: white; padding: 20px; border-radius: 16px; margin-bottom: 30px;">
                <p style="font-size: 14px; color: #555;">${detail}</p>
            </div>

            <button onclick="resetToSearch()" class="btn-main" style="background: transparent; color: var(--primary); border: 2px solid var(--primary); cursor: pointer;">
                Kembali
            </button>
        </div>
    `;
}

function resetToSearch() {
    const searchDiv = document.getElementById('search-content');
    const resultDiv = document.getElementById('result-content');
    
    if (!searchDiv || !resultDiv) return;
    
    resultDiv.classList.add('animate__animated', 'animate__fadeOutRight');
    
    setTimeout(() => {
        resultDiv.classList.add('hidden');
        resultDiv.classList.remove('animate__fadeOutRight', 'animate__fadeInRight');
        searchDiv.style.display = 'block';
        searchDiv.classList.remove('animate__fadeOutLeft');
        searchDiv.classList.add('animate__fadeInLeft');
        
        // Reset input
        const inputNama = document.getElementById('namaInput');
        if (inputNama) inputNama.value = '';
        
        setTimeout(() => {
            searchDiv.classList.remove('animate__fadeInLeft');
        }, 500);
    }, 300);
}
