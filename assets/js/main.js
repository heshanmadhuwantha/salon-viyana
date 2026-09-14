document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("main section[id]");
  const scrollProgress = document.querySelector(".scroll-progress");
  const backToTop = document.querySelector(".back-to-top");
  const revealItems = document.querySelectorAll(".reveal-up");
  const galleryButtons = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-arrow.prev");
  const nextButton = document.querySelector(".lightbox-arrow.next");

  const formatPhone = (value) => {
    const digits = value.replace(/\D+/g, "");
    if (digits.length === 10) {
      return digits.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
    }
    if (digits.length === 9) {
      return digits.replace(/^(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3");
    }
    return value;
  };

  const applyConfigValues = () => {
    if (!window.salonConfig) return;

    const config = window.salonConfig;

    document.querySelectorAll("[data-phone-link]").forEach((link) => {
      const phoneValue = config.phone || "0777222336";
      link.setAttribute("href", `tel:+${phoneValue.replace(/\D+/g, "")}`);
    });

    document.querySelectorAll("[data-phone-text]").forEach((el) => {
      el.textContent = formatPhone(config.phone || "0777222336");
    });

    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      link.setAttribute("href", `https://wa.me/${config.whatsapp || "94777222336"}`);
    });

    document.querySelectorAll("[data-address]").forEach((el) => {
      const addressText = config.address || "D.S. Senanayake Veediya, Kandy, Sri Lanka";
      const hasLineBreak = /<br\s*\/>/i.test(el.innerHTML);
      if (hasLineBreak) {
        el.innerHTML = addressText.replace(", Sri Lanka", "<br />Kandy, Sri Lanka");
      } else {
        el.textContent = addressText;
      }
    });

    document.querySelectorAll("[data-hours]").forEach((el) => {
      el.textContent = config.businessHours || "08:00 AM – 05:30 PM";
    });
  };

  const applyImagePaths = () => {
    const imageMap = {
      "assets/images/hero.jpg": salonImages.hero,
      "assets/images/bridal-01.jpg": salonImages.bridal1,
      "assets/images/bridal-02.jpg": salonImages.bridal2,
      "assets/images/bridal-03.jpg": salonImages.bridal3,
      "assets/images/interior.jpg": salonImages.interior,
      "assets/images/hair.jpg": salonImages.hair,
      "assets/images/beauty-01.jpg": salonImages.beauty1,
      "assets/images/beauty-02.jpg": salonImages.beauty2,
      "assets/images/gallery-01.jpg": salonImages.gallery1,
      "assets/images/gallery-02.jpg": salonImages.gallery2,
      "assets/images/gallery-03.jpg": salonImages.gallery3,
      "assets/images/gallery-04.jpg": salonImages.gallery4,
    };

    document.querySelectorAll("img").forEach((img) => {
      const currentSrc = img.getAttribute("src");
      if (imageMap[currentSrc]) {
        img.setAttribute("src", imageMap[currentSrc]);
      }
    });
  };

  const setHeaderScrollState = () => {
    if (!header) return;
    const isScrolled = window.scrollY > 12;
    header.classList.toggle("scrolled", isScrolled);
  };

  const toggleNavigation = () => {
    const isOpen = navPanel.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  };

  navToggle?.addEventListener("click", toggleNavigation);
  navPanel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const updateActiveNav = () => {
    let activeId = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 160;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const matches = href === `#${activeId}`;
      link.classList.toggle("active", matches);
    });
  };

  const handleScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;

    backToTop.classList.toggle("visible", window.scrollY > 500);
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  let currentGalleryIndex = 0;

  const openLightbox = (index) => {
    currentGalleryIndex = index;
    const image = salonGalleryImages[index];
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const updateLightboxImage = (direction) => {
    currentGalleryIndex = (currentGalleryIndex + direction + salonGalleryImages.length) % salonGalleryImages.length;
    const image = salonGalleryImages[currentGalleryIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
  };

  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index ?? 0);
      openLightbox(index);
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", () => updateLightboxImage(-1));
  nextButton?.addEventListener("click", () => updateLightboxImage(1));

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      updateLightboxImage(-1);
    }

    if (event.key === "ArrowRight") {
      updateLightboxImage(1);
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    setHeaderScrollState();
    updateActiveNav();
    handleScrollProgress();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      navPanel?.classList.remove("is-open");
      navToggle?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });

  applyConfigValues();
  applyImagePaths();
  setHeaderScrollState();
  updateActiveNav();
  handleScrollProgress();
});
