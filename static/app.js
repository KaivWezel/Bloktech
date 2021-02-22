console.log("verbonden!");

const form = document.querySelector(".biography");
const bio = document.querySelector("p.bio");
console.log(form.innerHTML, bio);
const test = ".biography";
console.log(test);

form.addEventListener("submit", () => {
  bio.innerText = "<%= bio %>";
});
