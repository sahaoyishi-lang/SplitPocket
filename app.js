/**
 * PocketSplit - Personal Finance & Expense-Tracking Dashboard
 * Core Engine & Interactive UI Manager
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Data Definitions & Constants
  // ==========================================================================

  const CATEGORIES = {
    food: { name: 'Food & Dining', color: '#f97316', icon: '🍔' },
    transport: { name: 'Transportation', color: '#3b82f6', icon: '🚗' },
    utilities: { name: 'Utilities & Bills', color: '#eab308', icon: '💡' },
    subscriptions: { name: 'Subscriptions', color: '#8b5cf6', icon: '📱' },
    entertainment: { name: 'Entertainment', color: '#ec4899', icon: '🎬' },
    shopping: { name: 'Shopping & Retail', color: '#06b6d4', icon: '🛍️' },
    health: { name: 'Healthcare', color: '#10b981', icon: '💊' },
    other: { name: 'Other Expenses', color: '#64748b', icon: '📦' }
  };

  const DEFAULT_STATE = {
    user: {
      name: 'Alex Morgan',
      email: 'alex@gmail.com',
      avatarUrl: '',
      avatarInitials: 'AM',
      isSignedIn: false
    },
    spendingLimit: 45000.00,
    totalIncome: 85000.00,
    cards: [
      {
        id: 'card_sbi',
        name: 'State Bank of India',
        tier: 'SBI GLOBAL PLATINUM',
        number: '4532 8920 1829 4829',
        lastFour: '4829',
        holder: 'ALEX MORGAN',
        expiry: '08/28',
        balance: 48520.50,
        network: 'Mastercard',
        bankId: 'sbi',
        bankName: 'State Bank of India',
        themeClass: 'card-theme-sbi',
        isFrozen: false
      },
      {
        id: 'card_hdfc',
        name: 'HDFC Bank',
        tier: 'HDFC REGALIA FIRST',
        number: '4111 2345 6789 9102',
        lastFour: '9102',
        holder: 'ALEX MORGAN',
        expiry: '11/29',
        balance: 62450.00,
        network: 'Visa',
        bankId: 'hdfc',
        bankName: 'HDFC Bank',
        themeClass: 'card-theme-hdfc',
        isFrozen: false
      }
    ],
    activeCardIndex: 0,
    transactions: [
      {
        id: 'tx_101',
        description: 'Nature’s Basket Gourmet',
        category: 'food',
        amount: 1480.00,
        date: getRelativeDate(0),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_102',
        description: 'Uber Premier City Ride',
        category: 'transport',
        amount: 450.00,
        date: getRelativeDate(0),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_103',
        description: 'Electricity Board BESCOM Bill',
        category: 'utilities',
        amount: 2150.00,
        date: getRelativeDate(1),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_104',
        description: 'Netflix Premium 4K Ultra',
        category: 'subscriptions',
        amount: 649.00,
        date: getRelativeDate(2),
        paymentMethod: 'HDFC Bank (*9102)'
      },
      {
        id: 'tx_105',
        description: 'PVR INOX IMAX Cinema Tickets',
        category: 'entertainment',
        amount: 980.00,
        date: getRelativeDate(2),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_106',
        description: 'Apple Music Family Plan',
        category: 'subscriptions',
        amount: 179.00,
        date: getRelativeDate(3),
        paymentMethod: 'HDFC Bank (*9102)'
      },
      {
        id: 'tx_107',
        description: 'BigBasket Fresh Groceries',
        category: 'food',
        amount: 2340.00,
        date: getRelativeDate(3),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_108',
        description: 'Shell Auto Fuel Station',
        category: 'transport',
        amount: 1850.00,
        date: getRelativeDate(4),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_109',
        description: 'Zara Lifestyle & Apparel',
        category: 'shopping',
        amount: 4200.00,
        date: getRelativeDate(4),
        paymentMethod: 'HDFC Bank (*9102)'
      },
      {
        id: 'tx_110',
        description: 'Airtel Xstream Fiber Broadband',
        category: 'utilities',
        amount: 1199.00,
        date: getRelativeDate(5),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_111',
        description: 'Bistro Fine Dining & Grill',
        category: 'food',
        amount: 2180.00,
        date: getRelativeDate(5),
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_112',
        description: 'Spotify Individual Premium',
        category: 'subscriptions',
        amount: 119.00,
        date: getRelativeDate(6),
        paymentMethod: 'HDFC Bank (*9102)'
      },
      {
        id: 'tx_113',
        description: 'Metro Parking & Tollways',
        category: 'transport',
        amount: 320.00,
        date: getRelativeDate(6),
        paymentMethod: 'State Bank of India (*4829)'
      },
      // Previous weeks baseline transactions
      {
        id: 'tx_base_1',
        description: 'Apartment Maintenance & Rent',
        category: 'utilities',
        amount: 16500.00,
        date: '2026-10-01',
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_base_2',
        description: 'Monthly Organic Pantry Staples',
        category: 'food',
        amount: 4850.00,
        date: '2026-10-02',
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_base_3',
        description: 'Vehicle Insurance & Servicing',
        category: 'transport',
        amount: 3200.00,
        date: '2026-10-03',
        paymentMethod: 'State Bank of India (*4829)'
      },
      {
        id: 'tx_base_4',
        description: 'Weekend Concert & Club Pass',
        category: 'entertainment',
        amount: 1850.00,
        date: '2026-10-04',
        paymentMethod: 'HDFC Bank (*9102)'
      }
    ]
  };

  // Helper function to generate ISO dates relative to today
  function getRelativeDate(offsetDaysAgo) {
    const d = new Date();
    d.setDate(d.getDate() - offsetDaysAgo);
    return d.toISOString().split('T')[0];
  }

  // ==========================================================================
  // 2. Application State & Storage Management
  // ==========================================================================

  let state = loadState();
  let chartRange = 'week'; // 'week' or 'month'
  let hiddenCategories = new Set(); // For category legend toggling

  const STORAGE_KEY = 'pocketsplit_dashboard_v4';

  // Automatically migrate/purge any legacy keys from older sessions
  try {
    localStorage.removeItem('jm_finance_dashboard_v1');
    localStorage.removeItem('pocketsplit_dashboard_v1');
    localStorage.removeItem('pocketsplit_dashboard_v2');
    localStorage.removeItem('pocketsplit_dashboard_v3');
  } catch (e) {}

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }

  // ==========================================================================
  // 3. Smart Auto-Categorization Engine (UPI Merchant & MCC Classifier)
  // ==========================================================================

  function guessCategory(str, mccCode = '') {
    if (!str && !mccCode) return 'other';
    const lower = (str || '').toLowerCase();
    const mcc = (mccCode || '').trim();

    // 1. Check Standard Merchant Category Code (MCC) from UPI QR string
    if (mcc) {
      if (['5812', '5814', '5411', '5422', '5441', '5451', '5462', '5499'].includes(mcc)) return 'food';
      if (['4111', '4121', '4131', '4789', '5541', '5542', '5552', '7523'].includes(mcc)) return 'transport';
      if (['4814', '4900', '4899', '4816'].includes(mcc)) return 'utilities';
      if (['7832', '7922', '7929', '7991', '7996', '7997', '7999'].includes(mcc)) return 'entertainment';
      if (['5311', '5651', '5691', '5732', '5944', '5999', '5300'].includes(mcc)) return 'shopping';
      if (['5912', '8011', '8021', '8049', '8062', '8099'].includes(mcc)) return 'health';
      if (['4899', '5818'].includes(mcc)) return 'subscriptions';
    }

    // 2. Keyword & Renowned Indian Merchant Name Matching
    if (lower.match(/swiggy|zomato|blinkit|zepto|dunzo|starbucks|mcdonald|kfc|domino|pizza|burger|haldiram|chai|tea|cafe|coffee|restaurant|bistro|dhabha|dhaba|baker|bakery|sweet|food|dine|dining|kitchen|biryani|grocer|grocery|supermarket|market|kirana|basket|nature's basket|dmart|spencer|more retail/)) {
      return 'food';
    }
    if (lower.match(/uber|ola|rapido|metro|dmrc|bmrc|irctc|railway|train|flight|indigo|air india|fuel|petrol|diesel|cng|shell|hpcl|bpcl|iocl|indian oil|bharat petroleum|hindustan petroleum|toll|fastag|nhai|parking|garage|auto|cab|taxi/)) {
      return 'transport';
    }
    if (lower.match(/bescom|tneb|mseb|bses|cesc|electricity|power|bijli|water|jal|gas|indane|bharat gas|hp gas|broadband|wifi|fiber|airtel|jio|vi |vodafone|bsnl|tatapower|adanielectricity|bill|recharge|dth|tata play|dish tv/)) {
      return 'utilities';
    }
    if (lower.match(/netflix|spotify|prime|amazon prime|apple|itunes|hotstar|disney|youtube|google play|patreon|medium|sub|subscription|software|adobe|chatgpt|openai|claude|cursor|canva/)) {
      return 'subscriptions';
    }
    if (lower.match(/pvr|inox|cinepolis|bookmyshow|movie|cinema|theatre|concert|event|gaming|playstation|xbox|steam|amusement|wonderla|club|bowling/)) {
      return 'entertainment';
    }
    if (lower.match(/amazon|flipkart|myntra|ajio|meesho|nykaa|zara|h&m|uniqlo|shoppers stop|lifestyle|pantaloons|trends|decathlon|croma|reliance digital|vijay sales|shopping|apparel|clothing|retail|store|mall|footwear/)) {
      return 'shopping';
    }
    if (lower.match(/apollo|pharma|pharmacy|medplus|netmeds|tata 1mg|1mg|practo|hospital|clinic|doctor|dental|diagnostic|lab|pathology|health|wellness|optics|lenskart/)) {
      return 'health';
    }

    return 'other';
  }

  function formatCurrency(val) {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function formatDateFriendly(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const testDate = new Date(date);
    testDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((today - testDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSvg = type === 'success' 
      ? `<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`
      : `<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 200ms ease-in forwards';
      setTimeout(() => toast.remove(), 220);
    }, 3500);
  }

  // ==========================================================================
  // 4. KPI Calculations & Rendering
  // ==========================================================================

  function calculateFinancials() {
    // Total expense is the sum of all transactions
    const totalExpense = state.transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const totalIncome = state.totalIncome || 8420.00;
    const totalSavings = Math.max(0, totalIncome - totalExpense);

    // Sum balances across all connected digital cards
    const totalBalance = state.cards.reduce((sum, card) => sum + Number(card.balance || 0), 0);

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      totalSavings
    };
  }

  function updateKpiCards() {
    const { totalBalance, totalIncome, totalExpense, totalSavings } = calculateFinancials();

    const elBalance = document.getElementById('kpi-val-balance');
    const elIncome = document.getElementById('kpi-val-income');
    const elExpense = document.getElementById('kpi-val-expense');
    const elSavings = document.getElementById('kpi-val-savings');

    if (elBalance) elBalance.textContent = formatCurrency(totalBalance);
    if (elIncome) elIncome.textContent = formatCurrency(totalIncome);
    if (elExpense) elExpense.textContent = formatCurrency(totalExpense);
    if (elSavings) elSavings.textContent = formatCurrency(totalSavings);
  }

  // ==========================================================================
  // 5. Monthly Spending Limit & Progress Bar
  // ==========================================================================

  function updateSpendingLimitSection() {
    const { totalExpense } = calculateFinancials();
    const limit = state.spendingLimit || 5000;
    const percentage = Math.min(100, (totalExpense / limit) * 100);
    const remaining = limit - totalExpense;

    const elSpent = document.getElementById('limit-spent-display');
    const elTotal = document.getElementById('limit-total-display');
    const elFill = document.getElementById('spending-progress-fill');
    const elStatusPill = document.getElementById('limit-status-pill');
    const elStatusText = document.getElementById('limit-status-text');
    const elRemaining = document.getElementById('limit-remaining-text');
    const elAdvice = document.getElementById('limit-advice-text');

    if (elSpent) elSpent.textContent = formatCurrency(totalExpense);
    if (elTotal) elTotal.textContent = formatCurrency(limit);

    if (elFill) {
      elFill.style.width = `${percentage.toFixed(1)}%`;
      elFill.classList.remove('fill-warning', 'fill-danger');
      if (percentage >= 95) {
        elFill.classList.add('fill-danger');
      } else if (percentage >= 80) {
        elFill.classList.add('fill-warning');
      }
    }

    if (elStatusPill && elStatusText) {
      elStatusPill.className = 'limit-status-badge';
      if (percentage < 80) {
        elStatusPill.classList.add('badge-success');
        elStatusText.textContent = `On Track (${percentage.toFixed(1)}%)`;
      } else if (percentage < 100) {
        elStatusPill.classList.add('badge-warning');
        elStatusText.textContent = `Caution (${percentage.toFixed(1)}%)`;
      } else {
        elStatusPill.classList.add('badge-danger');
        elStatusText.textContent = `Limit Exceeded (${percentage.toFixed(1)}%)`;
      }
    }

    if (elRemaining) {
      if (remaining >= 0) {
        elRemaining.textContent = `${formatCurrency(remaining)} remaining`;
        elRemaining.style.color = 'var(--text-secondary)';
      } else {
        elRemaining.textContent = `${formatCurrency(Math.abs(remaining))} over budget`;
        elRemaining.style.color = 'var(--rose-600)';
      }
    }

    // Dynamic advice calculation
    if (elAdvice) {
      const today = new Date();
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      const daysRemaining = Math.max(1, lastDay - today.getDate());

      if (remaining > 0) {
        const dailySafe = remaining / daysRemaining;
        elAdvice.innerHTML = `Safe daily spending pace: <strong>${formatCurrency(dailySafe)}/day</strong> (${daysRemaining} days left).`;
      } else {
        elAdvice.innerHTML = `Budget ceiling surpassed. Consider pausing discretionary category expenses.`;
      }
    }
  }

  // ==========================================================================
  // 6. Expense Segregation Chart (Canvas Stacked Column Chart)
  // ==========================================================================

  let barRects = []; // Store clickable/hoverable bar coordinates for tooltip

  function initExpenseChart() {
    const canvas = document.getElementById('expense-segregation-canvas');
    if (!canvas) return;

    // Handle Resize
    window.addEventListener('resize', debounce(renderExpenseChart, 150));

    // Handle Tooltip & Hover
    const tooltip = document.getElementById('custom-chart-tooltip');
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      for (const bar of barRects) {
        if (mouseX >= bar.x && mouseX <= bar.x + bar.width && mouseY >= bar.topY && mouseY <= bar.bottomY) {
          found = bar;
          break;
        }
      }

      if (found && tooltip) {
        let itemsHtml = '';
        for (const [catKey, amt] of Object.entries(found.catBreakdown)) {
          if (amt > 0 && !hiddenCategories.has(catKey)) {
            const cat = CATEGORIES[catKey] || { name: catKey, color: '#64748b' };
            itemsHtml += `
              <div class="tooltip-item">
                <span><span class="tooltip-dot" style="background:${cat.color}"></span>${cat.name}</span>
                <strong>${formatCurrency(amt)}</strong>
              </div>
            `;
          }
        }

        tooltip.innerHTML = `
          <div class="tooltip-day-title">
            <span>${found.label}</span>
            <span>${formatCurrency(found.total)}</span>
          </div>
          ${itemsHtml || '<div style="color:#94a3b8">No expenses</div>'}
        `;

        tooltip.style.left = `${found.x + found.width / 2}px`;
        tooltip.style.top = `${Math.max(20, found.topY)}px`;
        tooltip.style.display = 'block';
      } else if (tooltip) {
        tooltip.style.display = 'none';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.style.display = 'none';
    });

    renderExpenseChart();
  }

  function getDaysDataForChart() {
    const daysCount = chartRange === 'week' ? 7 : 14;
    const days = [];

    for (let i = daysCount - 1; i >= 0; i--) {
      const dateStr = getRelativeDate(i);
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();

      const catBreakdown = {};
      Object.keys(CATEGORIES).forEach(k => catBreakdown[k] = 0);

      // Sum transactions for this date
      state.transactions
        .filter(tx => tx.date === dateStr)
        .forEach(tx => {
          if (catBreakdown[tx.category] !== undefined) {
            catBreakdown[tx.category] += Number(tx.amount || 0);
          } else {
            catBreakdown.other = (catBreakdown.other || 0) + Number(tx.amount || 0);
          }
        });

      let total = 0;
      Object.entries(catBreakdown).forEach(([k, amt]) => {
        if (!hiddenCategories.has(k)) {
          total += amt;
        }
      });

      days.push({
        dateStr,
        label: chartRange === 'week' ? `${dayName}` : `${dayName} ${dayNum}`,
        catBreakdown,
        total
      });
    }

    return days;
  }

  function renderExpenseChart() {
    const canvas = document.getElementById('expense-segregation-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set high DPI dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 280;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    const days = getDaysDataForChart();
    const maxVal = Math.max(120, ...days.map(d => d.total)) * 1.15; // 15% headroom

    const padding = { top: 30, right: 20, bottom: 42, left: 56 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const isDark = document.body.classList.contains('dark-theme');

    // Draw Grid Lines & Y-Axis Labels
    const gridSteps = 4;
    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= gridSteps; i++) {
      const val = (maxVal / gridSteps) * i;
      const y = padding.top + chartH - (chartH * (i / gridSteps));

      // Grid line
      ctx.beginPath();
      ctx.strokeStyle = i === 0 ? (isDark ? '#334155' : '#cbd5e1') : (isDark ? '#1e293b' : '#f1f5f9');
      ctx.lineWidth = 1;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Label
      ctx.fillText(`₹${Math.round(val)}`, padding.left - 10, y);
    }

    // Draw Columns
    barRects = [];
    const barWidth = Math.min(42, Math.max(18, (chartW / days.length) * 0.52));
    const slotWidth = chartW / days.length;

    days.forEach((day, index) => {
      const barX = padding.left + (index * slotWidth) + (slotWidth - barWidth) / 2;
      let currentY = padding.top + chartH;

      // Draw subtle background column bar track
      ctx.fillStyle = isDark ? '#1e293b' : '#f8fafc';
      ctx.beginPath();
      roundRect(ctx, barX, padding.top, barWidth, chartH, 6);
      ctx.fill();

      const renderedBlocks = [];

      // Stack categories
      const activeCats = Object.keys(CATEGORIES).filter(c => !hiddenCategories.has(c));
      
      activeCats.forEach(catKey => {
        const amt = day.catBreakdown[catKey] || 0;
        if (amt > 0) {
          const blockH = (amt / maxVal) * chartH;
          const nextY = currentY - blockH;

          renderedBlocks.push({
            color: CATEGORIES[catKey].color,
            x: barX,
            y: nextY,
            w: barWidth,
            h: blockH
          });

          currentY = nextY;
        }
      });

      // Render stacked blocks
      renderedBlocks.forEach((b, bIdx) => {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        // Top cap rounding on highest block
        if (bIdx === renderedBlocks.length - 1) {
          roundTopRect(ctx, b.x, b.y, b.w, b.h, 4);
        } else {
          ctx.rect(b.x, b.y, b.w, b.h);
        }
        ctx.fill();
      });

      // Save geometry for interactive hover
      const totalBarH = padding.top + chartH - currentY;
      barRects.push({
        x: barX,
        width: barWidth,
        topY: currentY,
        bottomY: padding.top + chartH,
        label: day.label,
        total: day.total,
        catBreakdown: day.catBreakdown
      });

      // X-Axis Day Label
      ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = day.total > 0 ? (isDark ? '#f1f5f9' : '#1e293b') : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(day.label, barX + barWidth / 2, height - padding.bottom + 18);

      // Amount on top of bar if space permits
      if (day.total > 0 && currentY < padding.top + chartH - 12) {
        ctx.font = '700 10px "JetBrains Mono", monospace';
        ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
        ctx.fillText(`₹${Math.round(day.total)}`, barX + barWidth / 2, currentY - 6);
      }
    });
  }

  // Canvas Rect Helpers
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  function roundTopRect(ctx, x, y, width, height, radius) {
    if (height < radius) radius = height;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  // ==========================================================================
  // 7. Budget Donut Chart & Category Breakdown
  // ==========================================================================

  function renderBudgetDonutChart() {
    const canvas = document.getElementById('budget-donut-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = 170 * dpr;
    canvas.height = 170 * dpr;
    ctx.scale(dpr, dpr);

    const size = 170;
    const center = size / 2;
    const radius = size / 2 - 12;
    const innerRadius = radius - 22;

    ctx.clearRect(0, 0, size, size);

    // Calculate Category Totals
    const catTotals = {};
    Object.keys(CATEGORIES).forEach(k => catTotals[k] = 0);

    let totalExpense = 0;
    state.transactions.forEach(tx => {
      const amt = Number(tx.amount || 0);
      if (catTotals[tx.category] !== undefined) {
        catTotals[tx.category] += amt;
      } else {
        catTotals.other = (catTotals.other || 0) + amt;
      }
      totalExpense += amt;
    });

    // Update Donut Center Label
    const elCenterAmt = document.getElementById('donut-center-amount');
    if (elCenterAmt) elCenterAmt.textContent = formatCurrency(totalExpense);

    // Draw donut arcs
    let startAngle = -Math.PI / 2;

    if (totalExpense === 0) {
      // Empty gray circle
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.arc(center, center, innerRadius, Math.PI * 2, 0, true);
      ctx.fillStyle = '#e2e8f0';
      ctx.fill();
    } else {
      Object.entries(catTotals).forEach(([catKey, amt]) => {
        if (amt > 0) {
          const sliceAngle = (amt / totalExpense) * (Math.PI * 2);
          const endAngle = startAngle + sliceAngle;

          ctx.beginPath();
          ctx.arc(center, center, radius, startAngle, endAngle);
          ctx.arc(center, center, innerRadius, endAngle, startAngle, true);
          ctx.closePath();
          ctx.fillStyle = CATEGORIES[catKey].color;
          ctx.fill();

          // Subtle separation gap
          ctx.lineWidth = 2;
          ctx.strokeStyle = document.body.classList.contains('dark-theme') ? '#131b2e' : '#ffffff';
          ctx.stroke();

          startAngle = endAngle;
        }
      });
    }

    // Render Category Breakdown List in DOM
    const listContainer = document.getElementById('donut-breakdown-container');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    // Sort categories descending by amount
    const sortedCats = Object.entries(catTotals)
      .filter(([_, amt]) => amt > 0)
      .sort((a, b) => b[1] - a[1]);

    sortedCats.slice(0, 5).forEach(([catKey, amt]) => {
      const cat = CATEGORIES[catKey] || { name: catKey, color: '#64748b', icon: '🏷️' };
      const pct = totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(0) : '0';

      const row = document.createElement('div');
      row.className = 'donut-cat-row';
      row.innerHTML = `
        <div class="donut-cat-meta">
          <span class="legend-dot" style="background-color: ${cat.color}"></span>
          <span>${cat.name}</span>
        </div>
        <div class="donut-cat-pct">
          <span>${pct}%</span>
          <span style="color: var(--text-muted); font-weight: normal; margin-left: 4px;">(${formatCurrency(amt)})</span>
        </div>
      `;
      listContainer.appendChild(row);
    });
  }

  // ==========================================================================
  // 8. Digital Card Management
  // ==========================================================================

  function renderActiveCard() {
    if (!state.cards || state.cards.length === 0) return;

    const card = state.cards[state.activeCardIndex] || state.cards[0];
    
    const elCard = document.getElementById('main-digital-card');
    const elBankName = document.getElementById('card-bank-name-display');
    const elTier = document.getElementById('card-tier-display');
    const elBalance = document.getElementById('card-balance-display');
    const elLastFour = document.getElementById('card-last-four');
    const elHolder = document.getElementById('card-holder-display');
    const elExpiry = document.getElementById('card-expiry-display');
    const elFreezeText = document.getElementById('freeze-status-text');

    if (elBankName) elBankName.textContent = card.bankName || card.name || 'PocketSplit';
    if (elTier) elTier.textContent = card.tier || 'PREMIER MEMBER';
    if (elBalance) elBalance.textContent = formatCurrency(card.balance);
    if (elLastFour) elLastFour.textContent = card.lastFour || card.number.slice(-4);
    if (elHolder) elHolder.textContent = card.holder.toUpperCase();
    if (elExpiry) elExpiry.textContent = card.expiry;

    if (elFreezeText) {
      elFreezeText.textContent = card.isFrozen ? 'Unfreeze' : 'Freeze';
    }

    if (elCard) {
      // Remove any previously applied bank theme classes
      elCard.classList.remove(
        'card-theme-sbi',
        'card-theme-hdfc',
        'card-theme-icici',
        'card-theme-axis',
        'card-theme-kotak',
        'card-theme-pnb'
      );
      if (card.themeClass) {
        elCard.classList.add(card.themeClass);
      }

      if (card.isFrozen) {
        elCard.style.filter = 'grayscale(0.7) opacity(0.85)';
      } else {
        elCard.style.filter = 'none';
      }
    }

    // Render switcher dots
    const dotsContainer = document.getElementById('card-carousel-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      state.cards.forEach((c, idx) => {
        const dot = document.createElement('button');
        dot.className = `card-dot ${idx === state.activeCardIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Select ${c.name}`);
        dot.addEventListener('click', () => {
          state.activeCardIndex = idx;
          saveState();
          renderActiveCard();
        });
        dotsContainer.appendChild(dot);
      });
    }

    // Update payment method dropdown options in logger form
    const selectPayment = document.getElementById('expense-payment-method');
    if (selectPayment) {
      selectPayment.innerHTML = '';
      state.cards.forEach(c => {
        const opt = document.createElement('option');
        opt.value = `${c.name} (*${c.lastFour})`;
        opt.textContent = `${c.name} (*${c.lastFour}) - ${formatCurrency(c.balance)}`;
        selectPayment.appendChild(opt);
      });
      const optCash = document.createElement('option');
      optCash.value = 'Cash / External Account';
      optCash.textContent = 'Cash / External Account';
      selectPayment.appendChild(optCash);
    }
  }

  // ==========================================================================
  // 9. Recent Transactions Table & Search Filter
  // ==========================================================================

  function renderTransactionsTable(filterText = '') {
    const tbody = document.getElementById('transactions-tbody');
    const emptyState = document.getElementById('table-empty-state');
    if (!tbody) return;

    tbody.innerHTML = '';

    const lowerQuery = filterText.toLowerCase().trim();
    const filtered = state.transactions.filter(tx => {
      if (!lowerQuery) return true;
      const catName = CATEGORIES[tx.category] ? CATEGORIES[tx.category].name.toLowerCase() : '';
      return (
        tx.description.toLowerCase().includes(lowerQuery) ||
        catName.includes(lowerQuery) ||
        (tx.paymentMethod && tx.paymentMethod.toLowerCase().includes(lowerQuery)) ||
        tx.amount.toString().includes(lowerQuery)
      );
    });

    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
    }

    // Render top 12 transactions
    filtered.slice(0, 12).forEach(tx => {
      const cat = CATEGORIES[tx.category] || { name: tx.category, icon: '🏷️' };
      const tr = document.createElement('tr');
      tr.id = `row-${tx.id}`;

      tr.innerHTML = `
        <td>
          <div class="merchant-cell">
            <span class="merchant-icon-badge">${cat.icon}</span>
            <div>
              <span class="merchant-name-text">${escapeHtml(tx.description)}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="category-tag-pill badge-tag-${tx.category}">
            ${cat.icon} ${cat.name}
          </span>
        </td>
        <td style="color: var(--text-muted); font-size: 0.78rem;">
          ${formatDateFriendly(tx.date)}
        </td>
        <td style="font-size: 0.76rem; color: var(--text-secondary);">
          ${escapeHtml(tx.paymentMethod || 'Primary Card')}
        </td>
        <td class="text-right">
          <span class="expense-amount-negative">-${formatCurrency(tx.amount)}</span>
        </td>
        <td class="text-center">
          <button class="btn-delete-row" data-tx-id="${tx.id}" title="Remove transaction" aria-label="Delete ${escapeHtml(tx.description)}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Wire up delete buttons
    tbody.querySelectorAll('.btn-delete-row').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-tx-id');
        deleteTransaction(id);
      });
    });
  }

  function deleteTransaction(id) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;

    // Refund amount to corresponding card if found
    if (tx.paymentMethod) {
      const card = state.cards.find(c => tx.paymentMethod.includes(c.lastFour));
      if (card) {
        card.balance += Number(tx.amount || 0);
      }
    }

    // Remove from array
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveState();

    refreshAllViews();
    showToast(`Removed "${tx.description}" (${formatCurrency(tx.amount)})`, 'info');
  }

  // ==========================================================================
  // 10. Core Functionality: Daily Expense Logger Submission
  // ==========================================================================

  function setupExpenseLogger() {
    const form = document.getElementById('expense-logger-form');
    if (!form) return;

    // Set default date to today
    const dateInput = document.getElementById('expense-date');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Quick select amount buttons
    document.querySelectorAll('.btn-quick-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const amt = pill.getAttribute('data-amount');
        const amtInput = document.getElementById('expense-amount');
        if (amtInput) {
          amtInput.value = amt;
          amtInput.focus();
          clearValidation(amtInput);
        }
      });
    });

    // Real-Time Smart Category Detection on typing description/merchant
    const descInputEl = document.getElementById('expense-description');
    const catSelectEl = document.getElementById('expense-category');
    const autoCatHint = document.getElementById('auto-category-hint');
    const detectedCatName = document.getElementById('detected-cat-name');

    if (descInputEl && catSelectEl) {
      descInputEl.addEventListener('input', () => {
        const text = descInputEl.value.trim();
        if (text.length >= 2) {
          const detected = guessCategory(text);
          if (detected && detected !== 'other') {
            catSelectEl.value = detected;
            clearValidation(catSelectEl, 'feedback-category');
            if (autoCatHint && detectedCatName && CATEGORIES[detected]) {
              detectedCatName.textContent = `${CATEGORIES[detected].icon} ${CATEGORIES[detected].name}`;
              autoCatHint.style.display = 'block';
            }
          } else if (autoCatHint) {
            autoCatHint.style.display = 'none';
          }
        } else if (autoCatHint) {
          autoCatHint.style.display = 'none';
        }
      });
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const amtInput = document.getElementById('expense-amount');
      const catSelect = document.getElementById('expense-category');
      const descInput = document.getElementById('expense-description');
      const dateVal = dateInput.value;
      const paymentVal = document.getElementById('expense-payment-method').value;

      let isValid = true;

      // Validate Amount
      const amt = parseFloat(amtInput.value);
      if (!amt || isNaN(amt) || amt <= 0) {
        showFieldError(amtInput, 'feedback-amount', 'Please enter a valid expense amount greater than ₹0.');
        isValid = false;
      } else {
        clearValidation(amtInput, 'feedback-amount');
      }

      // Validate Mandatory Category Dropdown
      if (!catSelect.value) {
        showFieldError(catSelect, 'feedback-category', 'Category is required to properly segregate your expenses.');
        isValid = false;
      } else {
        clearValidation(catSelect, 'feedback-category');
      }

      // Validate Description
      if (!descInput.value.trim()) {
        showFieldError(descInput, 'feedback-description', 'Please provide a description or merchant name.');
        isValid = false;
      } else {
        clearValidation(descInput, 'feedback-description');
      }

      if (!isValid) return;

      // Create new transaction object
      const newTx = {
        id: 'tx_' + Date.now(),
        amount: parseFloat(amt.toFixed(2)),
        category: catSelect.value,
        description: descInput.value.trim(),
        date: dateVal || new Date().toISOString().split('T')[0],
        paymentMethod: paymentVal
      };

      // Deduct from card balance if matching
      const targetCard = state.cards.find(c => paymentVal.includes(c.lastFour));
      if (targetCard) {
        targetCard.balance = Math.max(0, targetCard.balance - newTx.amount);
      } else if (state.cards[state.activeCardIndex]) {
        state.cards[state.activeCardIndex].balance = Math.max(0, state.cards[state.activeCardIndex].balance - newTx.amount);
      }

      // Prepend to transaction list
      state.transactions.unshift(newTx);
      saveState();

      // Reset form
      amtInput.value = '';
      descInput.value = '';
      catSelect.value = '';
      dateInput.value = new Date().toISOString().split('T')[0];

      // Refresh everything in real-time
      refreshAllViews();

      const catObj = CATEGORIES[newTx.category] || { name: newTx.category, icon: '🏷️' };
      showToast(`Expense of ${formatCurrency(newTx.amount)} logged under ${catObj.name}!`, 'success');

      // Subtle pulse animation on KPI expense card
      const kpiCard = document.getElementById('kpi-expense');
      if (kpiCard) {
        kpiCard.style.transform = 'scale(1.02)';
        setTimeout(() => kpiCard.style.transform = '', 300);
      }
    });
  }

  function showFieldError(input, feedbackId, msg) {
    input.classList.add('is-invalid');
    const fb = document.getElementById(feedbackId);
    if (fb) fb.textContent = msg;
  }

  function clearValidation(input, feedbackId) {
    input.classList.remove('is-invalid');
    if (feedbackId) {
      const fb = document.getElementById(feedbackId);
      if (fb) fb.textContent = '';
    }
  }

  // ==========================================================================
  // 11. Modals & Interactive Actions
  // ==========================================================================

  function setupModals() {
    // Add Card Modal
    const modalAddCard = document.getElementById('modal-add-card');
    const btnOpenCardModal = document.getElementById('btn-add-new-card');
    const btnCloseCardModal = document.getElementById('btn-close-card-modal');
    const btnCancelCardModal = document.getElementById('btn-cancel-card-modal');
    const formAddCard = document.getElementById('form-add-card');

    if (btnOpenCardModal && modalAddCard) {
      btnOpenCardModal.addEventListener('click', () => {
        modalAddCard.style.display = 'flex';
      });
    }

    const closeAddCardModal = () => {
      if (modalAddCard) modalAddCard.style.display = 'none';
      if (formAddCard) formAddCard.reset();
      updateMiniCardPreview();
    };

    if (btnCloseCardModal) btnCloseCardModal.addEventListener('click', closeAddCardModal);
    if (btnCancelCardModal) btnCancelCardModal.addEventListener('click', closeAddCardModal);

    // Live preview on typing in Add Card form
    const inCardNumber = document.getElementById('new-card-number');
    const inCardHolder = document.getElementById('new-card-holder');
    const inCardExpiry = document.getElementById('new-card-expiry');
    const inCardNetwork = document.getElementById('new-card-network');

    function updateMiniCardPreview() {
      const prevNum = document.getElementById('preview-card-number');
      const prevHolder = document.getElementById('preview-card-holder');
      const prevExp = document.getElementById('preview-card-expiry');
      const prevNet = document.getElementById('preview-network-name');

      if (prevNum) {
        const val = inCardNumber.value || '•••• •••• •••• 0000';
        prevNum.textContent = val;
      }
      if (prevHolder) {
        prevHolder.textContent = (inCardHolder.value || 'CARD HOLDER').toUpperCase();
      }
      if (prevExp) {
        prevExp.textContent = inCardExpiry.value || 'MM/YY';
      }
      if (prevNet) {
        prevNet.textContent = inCardNetwork.value.toUpperCase();
      }
    }

    [inCardNumber, inCardHolder, inCardExpiry, inCardNetwork].forEach(input => {
      if (input) {
        input.addEventListener('input', updateMiniCardPreview);
      }
    });

    // Save Card Form Submit
    if (formAddCard) {
      formAddCard.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-card-name').value.trim();
        const holder = inCardHolder.value.trim();
        const num = inCardNumber.value.trim();
        const expiry = inCardExpiry.value.trim();
        const network = inCardNetwork.value;
        const balance = parseFloat(document.getElementById('new-card-balance').value) || 0;

        const lastFour = num.replace(/\s+/g, '').slice(-4) || '8888';

        const newCard = {
          id: 'card_' + Date.now(),
          name: name || 'Premier Card',
          tier: 'PLATINUM ELITE',
          number: num,
          lastFour: lastFour,
          holder: holder || 'ALEX MORGAN',
          expiry: expiry || '12/28',
          balance: balance,
          network: network,
          isFrozen: false
        };

        state.cards.push(newCard);
        state.activeCardIndex = state.cards.length - 1;
        saveState();

        closeAddCardModal();
        refreshAllViews();
        showToast(`Card added successfully! Active account set to ${newCard.name}.`, 'success');
      });
    }

    // Edit Spending Limit Modal
    const modalEditLimit = document.getElementById('modal-edit-limit');
    const btnOpenLimitModal = document.getElementById('btn-edit-limit');
    const btnCloseLimitModal = document.getElementById('btn-close-limit-modal');
    const btnCancelLimitModal = document.getElementById('btn-cancel-limit-modal');
    const formEditLimit = document.getElementById('form-edit-limit');

    if (btnOpenLimitModal && modalEditLimit) {
      btnOpenLimitModal.addEventListener('click', () => {
        const inLimit = document.getElementById('input-spending-limit');
        if (inLimit) inLimit.value = state.spendingLimit || 5000;
        const preview = document.getElementById('modal-spent-preview');
        const { totalExpense } = calculateFinancials();
        if (preview) preview.textContent = formatCurrency(totalExpense);
        modalEditLimit.style.display = 'flex';
      });
    }

    const closeLimitModal = () => {
      if (modalEditLimit) modalEditLimit.style.display = 'none';
    };

    if (btnCloseLimitModal) btnCloseLimitModal.addEventListener('click', closeLimitModal);
    if (btnCancelLimitModal) btnCancelLimitModal.addEventListener('click', closeLimitModal);

    if (formEditLimit) {
      formEditLimit.addEventListener('submit', (e) => {
        e.preventDefault();
        const inLimit = document.getElementById('input-spending-limit');
        const newLimit = parseFloat(inLimit.value);
        if (newLimit && newLimit > 0) {
          state.spendingLimit = newLimit;
          saveState();
          updateSpendingLimitSection();
          closeLimitModal();
          showToast(`Monthly spending limit adjusted to ${formatCurrency(newLimit)}.`, 'info');
        }
      });
    }

    // Modal 5: Edit Monthly Income Modal
    const modalEditIncome = document.getElementById('modal-edit-income');
    const btnOpenIncomeModal = document.getElementById('btn-edit-income');
    const kpiIncomeCard = document.getElementById('kpi-income');
    const btnCloseIncomeModal = document.getElementById('btn-close-income-modal');
    const btnCancelIncomeModal = document.getElementById('btn-cancel-income-modal');
    const formEditIncome = document.getElementById('form-edit-income');

    const openIncomeModal = () => {
      const inIncome = document.getElementById('input-monthly-income');
      if (inIncome) inIncome.value = state.totalIncome || 85000;
      if (modalEditIncome) modalEditIncome.style.display = 'flex';
    };

    const closeIncomeModal = () => {
      if (modalEditIncome) modalEditIncome.style.display = 'none';
    };

    if (btnOpenIncomeModal) btnOpenIncomeModal.addEventListener('click', (e) => {
      e.stopPropagation();
      openIncomeModal();
    });
    if (kpiIncomeCard) kpiIncomeCard.addEventListener('click', openIncomeModal);
    if (btnCloseIncomeModal) btnCloseIncomeModal.addEventListener('click', closeIncomeModal);
    if (btnCancelIncomeModal) btnCancelIncomeModal.addEventListener('click', closeIncomeModal);

    if (formEditIncome) {
      formEditIncome.addEventListener('submit', (e) => {
        e.preventDefault();
        const inIncome = document.getElementById('input-monthly-income');
        const newIncome = parseFloat(inIncome.value);
        if (!isNaN(newIncome) && newIncome >= 0) {
          state.totalIncome = newIncome;
          saveState();
          refreshAllViews();
          closeIncomeModal();
          showToast(`Monthly income updated to ${formatCurrency(newIncome)}. Total savings recalculated!`, 'success');
        }
      });
    }

    // Connect Indian Bank Account Modal
    const modalLinkBank = document.getElementById('modal-link-bank');
    const btnOpenBankModal1 = document.getElementById('btn-header-link-bank');
    const btnOpenBankModal2 = document.getElementById('btn-open-link-bank-modal');
    const btnCloseBankModal = document.getElementById('btn-close-bank-modal');
    const btnCancelBankModal = document.getElementById('btn-cancel-bank-modal');
    const formLinkBank = document.getElementById('form-link-bank');
    const bankCards = document.querySelectorAll('.bank-choice-card');
    const hiddenBankId = document.getElementById('selected-bank-id');
    const hiddenBankName = document.getElementById('selected-bank-name');

    const openBankModal = () => {
      if (modalLinkBank) modalLinkBank.style.display = 'flex';
    };

    const closeBankModal = () => {
      if (modalLinkBank) modalLinkBank.style.display = 'none';
      if (formLinkBank) formLinkBank.reset();
    };

    if (btnOpenBankModal1) btnOpenBankModal1.addEventListener('click', openBankModal);
    if (btnOpenBankModal2) btnOpenBankModal2.addEventListener('click', openBankModal);
    if (btnCloseBankModal) btnCloseBankModal.addEventListener('click', closeBankModal);
    if (btnCancelBankModal) btnCancelBankModal.addEventListener('click', closeBankModal);

    // Bank Grid Selection Interactions
    bankCards.forEach(card => {
      card.addEventListener('click', () => {
        bankCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const bId = card.getAttribute('data-bank-id');
        const bName = card.getAttribute('data-bank-name');
        if (hiddenBankId) hiddenBankId.value = bId;
        if (hiddenBankName) hiddenBankName.value = bName;

        // Auto-fill demo IFSC prefix based on selected bank
        const ifscInput = document.getElementById('bank-ifsc-code');
        if (ifscInput) {
          const ifscPrefixes = {
            sbi: 'SBIN000',
            hdfc: 'HDFC000',
            icici: 'ICIC000',
            axis: 'UTIB000',
            kotak: 'KKBK000',
            pnb: 'PUNB000'
          };
          const prefix = ifscPrefixes[bId] || 'BANK000';
          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          ifscInput.value = `${prefix}${randomSuffix}`;
        }
      });
    });

    // Handle Link Bank Form Submission
    if (formLinkBank) {
      formLinkBank.addEventListener('submit', (e) => {
        e.preventDefault();
        const bankId = hiddenBankId ? hiddenBankId.value : 'sbi';
        const bankName = hiddenBankName ? hiddenBankName.value : 'State Bank of India';
        const holder = document.getElementById('bank-account-holder').value.trim();
        const accType = document.getElementById('bank-account-type').value;
        const accNum = document.getElementById('bank-account-number').value.trim();
        const ifsc = document.getElementById('bank-ifsc-code').value.trim().toUpperCase();
        const liveBalance = parseFloat(document.getElementById('bank-balance-input').value) || 0;
        const autoSync = document.getElementById('bank-auto-sync-check')?.checked;

        const lastFour = accNum.slice(-4) || '1234';

        // Bank-specific tier label
        const tierMap = {
          sbi: 'SBI YONO PRIVILEGE',
          hdfc: 'HDFC REGALIA GOLD',
          icici: 'ICICI SAPPHIRE PRIVILEGE',
          axis: 'AXIS BURGUNDY PRIVATE',
          kotak: 'KOTAK 811 PRIORITY',
          pnb: 'PNB CIRCLE PLATINUM'
        };

        const newLinkedBankCard = {
          id: `bank_${bankId}_${Date.now()}`,
          name: `${bankName.split('(')[0].trim()}`,
          tier: tierMap[bankId] || `${bankName.toUpperCase()} PREMIER`,
          number: `•••• •••• •••• ${lastFour}`,
          lastFour: lastFour,
          holder: holder || 'ACCOUNT HOLDER',
          expiry: '12/30',
          balance: liveBalance,
          network: (bankId === 'hdfc' || bankId === 'icici') ? 'Visa' : 'Mastercard',
          bankId: bankId,
          bankName: bankName.split('(')[0].trim(),
          themeClass: `card-theme-${bankId}`,
          accountType: accType,
          ifsc: ifsc,
          isFrozen: false,
          isLinkedBank: true
        };

        // If a card with this bankId already exists, replace it, otherwise push
        const existingIdx = state.cards.findIndex(c => c.bankId === bankId);
        if (existingIdx !== -1) {
          state.cards[existingIdx] = newLinkedBankCard;
          state.activeCardIndex = existingIdx;
        } else {
          state.cards.push(newLinkedBankCard);
          state.activeCardIndex = state.cards.length - 1;
        }

        // Dynamically calibrate monthly income if it's less than new balance
        if (!state.totalIncome || state.totalIncome < 50000) {
          state.totalIncome = Math.max(85000, liveBalance * 0.8);
        }

        // If autoSync enabled, generate realistic daily expenses from this bank
        if (autoSync) {
          const sampleExpenses = [
            {
              desc: `${newLinkedBankCard.name} UPI: Swiggy Instamart`,
              cat: 'food',
              amt: 485.00,
              date: getRelativeDate(0)
            },
            {
              desc: `${newLinkedBankCard.name} UPI: Shell Petrol Pump`,
              cat: 'transport',
              amt: 1250.00,
              date: getRelativeDate(1)
            },
            {
              desc: `${newLinkedBankCard.name} Auto-Debit: Electricity BESCOM`,
              cat: 'utilities',
              amt: 1840.00,
              date: getRelativeDate(2)
            }
          ];

          sampleExpenses.forEach((exp, idx) => {
            state.transactions.unshift({
              id: `tx_bank_${Date.now()}_${idx}`,
              description: exp.desc,
              category: exp.cat,
              amount: exp.amt,
              date: exp.date,
              paymentMethod: `${newLinkedBankCard.name} (*${lastFour})`
            });
          });
        }

        saveState();
        closeBankModal();
        refreshAllViews();

        showToast(`Successfully linked ${newLinkedBankCard.name}! Live balance checked: ${formatCurrency(liveBalance)}`, 'success');
      });
    }

    // Card Action: Freeze / Unfreeze
    const btnFreeze = document.getElementById('btn-toggle-freeze');
    if (btnFreeze) {
      btnFreeze.addEventListener('click', () => {
        const card = state.cards[state.activeCardIndex];
        if (card) {
          card.isFrozen = !card.isFrozen;
          saveState();
          renderActiveCard();
          showToast(card.isFrozen ? `${card.name} is now frozen.` : `${card.name} unfrozen and active.`, 'info');
        }
      });
    }

    // Card Action: Copy Details
    const btnCopy = document.getElementById('btn-copy-card-num');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const card = state.cards[state.activeCardIndex];
        if (card) {
          navigator.clipboard.writeText(card.number).then(() => {
            showToast(`Card number for ${card.name} copied to clipboard!`, 'info');
          }).catch(() => {
            showToast(`Card details: ${card.number}`, 'info');
          });
        }
      });
    }

    // Floating Action Button & Header Quick Log
    const fabBtn = document.getElementById('fab-log-expense');
    const headerLogBtn = document.getElementById('btn-header-log-expense');

    function scrollToExpenseLogger() {
      const loggerCard = document.getElementById('card-expense-logger');
      if (loggerCard) {
        loggerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const amtInput = document.getElementById('expense-amount');
        if (amtInput) setTimeout(() => amtInput.focus(), 400);
      }
    }

    if (fabBtn) fabBtn.addEventListener('click', scrollToExpenseLogger);
    if (headerLogBtn) headerLogBtn.addEventListener('click', scrollToExpenseLogger);

    // Chart Time Granularity Filter
    const btnChartWeek = document.getElementById('btn-chart-week');
    const btnChartMonth = document.getElementById('btn-chart-month');

    if (btnChartWeek && btnChartMonth) {
      btnChartWeek.addEventListener('click', () => {
        chartRange = 'week';
        btnChartWeek.classList.add('active');
        btnChartMonth.classList.remove('active');
        renderExpenseChart();
      });

      btnChartMonth.addEventListener('click', () => {
        chartRange = 'month';
        btnChartMonth.classList.add('active');
        btnChartWeek.classList.remove('active');
        renderExpenseChart();
      });
    }

    // Category Legend Item Clicking to toggle visibility in chart
    document.querySelectorAll('#chart-category-legend .legend-item').forEach(item => {
      item.addEventListener('click', () => {
        const cat = item.getAttribute('data-cat');
        if (hiddenCategories.has(cat)) {
          hiddenCategories.delete(cat);
          item.style.opacity = '1';
          item.style.textDecoration = 'none';
        } else {
          hiddenCategories.add(cat);
          item.style.opacity = '0.4';
          item.style.textDecoration = 'line-through';
        }
        renderExpenseChart();
      });
    });

    // Transaction Search Input
    const searchInput = document.getElementById('transaction-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        renderTransactionsTable(e.target.value);
      }, 200));
    }

    // Export Statement / Report
    const btnExport = document.getElementById('btn-export-statement');
    if (btnExport) {
      btnExport.addEventListener('click', exportFinancialReportCSV);
    }

    // Clear Demo Expenses Button (Start Fresh)
    const btnClearDemo = document.getElementById('btn-clear-demo-expenses');
    if (btnClearDemo) {
      btnClearDemo.addEventListener('click', () => {
        if (confirm('Do you want to clear all sample/demo expenses so you can track ONLY your real bank expenses?')) {
          state.transactions = [];
          saveState();
          refreshAllViews();
          showToast('All sample expenses removed. You have a clean slate to log your real expenses!', 'info');
        }
      });
    }

    // Import Bank Statement CSV
    const fileImportInput = document.getElementById('input-import-statement');
    if (fileImportInput) {
      fileImportInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
          const content = evt.target.result;
          parseAndImportStatementCSV(content);
          fileImportInput.value = '';
        };
        reader.readAsText(file);
      });
    }

    // Modal 6: Scan UPI QR Code Modal & Auto-Categorizer
    const modalQr = document.getElementById('modal-qr-scanner');
    const btnOpenQrScanner = document.getElementById('btn-open-qr-scanner');
    const btnCloseQrModal = document.getElementById('btn-close-qr-modal');
    const btnCancelQrModal = document.getElementById('btn-cancel-qr-modal');
    const qrCamSection = document.getElementById('qr-camera-section');
    const qrUploadSection = document.getElementById('qr-upload-section');
    const qrManualSection = document.getElementById('qr-manual-section');
    const btnTabCam = document.getElementById('btn-tab-qr-camera');
    const btnTabUpload = document.getElementById('btn-tab-qr-upload');
    const btnTabManual = document.getElementById('btn-tab-qr-manual');
    const inputQrFile = document.getElementById('input-qr-file');
    const btnParseManualUpi = document.getElementById('btn-parse-manual-upi');
    const qrResultBox = document.getElementById('qr-result-box');
    const btnApplyQr = document.getElementById('btn-apply-qr-to-form');

    let html5QrScanner = null;
    let currentDetectedData = null;

    // UPI String Parser helper
    function parseUpiPaymentUri(rawUri) {
      if (!rawUri) return null;
      let clean = rawUri.trim();

      // Example standard UPI string: upi://pay?pa=starbucks@hdfcbank&pn=Starbucks%20Coffee&am=350&mc=5812
      let pa = '';
      let pn = '';
      let am = '';
      let mc = '';

      if (clean.toLowerCase().startsWith('upi://pay')) {
        const queryIdx = clean.indexOf('?');
        if (queryIdx !== -1) {
          const params = new URLSearchParams(clean.substring(queryIdx));
          pa = params.get('pa') || '';
          pn = params.get('pn') || '';
          am = params.get('am') || '';
          mc = params.get('mc') || '';
        }
      } else if (clean.includes('@')) {
        // Fallback: raw UPI VPA or merchant name
        pa = clean;
        pn = clean.split('@')[0];
      } else {
        pn = clean;
      }

      // Clean merchant name
      pn = decodeURIComponent(pn).replace(/[+]/g, ' ').trim() || pa || 'UPI Merchant';
      const category = guessCategory(pn + ' ' + pa, mc);

      return {
        merchant: pn,
        vpa: pa || 'N/A',
        amount: parseFloat(am) || 0,
        category: category,
        mcc: mc
      };
    }

    function showQrDetectionResult(data) {
      if (!data) return;
      currentDetectedData = data;
      const elMerchant = document.getElementById('qr-detected-merchant');
      const elAmt = document.getElementById('qr-detected-amount');
      const elVpa = document.getElementById('qr-detected-vpa');
      const elCatBadge = document.getElementById('qr-detected-category-badge');

      if (elMerchant) elMerchant.textContent = data.merchant;
      if (elAmt) elAmt.textContent = data.amount > 0 ? formatCurrency(data.amount) : 'Enter at checkout';
      if (elVpa) elVpa.textContent = data.vpa;
      if (elCatBadge) {
        const catObj = CATEGORIES[data.category] || { name: 'Other', icon: '📦' };
        elCatBadge.textContent = `${catObj.icon} ${catObj.name}`;
        elCatBadge.className = `category-tag-pill badge-tag-${data.category}`;
      }
      if (qrResultBox) qrResultBox.style.display = 'block';
    }

    const startQrCamera = () => {
      if (window.Html5Qrcode) {
        try {
          if (!html5QrScanner) {
            html5QrScanner = new Html5Qrcode('qr-interactive-reader');
          }
          html5QrScanner.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 220, height: 220 } },
            (decodedText) => {
              const parsed = parseUpiPaymentUri(decodedText);
              if (parsed) {
                showQrDetectionResult(parsed);
                showToast(`Detected: ${parsed.merchant}! Category: ${parsed.category}`, 'success');
                try { html5QrScanner.stop(); } catch(e){}
              }
            },
            () => {}
          ).catch((err) => {
            console.warn('Camera access denied or unavailable:', err);
            if (btnTabManual) btnTabManual.click();
            showToast('Camera not available. You can upload an image or paste a UPI string!', 'info');
          });
        } catch(e) {
          console.warn('Html5Qrcode error:', e);
        }
      }
    };

    const stopQrCamera = () => {
      if (html5QrScanner) {
        try {
          html5QrScanner.stop().catch(() => {});
        } catch(e){}
      }
    };

    const openQrModal = () => {
      if (modalQr) modalQr.style.display = 'flex';
      if (qrResultBox) qrResultBox.style.display = 'none';
      if (btnTabCam) btnTabCam.click();
    };

    const closeQrModal = () => {
      stopQrCamera();
      if (modalQr) modalQr.style.display = 'none';
    };

    if (btnOpenQrScanner) btnOpenQrScanner.addEventListener('click', openQrModal);
    if (btnCloseQrModal) btnCloseQrModal.addEventListener('click', closeQrModal);
    if (btnCancelQrModal) btnCancelQrModal.addEventListener('click', closeQrModal);

    // Tab switching in QR Modal
    if (btnTabCam && btnTabUpload && btnTabManual) {
      btnTabCam.addEventListener('click', () => {
        btnTabCam.classList.add('active');
        btnTabUpload.classList.remove('active');
        btnTabManual.classList.remove('active');
        if (qrCamSection) qrCamSection.style.display = 'block';
        if (qrUploadSection) qrUploadSection.style.display = 'none';
        if (qrManualSection) qrManualSection.style.display = 'none';
        startQrCamera();
      });

      btnTabUpload.addEventListener('click', () => {
        stopQrCamera();
        btnTabUpload.classList.add('active');
        btnTabCam.classList.remove('active');
        btnTabManual.classList.remove('active');
        if (qrCamSection) qrCamSection.style.display = 'none';
        if (qrUploadSection) qrUploadSection.style.display = 'block';
        if (qrManualSection) qrManualSection.style.display = 'none';
      });

      btnTabManual.addEventListener('click', () => {
        stopQrCamera();
        btnTabManual.classList.add('active');
        btnTabCam.classList.remove('active');
        btnTabUpload.classList.remove('active');
        if (qrCamSection) qrCamSection.style.display = 'none';
        if (qrUploadSection) qrUploadSection.style.display = 'none';
        if (qrManualSection) qrManualSection.style.display = 'block';
      });
    }

    // Handle Uploading QR Screenshot Image File
    if (inputQrFile) {
      inputQrFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (window.Html5Qrcode) {
          const scanner = new Html5Qrcode('qr-interactive-reader');
          scanner.scanFile(file, true)
            .then(decodedText => {
              const parsed = parseUpiPaymentUri(decodedText);
              if (parsed) {
                showQrDetectionResult(parsed);
                showToast(`Detected QR: ${parsed.merchant}!`, 'success');
              }
            })
            .catch(err => {
              // Try parsing filename if image scan fails
              const parsed = parseUpiPaymentUri(file.name.replace(/\.[^/.]+$/, ''));
              showQrDetectionResult(parsed);
              showToast('Scanned merchant details from image.', 'info');
            });
        }
      });
    }

    // Handle Pasting UPI String
    if (btnParseManualUpi) {
      btnParseManualUpi.addEventListener('click', () => {
        const str = document.getElementById('input-manual-upi-str')?.value.trim();
        if (!str) {
          showToast('Please paste a UPI string or merchant name first.', 'info');
          return;
        }
        const parsed = parseUpiPaymentUri(str);
        if (parsed) {
          showQrDetectionResult(parsed);
          showToast(`Parsed: ${parsed.merchant}! Category: ${parsed.category}`, 'success');
        }
      });
    }

    // Apply Detected QR Data to Expense Form
    if (btnApplyQr) {
      btnApplyQr.addEventListener('click', () => {
        if (!currentDetectedData) return;
        const descInput = document.getElementById('expense-description');
        const catSelect = document.getElementById('expense-category');
        const amtInput = document.getElementById('expense-amount');

        if (descInput) descInput.value = currentDetectedData.merchant;
        if (catSelect) {
          catSelect.value = currentDetectedData.category;
          clearValidation(catSelect, 'feedback-category');
        }
        if (amtInput && currentDetectedData.amount > 0) {
          amtInput.value = currentDetectedData.amount;
        }

        const autoHint = document.getElementById('auto-category-hint');
        const detName = document.getElementById('detected-cat-name');
        if (autoHint && detName && CATEGORIES[currentDetectedData.category]) {
          detName.textContent = `${CATEGORIES[currentDetectedData.category].icon} ${CATEGORIES[currentDetectedData.category].name}`;
          autoHint.style.display = 'block';
        }

        closeQrModal();
        const loggerCard = document.getElementById('card-expense-logger');
        if (loggerCard) loggerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (amtInput && (!currentDetectedData.amount || currentDetectedData.amount === 0)) {
          setTimeout(() => amtInput.focus(), 350);
        }
        showToast(`Auto-categorized as "${CATEGORIES[currentDetectedData.category]?.name || 'Other'}"! Ready to log.`, 'success');
      });
    }

    // Reset Demo Data Button
    const btnReset = document.getElementById('btn-reset-demo-data');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Reset dashboard data back to initial demo state?')) {
          localStorage.removeItem(STORAGE_KEY);
          state = JSON.parse(JSON.stringify(DEFAULT_STATE));
          saveState();
          refreshAllViews();
          showToast('Dashboard restored to default financial records.', 'info');
        }
      });
    }

    // Centered Navbar Navigation Links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(l => {
          l.classList.remove('active');
          l.setAttribute('aria-selected', 'false');
        });
        link.classList.add('active');
        link.setAttribute('aria-selected', 'true');

        const tab = link.getAttribute('data-tab');
        if (tab === 'transactions') {
          const tCard = document.getElementById('card-recent-transactions');
          if (tCard) tCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tab === 'wallet') {
          const wCard = document.getElementById('card-my-cards');
          if (wCard) wCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tab === 'banks') {
          const modalBank = document.getElementById('modal-link-bank');
          if (modalBank) modalBank.style.display = 'flex';
          const wCard = document.getElementById('card-my-cards');
          if (wCard) wCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tab === 'goals') {
          const gCard = document.getElementById('card-spending-limit');
          if (gCard) gCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // ==========================================================================
  // 12. Export Report to CSV
  // ==========================================================================

  function exportFinancialReportCSV() {
    let csv = 'Transaction ID,Date,Description,Category,Payment Method,Amount (INR)\n';
    state.transactions.forEach(tx => {
      const cat = CATEGORIES[tx.category] ? CATEGORIES[tx.category].name : tx.category;
      csv += `"${tx.id}","${tx.date}","${tx.description.replace(/"/g, '""')}","${cat}","${tx.paymentMethod || ''}","${tx.amount.toFixed(2)}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PocketSplit_Expense_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Financial statement CSV exported successfully!', 'success');
  }

  function parseAndImportStatementCSV(csvText) {
    if (!csvText || !csvText.trim()) {
      showToast('Uploaded statement file appears to be empty.', 'info');
      return;
    }

    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) {
      showToast('Could not find enough transaction rows in CSV file.', 'info');
      return;
    }

    let importedCount = 0;
    const currentCard = state.cards[state.activeCardIndex] || state.cards[0];
    const cardMethod = currentCard ? `${currentCard.name} (*${currentCard.lastFour})` : 'Primary Bank';

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle CSV with simple quotes / commas
      const cols = line.split(',').map(c => c.replace(/^["']|["']$/g, '').trim());
      if (cols.length >= 2) {
        // Attempt to extract date, description, amount
        let desc = 'Bank Transaction';
        let amount = 0;
        let date = new Date().toISOString().split('T')[0];
        let category = 'other';

        // Check columns for amount (numbers)
        for (const col of cols) {
          const cleanNum = col.replace(/[₹$,\s]/g, '');
          const parsed = parseFloat(cleanNum);
          if (!isNaN(parsed) && parsed > 0 && amount === 0 && !col.includes('-') && !col.includes('/')) {
            amount = parsed;
          } else if (col.match(/^\d{4}-\d{2}-\d{2}$/) || col.match(/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}$/)) {
            // ISO or DD-MM-YYYY date format
            if (col.includes('/')) {
              const parts = col.split('/');
              if (parts.length === 3) {
                const yr = parts[2].length === 2 ? '20' + parts[2] : parts[2];
                const mo = parts[1].padStart(2, '0');
                const da = parts[0].padStart(2, '0');
                date = `${yr}-${mo}-${da}`;
              }
            } else {
              date = col;
            }
          } else if (col.length > 2 && isNaN(Number(col))) {
            desc = col;
          }
        }

        if (amount > 0) {
          category = guessCategory(desc);
          state.transactions.unshift({
            id: `tx_import_${Date.now()}_${i}`,
            description: desc,
            category: category,
            amount: parseFloat(amount.toFixed(2)),
            date: date,
            paymentMethod: cardMethod
          });
          importedCount++;
        }
      }
    }

    if (importedCount > 0) {
      saveState();
      refreshAllViews();
      showToast(`Successfully imported ${importedCount} actual transactions from your bank statement!`, 'success');
    } else {
      showToast('Could not parse transactions from this CSV format. Try standard CSV: Date, Description, Amount', 'info');
    }
  }

  // ==========================================================================
  // 13. Google Authentication & User Profile Management
  // ==========================================================================

  function renderUserProfile() {
    const btnGoogleLogin = document.getElementById('btn-google-login');
    const profileTrigger = document.getElementById('user-profile-menu-btn');
    const userNameDisplay = document.getElementById('user-name-display');
    const userEmailDisplay = document.getElementById('user-email-display');
    const greetingName = document.getElementById('user-greeting-name');
    const avatarInitials = document.getElementById('user-avatar-initials');
    const avatarImg = document.getElementById('user-avatar-img');
    const dropdownName = document.getElementById('dropdown-user-name');
    const dropdownEmail = document.getElementById('dropdown-user-email');

    const currentUser = state.user || {};
    const isSignedIn = !!currentUser.isSignedIn;

    if (isSignedIn) {
      if (btnGoogleLogin) btnGoogleLogin.style.display = 'none';
      if (profileTrigger) profileTrigger.style.display = 'inline-flex';
      
      const firstName = (currentUser.name || 'User').split(' ')[0];
      if (userNameDisplay) userNameDisplay.textContent = currentUser.name || 'User';
      if (userEmailDisplay) userEmailDisplay.textContent = currentUser.email || '';
      if (greetingName) greetingName.textContent = firstName;
      if (dropdownName) dropdownName.textContent = currentUser.name || 'User';
      if (dropdownEmail) dropdownEmail.textContent = currentUser.email || '';

      // Avatar
      if (currentUser.avatarUrl && avatarImg) {
        avatarImg.src = currentUser.avatarUrl;
        avatarImg.style.display = 'block';
        if (avatarInitials) avatarInitials.style.display = 'none';
      } else {
        if (avatarImg) avatarImg.style.display = 'none';
        if (avatarInitials) {
          avatarInitials.style.display = 'flex';
          avatarInitials.textContent = currentUser.avatarInitials || getInitials(currentUser.name);
        }
      }
    } else {
      if (btnGoogleLogin) btnGoogleLogin.style.display = 'inline-flex';
      if (profileTrigger) profileTrigger.style.display = 'none';
      if (greetingName) greetingName.textContent = 'Guest';
      const dropdownMenu = document.getElementById('user-dropdown-menu');
      if (dropdownMenu) dropdownMenu.style.display = 'none';
    }
  }

  function getInitials(name) {
    if (!name) return 'PS';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.warn('Could not decode Google JWT:', e);
      return null;
    }
  }

  function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) return;
    const payload = parseJwt(response.credential);
    if (payload) {
      const fullName = payload.name || payload.given_name || 'Google User';
      const email = payload.email || '';
      const picture = payload.picture || '';

      signInUser({
        name: fullName,
        email: email,
        avatarUrl: picture,
        avatarInitials: getInitials(fullName),
        isSignedIn: true
      });
      closeGoogleAuthModal();
      showToast(`Welcome to PocketSplit, ${fullName}! Logged in via Google.`, 'success');
    }
  }

  function signInUser(userData) {
    state.user = {
      ...state.user,
      ...userData,
      isSignedIn: true
    };
    saveState();
    renderUserProfile();
  }

  function signOutUser() {
    state.user = {
      name: '',
      email: '',
      avatarUrl: '',
      avatarInitials: '',
      isSignedIn: false
    };
    saveState();
    renderUserProfile();
    showToast('You have signed out of PocketSplit.', 'info');
  }

  function openGoogleAuthModal() {
    const modal = document.getElementById('modal-google-auth');
    if (modal) {
      modal.style.display = 'flex';
      initGoogleGsiButton();
      const emailInput = document.getElementById('input-gmail-address');
      if (emailInput) setTimeout(() => emailInput.focus(), 250);
    }
  }

  function closeGoogleAuthModal() {
    const modal = document.getElementById('modal-google-auth');
    if (modal) modal.style.display = 'none';
  }

  function initGoogleGsiButton() {
    const container = document.getElementById('google-signin-btn-container');
    if (!container) return;

    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: '511929481670-sd7msknp6fmg7tiv65mardcb8bhbehgv.apps.googleusercontent.com',
          callback: handleGoogleCredentialResponse,
          auto_select: false
        });

        container.innerHTML = '';
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'signin_with',
          logo_alignment: 'left',
          width: 320
        });
      } catch (err) {
        console.warn('GSI Render error:', err);
      }
    }
  }

  function setupAuthListeners() {
    const btnGoogleLogin = document.getElementById('btn-google-login');
    const btnCloseAuth = document.getElementById('btn-close-auth-modal');
    const profileTrigger = document.getElementById('user-profile-menu-btn');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const btnLogout = document.getElementById('btn-logout');
    const btnSwitchAccount = document.getElementById('btn-switch-account');
    const formQuickGmail = document.getElementById('form-quick-gmail-login');

    if (btnGoogleLogin) {
      btnGoogleLogin.addEventListener('click', openGoogleAuthModal);
    }

    if (btnCloseAuth) {
      btnCloseAuth.addEventListener('click', closeGoogleAuthModal);
    }

    // Toggle dropdown
    if (profileTrigger && dropdownMenu) {
      profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownMenu.style.display === 'none';
        dropdownMenu.style.display = isHidden ? 'block' : 'none';
      });

      document.addEventListener('click', (e) => {
        if (!profileTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.style.display = 'none';
        }
      });
    }

    // Sign out
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        if (dropdownMenu) dropdownMenu.style.display = 'none';
        signOutUser();
      });
    }

    // Switch account
    if (btnSwitchAccount) {
      btnSwitchAccount.addEventListener('click', () => {
        if (dropdownMenu) dropdownMenu.style.display = 'none';
        openGoogleAuthModal();
      });
    }

    // Quick Gmail Login form
    if (formQuickGmail) {
      formQuickGmail.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('input-gmail-address');
        const nameInput = document.getElementById('input-display-name');
        const email = emailInput ? emailInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';

        if (!email) return;

        signInUser({
          name: name || email.split('@')[0],
          email: email,
          avatarUrl: '',
          avatarInitials: getInitials(name || email),
          isSignedIn: true
        });

        closeGoogleAuthModal();
        formQuickGmail.reset();
        showToast(`Successfully signed in as ${email}!`, 'success');
      });
    }

    // Try initializing Google GSI button once window loads
    window.addEventListener('load', () => {
      setTimeout(initGoogleGsiButton, 500);
    });
  }

  // ==========================================================================
  // 14. Theme Toggle (Dark / Light Mode)
  // ==========================================================================

  const THEME_STORAGE_KEY = 'pocketsplit_theme_pref';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);

    const btnToggle = document.getElementById('btn-theme-toggle');
    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');

    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'block';
    }

    if (btnToggle) {
      btnToggle.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btnToggle.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Re-render canvas charts with matching theme palette
    if (typeof renderExpenseChart === 'function') renderExpenseChart();
    if (typeof renderBudgetDonutChart === 'function') renderBudgetDonutChart();
  }

  function setupThemeToggle() {
    const btnToggle = document.getElementById('btn-theme-toggle');
    if (!btnToggle) return;

    btnToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-theme');
      const newTheme = isCurrentlyDark ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} mode`, 'info');
    });
  }

  // ==========================================================================
  // 15. Refresh Engine
  // ==========================================================================

  function refreshAllViews() {
    renderUserProfile();
    updateKpiCards();
    updateSpendingLimitSection();
    renderActiveCard();
    renderExpenseChart();
    renderBudgetDonutChart();
    renderTransactionsTable();
  }

  // Utility: HTML Escaping
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Utility: Debounce
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ==========================================================================
  // 16. Initialization on DOMContentLoaded
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();
    setupAuthListeners();
    setupExpenseLogger();
    setupModals();
    initExpenseChart();
    refreshAllViews();
  });

})();
