document.addEventListener("DOMContentLoaded", function () {
  const thread = document.getElementById('cusdis_thread');

  // Pastikan elemen dan library Cusdis tersedia
  if (thread && window.Cusdis) {
    const pageUrl = window.location.href;
    const pageId = pageUrl; // Bisa diganti dengan slug jika ingin lebih pendek
    const pageTitle = document.title;

    window.Cusdis.renderTo('cusdis_thread', {
      host: 'https://cusdis.com',
      appId: '70af2b20-fc8f-4162-9c16-53d2f449da4a',
      pageId: pageId,
      pageUrl: pageUrl,
      pageTitle: pageTitle
    });
  }
});
