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


// fungsi filter pencarian dan menampilkan postingan 
document.addEventListener("DOMContentLoaded", function () {
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");
  const postsContainer = document.getElementById("posts-container");
  let allPosts = [];

  const jsonUrl = "data/posts.json?v=" + new Date().getTime();

  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      allPosts = data;
      tampilkanPostingan(allPosts);
    })
    .catch(error => {
      postsContainer.innerHTML = "<p>Gagal memuat postingan, coba refresh browser kamu.</p>";
      console.error("Error memuat JSON:", error);
    });

  function tampilkanPostingan(posts) {
    postsContainer.innerHTML = "";

    if (posts.length === 0) {
      postsContainer.innerHTML = "<p>Tidak ada postingan yang cocok.</p>";
      return;
    }

    const postsByCategory = {};

    posts.forEach(post => {
      const kategori = post.category;
      if (!postsByCategory[kategori]) {
        postsByCategory[kategori] = [];
      }
      postsByCategory[kategori].push(post);
    });

    for (const kategori in postsByCategory) {
      const heading = document.createElement("h3");
      heading.textContent = kategori;
      postsContainer.appendChild(heading);

      postsByCategory[kategori].forEach(post => {
        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
          <div class="post-item">
            <img src="${post.thumbnail}" alt="${post.title}" class="thumbnail">
            <div class="post-content">
              <h4>${post.title}</h4>
              <p>${post.penulis}</p>
              <p>${post.content}</p>
              <p><a href="${post.url}" target="_blank" class="read-more">Baca selengkapnya</a></p>
            </div>
          </div>
        `;

        postsContainer.appendChild(div);
      });
    }
  }

  categoryFilter.addEventListener("change", filterDanCari);
  searchInput.addEventListener("input", filterDanCari);

  function filterDanCari() {
    const kategori = categoryFilter.value.toLowerCase();
    const kataKunci = searchInput.value.toLowerCase();

    const hasilFilter = allPosts.filter(post => {
      const cocokKategori = (kategori === "semua") || (post.category.toLowerCase() === kategori);
      const cocokJudul = post.title.toLowerCase().includes(kataKunci);
      const cocokKonten = post.content.toLowerCase().includes(kataKunci);
      return cocokKategori && (cocokJudul || cocokKonten);
    });

    tampilkanPostingan(hasilFilter);
  }
});


// Fungsi tampil/sembunyi popup bagikan
function togglePopup() {
  const popup = document.getElementById("popupShare");

  if (popup.style.display === "block") {
    closePopup();
  } else {
    popup.style.display = "block";
    popup.focus(); // Fokus ke popup agar pembaca layar dapat terfokus 
  }
}

function closePopup() {
  document.getElementById("popupShare").style.display = "none";
}

function bagikanFacebook() {
  const currentURL = window.location.href;
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
  window.open(url, "_blank", "width=600,height=400");
}

function bagikanWhatsapp() {
  const currentURL = window.location.href;
  const text = `Salam Hattrickers ${currentURL}`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "width=600,height=400");
}

function salinLink() {
  const link = window.location.href;
  navigator.clipboard.writeText(link).then(() => {
    alert("Link berhasil disalin ke clipboard!");
  }).catch(() => {
    alert("Gagal menyalin link 😢");
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});

document.addEventListener("click", function (event) {
  const popup = document.getElementById("popupShare");
  const button = document.querySelector(".share-btn");
  if (!popup.contains(event.target) && !button.contains(event.target)) {
    closePopup();
  }
});

// fungsi rekomendasi postingan
document.addEventListener("DOMContentLoaded", function () {
  const recommendationContainer = document.getElementById("recommendation-list");

  fetch("../../data/posts.json")
    .then((res) => res.json())
    .then((posts) => {
      const currentPath = window.location.pathname;

      const recommendedPosts = posts
        .filter(post => !currentPath.includes(post.url))
        .slice(0, 5); // Ambil 5 postingan terbaru

      recommendedPosts.forEach(post => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.gap = "1em";
        wrapper.style.marginBottom = "1.5em";
        wrapper.style.alignItems = "flex-start";

        const img = document.createElement("img");
        img.src = post.thumbnail || "/img/default-thumb.jpg";
        img.alt = post.title;
        img.style.width = "120px";
        img.style.height = "auto";
        img.style.borderRadius = "8px";

        const textWrapper = document.createElement("div");

        const link = document.createElement("a");
        link.href = `/${post.url}`;
        link.textContent = post.title;
        link.style.fontWeight = "bold";
        link.style.textDecoration = "none";
        link.style.color = "#000";
        link.style.display = "block";
        link.style.marginBottom = "0.3em";

        const snippet = document.createElement("p");
        snippet.textContent = post.content.slice(0, 100) + "...";
        snippet.style.margin = "0";
        snippet.style.color = "#555";
        snippet.style.fontSize = "0.95em";

        textWrapper.appendChild(link);
        textWrapper.appendChild(snippet);

        wrapper.appendChild(img);
        wrapper.appendChild(textWrapper);

        recommendationContainer.appendChild(wrapper);
      });
    })
    .catch((err) => {
      console.error("Gagal memuat rekomendasi:", err);
    });
});


// fungsi baca halaman 
document.addEventListener("DOMContentLoaded", function () {
  const tombolBaca = document.getElementById("bacaHalaman");
  let suara; // Simpan objek suara agar bisa diakses global

  if (tombolBaca) {
    tombolBaca.addEventListener("click", function () {
      // Jika sedang membaca, hentikan dan kembalikan tombol ke kondisi awal
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        tombolBaca.textContent = "Baca Halaman";
        return;
      }

      // Ambil konten dan mulai membaca
      const konten = document.body.innerText;
      suara = new SpeechSynthesisUtterance(konten);
      suara.lang = "id-ID";
      suara.rate = 1.2;
      suara.pitch = 1;

      // Ubah label tombol
      tombolBaca.textContent = "Stop Bacaan";

      // Saat bacaan selesai, kembalikan teks tombol
      suara.onend = function () {
        tombolBaca.textContent = "Baca Halaman";
      };

      // Mulai pembacaan
      window.speechSynthesis.speak(suara);
    });
  }

  // Hentikan pembacaan kalau pindah halaman
  window.addEventListener("beforeunload", function () {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  });
});


// aksesibilitas.js

document.addEventListener("DOMContentLoaded", function () {
  const tombolMenu = document.getElementById("aksesibilitasToggle");
  const menu = document.getElementById("menuAkses");
  const tombolTutup = document.getElementById("tutupAkses");

  // Toggle menu popup
  tombolMenu.addEventListener("click", function () {
    const tampil = menu.hasAttribute("hidden");
    if (tampil) {
      menu.removeAttribute("hidden");
      menu.focus();
    } else {
      menu.setAttribute("hidden", "");
    }
  });

  // Tutup menu
  tombolTutup.addEventListener("click", function () {
    menu.setAttribute("hidden", "");
  });

  // Esc untuk nutup
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !menu.hasAttribute("hidden")) {
      menu.setAttribute("hidden", "");
    }
  });

  // Mode gelap toggle
  const tombolModeGelap = document.getElementById("modeGelapToggle");
  tombolModeGelap.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      tombolModeGelap.innerText = "Mode Terang";
    } else {
      tombolModeGelap.innerText = "Mode Gelap";
    }
  });
});

// fungsi pengaturan besar kecil huruf
let ukuranTeks = 100; // persen

document.getElementById("perbesarTeks").addEventListener("click", function () {
  if (ukuranTeks < 150) { // batas maksimal
    ukuranTeks += 10;
    document.documentElement.style.setProperty("--ukuran-teks", ukuranTeks + "%");
  }
});

document.getElementById("kecilkanTeks").addEventListener("click", function () {
  if (ukuranTeks > 70) { // batas minimal
    ukuranTeks -= 10;
    document.documentElement.style.setProperty("--ukuran-teks", ukuranTeks + "%");
  }
});

// Fungsi untuk Kontras Tinggi
const tombolKontras = document.getElementById("kontrasToggle");

tombolKontras.addEventListener("click", function () {
  document.body.classList.toggle("kontras-tinggi");

  if (document.body.classList.contains("kontras-tinggi")) {
    tombolKontras.textContent = " Kontras Normal";
  } else {
    tombolKontras.textContent = " Kontras Tinggi";
  }
});

