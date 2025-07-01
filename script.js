document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const dashboardContainer = document.getElementById("dashboard-container");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");
  const logoutButton = document.getElementById("logout-button");
  const dashboardNavBtn = document.getElementById("dashboard-nav-btn");
  const historyNavBtn = document.getElementById("history-nav-btn");
  const flatList = document.getElementById("flat-list");
  const searchButton = document.getElementById("search-button");
  const flatSearchInput = document.getElementById("flat-search-input");
  const paymentHistoryTableContainer = document.getElementById(
    "payment-history-table-container"
  );
  const generatePdfButton = document.getElementById("generate-pdf-button");

  const financeNavBtn = document.getElementById("finance-nav-btn");
  const financeSection = document.getElementById("finance-section");
  const totalFundsDisplay = document.getElementById("total-funds");
  const addFundAmountInput = document.getElementById("add-fund-amount");
  const addFundDateInput = document.getElementById("add-fund-date");
  const addFundReasonInput = document.getElementById("add-fund-reason");
  const addFundBtn = document.getElementById("add-fund-btn");
  const deductFundAmountInput = document.getElementById("deduct-fund-amount");
  const deductFundDateInput = document.getElementById("deduct-fund-date");
  const deductFundReasonInput = document.getElementById("deduct-fund-reason");
  const deductFundBtn = document.getElementById("deduct-fund-btn");
  const budgetHistoryTableContainer = document.getElementById(
    "budget-history-table-container"
  );
  const generateBudgetPdfButton = document.getElementById(
    "generate-budget-pdf-button"
  );
  const overallProfitLossPdfBtn = document.getElementById(
    "overall-profit-loss-pdf-btn"
  );

  const customAlertContainer = document.getElementById(
    "custom-alert-container"
  );
  const customAlertMessage = document.getElementById("custom-alert-message");
  const customAlertCloseBtn = document.getElementById("custom-alert-close-btn");
  const customAlertBox = document.getElementById("custom-alert-box");

  const floorNavigation = document.getElementById("floor-navigation");
  const backToAllFlatsBtn = document.getElementById("back-to-all-flats-btn");

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "pass";

  const MONTHS_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let flats = {};
  const floorMap = {
    "1st Floor": ["101", "102", "103", "104"],
    "2nd Floor": ["201", "202", "203", "204"],
    "3rd Floor": ["301", "302", "303", "304"],
    "4th Floor": ["401", "402", "403", "404"],
    "5th Floor": ["501", "502", "503", "504"],
    "6th Floor": ["601", "602", "603", "604"],
  };

  const EXPECTED_ANNUAL_MAINTENANCE = 6000;

  function showAlert(message, type = "neutral") {
    customAlertMessage.innerHTML = message;
    customAlertBox.className = "";
    customAlertBox.classList.add("alert-" + type);
    customAlertContainer.classList.add("active");
  }

  customAlertCloseBtn.addEventListener("click", () => {
    customAlertContainer.classList.remove("active");
    customAlertBox.className = "alert-neutral";
  });

  function typeWriterLoop(text, elementId, speed = 100, pause = 2000) {
    const element = document.getElementById(elementId);
    let index = 0;
    let isDeleting = false;

    function type() {
      if (!element) return;
      element.textContent = isDeleting
        ? text.substring(0, index--)
        : text.substring(0, index++);
      if (!isDeleting && index === text.length + 1) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pause);
        return;
      }
      if (isDeleting && index === 0) isDeleting = false;
      setTimeout(type, isDeleting ? speed / 2.2 : speed);
    }
    type();
  }

  function saveFlatData(data) {
    try {
      localStorage.setItem("flatMaintenanceData", JSON.stringify(data));
    } catch (e) {
      console.error("Error saving flat data to local storage", e);
    }
  }

  function getFlatData() {
    const staticFlatNames = [
      "101",
      "102",
      "103",
      "104",
      "201",
      "202",
      "203",
      "204",
      "301",
      "302",
      "303",
      "304",
      "401",
      "402",
      "403",
      "404",
      "501",
      "502",
      "503",
      "504",
      "601",
      "602",
      "603",
      "604",
    ];
    try {
      const data =
        JSON.parse(localStorage.getItem("flatMaintenanceData")) || {};
      staticFlatNames.forEach((flatName) => {
        if (!data[flatName]) {
          data[flatName] = {
            id: flatName,
            name: flatName,
            status: "Owned",
            maintenanceStatus: MONTHS_SHORT.reduce((acc, month) => {
              acc[month] = false;
              return acc;
            }, {}),
            paymentHistory: [],
          };
        }
      });
      saveFlatData(data);
      return data;
    } catch (e) {
      console.error("Error Loading Flat Data.", e);
      return {};
    }
  }

  function saveBudgetData(budgetData) {
    try {
      localStorage.setItem("budgetData", JSON.stringify(budgetData));
    } catch (e) {
      console.error("Error Saving Budget Data.", e);
    }
  }

  function getBudgetData() {
    try {
      const data = JSON.parse(localStorage.getItem("budgetData")) || {
        totalFunds: 0,
        transactions: [],
      };
      return data;
    } catch (e) {
      console.error("Error Loading Budget Data.", e);
      return { totalFunds: 0, transactions: [] };
    }
  }

  function saveLastMaintenanceAddedDetails(amount, date, reason) {
    try {
      localStorage.setItem(
        "lastMaintenanceAddedDetails",
        JSON.stringify({ amount, date, reason })
      );
    } catch (e) {
      console.error("Error Saving Last Maintenance Details.", e);
    }
  }

  function getLastMaintenanceAddedDetails() {
    try {
      const details = localStorage.getItem("lastMaintenanceAddedDetails");
      return details ? JSON.parse(details) : null;
    } catch (e) {
      console.error("Error Loading Last Maintenance Details.", e);
      return null;
    }
  }

  function clearLastMaintenanceAddedDetails() {
    try {
      localStorage.removeItem("lastMaintenanceAddedDetails");
    } catch (e) {
      console.error("Error Clearing Last Maintenance Details.", e);
    }
  }

  function showLogin() {
    loginContainer.style.display = "flex";
    dashboardContainer.style.display = "none";
    loginError.textContent = "";
    usernameInput.value = "";
    passwordInput.value = "";
    usernameInput.focus();
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("history-section").style.display = "none";
    document.getElementById("finance-section").style.display = "none";
    deactivateAllNavButtons();
  }

  function showDashboard() {
    loginContainer.style.display = "none";
    dashboardContainer.style.display = "block";
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("history-section").style.display = "none";
    document.getElementById("finance-section").style.display = "none";

    floorNavigation.style.display = "flex";
    backToAllFlatsBtn.style.display = "none";
    flatList.style.display = "none";
    renderFloorButtons();
    activateNavButton(dashboardNavBtn);
  }

  function activateNavButton(button) {
    document.querySelectorAll(".main-nav button").forEach((btn) => {
      btn.classList.remove("active");
    });
    if (button) {
      button.classList.add("active");
    }
  }

  function deactivateAllNavButtons() {
    document.querySelectorAll(".main-nav button").forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  }

  function renderFloorButtons() {
    floorNavigation.innerHTML = "";
    const floorNames = Object.keys(floorMap);
    floorNames.forEach((floor) => {
      const button = document.createElement("button");
      button.textContent = floor;
      button.className = "floor-button";
      button.addEventListener("click", () => {
        filterFlatsByFloor(floor);
      });
      floorNavigation.appendChild(button);
    });
  }

  function filterFlatsByFloor(floor) {
    const flatsForFloor = floorMap[floor];
    const filteredFlatsData = {};
    flatsForFloor.forEach((flatNum) => {
      if (flats[flatNum]) {
        filteredFlatsData[flatNum] = flats[flatNum];
      }
    });

    floorNavigation.style.display = "none";
    backToAllFlatsBtn.style.display = "block";
    flatList.style.display = "grid";
    renderFlatCards(filteredFlatsData);
  }

  backToAllFlatsBtn.addEventListener("click", () => {
    floorNavigation.style.display = "flex";
    backToAllFlatsBtn.style.display = "none";
    flatList.style.display = "none";
    renderFloorButtons();
  });

  function renderFlatCards(flatsToRender = flats) {
    flatList.innerHTML = "";
    if (Object.keys(flatsToRender).length === 0) {
      flatList.innerHTML = "<p class='no-results'>No Flats Found.</p>";
      return;
    }

    Object.values(flatsToRender).forEach((flat) => {
      const card = document.createElement("div");
      card.className = "flat-card";

      let badgeClass = "";
      if (flat.status === "Owned") badgeClass = "badge-owned";
      else if (flat.status === "Rented") badgeClass = "badge-rented";
      else if (flat.status === "Empty") badgeClass = "badge-empty";

      const checkboxesHtml = MONTHS_SHORT.map(
        (month) => `
      <div class="month-item">
        <input type="checkbox" data-month="${month}" ${
          flat.maintenanceStatus[month] ? "checked" : ""
        }>
        <label>${month}</label>
      </div>
    `
      ).join("");

      card.innerHTML = `
      <div class="status-overlay ${badgeClass}">${flat.status}</div>
      <h3 style="color: rgb(255, 1, 234); text-decoration: underline;">
        ${flat.name}
      </h3>
      <div class="flat-status">
        <label><input type="radio" name="status-${flat.id}" value="Owned" ${
        flat.status === "Owned" ? "checked" : ""
      }>Owned</label>
        <label><input type="radio" name="status-${flat.id}" value="Rented" ${
        flat.status === "Rented" ? "checked" : ""
      }>Rented</label>
        <label><input type="radio" name="status-${flat.id}" value="Empty" ${
        flat.status === "Empty" ? "checked" : ""
      }>Empty</label>
      </div>


        <div class="month-checkboxes">${checkboxesHtml}</div>
        <div class="payment-section">
          <h4>Add New Maintenance Record</h4>
          Enter Amount (500 Rs Only)
          <input type="number" class="payment-amount" placeholder="Amount (₹)" value="500" readonly> 
          Select Month(s)
          <select multiple class="payment-months">
            ${MONTHS_SHORT.map(
              (month) => `<option value="${month}">${month}</option>`
            ).join("")}
          </select>
          Select Payment Date
          <input type="date" class="payment-date">
          Select Mode of Payment
          <select class="payment-mode">
            <option value=""></option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          Enter Remarks (Such As UPI ID/ Cheque No. etc...)
          <textarea style="font-family: Lucida Sans" class="payment-remarks" placeholder="Remarks"></textarea>
          <button class="add-payment-btn">Add Payment</button>
        </div>
        <div class="flat-payment-history"></div>
      `;

      flatList.appendChild(card);

      card
        .querySelectorAll(`input[name="status-${flat.id}"]`)
        .forEach((radio) => {
          radio.addEventListener("change", () => {
            flat.status = radio.value;
            saveFlatData(flats);
            renderFlatCards(flatsToRender);
          });
        });

      const addBtn = card.querySelector(".add-payment-btn");
      addBtn.addEventListener("click", () => {
        const amountPerMonth = 500;
        const selectedMonths = [
          ...card.querySelector(".payment-months").selectedOptions,
        ].map((opt) => opt.value);
        const paymentDate = card.querySelector(".payment-date").value;
        const mode = card.querySelector(".payment-mode").value;
        const remarks = card.querySelector(".payment-remarks").value;

        if (!selectedMonths.length || !paymentDate || !mode) {
          showAlert(
            "Please Fill All Required Fields: Months, Date, and Mode Of Payment.",
            "neutral"
          );
          return;
        }

        const totalAmount = amountPerMonth * selectedMonths.length;
        const reasonForBudget = `Maintenance Of Flat:  ${
          flat.name
        } for ${selectedMonths.join(", ")}`;

        selectedMonths.forEach((month) => {
          if (!flat.maintenanceStatus[month]) {
            flat.maintenanceStatus[month] = true;
            flat.paymentHistory.push({
              amount: amountPerMonth,
              month: month,
              date: paymentDate,
              mode: mode,
              remarks: remarks,
            });
          }
        });

        addFundToBudget(totalAmount, paymentDate, reasonForBudget);

        saveLastMaintenanceAddedDetails(
          totalAmount,
          paymentDate,
          reasonForBudget
        );

        saveFlatData(flats);
        renderFlatCards(flatsToRender);
        showAlert(
          `Maintenance of ₹${totalAmount} For Flat ${
            flat.name
          } for ${selectedMonths.join(", ")} Has Been Added In Funds!`,
          "Added"
        );

        card.querySelector(".payment-months").selectedIndex = -1;
        card.querySelector(".payment-date").value = "";
        card.querySelector(".payment-mode").value = "";
        card.querySelector(".payment-remarks").value = "";
      });

      const historyDiv = card.querySelector(".flat-payment-history");
      historyDiv.innerHTML =
        flat.paymentHistory.length === 0
          ? `<p class='no-payments-message'>No Payments Recorded For This Flat.</p>`
          : `<h5>Payment History</h5><ul>${flat.paymentHistory
              .map(
                (p) =>
                  `<li><strong>Month:</strong> ${
                    p.month
                  }, <strong>Date:</strong> ${formatDate(p.date)}, <strong>₹${
                    p.amount
                  }</strong>, <strong>Mode:</strong> ${p.mode}${
                    p.remarks ? `, <strong>Remarks:</strong> ${p.remarks}` : ""
                  }</li>`
              )
              .join("")}</ul>`;
    });
  }

  function renderPaymentHistoryTable(data) {
    const allPayments = [];
    Object.values(data).forEach((flat) => {
      flat.paymentHistory.forEach((p) => {
        allPayments.push({ flat: flat.name, ...p });
      });
    });

    allPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

    paymentHistoryTableContainer.innerHTML =
      allPayments.length === 0
        ? `<p class='no-results'>No Payments Recorded.</p>`
        : `<table><thead><tr><th>Flat Number</th><th>Amount</th><th>Date</th><th>Month</th><th>Mode</th><th>Remarks</th></tr></thead><tbody>${allPayments
            .map(
              (p) =>
                `<tr><td>${p.flat}</td><td>₹${p.amount}</td><td>${formatDate(
                  p.date
                )}</td><td>${p.month}</td><td>${p.mode}</td><td>${
                  p.remarks || "-"
                }</td></tr>`
            )
            .join("")}</tbody></table>`;
  }

  function renderBudgetSection() {
    const budgetData = getBudgetData();
    totalFundsDisplay.textContent = `₹ ${budgetData.totalFunds.toFixed(2)}`;

    addFundAmountInput.value = "";
    addFundDateInput.value = "";
    addFundReasonInput.value = "";
    deductFundAmountInput.value = "";
    deductFundDateInput.value = "";
    deductFundReasonInput.value = "";

    const lastMaintDetails = getLastMaintenanceAddedDetails();
    if (lastMaintDetails) {
      addFundAmountInput.value = lastMaintDetails.amount;
      addFundDateInput.value = lastMaintDetails.date;
      addFundReasonInput.value = lastMaintDetails.reason;
      clearLastMaintenanceAddedDetails();
    }

    const budgetTransactions = budgetData.transactions;
    budgetTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    budgetHistoryTableContainer.innerHTML =
      budgetTransactions.length === 0
        ? `<p class='no-results'>No Transactions To Display.</p>`
        : `<table><thead><tr><th>Type</th><th>Amount</th><th>Date</th><th>Reason</th></tr></thead><tbody>${budgetTransactions
            .map(
              (t) =>
                `<tr class="${
                  t.type === "Added" ? "addition-row" : "deduction-row"
                }"><td>${t.type}</td><td>₹${t.amount.toFixed(
                  2
                )}</td><td>${formatDate(t.date)}</td><td>${t.reason}</td></tr>`
            )
            .join("")}</tbody></table>`;
  }

  function addFundToBudget(amount, date, reason) {
    let budgetData = getBudgetData();
    budgetData.totalFunds += amount;
    budgetData.transactions.push({
      type: "Added",
      amount: amount,
      date: date,
      reason: reason,
    });
    saveBudgetData(budgetData);
  }

  function deductFundFromBudget(amount, date, reason) {
    let budgetData = getBudgetData();
    if (budgetData.totalFunds >= amount) {
      budgetData.totalFunds -= amount;
      budgetData.transactions.push({
        type: "Deducted",
        amount: amount,
        date: date,
        reason: reason,
      });
      saveBudgetData(budgetData);
      renderBudgetSection();
      return true;
    } else {
      showAlert("Insufficient Funds For Deduction.", "Deducted");
      return false;
    }
  }

  overallProfitLossPdfBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    const budgetData = getBudgetData();

    const totalIncome = budgetData.transactions
      .filter((t) => t.type === "Added")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = budgetData.transactions
      .filter((t) => t.type === "Deducted")
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfitLoss = totalIncome - totalExpenses;

    let profitLossRatio = 0;
    if (totalIncome > 0) {
      profitLossRatio = ((netProfitLoss / totalIncome) * 100).toFixed(2);
    } else if (totalIncome === 0 && totalExpenses > 0) {
      profitLossRatio = "-100.00";
    }

    doc.setFontSize(16);
    doc.text("Shreeji Complex Overall Profit/Loss Report", 105, 15, {
      align: "center",
    });

    const reportData = [
      ["Total Income (Rs)", totalIncome.toFixed(2)],
      ["Total Expenses (Rs)", totalExpenses.toFixed(2)],
      ["Net Profit/Loss (Rs)", netProfitLoss.toFixed(2)],
      ["Profit/Loss Ratio (%)", `${profitLossRatio}%`],
    ];

    doc.autoTable({
      startY: 25,
      head: [["Metric", "Amount/Value"]],
      body: reportData,
      theme: "grid",
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
        fontSize: 12,
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        textColor: 20,
        fillColor: [240, 248, 255],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { top: 20, left: 10, right: 10 },
      styles: {
        cellPadding: 3,
        overflow: "linebreak",
        halign: "left",
        valign: "middle",
      },
      didDrawCell: function (data) {
        if (data.row.section === "body" && data.column.index === 1) {
          const metric = data.row.raw[0];
          const value = parseFloat(data.cell.raw);
          if (metric === "Net Profit/Loss (Rs)") {
            if (value > 0) {
              data.cell.styles.textColor = [40, 167, 69];
              data.cell.styles.fontStyle = "bold";
            } else if (value < 0) {
              data.cell.styles.textColor = [220, 53, 69];
              data.cell.styles.fontStyle = "bold";
            }
          } else if (metric === "Profit/Loss Ratio (%)") {
            const ratioValue = parseFloat(data.cell.raw);
            if (ratioValue > 0) {
              data.cell.styles.textColor = [40, 167, 69];
              data.cell.styles.fontStyle = "bold";
            } else if (ratioValue < 0) {
              data.cell.styles.textColor = [220, 53, 69];
              data.cell.styles.fontStyle = "bold";
            }
          }
        }
      },
    });

    doc.save("Shreeji_Complex_Profit_Loss_Report.pdf");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      usernameInput.value === ADMIN_USERNAME &&
      passwordInput.value === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAuthenticated", "true");
      showDashboard();
    } else {
      loginError.textContent = "Invalid Username and Password.";
    }
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("isAuthenticated");
    showLogin();
  });

  dashboardNavBtn.addEventListener("click", () => {
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("history-section").style.display = "none";
    document.getElementById("finance-section").style.display = "none";
    activateNavButton(dashboardNavBtn);
    showDashboard();
  });

  historyNavBtn.addEventListener("click", () => {
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("history-section").style.display = "block";
    document.getElementById("finance-section").style.display = "none";
    renderPaymentHistoryTable(flats);
    activateNavButton(historyNavBtn);
  });

  financeNavBtn.addEventListener("click", () => {
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("history-section").style.display = "none";
    document.getElementById("finance-section").style.display = "block";
    renderBudgetSection();
    activateNavButton(financeNavBtn);
  });

  searchButton.addEventListener("click", () => {
    const query = flatSearchInput.value.trim();
    if (!query) {
      renderPaymentHistoryTable(flats);
      return;
    }
    const filtered = {};
    Object.entries(flats).forEach(([k, v]) => {
      if (k.includes(query)) filtered[k] = v;
    });
    renderPaymentHistoryTable(filtered);
  });

  document.getElementById("show-all-button").addEventListener("click", () => {
    flatSearchInput.value = "";
    renderPaymentHistoryTable(flats);
  });

  generatePdfButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    const tableData = [];

    Object.values(flats).forEach((flat) => {
      if (flat.status === "Empty") return;
      const pendingMonths = MONTHS_SHORT.filter(
        (month) => !flat.maintenanceStatus[month]
      );
      if (pendingMonths.length > 0) {
        tableData.push([flat.name, pendingMonths.join(", "), flat.status]);
      }
    });

    if (tableData.length === 0) {
      showAlert("No Pending Maintenance To Generate PDF.", "neutral");
      return;
    }

    doc.setFontSize(16);
    doc.text(
      "Pending Maintenance Report | All Flats, This Is A System Generated Document..",
      105,
      15,
      {
        align: "center",
      }
    );

    doc.autoTable({
      startY: 25,
      head: [["Flat Number", "Pending Months", "Status"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: 255,
        fontSize: 12,
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        textColor: 20,
        fillColor: [245, 250, 255],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { top: 20, left: 10, right: 10 },
      styles: {
        cellPadding: 3,
        overflow: "linebreak",
        halign: "left",
        valign: "middle",
      },
    });

    doc.save("Shreeji_Complex_Pending_Maintenance_Report.pdf");
  });

  generateBudgetPdfButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    const budgetData = getBudgetData();
    const transactions = budgetData.transactions;

    if (transactions.length === 0) {
      showAlert("No Transactions To Generate PDF.", "neutral");
      return;
    }

    const totalFundsAdded = transactions
      .filter((t) => t.type === "Added")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalFundsDeducted = transactions
      .filter((t) => t.type === "Deducted")
      .reduce((sum, t) => sum + t.amount, 0);

    doc.setFontSize(16);
    doc.text(
      "Shreeji Complex Finance, This Is A System Generated Document..",
      105,
      15,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.setTextColor(40, 167, 69);
    doc.text(`Total Funds Added: Rs ${totalFundsAdded.toFixed(2)}`, 15, 30);
    doc.setTextColor(220, 53, 69);
    doc.text(
      `Total Funds Deducted: Rs ${totalFundsDeducted.toFixed(2)}`,
      15,
      38
    );
    doc.setTextColor(20);

    const tableStartY = 50;

    const tableData = transactions.map((t) => [
      t.type,
      t.type === "Added" ? t.amount.toFixed(2) : "",
      t.type === "Deducted" ? t.amount.toFixed(2) : "",
      formatDate(t.date),
      t.reason,
    ]);

    doc.autoTable({
      startY: tableStartY,
      head: [
        ["Type", "Funds Added (Rs)", "Funds Deducted (Rs)", "Date", "Reason"],
      ],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
        fontSize: 12,
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        textColor: 20,
        fillColor: [240, 248, 255],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { top: 20, left: 10, right: 10 },
      styles: {
        cellPadding: 3,
        overflow: "linebreak",
        halign: "left",
        valign: "middle",
      },
      didDrawCell: function (data) {
        if (data.row.section === "body") {
          const transactionType = data.row.raw[0];
          if (data.column.index === 0) {
            if (transactionType === "Added") {
              data.cell.styles.textColor = [40, 167, 69];
              data.cell.styles.fontStyle = "bold";
            } else if (transactionType === "Deducted") {
              data.cell.styles.textColor = [220, 53, 69];
              data.cell.styles.fontStyle = "bold";
            }
          }
          if (data.column.index === 1 && transactionType === "Added") {
            data.cell.styles.textColor = [40, 167, 69];
            data.cell.styles.fontStyle = "bold";
          } else if (
            data.column.index === 2 &&
            transactionType === "Deducted"
          ) {
            data.cell.styles.textColor = [220, 53, 69];
            data.cell.styles.fontStyle = "bold";
          }
        }
      },
    });

    doc.save("Shreeji_Complex_Transaction_History_Report.pdf");
  });

  addFundBtn.addEventListener("click", () => {
    const amount = parseFloat(addFundAmountInput.value);
    const date = addFundDateInput.value;
    const reason = addFundReasonInput.value.trim();

    if (isNaN(amount) || amount <= 0 || !date || !reason) {
      showAlert("Please Enter a Valid Amount, Date and Reason.", "neutral");
      return;
    }

    addFundToBudget(amount, date, reason);
    renderBudgetSection();
    showAlert(`Successfully Added ₹${amount.toFixed(2)} In Funds.`, "Added");
  });

  deductFundBtn.addEventListener("click", () => {
    const amount = parseFloat(deductFundAmountInput.value);
    const date = deductFundDateInput.value;
    const reason = deductFundReasonInput.value.trim();

    if (isNaN(amount) || amount <= 0 || !date || !reason) {
      showAlert("Please Enter a Valid Amount, Date and Reason.", "neutral");
      return;
    }

    const deducted = deductFundFromBudget(amount, date, reason);
    if (deducted) {
      showAlert(
        `Successfully Deducted ₹${amount.toFixed(2)} From Funds.`,
        "Deducted"
      );
    }
  });

  typeWriterLoop(
    "Designed and Developed By | Kush Shah",
    "typewriter",
    100,
    2000
  );

  flats = getFlatData();

  if (localStorage.getItem("isAuthenticated") === "true") {
    showDashboard();
  } else {
    showLogin();
  }
});
