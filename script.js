// ================================
// CEK DATA
// ================================

console.log("script.js berhasil dimuat");

console.log("Data students:", students);


// ================================
// AMBIL ELEMENT HTML
// ================================

const nameSection = document.getElementById("nameSection");
const envelopeSection = document.getElementById("envelopeSection");
const letterSection = document.getElementById("letterSection");

const nameInput = document.getElementById("nameInput");
const openButton = document.getElementById("openButton");
const errorMessage = document.getElementById("errorMessage");

const envelope = document.getElementById("envelope");
const envelopeName = document.getElementById("envelopeName");

const studentName = document.getElementById("studentName");
const studentPhoto = document.getElementById("studentPhoto");
const letterTitle = document.getElementById("letterTitle");
const letterContent = document.getElementById("letterContent");
const letterQuote = document.getElementById("letterQuote");
const senderName = document.getElementById("senderName");

const backButton = document.getElementById("backButton");
const confettiContainer = document.getElementById("confettiContainer");


// ================================
// NORMALISASI NAMA
// ================================

function normalizeName(name) {

    return name
        .toLowerCase()
        .trim();

}


// ================================
// CARI DATA MURID
// ================================

function findStudent(name) {

    const key = normalizeName(name);

    console.log("Nama yang dicari:", key);

    return students[key];

}


// ================================
// BUKA SURAT
// ================================

function openLetter() {

    const inputName = nameInput.value;

    console.log("Input:", inputName);

    const student = findStudent(inputName);


    // ============================
    // JIKA NAMA TIDAK DITEMUKAN
    // ============================

    if (!student) {

        console.log("Nama tidak ditemukan!");

        errorMessage.textContent =
            "Nama kamu belum ditemukan 😭";

        errorMessage.classList.add("show");

        nameInput.focus();

        return;
    }


    // ============================
    // NAMA DITEMUKAN
    // ============================

    console.log(
        "Murid ditemukan:",
        student
    );


    errorMessage.classList.remove("show");


    // Isi amplop
    envelopeName.textContent =
        student.name;


    // Isi surat
    studentName.textContent =
        student.name;
        
    // Isi foto murid
    studentPhoto.src =
    student.photo;

    studentPhoto.alt =
    "Foto " + student.name;

    letterTitle.innerHTML =
        student.title;

    letterContent.innerHTML =
        student.message;

    letterQuote.textContent =
        "“ " + student.quote + " ”";

    senderName.textContent =
        student.sender;


    // ============================
    // PINDAH KE HALAMAN AMPLOP
    // ============================

    nameSection.style.display = "none";

    envelopeSection.style.display = "flex";

    envelopeSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ================================
// TOMBOL BUKA SURAT
// ================================

openButton.addEventListener(
    "click",
    function () {

        console.log(
            "Tombol Buka Surat diklik"
        );

        openLetter();

    }
);


// ================================
// ENTER DI INPUT
// ================================

nameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            openLetter();

        }

    }
);


// ================================
// KLIK AMPLOP
// ================================

envelope.addEventListener(
    "click",
    function () {

        console.log(
            "Amplop diklik"
        );

        envelope.classList.add("open");


        setTimeout(
            function () {

                envelopeSection.style.display =
                    "none";

                letterSection.style.display =
                    "flex";

                letterSection.classList.add(
                    "show"
                );

                createConfetti();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            },
            1000
        );

    }
);


// ================================
// TOMBOL KEMBALI
// ================================

backButton.addEventListener(
    "click",
    function () {

        letterSection.classList.remove(
            "show"
        );

        letterSection.style.display =
            "none";

        envelopeSection.style.display =
            "flex";

        envelope.classList.remove(
            "open"
        );

    }
);


// ================================
// CONFETTI
// ================================

function createConfetti() {

    confettiContainer.innerHTML = "";

    const total = 90;

    for (
        let i = 0;
        i < total;
        i++
    ) {

        const confetti =
            document.createElement("div");

        confetti.classList.add(
            "confetti"
        );

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";

        confetti.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        const size =
            5 + Math.random() * 7;

        confetti.style.width =
            size + "px";

        confetti.style.height =
            size * 1.5 + "px";

        if (Math.random() > 0.5) {

            confetti.style.borderRadius =
                "50%";

        }

        confettiContainer.appendChild(
            confetti
        );

    }

}


// ================================
// ESCAPE
// ================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                letterSection.classList.contains(
                    "show"
                )
            ) {

                backButton.click();

            }

        }

    }
);
