// nav..........
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

// logo hide 
let lastScrollY = window.scrollY;
const logo = document.querySelector(".logo");
const connectBtn = document.querySelector(".connect-btn");

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 992) return;

  if (window.scrollY > lastScrollY && window.scrollY > 80) {
    logo.classList.add("shrink");
    connectBtn.classList.add("shrink");
  } else {
    logo.classList.remove("shrink");
    connectBtn.classList.remove("shrink");
  }

  lastScrollY = window.scrollY;
});


// disable links
// Block all navigation from Spline & image container
// 1. Block ALL clicks inside image-container & spline-viewer
["click", "auxclick", "contextmenu", "mousedown", "mouseup"].forEach((event) => {
  document.addEventListener(
    event,
    function (e) {
      if (e.target.closest(".image-container, spline-viewer")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    },
    true // CAPTURE phase
  );
});

// 2. HARD BLOCK window.open (Spline uses this)
const originalWindowOpen = window.open;
window.open = function () {
  return null;
};

// 3. HARD BLOCK location changes triggered by scripts
const blockNavigation = () => {
  const current = window.location.href;

  Object.defineProperty(window.location, "href", {
    get() {
      return current;
    },
    set() {
      console.warn("Blocked navigation from Spline");
      return current;
    },
  });
};

blockNavigation();

// 4. Extra safety: block before unload redirects
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});








