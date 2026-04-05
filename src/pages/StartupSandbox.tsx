import { useEffect, useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { buildPathFromLocation, rememberIntendedPath } from "@/lib/redirect";
import { X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

type DocumentMeta = { name: string; url: string };
type SubmissionPayload = {
  user_id: string;
  founder_name: string;
  founder_email: string;
  startup_name: string;
  startup_details: string | null;
  startup_summary: string;
  team_details: string | null;
  founder_image_url: string | null;
  startup_images: string[];
  pitch_deck_url: string | null;
  documents: DocumentMeta[];
};

const StartupSandbox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const intendedPath = useMemo(() => buildPathFromLocation(location), [location]);

  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [startupDetails, setStartupDetails] = useState("");
  const [startupSummary, setStartupSummary] = useState("");
  const [teamDetails, setTeamDetails] = useState("");

  const [founderImage, setFounderImage] = useState<File | null>(null);
  const [startupImages, setStartupImages] = useState<File[]>([]);
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);

  useEffect(() => {
    if (!supabase) {
      rememberIntendedPath(intendedPath);
      navigate("/auth", { replace: true, state: { redirectTo: intendedPath } });
      return;
    }
    const enforceAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        rememberIntendedPath(intendedPath);
        navigate("/auth", { replace: true, state: { redirectTo: intendedPath } });
        return;
      }
      setSession(session);
      setFounderEmail(session.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_first_time")
        .eq("user_id", session.user.id)
        .maybeSingle();
      const isFirstTime = profile?.is_first_time ?? session.user.user_metadata?.first_time_user ?? false;
      if (isFirstTime) {
        rememberIntendedPath(intendedPath);
        navigate("/join", { replace: true, state: { redirectTo: intendedPath, firstTime: true } });
        return;
      }
    };
    enforceAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!nextSession) {
        rememberIntendedPath(intendedPath);
        navigate("/auth", { replace: true, state: { redirectTo: intendedPath } });
        return;
      }
      setSession(nextSession);
      setFounderEmail(nextSession.user.email ?? "");
    });
    return () => subscription.unsubscribe();
  }, [intendedPath, navigate]);

  const canSubmit = useMemo(
    () =>
      Boolean(
        founderName &&
        founderEmail &&
        startupName &&
        startupSummary &&
        supabase &&
        session,
      ),
    [founderName, founderEmail, startupName, startupSummary, session],
  );

  const uploadFile = async (file: File, folder: string) => {
    if (!supabase || !session) throw new Error("Not authenticated.");
    const ext = file.name.split(".").pop();
    const key = `${folder}/${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from("startup-files").upload(key, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data: publicUrl } = supabase.storage.from("startup-files").getPublicUrl(data.path);
    return publicUrl.publicUrl;
  };

  const saveSubmission = async (payload: SubmissionPayload) => {
    const primary = await supabase!.from("sandbox_submissions").insert(payload);
    if (primary.error) {
      // Fallback for legacy table name
      const legacyPayload = {
        ...payload,
        asset_urls: [
          payload.founder_image_url,
          ...(payload.startup_images || []),
          payload.pitch_deck_url,
          ...(payload.documents || []).map((doc: DocumentMeta) => doc.url),
        ].filter(Boolean),
      };
      const legacy = await supabase!.from("startup_submissions").insert(legacyPayload);
      if (legacy.error) throw legacy.error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !session) {
      setStatus({ type: "error", message: "You need to sign in before submitting." });
      return;
    }
    setStatus({ type: "loading", message: "Uploading assets..." });

    try {
      let founderImageUrl: string | null = null;
      let pitchDeckUrl: string | null = null;
      const startupImageUrls: string[] = [];
      const documentUrls: DocumentMeta[] = [];

      if (founderImage) {
        setStatus({ type: "loading", message: "Uploading founder image..." });
        founderImageUrl = await uploadFile(founderImage, "founders");
      }

      if (startupImages.length) {
        for (const [index, file] of startupImages.entries()) {
          setStatus({ type: "loading", message: `Uploading startup images ${index + 1}/${startupImages.length}...` });
          startupImageUrls.push(await uploadFile(file, "startups"));
        }
      }

      if (pitchDeck) {
        setStatus({ type: "loading", message: "Uploading pitch deck..." });
        pitchDeckUrl = await uploadFile(pitchDeck, "pitch-decks");
      }

      if (documents.length) {
        for (const [index, file] of documents.entries()) {
          setStatus({ type: "loading", message: `Uploading documents ${index + 1}/${documents.length}...` });
          const url = await uploadFile(file, "documents");
          documentUrls.push({ name: file.name, url });
        }
      }

      setStatus({ type: "loading", message: "Saving submission..." });
      const payload = {
        user_id: session.user.id,
        founder_name: founderName,
        founder_email: founderEmail || session.user.email,
        startup_name: startupName,
        startup_details: startupDetails || null,
        startup_summary: startupSummary,
        team_details: teamDetails || null,
        founder_image_url: founderImageUrl,
        startup_images: startupImageUrls,
        pitch_deck_url: pitchDeckUrl,
        documents: documentUrls,
      };

      await saveSubmission(payload);

      setStatus({ type: "success", message: "Your submission has been received. Submissions are reviewed weekly." });
      setFounderName("");
      setStartupName("");
      setStartupDetails("");
      setStartupSummary("");
      setTeamDetails("");
      setFounderImage(null);
      setStartupImages([]);
      setPitchDeck(null);
      setDocuments([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setStatus({ type: "error", message });
    }
  };

  const FileBadge = ({ name, onRemove }: { name: string; onRemove: () => void }) => (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs">
      <span className="truncate">{name}</span>
      <button type="button" className="ml-2 text-muted-foreground hover:text-foreground" onClick={onRemove} aria-label="Remove file">
        <X className="w-3 h-3" />
      </button>
    </div>
  );

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
                    readOnly
                    className="w-full mt-1 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
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
                <label className="text-xs font-display tracking-widest text-muted-foreground">STARTUP DETAILS</label>
                <textarea
                  value={startupDetails}
                  onChange={(e) => setStartupDetails(e.target.value)}
                  rows={2}
                  placeholder="What you are building, who it is for, current traction"
                  className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
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

              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-display tracking-widest text-muted-foreground">FOUNDER IMAGE</label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => setFounderImage(e.target.files?.[0] ?? null)}
                      className="block w-full text-xs text-muted-foreground mt-1"
                    />
                    {founderImage ? (
                      <div className="mt-2">
                        <FileBadge name={founderImage.name} onRemove={() => setFounderImage(null)} />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-xs font-display tracking-widest text-muted-foreground">STARTUP IMAGES</label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => setStartupImages(e.target.files ? Array.from(e.target.files) : [])}
                      className="block w-full text-xs text-muted-foreground mt-1"
                    />
                    {startupImages.length ? (
                      <div className="mt-2 grid gap-2">
                        {startupImages.map((file, idx) => (
                          <FileBadge
                            key={`${file.name}-${idx}`}
                            name={file.name}
                            onRemove={() =>
                              setStartupImages((prev) => prev.filter((_, i) => i !== idx))
                            }
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-display tracking-widest text-muted-foreground">PITCH DECK</label>
                    <input
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={(e) => setPitchDeck(e.target.files?.[0] ?? null)}
                      className="block w-full text-xs text-muted-foreground mt-1"
                    />
                    {pitchDeck ? (
                      <div className="mt-2">
                        <FileBadge name={pitchDeck.name} onRemove={() => setPitchDeck(null)} />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-xs font-display tracking-widest text-muted-foreground">ADDITIONAL DOCUMENTS</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      multiple
                      onChange={(e) => setDocuments(e.target.files ? Array.from(e.target.files) : [])}
                      className="block w-full text-xs text-muted-foreground mt-1"
                    />
                    {documents.length ? (
                      <div className="mt-2 grid gap-2">
                        {documents.map((file, idx) => (
                          <FileBadge
                            key={`${file.name}-${idx}`}
                            name={file.name}
                            onRemove={() =>
                              setDocuments((prev) => prev.filter((_, i) => i !== idx))
                            }
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
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
