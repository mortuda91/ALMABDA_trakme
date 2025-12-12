const grid = document.getElementById("lessonsGrid");
const addLessonBtn = document.getElementById("addLessonBtn");
const clearBtn = document.getElementById("clearBtn");

const dividerInput = document.getElementById("divider");
const dividerView = document.getElementById("dividerView");

const sumEl = document.getElementById("sum");
const finalEl = document.getElementById("final");

const studentNameInput = document.getElementById("studentName");
const downloadBtn = document.getElementById("downloadImgBtn");
const captureArea = document.getElementById("captureArea");

let lessonCount = 0;

addLessonBtn.addEventListener("click", addLesson);
clearBtn.addEventListener("click", clearAll);
dividerInput.addEventListener("input", calculate);
downloadBtn.addEventListener("click", downloadFullPlatformImage);

// يبدأ بمربع واحد حتى لا تكون الصفحة فارغة
addLesson();

function addLesson() {
  lessonCount++;

  const wrap = document.createElement("div");
  wrap.className = "lesson-wrap";

  const input = document.createElement("input");
  input.type = "number";
  input.className = "lesson";
  input.placeholder = `حصة ${lessonCount}`;
  input.addEventListener("input", calculate);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "remove";
  remove.title = "حذف";
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    wrap.remove();
    calculate();
  });

  wrap.appendChild(input);
  wrap.appendChild(remove);
  grid.appendChild(wrap);

  calculate();
}

function clearAll() {
  grid.innerHTML = "";
  lessonCount = 0;
  dividerInput.value = "";
  addLesson(); // يرجع مربع واحد
  calculate();
}

function calculate() {
  const inputs = document.querySelectorAll(".lesson");
  let sum = 0;

  inputs.forEach(inp => {
    sum += Number(inp.value) || 0;
  });

  sumEl.textContent = sum;

  const dividerRaw = dividerInput.value;
  const divider = Number(dividerRaw);

  if (!dividerRaw) {
    dividerView.textContent = "—";
    finalEl.textContent = "0";
    return;
  }

  dividerView.textContent = divider;

  if (!divider || divider <= 0) {
    finalEl.textContent = "0";
    return;
  }

  finalEl.textContent = (sum / divider).toFixed(2);
}

// 📸 التقاط صورة كاملة للمنصة (اسم + مدرسة + حصص + درجات + نتائج + حقوق)
async function downloadFullPlatformImage() {
  if (typeof html2canvas === "undefined") {
    alert("مكتبة التقاط الصورة غير متاحة. تأكد من وجود إنترنت.");
    return;
  }

  const studentName = (studentNameInput.value || "بدون_اسم").trim().replace(/\s+/g, "_");

  // نخلي أي عناصر خارج إطار المنصة ما تدخل بالصورة
  const canvas = await html2canvas(captureArea, {
    backgroundColor: null,
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");

  const a = document.createElement("a");
  a.href = imgData;
  a.download = `منصة_المبدأ_${studentName}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
