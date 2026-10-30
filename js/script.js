
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Footer year
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Menu search and category filters
  const searchInput = document.querySelector("#menuSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const categories = document.querySelectorAll(".menu-category");

  let activeFilter = "all";

  function updateMenu() {
    const searchTerm = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    categories.forEach((category) => {
      const categoryName = category.dataset.category;
      const categoryMatches =
        activeFilter === "all" || activeFilter === categoryName;

      let visibleItems = 0;

      // Filter food cards
      category.querySelectorAll(".menu-card").forEach((card) => {
        const matchesSearch = card.textContent
          .toLowerCase()
          .includes(searchTerm);

        const show = categoryMatches && matchesSearch;
        card.hidden = !show;

        if (show) visibleItems++;
      });

      // Filter simple menu rows
      category
        .querySelectorAll(".simple-menu-list > div")
        .forEach((item) => {
          const matchesSearch = item.textContent
            .toLowerCase()
            .includes(searchTerm);

          const show = categoryMatches && matchesSearch;
          item.hidden = !show;

          if (show) visibleItems++;
        });

      // Keep categories visible only when they have matching items
      category.hidden = !categoryMatches || visibleItems === 0;
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      activeFilter = button.dataset.filter || "all";

      updateMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", updateMenu);
  }

  updateMenu();
});
