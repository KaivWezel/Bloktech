console.log("verbonden");

const form = document.querySelector("form");
const sectionNaw = document.querySelector("section.naw");
const inputName = document.querySelector("input#name");
const inputBirthdate = document.querySelector("input#birthdate");
const inputEmail = document.querySelector("input#email");
const sectionHobbies = document.querySelector("section.hobbies");
const sectionBio = document.querySelector("section.bio");
const sectionUpload = document.querySelector("section.upload");
const inputs = document.querySelectorAll("input");

const sectionWidth = sectionNaw.getBoundingClientRect().width;

const prepareForm = () => {
  form.style.display = "flex";
  document.body.style.overflow = "hidden";
};
prepareForm();
const nextBtn = document.createElement("button");
nextBtn.innerText = "Volgende";
nextBtn.className = "next";
const prevBtn = document.createElement("button");
prevBtn.innerText = "Vorige";
prevBtn.className = "prev";
document.body.appendChild(nextBtn);
document.body.appendChild(prevBtn);

prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);
inputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    // e.preventDefault();
    console.log("invalid input", e.path);
    e.path[3].scrollIntoView();
  });
});

//functions
function nextPage(e) {
  const positionX = e.pageX;
  if (positionX <= sectionWidth) {
    sectionHobbies.scrollIntoView({ behavior: "smooth" });
  } else if (positionX <= sectionWidth * 2) {
    sectionBio.scrollIntoView({ behavior: "smooth" });
  } else if (positionX <= sectionWidth * 3) {
    sectionUpload.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      form.querySelector("button").style.display = "block";
      nextBtn.style.display = "none";
    }, 500);
  }
}

function prevPage(e) {
  const positionX = e.pageX;
  if (positionX >= sectionWidth * 3) {
    sectionBio.scrollIntoView({ behavior: "smooth" });
    form.querySelector("button").style.display = "none";
    setTimeout(() => {
      nextBtn.style.display = "block";
    }, 0);
  } else if (positionX >= sectionWidth * 2) {
    sectionHobbies.scrollIntoView({ behavior: "smooth" });
  } else if (positionX >= sectionWidth) {
    sectionNaw.scrollIntoView({ behavior: "smooth" });
  }
}
