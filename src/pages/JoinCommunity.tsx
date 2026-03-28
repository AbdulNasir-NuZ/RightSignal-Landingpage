import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
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
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  website?: string;
  image?: FileList;
};

const JoinCommunity = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/auth", { replace: true, state: { redirectTo: "/join" } });
    });
  }, [navigate]);

  const onSubmit = async (values: FormValues) => {
    setError(null);
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth", { replace: true, state: { redirectTo: "/join" } });
      return;
    }

    let imageUrl: string | null = null;
    const file = values.image?.[0];
    if (file) {
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
    }

    const payload = {
      user_id: session.user.id,
      name: values.name,
      bio: values.bio,
      role: values.role,
      location: values.location,
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

    localStorage.setItem("community_profile", JSON.stringify(payload));
    reset();
    navigate("/#community");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-secondary/40 border border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-lg"
      >
        <div className="space-y-1">
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">RIGHT SIGNAL</p>
          <h1 className="font-display text-3xl md:text-4xl font-black">Community Join Form</h1>
          <p className="text-sm text-muted-foreground">Tell us about you to place you in the right circles.</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name", { required: true })} placeholder="Alex Carter" />
            {errors.name && <span className="text-xs text-destructive">Required</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" {...register("role", { required: true })} placeholder="Founder / Developer / Investor" />
            {errors.role && <span className="text-xs text-destructive">Required</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location", { required: true })} placeholder="City, Country" />
          {errors.location && <span className="text-xs text-destructive">Required</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio / Description</Label>
          <Textarea
            id="bio"
            rows={4}
            {...register("bio", { required: true, minLength: 10 })}
            placeholder="What are you building or looking for?"
          />
          {errors.bio && <span className="text-xs text-destructive">Please add at least 10 characters.</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image</Label>
          <Input id="image" type="file" accept="image/*" {...register("image")} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter / X</Label>
            <Input id="twitter" {...register("twitter")} placeholder="https://twitter.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" {...register("instagram")} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input id="website" {...register("website")} placeholder="https://yourdomain.com" />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit & Join"}
        </Button>
      </form>
    </main>
  );
};

export default JoinCommunity;
