import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { rememberIntendedPath } from "@/lib/redirect";

const TARGET_PATH = "/team-hierarchy/nda";

const TeamHierarchyNdaGate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (!supabase) {
        rememberIntendedPath(TARGET_PATH);
        navigate("/auth", { replace: true, state: { redirectTo: TARGET_PATH } });
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        rememberIntendedPath(TARGET_PATH);
        navigate("/auth", { replace: true, state: { redirectTo: TARGET_PATH } });
        return;
      }

      window.location.replace("/nda/index.html");
    };

    checkAuthAndRedirect();
  }, [navigate]);

  return null;
};

export default TeamHierarchyNdaGate;
