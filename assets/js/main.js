document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeKey = "salon-viyana-theme";

  const updateThemeToggle = (theme) => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector(".theme-toggle-icon");
    if (!icon) return;
    const isDark = theme === "dark";
    icon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Toggle dark mode");
    themeToggle.title = isDark ? "Switch to light mode" : "Toggle dark mode";
  };

  const applyTheme = (theme) => {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", selectedTheme);
    updateThemeToggle(selectedTheme);
    try {
      localStorage.setItem(themeKey, selectedTheme);
    } catch (error) {
      // Ignore storage errors in browser-restricted environments.
    }
  };

  const theme = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(theme);

  themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("main section[id]");
  const scrollProgress = document.querySelector(".scroll-progress");
  const revealItems = document.querySelectorAll(".reveal-up");
  const galleryButtons = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-arrow.prev");
  const nextButton = document.querySelector(".lightbox-arrow.next");
  const bookingModal = document.querySelector(".booking-modal");
  const bookingForm = document.getElementById("booking-form");
  const bookingError = document.getElementById("booking-error");
  const bookingSuccess = document.querySelector(".booking-success");
  const modalClose = document.querySelector(".modal-close");
  const modalCancel = document.querySelector(".modal-cancel");
  const modalCloseSuccess = document.querySelector(".modal-close-success");
  const serviceSelect = document.getElementById("service");
  const openBookingButtons = document.querySelectorAll(".open-booking");

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
      if (link.textContent.trim() === "") {
        link.textContent = formatPhone(phoneValue);
      }
    });

    document.querySelectorAll("[data-phone-text]").forEach((el) => {
      el.textContent = formatPhone(config.phone || "0777222336");
    });

    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      link.setAttribute("href", `https://wa.me/${config.whatsapp || "94777222336"}`);
    });

    document.querySelectorAll("[data-address]").forEach((el) => {
      const addressText = config.address || "D.S. Senanayake Veediya, Kandy, Sri Lanka";
      if (el.innerHTML.includes("<br")) {
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
    if (!window.salonImages) return;

    const imageMap = {
      "assets/images/hero.jpg": window.salonImages.hero,
      "assets/images/bridal-01.jpg": window.salonImages.bridal1,
      "assets/images/bridal-02.jpg": window.salonImages.bridal2,
      "assets/images/bridal-03.jpg": window.salonImages.bridal3,
      "assets/images/interior.jpg": window.salonImages.interior,
      "assets/images/hair.jpg": window.salonImages.hair,
      "assets/images/beauty-01.jpg": window.salonImages.beauty1,
      "assets/images/beauty-02.jpg": window.salonImages.beauty2,
      "assets/images/gallery-01.jpg": window.salonImages.gallery1,
      "assets/images/gallery-02.jpg": window.salonImages.gallery2,
      "assets/images/gallery-03.jpg": window.salonImages.gallery3,
      "assets/images/gallery-04.jpg": window.salonImages.gallery4,
    };

    document.querySelectorAll("img").forEach((img) => {
      const currentSrc = img.getAttribute("src");
      if (currentSrc && imageMap[currentSrc]) {
        img.setAttribute("src", imageMap[currentSrc]);
      }
    });
  };

  const setHeaderScrollState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  };

  const closeNavigation = () => {
    if (!navPanel || !navToggle) return;
    navPanel.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const toggleNavigation = () => {
    if (!navPanel || !navToggle) return;
    const isOpen = navPanel.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  };

  navToggle?.addEventListener("click", toggleNavigation);
  navPanel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
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
      link.classList.toggle("active", href === `#${activeId}`);
    });
  };

  const handleScrollProgress = () => {
    if (!scrollProgress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
  };

  if (revealItems.length) {
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
  }

  let currentGalleryIndex = 0;

  const openLightbox = (index) => {
    if (!lightbox || !lightboxImage || !window.salonGalleryImages) return;
    currentGalleryIndex = index;
    const image = window.salonGalleryImages[index];
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const updateLightboxImage = (direction) => {
    if (!window.salonGalleryImages) return;
    currentGalleryIndex = (currentGalleryIndex + direction + window.salonGalleryImages.length) % window.salonGalleryImages.length;
    const image = window.salonGalleryImages[currentGalleryIndex];
    if (!image) return;
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
    if (lightbox && lightbox.classList.contains("is-open")) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") updateLightboxImage(-1);
      if (event.key === "ArrowRight") updateLightboxImage(1);
    }
  });

  const setBookingModalState = (isOpen, selectedService = "") => {
    if (!bookingModal || !bookingForm || !bookingSuccess) return;

    if (isOpen) {
      bookingModal.classList.add("is-open");
      bookingModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (selectedService) {
        serviceSelect.value = selectedService;
      }
      bookingForm.hidden = false;
      bookingSuccess.hidden = true;
      bookingError.textContent = "";
      bookingForm.reset();
      if (selectedService) {
        serviceSelect.value = selectedService;
      }
      setTimeout(() => bookingForm.querySelector("input, select")?.focus(), 50);
    } else {
      bookingModal.classList.remove("is-open");
      bookingModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  openBookingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedService = button.dataset.service || "";
      setBookingModalState(true, selectedService);
    });
  });

  const closeBookingModal = () => setBookingModalState(false);
  modalClose?.addEventListener("click", closeBookingModal);
  modalCancel?.addEventListener("click", closeBookingModal);
  modalCloseSuccess?.addEventListener("click", closeBookingModal);
  bookingModal?.addEventListener("click", (event) => {
    if (event.target === bookingModal) closeBookingModal();
  });

  document.addEventListener("keydown", (event) => {
    if (bookingModal && bookingModal.classList.contains("is-open") && event.key === "Escape") {
      closeBookingModal();
    }
  });

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const service = formData.get("service");
    const date = formData.get("date");
    const time = formData.get("time");
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!service || !date || !time || !name || !phone) {
      bookingError.textContent = "Please complete all required fields before submitting your request.";
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      bookingError.textContent = "Please enter a valid email address or leave this field blank.";
      return;
    }

    bookingError.textContent = "";
    bookingForm.hidden = true;
    bookingSuccess.hidden = false;
  });

  window.addEventListener("scroll", () => {
    setHeaderScrollState();
    updateActiveNav();
    handleScrollProgress();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeNavigation();
    }
  });

  applyConfigValues();
  applyImagePaths();
  setHeaderScrollState();
  updateActiveNav();
  handleScrollProgress();
});

