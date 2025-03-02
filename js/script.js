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
//fungsi dibawah ini untuk merubah kata yang sama menjadi link dalam paragraf 
document.addEventListener("DOMContentLoaded", function() {
    // Daftar kata yang ingin diganti beserta linknya
    const wordLinks = {
        "Indonesia": "https://indonesia.go.id/",
        "hattrick": "https://www.hattrick.org/?inviteRef=YCDDBV",
        "daftar disini": "https://www.hattrick.org/?inviteRef=YCDDBV",
"playstore": "https://play.google.com/store/apps/details?id=org.hattrick.hattrick",
"FC Selayar": "https://www.hattrick.org/Club/?TeamID=113295",
"AgoezGhele": "https://www.hattrick.org/Club/Manager/?userId=13898299&browseIds=",
"selayar": "https://id.wikipedia.org/wiki/Kabupaten_Kepulauan_Selayar",
        "Asia": "https://www.asia.com"
    };

    // Pilih semua paragraf di halaman
    const paragraphs = document.querySelectorAll("p");

    // Loop setiap paragraf
    paragraphs.forEach(function(paragraph) {
        let text = paragraph.innerHTML;

        // Loop setiap kata dalam daftar wordLinks
        for (const [word, link] of Object.entries(wordLinks)) {
            // Gantikan kata dengan link yang sesuai
            const regex = new RegExp(word, 'gi'); // case-insensitive
            text = text.replace(regex, `<a href="${link}">${word}</a>`);
        }

        // Update paragraf dengan teks yang sudah diganti
        paragraph.innerHTML = text;
    });
});
