document.documentElement.classList.add("js");

const canvas = document.getElementById("network");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !prefersReduced) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let nodes = [];
  let frame = 0;

  const NODE_COUNT = 72;

  function resize() {
    width = canvas.width = canvas.offsetWidth * devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    initNodes();
  }

  function initNodes() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
    }));
  }

  function draw() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;
    }

    const maxDist = 140;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.strokeStyle = `oklch(0.58 0.11 165 / ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const node of nodes) {
      const pulse = Math.sin(frame * 0.02 + node.x * 0.01) * 0.3 + 0.7;
      ctx.fillStyle = `oklch(0.58 0.11 165 / ${0.35 * pulse})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    }

    frame++;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}

const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  for (const el of reveals) {
    observer.observe(el);
  }
}

const contactSuccess = document.getElementById("contact-success");

if (contactSuccess) {
  const query = new URLSearchParams(window.location.search);

  if (query.get("sent") === "1") {
    contactSuccess.hidden = false;
  }
}

const telegramLinks = document.querySelectorAll("[data-telegram-placement]");

for (const link of telegramLinks) {
  link.addEventListener("click", () => {
    const placement = link.dataset.telegramPlacement;
    const detail = { name: "telegram_agent_opened", placement };

    document.dispatchEvent(new CustomEvent("telegram_agent_opened", { detail }));

    if (typeof window.va === "function") {
      window.va("event", { name: detail.name, data: { placement } });
    }
  });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

const copyButtons = document.querySelectorAll("[data-copy-prompt]");

for (const button of copyButtons) {
  button.addEventListener("click", async () => {
    const prompt = document.getElementById(button.dataset.copyPrompt);
    const status = document.getElementById("copy-status");
    const label = button.querySelector("span");

    if (!prompt || !label) return;

    try {
      await copyText(prompt.textContent.trim());
      label.textContent = "Copied";
      button.classList.add("is-copied");
      if (status) status.textContent = "Demo prompt copied to clipboard.";

      window.clearTimeout(button.copyResetTimer);
      button.copyResetTimer = window.setTimeout(() => {
        label.textContent = "Copy prompt";
        button.classList.remove("is-copied");
        if (status) status.textContent = "";
      }, 2200);
    } catch {
      if (status) status.textContent = "The demo prompt could not be copied. Select the prompt and copy it manually.";
    }
  });
}
