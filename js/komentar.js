const API_URL = 'https://api.andhim.net/comments';
const pageUrl = window.location.href;

const form = document.getElementById('komentar-form');
const daftarKomentar = document.getElementById('daftar-komentar');

// Ambil komentar
async function ambilKomentar() {
  daftarKomentar.innerHTML = '<li>Memuat komentar...</li>';
  try {
    const res = await fetch(`${API_URL}?page_url=${encodeURIComponent(pageUrl)}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    if (data.length === 0) {
      daftarKomentar.innerHTML = '<li>Belum ada komentar.</li>';
      return;
    }

    daftarKomentar.innerHTML = '';
    data.forEach(kom => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${kom.name}</strong> (${kom.team})<br/>
        ${kom.comment}<br/>
        <small><i>${new Date(kom.created_at).toLocaleString()}</i></small>
      `;
      daftarKomentar.appendChild(item);
    });
  } catch (err) {
    daftarKomentar.innerHTML = `<li>Gagal memuat komentar: ${err.message}</li>`;
  }
}

// Kirim komentar
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const tim = document.getElementById('tim').value.trim();
  const komentar = document.getElementById('komentar').value.trim();

  if (!nama || !tim || !komentar) {
    alert('Semua kolom harus diisi!');
    return;
  }

  const data = {
    name: nama,
    team: tim,
    comment: komentar,
    page_url: pageUrl
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    const hasil = await res.json();
    if (hasil.error) throw new Error(hasil.error);

    alert('Komentar berhasil dikirim!');
    form.reset();
    ambilKomentar();
  } catch (err) {
    alert('Gagal mengirim komentar: ' + err.message);
  }
});

// Mulai saat halaman dibuka
ambilKomentar();
