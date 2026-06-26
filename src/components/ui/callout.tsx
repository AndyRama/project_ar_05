import React from "react";
type CalloutType = "info" | "success" | "warning" | "error";
type CalloutProps = {
  type?: CalloutType;
  icon?: string;
  children: React.ReactNode;
};
const VARIANTS: Record<
  CalloutType,
  {
    border: string;
    bg: string;
    iconBg: string;
    text: string;
  }
> = {
  info: {
    border: "#f97316",
    bg: "#fff7ed",
    iconBg: "#fed7aa",
    text: "#7c2d12",
  },
  success: {
    border: "#ea580c",
    bg: "#ffedd5",
    iconBg: "#fdba74",
    text: "#9a3412",
  },
  warning: {
    border: "#F9A825",
    bg: "#FFFDE7",
    iconBg: "#FFF9C4",
    text: "#5D4037",
  },
  error: {
    border: "#E65100",
    bg: "#FBE9E7",
    iconBg: "#FFCCBC",
    text: "#BF360C",
  },
};
export function Callout({ type = "info", icon, children }: CalloutProps) {
  const v = VARIANTS[type];
  return (
    <aside
      style={{
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        margin: "24px 0",
        padding: "16px 20px",
        borderRadius: "8px",
        borderLeft: `5px solid ${v.border}`,
        background: v.bg,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {icon && (
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: v.iconBg,
            fontSize: "18px",
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
      )}
      <div
        style={{
          flex: 1,
          color: v.text,
          fontSize: "0.93rem",
          lineHeight: "1.65",
        }}
      >
        {children}
      </div>
    </aside>
  );
}