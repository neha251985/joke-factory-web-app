type SpinnerProps = { size?: number; label?: string };

export default function Spinner({ size = 18, label = "Loading..." }: SpinnerProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "3px solid #ddd",
          borderTopColor: "#111",
          display: "inline-block",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span>{label}</span>

      {/* keyframes without external CSS */}
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </span>
  );
}
