    // Fungsi untuk memfilter katalog berdasarkan pilihan
    function filterKatalog() {
        const tujuan = document.getElementById('tujuan').value;
        const katalogItems = document.querySelectorAll('.catalog-item');

        katalogItems.forEach(item => {
            if (tujuan === 'all') {
                item.style.display = 'block'; // Menampilkan semua katalog
            } else if (item.getAttribute('data-kategori') === tujuan) {
                item.style.display = 'block'; // Menampilkan katalog yang dipilih
            } else {
                item.style.display = 'none'; // Menyembunyikan katalog lainnya
            }
        });
    }

    // Memanggil fungsi filterKatalog() saat halaman pertama kali dibuka
    window.onload = function() {
        // Set value kotak kombo ke "all" dan tampilkan semua katalog
        document.getElementById('tujuan').value = 'all';
        filterKatalog();
    };



// Fungsi untuk menyapa sesuai kondisi waktu 
function ucapkanSalam() {
    const waktuSekarang = new Date();
    const jam = waktuSekarang.getHours();
    let ucapkan;

    if (jam >= 18 || jam < 2) {
        ucapkan = "Hello, Selamat Malam. 😍";
    } else if (jam >= 2 && jam < 11) {
        ucapkan = "Hello, Selamat Pagi. 😍";
    } else if (jam >= 11 && jam < 15) {
        ucapkan = "Hello, Selamat Siang. 😍";
    } else if (jam >= 15 && jam < 18) {
        ucapkan = "Hello, Selamat Sore. 😍";
    }

    document.getElementById("menyapa1").innerText = ucapkan;
}

// Fungsi untuk mengganti tahun otomatis di copyright footer 
function copyright() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
}

// Tambahkan kedua fungsi ke event listener `DOMContentLoaded`
window.addEventListener("DOMContentLoaded", () => {
    ucapkanSalam();
    copyright();
    filterKatalog();
});
