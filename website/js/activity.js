import {
  getChainTotal,
  getDemoPaymentVolume,
  getReconciledValue,
  triageDemoData,
} from "./activity-data.js";

const formatCurrency = (value, digits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

const formatCompactCurrency = (value) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return formatCurrency(value);
};

const formatInteger = (value) => Math.round(value).toLocaleString("en-US");

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function validateData() {
  const chainTotals = Object.fromEntries(
    triageDemoData.chains.map((chain) => [chain.name, getChainTotal(chain)]),
  );
  const payments = triageDemoData.chains.flatMap((chain) => chain.payments);
  const paymentVolume = getDemoPaymentVolume();
  const reconciledValue = getReconciledValue();

  const checks = {
    goatTotal: chainTotals["GOAT Network"] === 550,
    goatOnly: triageDemoData.chains.length === 1,
    paymentVolume: paymentVolume === 550,
    minimumPayment: Math.min(...payments) >= 5,
    reconciledValue:
      reconciledValue === 84700 && reconciledValue === triageDemoData.metrics.valueReconciled,
    syntheticTransactions: triageDemoData.recentActivity.every((item) =>
      item.transaction.startsWith("DEMO-"),
    ),
  };

  if (Object.values(checks).some((check) => !check)) {
    throw new Error("Triage demo analytics validation failed.");
  }

  return { checks, chainTotals, paymentVolume, reconciledValue, minimumPayment: Math.min(...payments) };
}

const validation = validateData();
window.__TRIAGE_DASHBOARD_VALIDATION__ = validation;

function animateNumber(element, finalValue, formatter, duration = 780) {
  if (!element) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    element.textContent = formatter(finalValue);
    return;
  }

  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatter(finalValue * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function renderMetrics() {
  const metrics = [
    {
      label: "Demo Payment Volume",
      support: "Processed on GOAT Network",
      value: validation.paymentVolume,
      formatter: formatCurrency,
      demo: true,
    },
    {
      label: "Crypto Value Reconciled",
      support: "Historical transaction value analyzed by Triage",
      value: validation.reconciledValue,
      formatter: formatCompactCurrency,
    },
    {
      label: "Transactions Analyzed",
      support: "Transfers, contracts & token activity",
      value: triageDemoData.metrics.transactionsAnalyzed,
      formatter: formatInteger,
    },
    {
      label: "Wallets Traced",
      support: "Across connected transaction paths",
      value: triageDemoData.metrics.walletsTraced,
      formatter: formatInteger,
    },
  ];

  const grid = document.getElementById("metric-grid");
  grid.innerHTML = metrics
    .map(
      (metric, index) => `
        <article class="metric-card${metric.demo ? " metric-card--demo" : ""}">
          <div class="metric-card__head">
            <span class="metric-card__index">0${index + 1}</span>
            ${metric.demo ? '<span class="tag-demo">Demo</span>' : ""}
          </div>
          <strong class="metric-card__value" data-metric-index="${index}">${metric.formatter(metric.value)}</strong>
          <h2 class="metric-card__label">${metric.label}</h2>
          <p class="metric-card__support">${metric.support}</p>
        </article>`,
    )
    .join("");

  metrics.forEach((metric, index) => {
    const element = document.querySelector(`[data-metric-index="${index}"]`);
    animateNumber(element, metric.value, metric.formatter, 720 + index * 90);
  });
}

function renderNetworks() {
  const badges = document.getElementById("network-badges");
  badges.innerHTML = triageDemoData.chains
    .map(
      (chain) => `
        <div class="network-badge">
          <strong>${chain.name}</strong>
          <span>Chain ID ${chain.chainId}</span>
        </div>`,
    )
    .join("");
}

function renderPaymentBreakdown() {
  const total = validation.paymentVolume;
  const totalElement = document.getElementById("payment-volume-total");
  totalElement.textContent = formatCurrency(total);

  const stack = document.getElementById("payment-stack");
  stack.innerHTML = triageDemoData.chains
    .map((chain) => {
      const percent = (getChainTotal(chain) / total) * 100;
      return `<span class="payment-stack__segment payment-stack__segment--${chain.color}" style="width: ${percent}%" title="${chain.name}: ${percent.toFixed(1)}%"></span>`;
    })
    .join("");

  const breakdown = document.getElementById("chain-breakdown");
  breakdown.innerHTML = triageDemoData.chains
    .map((chain) => {
      const chainTotal = getChainTotal(chain);
      const percent = (chainTotal / total) * 100;
      return `
        <div class="chain-row">
          <span class="chain-row__dot chain-row__dot--${chain.color}" aria-hidden="true"></span>
          <strong>${chain.name}</strong>
          <span class="chain-row__percent">${percent.toFixed(1)}%</span>
          <span class="chain-row__value">${formatCurrency(chainTotal)}</span>
        </div>`;
    })
    .join("");
}

function renderReconciliation() {
  const total = validation.reconciledValue;
  document.getElementById("reconciled-total").textContent = formatCurrency(total);

  const max = Math.max(...triageDemoData.reconciliationCategories.map((category) => category.value));
  document.getElementById("reconciliation-bars").innerHTML = triageDemoData.reconciliationCategories
    .map(
      (category) => `
        <div class="reconciliation-row">
          <span class="reconciliation-row__label">${category.label}</span>
          <span class="reconciliation-row__track" aria-hidden="true">
            <span class="reconciliation-row__fill" style="width: ${(category.value / max) * 100}%"></span>
          </span>
          <span class="reconciliation-row__value">${formatCurrency(category.value)}</span>
        </div>`,
    )
    .join("");
}

function renderActivityTable() {
  document.getElementById("activity-table-body").innerHTML = triageDemoData.recentActivity
    .map(
      (item) => `
        <tr>
          <td class="cell-muted">${item.time}</td>
          <td>${item.type}</td>
          <td>${item.chain}</td>
          <td class="cell-mono cell-muted">${item.from}</td>
          <td class="cell-mono cell-muted">${item.to}</td>
          <td class="cell-amount">${formatCurrency(item.amount, 2)}</td>
          <td class="cell-mono">${item.asset}</td>
          <td><span class="status-pill status-pill--${slugify(item.status)}">${item.status}</span></td>
          <td class="cell-transaction">
            <span class="transaction-id"><span class="tag-demo">Demo</span>${item.transaction}</span>
          </td>
        </tr>`,
    )
    .join("");
}

function renderFindings() {
  document.getElementById("findings-grid").innerHTML = triageDemoData.findings
    .map(
      (finding) => `
        <article class="finding-card">
          <div class="finding-card__top">
            <span class="finding-card__code">${finding.code}</span>
            <span class="status-pill status-pill--${slugify(finding.status)}">${finding.status}</span>
          </div>
          <h3>${finding.title}</h3>
          <p class="finding-card__value">${finding.value}</p>
          <p class="finding-card__detail">${finding.detail}</p>
        </article>`,
    )
    .join("");
}

function renderSecondaryMetrics() {
  const metrics = [
    [triageDemoData.metrics.reportsGenerated, "Forensic Reports Generated", formatInteger],
    [triageDemoData.metrics.primaryChains, "Primary Chain", formatInteger],
    [triageDemoData.metrics.classificationRate, "Transactions Classified", (value) => `${value.toFixed(1)}%`],
    [triageDemoData.metrics.linkedWalletRelationships, "Linked Wallet Relationships Detected", formatInteger],
  ];

  document.getElementById("secondary-metrics").innerHTML = metrics
    .map(
      ([value, label, formatter]) => `
        <div class="secondary-stat">
          <strong>${formatter(value)}</strong>
          <span>${label}</span>
        </div>`,
    )
    .join("");
}

function getFlowNodeCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function getFlowNodeBoundary(rect, toward) {
  const center = getFlowNodeCenter(rect);
  const deltaX = toward.x - center.x;
  const deltaY = toward.y - center.y;
  const scale = 1 / Math.max(
    Math.abs(deltaX) / (rect.width / 2),
    Math.abs(deltaY) / (rect.height / 2),
  );

  return {
    x: center.x + deltaX * scale,
    y: center.y + deltaY * scale,
  };
}

function positionFlowEdges() {
  const graph = document.querySelector(".wallet-flow");
  if (!graph) return;

  const graphRect = graph.getBoundingClientRect();

  graph.querySelectorAll(".flow-edge[data-from][data-to]").forEach((edge) => {
    const source = document.getElementById(edge.dataset.from);
    const target = document.getElementById(edge.dataset.to);
    if (!source || !target) return;

    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const sourceCenter = getFlowNodeCenter(sourceRect);
    const targetCenter = getFlowNodeCenter(targetRect);
    const sourceBoundary = getFlowNodeBoundary(sourceRect, targetCenter);
    const targetBoundary = getFlowNodeBoundary(targetRect, sourceCenter);
    const deltaX = targetBoundary.x - sourceBoundary.x;
    const deltaY = targetBoundary.y - sourceBoundary.y;
    const distance = Math.hypot(deltaX, deltaY);
    if (!distance) return;

    const unitX = deltaX / distance;
    const unitY = deltaY / distance;
    const sourceGap = 7;
    const targetGap = 10;
    const startX = sourceBoundary.x + unitX * sourceGap;
    const startY = sourceBoundary.y + unitY * sourceGap;
    const length = Math.max(distance - sourceGap - targetGap, 0);

    edge.style.left = `${startX - graphRect.left}px`;
    edge.style.top = `${startY - graphRect.top}px`;
    edge.style.width = `${length}px`;
    edge.style.transform = `rotate(${Math.atan2(deltaY, deltaX)}rad)`;
  });
}

let flowPositionFrame;
function queueFlowEdgePosition() {
  cancelAnimationFrame(flowPositionFrame);
  flowPositionFrame = requestAnimationFrame(positionFlowEdges);
}

document.getElementById("snapshot-label").textContent = triageDemoData.environment.updatedLabel;
document.getElementById("demo-disclosure").textContent = triageDemoData.environment.disclosure;

renderMetrics();
renderNetworks();
renderPaymentBreakdown();
renderReconciliation();
renderActivityTable();
renderFindings();
renderSecondaryMetrics();

queueFlowEdgePosition();
window.addEventListener("resize", queueFlowEdgePosition, { passive: true });
document.fonts?.ready.then(queueFlowEdgePosition);

const flowGraph = document.querySelector(".wallet-flow");
if (flowGraph && "ResizeObserver" in window) {
  const flowResizeObserver = new ResizeObserver(queueFlowEdgePosition);
  flowResizeObserver.observe(flowGraph);
  flowGraph.querySelectorAll(".flow-node").forEach((node) => flowResizeObserver.observe(node));
}
