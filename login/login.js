document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Menahan form agar tidak refresh/muncul tanda tanya

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        // Mengirim data ke API herisusanta.my.id
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        // JIKA LOGIN BERHASIL
        if (data.status === "success") {
            // Simpan data username ke browser
            localStorage.setItem("username", data.username);
            // Pindah halaman ke web utama (keluar folder login menuju index.html luar)
            window.location.href = "../index.html";
        } 
        // JIKA LOGIN GAGAL
        else {
            const alertBox = document.getElementById("alertBox");
            if (alertBox) {
                alertBox.innerText = "Username atau Password salah, silahkan coba lagi";
                alertBox.style.display = "block";

                // Hilangkan pesan error setelah 3 detik
                setTimeout(() => {
                    alertBox.style.display = "none";
                }, 3000);
            } else {
                // Cadangan kalau alertBox tidak ketemu di HTML
                alert("Username atau Password salah!");
            }
        }
        
    } catch (error) {
        console.error("Error saat login:", error);
        alert("Gagal terhubung ke server login. Pastikan koneksi internet aktif.");
    }
});
