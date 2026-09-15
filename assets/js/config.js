const salonConfig = {
  name: "Salon Viyana Kandy",
  phone: "0777222336",
  whatsapp: "94777222336",
  address: "D.S. Senanayake Veediya, Kandy, Sri Lanka",
  instagram: "",
  facebook: "",
  email: "",
  businessHours: "08:00 AM – 05:30 PM",
};

window.salonConfig = salonConfig;

const salonImages = {
  hero: "assets/images/hero.jpg",
  bridal1: "assets/images/bridal-01.jpg",
  bridal2: "assets/images/bridal-02.jpg",
  bridal3: "assets/images/bridal-03.jpg",
  interior: "assets/images/interior.jpg",
  hair: "assets/images/hair.jpg",
  beauty1: "assets/images/beauty-01.jpg",
  beauty2: "assets/images/beauty-02.jpg",
  gallery1: "assets/images/gallery-01.jpg",
  gallery2: "assets/images/gallery-02.jpg",
  gallery3: "assets/images/gallery-03.jpg",
  gallery4: "assets/images/gallery-04.jpg",
};

const salonGalleryImages = [
  { src: salonImages.gallery1, alt: "Bride in makeup portrait" },
  { src: salonImages.gallery2, alt: "Beauty treatment portrait" },
  { src: salonImages.gallery3, alt: "Salon beauty styling detail" },
  { src: salonImages.gallery4, alt: "Bridal hair styling portrait" },
  { src: salonImages.bridal1, alt: "Bridal look and styling" },
  { src: salonImages.interior, alt: "Salon interior aesthetic" },
  { src: salonImages.beauty1, alt: "Beauty treatment detail" },
];

window.salonImages = salonImages;
window.salonGalleryImages = salonGalleryImages;
