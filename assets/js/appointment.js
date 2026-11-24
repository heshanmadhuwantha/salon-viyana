const appointmentForm = document.getElementById("appointmentForm");
const formStatus = document.getElementById("formStatus");
const appointmentSuccess = document.getElementById("appointmentSuccess");

appointmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(appointmentForm);
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const time = String(formData.get("time") || "").trim();

  if (!name || !phone || !service || !date || !time) {
    formStatus.textContent = "Please complete all required fields before submitting your request.";
    formStatus.className = "form-status error";
    appointmentSuccess.classList.remove("is-visible");
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = "Please enter a valid email address or leave the email field blank.";
    formStatus.className = "form-status error";
    appointmentSuccess.classList.remove("is-visible");
    return;
  }

  formStatus.textContent = "Appointment request prepared successfully. This is a frontend demo only.";
  formStatus.className = "form-status success";
  appointmentSuccess.classList.add("is-visible");
  appointmentForm.reset();
});
