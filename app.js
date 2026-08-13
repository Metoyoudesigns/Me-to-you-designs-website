const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");

function openMenu() {
  sideMenu.classList.add("open");
  menuOverlay.classList.add("open");
  sideMenu.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeSideMenu() {
  sideMenu.classList.remove("open");
  menuOverlay.classList.remove("open");
  sideMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

menuButton.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeSideMenu);
menuOverlay.addEventListener("click", closeSideMenu);

document.querySelectorAll(".menu-parent").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.closest(".menu-group");
    group.classList.toggle("expanded");
    button.querySelector("i").textContent =
      group.classList.contains("expanded") ? "−" : "+";
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeSideMenu();
});
