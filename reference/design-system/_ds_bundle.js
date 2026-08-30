/* @ds-bundle: {"format":4,"namespace":"TradlAIDesignSystem_7cfe07","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CategoryTag","sourcePath":"components/core/CategoryTag.jsx"},{"name":"Delta","sourcePath":"components/data/Delta.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"57708b2dac61","components/core/Card.jsx":"602a9be011c7","components/core/CategoryTag.jsx":"4b40c230128b","components/data/Delta.jsx":"db2c16e34a09","components/data/StatTile.jsx":"4aec79e4684e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TradlAIDesignSystem_7cfe07 = window.TradlAIDesignSystem_7cfe07 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status/label chip. Variants map to the source's
 * Badge surface tokens (neutral / green / yellow) plus semantic
 * positive & negative for market states.
 */
function Badge({
  variant = "neutral",
  children,
  style,
  ...rest
}) {
  const variants = {
    neutral: {
      background: "var(--surface-badge)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-subtle)"
    },
    green: {
      background: "var(--surface-badge-green)",
      color: "#FFFFFF",
      border: "1px solid transparent"
    },
    yellow: {
      background: "var(--surface-badge-yellow)",
      color: "#000000",
      border: "1px solid transparent"
    },
    positive: {
      background: "var(--surface-highlight-positive-2)",
      color: "var(--text-positive)",
      border: "1px solid var(--border-positive)"
    },
    negative: {
      background: "var(--surface-highlight-negative)",
      color: "var(--text-negative)",
      border: "1px solid var(--border-negative)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: 20,
      padding: "0 8px",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-label-size)",
      fontWeight: "var(--type-label-weight)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — a surface panel. `level` picks the surface token (L2 default,
 * L3 raised). 10px radius + subtle hairline border matches the source
 * specimen panels. Optional `accent` draws a category left rail.
 */
function Card({
  level = "l2",
  accent,
  padding = 16,
  children,
  style,
  ...rest
}) {
  const surfaces = {
    l2: "var(--surface-l2)",
    l3: "var(--surface-l3)",
    l4: "var(--surface-l4)"
  };
  const accents = {
    column: "var(--accent-column)",
    metric: "var(--accent-metric)",
    rule: "var(--accent-rule)",
    positive: "var(--text-positive)",
    negative: "var(--text-negative)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      background: surfaces[level] || surfaces.l2,
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: "var(--shadow-sm)",
      color: "var(--text-primary)",
      borderLeft: accent ? `2px solid ${accents[accent] || accent}` : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/CategoryTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CategoryTag — pill for the source's data categories (Column / Metric /
 * Rule), each with its own tinted surface + border + icon color token.
 */
function CategoryTag({
  category = "metric",
  children,
  style,
  ...rest
}) {
  const map = {
    column: {
      background: "var(--surface-column)",
      border: "var(--border-column)",
      color: "var(--icon-column)"
    },
    metric: {
      background: "var(--surface-metric)",
      border: "var(--border-metric)",
      color: "var(--icon-metric)"
    },
    rule: {
      background: "var(--surface-rule)",
      border: "var(--border-rule)",
      color: "var(--icon-rule)"
    }
  };
  const c = map[category] || map.metric;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 22,
      padding: "0 9px",
      borderRadius: "var(--radius-sm)",
      background: c.background,
      border: `1px solid ${c.border}`,
      color: c.color,
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { CategoryTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CategoryTag.jsx", error: String((e && e.message) || e) }); }

// components/data/Delta.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Delta — a signed change indicator (PnL / % move) in Lato
 * with tabular figures. Sign drives positive/negative text color; the
 * source's "Table Accent" role.
 */
function Delta({
  value,
  format = "percent",
  showArrow = true,
  style,
  ...rest
}) {
  const positive = value >= 0;
  const color = positive ? "var(--text-positive)" : "var(--text-negative)";
  const sign = positive ? "+" : "\u2212"; // − minus
  const abs = Math.abs(value);
  const text = format === "percent" ? `${abs.toFixed(2)}%` : abs.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      color,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-table-accent-size)",
      fontWeight: "var(--type-table-accent-weight)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1,
      ...style
    }
  }, rest), showArrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9
    }
  }, positive ? "\u25B2" : "\u25BC"), sign, text);
}
Object.assign(__ds_scope, { Delta });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Delta.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatTile — a metric card: label (overline), big mono value (Display
 * role), and an optional Delta. Composes Card + Delta.
 */
function StatTile({
  label,
  value,
  delta,
  deltaFormat = "percent",
  accent,
  style,
  ...rest
}) {
  const positive = typeof delta === "number" && delta >= 0;
  const deltaColor = delta == null ? "" : positive ? "var(--text-positive)" : "var(--text-negative)";
  const deltaText = delta == null ? null : (() => {
    const s = positive ? "+" : "\u2212";
    const a = Math.abs(delta);
    return deltaFormat === "percent" ? `${s}${a.toFixed(2)}%` : `${s}${a.toLocaleString()}`;
  })();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      background: "var(--surface-l2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "14px 16px",
      borderLeft: accent ? `2px solid var(--accent-${accent})` : undefined,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 24,
      fontWeight: 700,
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, value), deltaText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      color: deltaColor,
      fontVariantNumeric: "tabular-nums"
    }
  }, deltaText)));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CategoryTag = __ds_scope.CategoryTag;

__ds_ns.Delta = __ds_scope.Delta;

__ds_ns.StatTile = __ds_scope.StatTile;

})();
