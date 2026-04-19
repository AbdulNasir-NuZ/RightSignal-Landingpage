import { useEffect } from "react";

const NdaRedirect = () => {
  useEffect(() => {
    window.location.replace("/nda/index.html");
  }, []);

  return null;
};

export default NdaRedirect;
