import { useEffect, useState } from "react";
import AppLoader from "./AppLoader";

export default function BootSplash({ min = 1800, children }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), min);
    return () => clearTimeout(t);
  }, [min]);

  return (
    <>
      {children}
      {show && <AppLoader text="Carregando…" />} {/* overlay por min ms */}
    </>
  );
}
