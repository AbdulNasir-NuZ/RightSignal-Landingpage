import { useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

const StartupSandbox = () => {
  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [startupSummary, setStartupSummary] = useState("");
  const [teamDetails, setTeamDetails] = useState("");
  const [founderImage, setFounderImage] = useState<File | null>(null);
  const [startupImages, setStartupImages] = useState<FileList | null>(null);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const canSubmit = useMemo(
    () => founderName && founderEmail && startupName && startupSummary && supabase,
    [founderName, founderEmail, startupName, startupSummary],
  );

  const uploadFile = async (file: File, prefix: string) => {
    const filePath = `${prefix}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase!.storage.from("startup-files").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data: publicUrl } = supabase!.storage.from("startup-files").getPublicUrl(data.path);
    return publicUrl.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setStatus({ type: "error", message: "Supabase is not configured." });
      return;
    }
    setStatus({ type: "loading", message: "Uploading assets..." });
    try {
      const uploads: string[] = [];
      if (founderImage) {
        uploads.push(await uploadFile(founderImage, "founders"));
      }
      if (startupImages && startupImages.length) {
        for (const file of Array.from(startupImages)) {
          uploads.push(await uploadFile(file, "startups"));
        }
      }

      setStatus({ type: "loading", message: "Saving submission..." });
      const { error } = await supabase
        .from("startup_submissions")
        .insert({
          founder_name: founderName,
          founder_email: founderEmail,
          startup_name: startupName,
          startup_summary: startupSummary,
          team_details: teamDetails,
          asset_urls: uploads,
        });
      if (error) throw error;
      setStatus({ type: "success", message: "Submitted. We’ll review and get back soon!" });
      setFounderName("");
      setFounderEmail("");
      setStartupName("");
      setStartupSummary("");
      setTeamDetails("");
      setFounderImage(null);
      setStartupImages(null);
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Something went wrong." });
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Startup Sandbox · Submit</title>
        <meta
          name="description"
          content="Submit your startup to the Right Signal Sandbox with founder, team, and product assets."
        />
      </Helmet>
      <main className="min-h-screen bg-background text-foreground px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-muted/40 p-8 flex flex-col gap-4">
              <p className="font-display text-xs tracking-widest text-muted-foreground">STARTUP SANDBOX</p>
              <h1 className="font-display text-3xl md:text-4xl font-black leading-tight">Submit Your Build</h1>
              <p className="text-sm text-muted-foreground font-body">
                Give us the essentials: founder profile, product shots, and team snapshot. We use this to route you
                to mentors faster.
              </p>
              <ul className="text-xs text-muted-foreground space-y-2 font-body">
                <li>• Upload founder headshot + product visuals (jpg/png).</li>
                <li>• Keep summary concise (what, for whom, traction).</li>
                <li>• Submissions are reviewed weekly.</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="md:col-span-3 p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-display tracking-widest text-muted-foreground">FOUNDER NAME</label>
                  <input
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-display tracking-widest text-muted-foreground">FOUNDER EMAIL</label>
                  <input
                    type="email"
                    value={founderEmail}
                    onChange={(e) => setFounderEmail(e.target.value)}
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-display tracking-widest text-muted-foreground">STARTUP NAME</label>
                <input
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-display tracking-widest text-muted-foreground">
                  SUMMARY (PROBLEM, SOLUTION, TRACTION)
                </label>
                <textarea
                  value={startupSummary}
                  onChange={(e) => setStartupSummary(e.target.value)}
                  rows={4}
                  className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-display tracking-widest text-muted-foreground">TEAM DETAILS</label>
                <textarea
                  value={teamDetails}
                  onChange={(e) => setTeamDetails(e.target.value)}
                  rows={3}
                  placeholder="Roles, timezones, hiring needs"
                  className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-display tracking-widest text-muted-foreground">FOUNDER IMAGE</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFounderImage(e.target.files?.[0] ?? null)}
                    className="block w-full text-xs text-muted-foreground mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-display tracking-widest text-muted-foreground">STARTUP IMAGES</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setStartupImages(e.target.files)}
                    className="block w-full text-xs text-muted-foreground mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit || status.type === "loading"}
                className="w-full bg-foreground text-background font-display text-xs tracking-widest py-3 rounded-lg hover:bg-foreground/90 transition disabled:opacity-60"
              >
                {status.type === "loading" ? status.message || "Submitting..." : "SUBMIT TO SANDBOX"}
              </button>

              {status.type === "error" && (
                <p className="text-sm text-destructive mt-2 font-body">{status.message}</p>
              )}
              {status.type === "success" && (
                <p className="text-sm text-emerald-500 mt-2 font-body">{status.message}</p>
              )}
            </form>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
};

export default StartupSandbox;
