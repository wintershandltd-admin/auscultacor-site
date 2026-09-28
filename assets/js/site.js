/* Ausculta Cor — small progressive enhancements. The site works without this file. */
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  // Close the Services menu when clicking elsewhere or pressing Escape
  var groups = document.querySelectorAll(".has-sub details");
  document.addEventListener("click", function (e) {
    groups.forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute("open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") groups.forEach(function (d) { d.removeAttribute("open"); });
  });

  // Enquiry form: send in the background, then go to the thanks page.
  var form = document.querySelector("form[data-enquiry]");
  if (form) {
    var status = form.querySelector(".form-status");
    var say = function (msg, isError) {
      if (!status) return;
      status.textContent = msg;
      status.classList.toggle("is-error", !!isError);
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.getAttribute("action").indexOf("YOUR_FORM_ID") !== -1) {
        say("This form isn't connected yet. Please email hello@auscultacor.com instead.", true);
        return;
      }
      say("Sending…");
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) {
          window.location.href = form.getAttribute("data-next") || "thanks.html";
        } else {
          say("That didn't go through. Please try again, or email hello@auscultacor.com.", true);
        }
      }).catch(function () {
        say("That didn't go through. Check your connection and try again, or email hello@auscultacor.com.", true);
      });
    });
  }
})();
