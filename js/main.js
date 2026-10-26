/* Instructor auto Claudiu Pintea — interacțiuni & animații */
(function () {
  "use strict";

  var PHONE = "40744470807";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: fundal la scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Meniu mobil ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Tranziție între pagini ---------- */
  document.querySelectorAll("a[href$='.html']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || a.target === "_blank" || reduceMotion) return;
      e.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(function () { window.location.href = a.href; }, 320);
    });
  });
  window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });

  /* ---------- Reveal la scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Citat: aprinderea farurilor (text reveal) ---------- */
  var quote = document.querySelector("[data-text-reveal]");
  var words = [];
  if (quote) {
    var text = quote.textContent.trim().replace(/\s+/g, " ");
    quote.textContent = "";
    text.split(" ").forEach(function (w, i, arr) {
      var s = document.createElement("span");
      s.className = "w";
      s.textContent = w;
      quote.appendChild(s);
      if (i < arr.length - 1) quote.appendChild(document.createTextNode(" "));
      words.push(s);
    });
  }

  /* ---------- Parallax ---------- */
  var parallax = document.querySelectorAll("[data-parallax]");

  /* ---------- Timeline: linia se umple ---------- */
  var timeline = document.querySelector(".timeline");
  var fill = timeline && timeline.querySelector(".timeline-fill");
  var steps = timeline ? timeline.querySelectorAll(".t-step") : [];

  function onScrollFx() {
    var vh = window.innerHeight;

    if (words.length) {
      var r = quote.getBoundingClientRect();
      var p = reduceMotion ? 1 : (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var lit = Math.round(p * words.length);
      words.forEach(function (w, i) { w.classList.toggle("lit", i < lit); });
    }

    if (!reduceMotion) {
      parallax.forEach(function (el) {
        var box = el.parentElement.getBoundingClientRect();
        var center = box.top + box.height / 2 - vh / 2;
        // imaginea are 120% înălțime: are 20% din cadru loc de deplasare
        var room = box.height * 0.1;
        var shift = Math.max(-room, Math.min(room, center * -0.1));
        el.style.transform = "translate3d(0," + (shift - room).toFixed(1) + "px,0)";
      });
    }

    if (fill) {
      var tr = timeline.getBoundingClientRect();
      var tp = (vh * 0.6 - tr.top) / tr.height;
      tp = Math.max(0, Math.min(1, tp));
      fill.style.height = (tp * 100).toFixed(2) + "%";
      var fillY = tr.top + tp * tr.height;
      steps.forEach(function (s) {
        var dot = s.querySelector(".t-dot").getBoundingClientRect();
        s.classList.toggle("active", dot.top + dot.height / 2 <= fillY + 1);
      });
    }
  }
  if (words.length || parallax.length || fill) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(function () { onScrollFx(); ticking = false; }); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", onScrollFx);
    onScrollFx();
  }

  /* ---------- FAQ acordeon ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function () {
      var open = !item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });

  /* ---------- Carusel recenzii: dublează pentru buclă continuă ---------- */
  var track = document.querySelector(".marquee-track");
  if (track) {
    Array.prototype.slice.call(track.children).forEach(function (c) {
      var clone = c.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* ---------- Formular înscriere ---------- */
  var form = document.getElementById("enroll-form");
  if (form) {
    var fields = form.querySelectorAll("input, select, textarea");
    var progress = form.querySelectorAll(".form-progress span");
    var required = form.querySelectorAll("[required]");

    function updateProgress() {
      var done = 0;
      required.forEach(function (f) { if (f.value.trim()) done++; });
      progress.forEach(function (s, i) { s.classList.toggle("on", i < done); });
    }

    function validate(f) {
      var wrap = f.closest(".field");
      var ok = f.checkValidity();
      if (f.name === "telefon") ok = ok && f.value.replace(/\D/g, "").length >= 10;
      wrap.classList.toggle("invalid", !ok);
      return ok;
    }

    fields.forEach(function (f) {
      var evt = f.tagName === "SELECT" ? "change" : "input";
      f.addEventListener(evt, function () {
        if (f.tagName === "SELECT") f.classList.toggle("filled", !!f.value);
        if (f.closest(".field").classList.contains("invalid")) validate(f);
        updateProgress();
      });
      f.addEventListener("blur", function () { if (f.value) validate(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      required.forEach(function (f) { if (!validate(f)) valid = false; });
      if (!valid) { form.querySelector(".invalid input, .invalid select").focus(); return; }

      var btn = form.querySelector(".submit");
      btn.classList.add("loading");
      btn.disabled = true;

      var d = new FormData(form);
      var lines = [
        "Bună ziua! Aș dori să mă înscriu la cursurile de conducere (Cat. B).",
        "",
        "Nume: " + d.get("nume"),
        "Telefon: " + d.get("telefon"),
        "Vârstă: " + d.get("varsta"),
        "Experiență: " + d.get("experienta"),
        "Program preferat: " + d.get("program")
      ];
      if ((d.get("mesaj") || "").trim()) lines.push("Mesaj: " + d.get("mesaj").trim());
      var url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n"));

      setTimeout(function () {
        btn.classList.remove("loading");
        btn.disabled = false;
        form.querySelector(".form-body").style.display = "none";
        var ok = form.querySelector(".form-success");
        ok.querySelector("a").href = url;
        ok.classList.add("show");
        window.open(url, "_blank", "noopener");
      }, 1400);
    });
  }

  /* ---------- An curent în footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
