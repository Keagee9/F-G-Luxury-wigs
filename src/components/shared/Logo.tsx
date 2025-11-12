export function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 md:h-10 md:w-10"
    >
      <circle cx="20" cy="20" r="18" stroke="hsl(var(--primary))" strokeWidth="3" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="hsl(var(--primary))"
        fontFamily="serif"
      >
        FG
      </text>
    </svg>
  );
}
