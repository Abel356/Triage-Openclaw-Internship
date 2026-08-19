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

document.getElementById("snapshot-label").textContent = triageDemoData.environment.updatedLabel;
document.getElementById("demo-disclosure").textContent = triageDemoData.environment.disclosure;

renderMetrics();
renderNetworks();
renderPaymentBreakdown();
renderReconciliation();
renderActivityTable();
renderFindings();
renderSecondaryMetrics();
