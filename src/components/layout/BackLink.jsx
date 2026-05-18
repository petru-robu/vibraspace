import { Link } from "react-router-dom";
import { ArrowLeft } from "../icons/Arrows";

export default function BackLink({ to, children, dark = true, onClick }) {
  const className = dark
    ? "inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-50 transition-colors mb-16 group"
    : "inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-6 group";

  return (
    <Link to={to} onClick={onClick} className={className}>
      <ArrowLeft />
      {children}
    </Link>
  );
}
