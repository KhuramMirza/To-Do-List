export const mode = function () {
  const btn = document.querySelector(".btn--mode");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    // e.preventDefault();
    document.body.classList.toggle("dark-mode");
  });
};
