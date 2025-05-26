// fungsi komnetar cusdis 
document.addEventListener("DOMContentLoaded", function () {
  const thread = document.getElementById("cusdis_thread");

  if (thread) {
    const path = window.location.pathname.replace(/^\/|\/$/g, "") || "beranda";
    thread.dataset.pageId = path;
    thread.dataset.pageUrl = window.location.href;
    thread.dataset.pageTitle = document.title;
  }
});

