(() => {
  const CTA = "https://skor.sorsi.me";

  document.querySelectorAll("[data-cta]").forEach((el) => {
    el.setAttribute("href", CTA);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  /* Drawer menu */
  const burger = document.querySelector(".burger");
  const drawer = document.getElementById("drawer");
  if (burger && drawer) {
    const setOpen = (open) => {
      drawer.hidden = !open;
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () => setOpen(drawer.hidden));
    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
  }

  /* Story expand */
  const moreBtn = document.getElementById("story-more");
  const moreExtra = document.getElementById("story-extra");
  if (moreBtn && moreExtra) {
    moreBtn.addEventListener("click", () => {
      const open = moreExtra.hidden;
      moreExtra.hidden = !open;
      moreBtn.setAttribute("aria-expanded", String(open));
      moreBtn.textContent = open ? "Sembunyikan" : "Selengkapnya";
    });
  }

  /* Fireworks — pause when tab hidden */
  const fwLayer = document.getElementById("fx-fireworks");
  if (fwLayer) {
    const colors = ["#ff4d6d", "#e31c3d", "#ffd166", "#ffe6c2", "#ff8fa3", "#ffffff", "#f0d2a8"];
    let timer;

    const burst = (xPct, yPct) => {
      const root = document.createElement("div");
      root.className = "fw-burst";
      root.style.left = `${xPct}%`;
      root.style.top = `${yPct}%`;

      const flash = document.createElement("span");
      flash.className = "fw-flash";
      root.appendChild(flash);

      const n = window.innerWidth < 768 ? 16 : 24;
      for (let i = 0; i < n; i += 1) {
        const spark = document.createElement("span");
        spark.className = "fw-spark";
        const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.35;
        const dist = 50 + Math.random() * 100;
        const color = colors[(Math.random() * colors.length) | 0];
        spark.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
        spark.style.setProperty("--y", `${Math.sin(angle) * dist + 20 + Math.random() * 40}px`);
        spark.style.setProperty("--c", color);
        spark.style.setProperty("--sz", `${3 + Math.random() * 4}px`);
        spark.style.setProperty("--dur", `${0.85 + Math.random() * 0.55}s`);
        root.appendChild(spark);
      }

      fwLayer.appendChild(root);
      window.setTimeout(() => root.remove(), 1600);
    };

    const fire = () => {
      if (document.hidden) return;
      burst(12 + Math.random() * 76, 12 + Math.random() * 40);
      if (Math.random() > 0.55) {
        window.setTimeout(() => burst(15 + Math.random() * 70, 15 + Math.random() * 35), 280);
      }
    };

    const start = () => {
      if (timer) return;
      fire();
      timer = window.setInterval(fire, 3200);
    };
    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    };

    start();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });
  }

  /* Live Jackpot ~ Rp 500 juta */
  const jackpot = document.querySelector("[data-jackpot]");
  if (jackpot) {
    let value = 512450880;
    const fmt = (n) =>
      new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(n);
    const tickJackpot = () => {
      if (document.hidden) return;
      value += Math.floor(8000 + Math.random() * 42000);
      jackpot.textContent = fmt(value);
      jackpot.classList.remove("is-pop");
      void jackpot.offsetWidth;
      jackpot.classList.add("is-pop");
    };
    tickJackpot();
    setInterval(tickJackpot, 1200);
  }

  /* Dual marquees — duplicate content for seamless loop */
  document.querySelectorAll("[data-marquee]").forEach((flow) => {
    flow.innerHTML += flow.innerHTML;
  });

  /* Sparkle dots on CTA buttons */
  document.querySelectorAll(".fx-sparkle").forEach((btn) => {
    const spots = [
      [12, 22],
      [78, 18],
      [88, 62],
      [18, 72],
      [52, 12],
    ];
    spots.forEach(([x, y], i) => {
      const s = document.createElement("i");
      s.className = "spark";
      s.setAttribute("aria-hidden", "true");
      s.style.left = `${x}%`;
      s.style.top = `${y}%`;
      s.style.animationDelay = `${i * 0.28}s`;
      btn.appendChild(s);
    });
  });

  /* Livechat */
  const fab = document.getElementById("chat-fab");
  const panel = document.getElementById("chat-panel");
  const closeBtn = document.querySelector(".chat__x");
  const setChat = (open) => {
    if (!fab || !panel) return;
    panel.hidden = !open;
    fab.setAttribute("aria-expanded", String(open));
  };
  if (fab && panel) {
    fab.addEventListener("click", () => setChat(panel.hidden));
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => setChat(false));
  }

  /* Filmstrip: optional drag hint on desktop wheel → horizontal */
  const track = document.querySelector(".film__track");
  if (track && window.matchMedia("(pointer: fine)").matches) {
    track.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          track.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
})();
