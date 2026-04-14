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
const dataBody = document.getElementById("dataBody");

// Update driver dan helper berdasarkan armada
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

// Hitung total otomatis
rit1Input.addEventListener("input", updateTotal);
rit2Input.addEventListener("input", updateTotal);

function updateTotal() {
  const rit1 = parseFloat(rit1Input.value) || 0;
  const rit2 = parseFloat(rit2Input.value) || 0;
  totalInput.value = rit1 + rit2;
}

// Load data dari localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem("omprengData")) || [];
  dataBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${item.tanggal}</td>
                    <td>${item.armada}</td>
                    <td>${item.driver}</td>
                    <td>${item.helper}</td>
                    <td>${item.ompreng}</td>
                    <td>${item.rit1}</td>
                    <td>${item.rit2}</td>
                    <td>${item.total}</td>
                    <td>${item.armadaKurang || "-"}</td>
                    <td>${item.catatanKurang || "-"}</td>
                `;
    dataBody.appendChild(row);
  });
}

// Simpan data
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const tanggal = document.getElementById("tanggal").value;
  const armada = armadaSelect.value;
  const driver = driverInput.value;
  const helper = helperInput.value;
  const ompreng = parseFloat(document.getElementById("ompreng").value);
  const rit1 = parseFloat(rit1Input.value);
  const rit2 = parseFloat(rit2Input.value);
  const total = parseFloat(totalInput.value);
  const armadaKurang = document.getElementById("armadaKurang").value;
  const catatanKurang = document.getElementById("catatanKurang").value;

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
    ompreng,
    rit1,
    rit2,
    total,
    armadaKurang,
    catatanKurang,
  });
  localStorage.setItem("omprengData", JSON.stringify(data));

  loadData();
  form.reset();
  driverInput.value = "";
  helperInput.value = "";
  totalInput.value = "";
});

