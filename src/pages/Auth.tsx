import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo || "/join";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/", { replace: true });
    });
  }, [navigate]);

  const handleEmailAuth = async () => {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    // 1. Try to sign in first
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (!signInError) {
      setLoading(false);
      navigate(redirectTo, { replace: true });
      return;
    }

    // 2. If sign-in fails because user not found/invalid credentials, try to sign up
    if (signInError.message.toLowerCase().includes("invalid login credentials")) {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      
      setLoading(false);
      
      if (signUpError) return setError(signUpError.message);

      if (signUpData.user && !signUpData.session) {
        setSuccess("Account created! Please check your email inbox to confirm.");
        return;
      }
      
      if (signUpData.session) {
        navigate(redirectTo, { replace: true });
        return;
      }
    }

    // 3. Otherwise show the sign-in error (like unconfirmed email)
    setLoading(false);
    setError(signInError.message);
  };

  const handleGoogle = async () => {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    setSuccess(null);
    setError(null);
    const origin = window.location.origin;
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo: origin,
        queryParams: { prompt: 'select_account' } 
      },
    });
    if (err) setError(err.message);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
      <Link
        to="/"
        className="fixed top-6 left-6 w-10 h-10 rounded-md border border-border bg-secondary flex items-center justify-center hover:bg-secondary/70 transition"
        aria-label="Back to Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <img
            src={rightSignalLogo}
            alt="Right Signal"
            className="w-14 h-14 rounded-xl mx-auto mb-2"
          />
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">RIGHT SIGNAL</p>
          <h1 className="font-display text-4xl font-black">Join Community</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue.</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-red-600">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-600 bg-green-50">
            <AlertDescription className="text-green-600">{success}</AlertDescription>
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
          <Button 
            className="w-full text-xs font-display tracking-widest py-6" 
            disabled={loading} 
            onClick={() => handleEmailAuth()}
          >
            {loading ? "PROCESSING..." : "LOGIN / SIGN UP"}
          </Button>
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
        <div className="text-center text-xs text-muted-foreground">
          Need help? <Link to="/events" className="underline">See events</Link> or <Link to="/" className="underline">Home</Link>
        </div>
      </div>
    </main>
  );
};

export default Auth;
