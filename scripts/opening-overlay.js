(function () {
  const overlay = document.getElementById("opening-overlay");
  const seal = document.getElementById("opening-seal");
  const main = document.getElementById("main");

  if (!overlay || !seal) return;

  let finished = false;
  let fallbackTimer = 0;
  /** Nur einmal pausieren nach Klappen-Ende (transitionend feuert pro Klappe) */
  let pauseAfterFlapsScheduled = false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /** Pause nach Ende der Klappen-Animation, bevor Overlay weg & Inhalt „da“ ist (ms) */
  const REVEAL_PAUSE_MS = reduceMotion ? 100 : 200;
  /** Sicherheits-Timeout falls kein transitionend (Klappen-Dauer + Pause + Puffer) */
  const FALLBACK_TOTAL_MS = reduceMotion ? 400 : 3200;

  function completeReveal() {
    if (finished) return;
    finished = true;
    window.clearTimeout(fallbackTimer);
    overlay.classList.add("is-done");
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("aria-modal");
    document.body.classList.add("site-revealed");
    if (main) {
      window.setTimeout(function () {
        main.focus({ preventScroll: true });
      }, 1200);
    }
  }

  function reveal() {
    if (overlay.classList.contains("is-open")) return;
    overlay.classList.add("is-open");
    seal.disabled = true;
    pauseAfterFlapsScheduled = false;
    fallbackTimer = window.setTimeout(completeReveal, FALLBACK_TOTAL_MS);
  }

  overlay.addEventListener("transitionend", function (e) {
    if (finished || !overlay.classList.contains("is-open")) return;
    if (!e.target.classList.contains("opening-flap")) return;
    if (e.propertyName !== "transform") return;
    if (pauseAfterFlapsScheduled) return;
    pauseAfterFlapsScheduled = true;
    window.clearTimeout(fallbackTimer);
    fallbackTimer = window.setTimeout(completeReveal, REVEAL_PAUSE_MS);
  });

  seal.addEventListener("click", reveal);
})();
