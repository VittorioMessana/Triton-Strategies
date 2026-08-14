// Triton Strategies — shared site script

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // close menu when a link is tapped
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Contact form ---------- */
  // GitHub Pages cannot run server-side code, so this form works two ways:
  //
  // 1) DEFAULT (no setup required): submitting opens the visitor's email
  //    client with a pre-filled message addressed to CONTACT_EMAIL below.
  //
  // 2) RECOMMENDED FOR PRODUCTION: create a free form endpoint at
  //    https://formspree.io (or a similar static-form service), then set
  //    FORM_ENDPOINT to that URL. When FORM_ENDPOINT is set, submissions
  //    are sent directly to your inbox without opening a mail client.
  var CONTACT_EMAIL = "contact@tritonstrategies.com";
  var FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        company: form.company.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
      };

      if (!data.name || !data.email || !data.subject || !data.message) {
        status.textContent = "Please complete all required fields.";
        status.classList.remove("success");
        return;
      }

      if (FORM_ENDPOINT) {
        status.textContent = "Sending…";
        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (res) {
            if (res.ok) {
              status.textContent = "Message sent. Thank you — Triton Strategies will be in touch.";
              status.classList.add("success");
              form.reset();
            } else {
              status.textContent = "Something went wrong. Please try again or email us directly.";
              status.classList.remove("success");
            }
          })
          .catch(function () {
            status.textContent = "Something went wrong. Please try again or email us directly.";
            status.classList.remove("success");
          });
      } else {
        var body =
          "Name: " + data.name + "\n" +
          "Company: " + (data.company || "—") + "\n\n" +
          data.message;
        var mailto =
          "mailto:" + CONTACT_EMAIL +
          "?subject=" + encodeURIComponent(data.subject) +
          "&body=" + encodeURIComponent(body);
        window.location.href = mailto;
        status.textContent = "Opening your email client to send this message…";
        status.classList.add("success");
      }
    });
  }
});
