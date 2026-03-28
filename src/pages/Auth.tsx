import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo || "/join";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(redirectTo, { replace: true });
    });
  }, [navigate, redirectTo]);

  const handleEmailAuth = async (mode: "signIn" | "signUp") => {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    setLoading(true);
    setError(null);
    const fn =
      mode === "signIn"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error: err } = await fn;
    setLoading(false);
    if (err) return setError(err.message);
    navigate(redirectTo, { replace: true });
  };

  const handleGoogle = async () => {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const origin = window.location.origin;
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}${redirectTo}` },
    });
    if (err) setError(err.message);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">RIGHT SIGNAL</p>
          <h1 className="font-display text-4xl font-black">Join Community</h1>
          <p className="text-sm text-muted-foreground">Authenticate to continue.</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <Button className="flex-1" disabled={loading} onClick={() => handleEmailAuth("signIn")}>
              {loading ? "Signing in..." : "Login"}
            </Button>
            <Button variant="secondary" className="flex-1" disabled={loading} onClick={() => handleEmailAuth("signUp")}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
            <span className="bg-background px-2">or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>
      </div>
    </main>
  );
};

export default Auth;
