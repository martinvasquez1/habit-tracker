export function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? "blur-[32px]" : "blur-[75px]"
      } ${
        conic
          ? "bg-linear-to-r bg-red-500 from-10% via-purple-500 via-30% to-blue-500 to-100%"
          : ""
      } ${className ?? ""}`}
    />
  );
}
