//dibawah ini fungsi untuk mengirim komentar ke email 
function komentar() {
    let comment = document.getElementById("comment").value;

    if (comment.trim() === "") {
        alert("Harap isi komentar Anda 🤦‍♂️!");
    } else {
        let email = "andhimardianto@outlook.com";
        let subject = "web pages github";
        let body = encodeURIComponent(comment);

        // Mengarahkan ke email dengan subject dan body yang telah terisi
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    }
}
