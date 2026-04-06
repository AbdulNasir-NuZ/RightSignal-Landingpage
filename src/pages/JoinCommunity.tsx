import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { buildPathFromLocation, clearIntendedPath, getIntendedPath, rememberIntendedPath } from "@/lib/redirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormValues = {
  name: string;
  bio: string;
  role: string;
  location: string;
  referral_code: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  website?: string;
  image: FileList;
};

const JoinCommunity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectFromState = (location.state as { redirectTo?: string } | null)?.redirectTo;
  const intendedPath = useMemo(
    () => redirectFromState || buildPathFromLocation(location),
    [redirectFromState, location],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextPath, setNextPath] = useState<string>("");

  useEffect(() => {
    if (!supabase) {
      rememberIntendedPath(intendedPath);
      navigate("/auth", { replace: true, state: { redirectTo: intendedPath || "/join" } });
      setLoading(false);
      return;
    }
    rememberIntendedPath(intendedPath);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true, state: { redirectTo: intendedPath || "/join" } });
        return;
      }

      const [{ data: profile }, { data: member }] = await Promise.all([
        supabase.from("profiles").select("is_first_time").eq("user_id", session.user.id).maybeSingle(),
        supabase.from("community_members").select("*").eq("user_id", session.user.id).maybeSingle(),
      ]);

      const isFirstTime = profile?.is_first_time ?? session.user.user_metadata?.first_time_user ?? false;
      const destination = getIntendedPath(intendedPath || "/startup-sandbox");

      if ((!isFirstTime || member) && destination && destination !== "/join") {
        clearIntendedPath();
        navigate(destination, { replace: true });
        return;
      }

      if (member) {
        setSubmitted(true);
      }
      setNextPath(destination);
      setLoading(false);
    };

    checkUser();
  }, [intendedPath, navigate]);

  const onSubmit = async (values: FormValues) => {
    setError(null);
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    if (!values.image?.[0]) {
      setError("Profile image is compulsory.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth", { replace: true, state: { redirectTo: intendedPath || "/join" } });
      return;
    }

    let imageUrl: string | null = null;
    const file = values.image[0];
    const { data, error: uploadError } = await supabase.storage
      .from("community-avatars")
      .upload(`public/${session.user.id}-${Date.now()}.${file.name.split(".").pop()}`, file, {
        upsert: true,
      });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("community-avatars").getPublicUrl(data.path);
    imageUrl = publicUrl.publicUrl;

    const payload = {
      user_id: session.user.id,
      name: values.name,
      bio: values.bio,
      role: values.role,
      location: values.location,
      referral_code: values.referral_code,
      image_url: imageUrl,
      twitter: values.twitter || null,
      linkedin: values.linkedin || null,
      instagram: values.instagram || null,
      website: values.website || null,
    };

    const { error: insertError } = await supabase.from("community_members").insert(payload);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    await supabase.from("profiles").update({ is_first_time: false }).eq("user_id", session.user.id);
    await supabase.auth.updateUser({ data: { first_time_user: false } });

    localStorage.setItem("community_profile", JSON.stringify(payload));
    setSubmitted(true);
    setNextPath(getIntendedPath(intendedPath || "/startup-sandbox"));
    reset();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-display text-xs tracking-widest animate-pulse text-muted-foreground">LOADING PROFILE...</p>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-secondary/40 border border-border rounded-2xl p-8 text-center space-y-6 shadow-lg">
          <div className="space-y-2">
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">Success</p>
            <h1 className="font-display text-3xl font-black">Your account is live.</h1>
            <p className="text-sm text-muted-foreground">
              Submissions are reviewed weekly. If you are willing to join the community, click here.
            </p>
            <Link
              to="/#community"
              className="text-sm font-display tracking-widest text-primary underline underline-offset-4"
              onClick={() => clearIntendedPath()}
            >
              JOIN COMMUNITY
            </Link>
          </div>

          <div className="grid gap-4 mt-8">
            <a
              href="/#ios-download"
              className="w-full py-5 bg-foreground text-background font-display text-sm tracking-widest rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 border-2 border-foreground"
            >
              DOWNLOAD FOR iOS
            </a>
            <a
              href="/#android-download"
              className="w-full py-5 border-2 border-border bg-secondary font-display text-sm tracking-widest rounded-xl hover:bg-secondary/70 transition-all flex items-center justify-center gap-2"
            >
              DOWNLOAD FOR ANDROID
            </a>
            {nextPath ? (
              <button
                onClick={() => {
                  clearIntendedPath();
                  navigate(nextPath, { replace: true });
                }}
                className="w-full py-4 border border-border bg-background font-display text-xs tracking-widest rounded-xl hover:bg-muted transition-all"
              >
                CONTINUE TO {nextPath === "/startup-sandbox" ? "SANDBOX" : "YOUR PAGE"}
              </button>
            ) : null}
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-xs text-muted-foreground underline underline-offset-4"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen bg-background text-foreground flex items-center justify-center px-6 py-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-secondary/40 border border-border rounded-2xl p-5 md:p-6 space-y-3 shadow-lg my-auto"
      >
        <div className="space-y-0.5">
          <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Right Signal</p>
          <h1 className="font-display text-2xl md:text-3xl font-black leading-tight">Community Join Form</h1>
          <p className="text-xs text-muted-foreground">Tell us about you to place you in the right circles.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs">Full Name *</Label>
            <Input id="name" {...register("name", { required: true })} placeholder="Alex Carter" className="h-9 text-sm" />
            {errors.name && <span className="text-[10px] text-destructive">Required</span>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="role" className="text-xs">Role</Label>
            <Input id="role" {...register("role", { required: true })} placeholder="Founder / Developer / Investor" className="h-9 text-sm" />
            {errors.role && <span className="text-[10px] text-destructive">Required</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="location" className="text-xs">Address *</Label>
            <Input id="location" {...register("location", { required: true })} placeholder="City, Country" className="h-9 text-sm" />
            {errors.location && <span className="text-[10px] text-destructive">Required</span>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="image" className="text-xs">Profile Image *</Label>
            <Input id="image" type="file" accept="image/*" {...register("image", { required: true })} className="h-9 text-[10px] pt-1.5" />
            {errors.image && <span className="text-[10px] text-destructive">Compulsory.</span>}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="bio" className="text-xs">Bio / Description</Label>
          <Textarea
            id="bio"
            rows={2}
            {...register("bio", { required: true, minLength: 10 })}
            placeholder="What are you building or looking for?"
            className="text-sm min-h-[60px]"
          />
          {errors.bio && <span className="text-[10px] text-destructive">Min 10 characters.</span>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="referral_code" className="text-xs uppercase tracking-widest font-bold">Referral Code</Label>
          <Input
            id="referral_code"
            {...register("referral_code")}
            placeholder="ENTER YOUR CODE (OPTIONAL)"
            className="h-10 text-sm font-mono tracking-widest bg-secondary/60 border-primary/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <div className="space-y-1">
            <Label htmlFor="twitter" className="text-[10px]">Twitter / X</Label>
            <Input id="twitter" {...register("twitter")} placeholder="https://..." className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="linkedin" className="text-[10px]">LinkedIn</Label>
            <Input id="linkedin" {...register("linkedin")} placeholder="https://..." className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="instagram" className="text-[10px]">Instagram</Label>
            <Input id="instagram" {...register("instagram")} placeholder="https://..." className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="website" className="text-[10px]">Website</Label>
            <Input id="website" {...register("website")} placeholder="https://..." className="h-8 text-xs" />
          </div>
        </div>

        <Button type="submit" className="w-full h-10 text-sm font-display tracking-widest mt-2" disabled={isSubmitting}>
          {isSubmitting ? "SAVING..." : "SUBMIT & JOIN"}
        </Button>
      </form>
    </main>
  );
};

export default JoinCommunity;
