// Data armada
const armadaData = {
  pertama: { driver: "Rusdiono", helper: "Buyung" },
  kedua: { driver: "Ipan", helper: "Jumairi" },
};

// Elemen DOM
const form = document.getElementById("dataForm");
const armadaSelect = document.getElementById("armada");
const driverInput = document.getElementById("driver");
const helperInput = document.getElementById("helper");
const rit1Input = document.getElementById("rit1");
const rit2Input = document.getElementById("rit2");
const totalInput = document.getElementById("total");
const errorDiv = document.getElementById("error");

// Update driver dan helper
armadaSelect.addEventListener("change", function () {
  const selected = armadaSelect.value;
  if (selected) {
    driverInput.value = armadaData[selected].driver;
    helperInput.value = armadaData[selected].helper;
  } else {
    driverInput.value = "";
    helperInput.value = "";
  }
});

// Hitung total
rit1Input.addEventListener("input", updateTotal);
rit2Input.addEventListener("input", updateTotal);

function updateTotal() {
  const rit1 = parseFloat(rit1Input.value) || 0;
  const rit2 = parseFloat(rit2Input.value) || 0;
  totalInput.value = rit1 + rit2;
}

// Simpan data
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tanggal = document.getElementById("tanggal").value;
  const armada = armadaSelect.value;
  const driver = driverInput.value;
  const helper = helperInput.value;
  const ompreng = document.getElementById("ompreng").value;
  const rit1 = rit1Input.value;
  const rit2 = rit2Input.value;
  const total = totalInput.value;
  const armadaKurang = document.getElementById("armadaKurang").value;
  const catatanKurang = document.getElementById("catatanKurang").value;

  // ✅ VALIDASI BARU (lebih aman)
  if (!tanggal || !armada || ompreng === "" || rit1 === "" || rit2 === "") {
    errorDiv.textContent = "Semua field wajib harus diisi!";
    return;
  }

  errorDiv.textContent = "";

  const data = JSON.parse(localStorage.getItem("omprengData")) || [];

  data.push({
    tanggal,
    armada,
    driver,
    helper,
    ompreng: parseFloat(ompreng),
    rit1: parseFloat(rit1),
    rit2: parseFloat(rit2),
    total: parseFloat(total),
    armadaKurang,
    catatanKurang,
  });

  localStorage.setItem("omprengData", JSON.stringify(data));

  // ✅ RESET FORM (FIX UTAMA)
  form.reset();
  driverInput.value = "";
  helperInput.value = "";
  totalInput.value = 0;

  // 🔥 BONUS: fokus balik ke awal
  document.getElementById("tanggal").focus();
});
