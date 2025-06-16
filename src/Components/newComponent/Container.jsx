export default function Container({ children, border }) {
  return (
    <>
      <div
        className={`border-[#D5D5DD] py-14 ${
          border === "both" ? "border-y" : border === "top" ? "border-t" : border ? "bottom" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
