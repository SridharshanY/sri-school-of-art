export default function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  light = false
}) {
  return (
    <div className={`section-header ${align === "center" ? "center" : ""} ${light ? "light" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="section-lede">{text}</p>}
    </div>
  );
}
