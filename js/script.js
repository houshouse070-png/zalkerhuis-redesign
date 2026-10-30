
// ===================================
// ZALKERHUIS WEBSITE JAVASCRIPT
// Independent redesign concept
// ===================================

document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menu openen" : "Menu sluiten"
      );

      navigation.classList.toggle("open", !isOpen);
    });

    // Close menu after clicking a navigation link
    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menu openen");
        navigation.classList.remove("open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", event => {
      if (
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menu openen");
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menu openen");
        menuToggle.focus();
      }
    });

  }

  // FOOTER CURRENT YEAR
  const yearElement = document.querySelector("[data-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
