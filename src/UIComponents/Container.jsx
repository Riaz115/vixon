export default function Container({ children, border, padding }) {
  return (
    <>
      <div
        className={`border-[#D5D5DD] ${padding ? `py-[35px]` : "py-14"} ${
          border === "both" ? "border-y" : border === "top" ? "border-t" : border === "bottom" ? "border-b" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
