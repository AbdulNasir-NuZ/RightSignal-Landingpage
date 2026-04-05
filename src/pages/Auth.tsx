import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { rememberIntendedPath, getIntendedPath, clearIntendedPath } from "@/lib/redirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo || "/join";

  const [mode, setMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [managerCode, setManagerCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignupValid = useMemo(() => {
    return (
      email &&
      password &&
      confirmPassword &&
      fullName &&
      whatsapp &&
      password === confirmPassword
    );
  }, [email, password, confirmPassword, fullName, whatsapp]);

  type ProfileRecord = { is_first_time?: boolean | null } | null;

  const fetchProfile = useCallback(async (userId: string): Promise<ProfileRecord> => {
    if (!supabase) return null;
    const { data } = await supabase
      .from("profiles")
      .select("is_first_time")
      .eq("user_id", userId)
      .maybeSingle();
    return data;
  }, []);

  const upsertProfile = useCallback(
    async (
      userId: string,
      extras: {
        name?: string | null;
        whatsapp_number?: string | null;
        manager_referral_code?: string | null;
        is_first_time?: boolean;
      },
    ) => {
      if (!supabase) return;
      const payload = {
        user_id: userId,
        name: extras.name ?? null,
        whatsapp_number: extras.whatsapp_number ?? null,
        manager_referral_code: extras.manager_referral_code ?? null,
        ...(typeof extras.is_first_time === "boolean" ? { is_first_time: extras.is_first_time } : {}),
      };
      await supabase.from("profiles").upsert(payload, { onConflict: "user_id" });
    },
    [],
  );

  const isFirstTimeUser = useCallback(
    (profile?: ProfileRecord, userMeta?: User["user_metadata"]) =>
      profile?.is_first_time ?? userMeta?.first_time_user ?? false,
    [],
  );

  useEffect(() => {
    if (!supabase) return;
    rememberIntendedPath(redirectTo);
    const googleAttempt = sessionStorage.getItem("rs_google_oauth_attempt") === "1";

    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        if (googleAttempt) {
          sessionStorage.removeItem("rs_google_oauth_attempt");
        }
        return;
      }

      const sessionUser = data.session.user;
      const profile = await fetchProfile(sessionUser.id);

      if (!profile && googleAttempt) {
        await supabase.auth.signOut();
        sessionStorage.removeItem("rs_google_oauth_attempt");
        setError("No existing Google account found. Please sign up first or use email login.");
        return;
      }

      await upsertProfile(sessionUser.id, {
        name: sessionUser.user_metadata?.full_name ?? null,
        whatsapp_number: sessionUser.user_metadata?.whatsapp_number ?? null,
        manager_referral_code: sessionUser.user_metadata?.manager_referral_code ?? null,
      });

      const intended = getIntendedPath(redirectTo);
      if (isFirstTimeUser(profile, sessionUser.user_metadata)) {
        navigate("/join", { replace: true, state: { redirectTo: intended, firstTime: true } });
        return;
      }
      clearIntendedPath();
      navigate(intended, { replace: true });
    });
  }, [fetchProfile, isFirstTimeUser, navigate, redirectTo, upsertProfile]);

  const handleLogin = async () => {
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
    const { error: signInError, data } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      const message = signInError.message.toLowerCase();
      if (message.includes("invalid login credentials") || message.includes("user not found") || message.includes("no user")) {
        setError("User not found. Please sign up or check your email and password.");
      } else {
        setError(signInError.message);
      }
      return;
    }
    const sessionUser = data.session!.user;
    await upsertProfile(sessionUser.id, {
      name: sessionUser.user_metadata?.full_name ?? null,
      whatsapp_number: sessionUser.user_metadata?.whatsapp_number ?? null,
      manager_referral_code: sessionUser.user_metadata?.manager_referral_code ?? null,
    });
    const profile = await fetchProfile(sessionUser.id);
    const intended = getIntendedPath(redirectTo);
    if (isFirstTimeUser(profile, sessionUser.user_metadata)) {
      navigate("/join", { replace: true, state: { redirectTo: intended, firstTime: true } });
      return;
    }
    clearIntendedPath();
    navigate(intended, { replace: true });
  };

  const handleSignup = async () => {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    if (!isSignupValid) {
      setError("Please complete all required fields and ensure passwords match.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    rememberIntendedPath(redirectTo);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          whatsapp_number: whatsapp,
          manager_referral_code: managerCode || null,
          first_time_user: true,
        },
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    setLoading(false);

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes("already registered")) {
        setMode("login");
      }
      setError(signUpError.message);
      return;
    }

    if (data?.session) {
      await upsertProfile(data.session.user.id, {
        name: fullName,
        whatsapp_number: whatsapp,
        manager_referral_code: managerCode || null,
        is_first_time: true,
      });
      const intended = getIntendedPath(redirectTo);
      navigate("/join", { replace: true, state: { redirectTo: intended, firstTime: true } });
      return;
    }

    setSuccess("Account created. Please check your email to verify and then log in.");
    setMode("login");
  };

  const handleGoogle = async () => {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    setSuccess(null);
    setError(null);
    rememberIntendedPath(redirectTo);
    sessionStorage.setItem("rs_google_oauth_attempt", "1");
    const origin = window.location.origin;
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: origin,
        queryParams: { prompt: "select_account" },
      },
    });
    if (err) {
      sessionStorage.removeItem("rs_google_oauth_attempt");
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-card/60 border border-border rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center mb-6">
          <img
            src={rightSignalLogo}
            alt="Right Signal"
            className="w-16 h-16 rounded-xl"
          />
          <div className="space-y-1">
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">RIGHT SIGNAL</p>
            <h1 className="font-display text-3xl md:text-4xl font-black">Access Community OS</h1>
            <p className="text-sm text-muted-foreground">
              Create an account or sign in to continue. Sessions are secured and synced across devices.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => {
              setMode("login");
              setError(null);
              setSuccess(null);
            }}
            className={`font-display text-xs tracking-widest px-4 py-2 rounded-lg border ${
              mode === "login" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setError(null);
              setSuccess(null);
            }}
            className={`font-display text-xs tracking-widest px-4 py-2 rounded-lg border ${
              mode === "signup" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"
            }`}
          >
            SIGN UP
          </button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-3">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-3 border-green-600 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {mode === "login" && (
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-muted-foreground"
                onClick={() => setShowPassword((p) => !p)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              className="w-full text-xs font-display tracking-widest py-3"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              LOGIN
            </Button>
          </div>
        )}

        {mode === "signup" && (
          <div className="grid gap-3">
            <p className="text-xs text-muted-foreground">
              Create an account to continue. We'll keep you signed in across devices.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Alex Carter"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <Input
                    id="whatsapp"
                    type="tel"
                    inputMode="tel"
                    placeholder="+1 415 555 0123"
                    className="pl-10"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Label htmlFor="manager">Manager Referral Code (optional)</Label>
            <Input
              id="manager"
              placeholder="RS-2026-MGR"
              value={managerCode}
              onChange={(e) => setManagerCode(e.target.value)}
            />

            <Label htmlFor="signup-email">Email *</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="new-password">Password *</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-muted-foreground"
                onClick={() => setShowPassword((p) => !p)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Label htmlFor="confirm-password">Confirm Password *</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-muted-foreground"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && confirmPassword && password !== confirmPassword ? (
              <p className="text-xs text-destructive">Passwords do not match.</p>
            ) : null}

            <Button
              className="w-full text-xs font-display tracking-widest py-3"
              disabled={loading || !isSignupValid}
              onClick={handleSignup}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              SIGN UP
            </Button>
          </div>
        )}

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
            <span className="bg-background px-2">or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </Button>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Need help? <Link to="/events" className="underline">See events</Link> or <Link to="/" className="underline">Home</Link>
        </div>
      </div>
    </main>
  );
};

export default Auth;
