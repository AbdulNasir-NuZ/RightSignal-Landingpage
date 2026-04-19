import { createClient } from "@supabase/supabase-js";

const adminRoles = new Set(["core", "admin", "director"]);
const usedCodes = new Set();
const defaultTestCodes = new Map([
  [
    "RS-ADMIN-CORE-2026",
    {
      code: "RS-ADMIN-CORE-2026",
      role: "admin",
      assigned_by: "core_team",
      expires_at: "2027-12-31T23:59:59.000Z",
      is_used: false,
      nda_context: "Right Signal Admin NDA Test",
    },
  ],
  [
    "RS-DIRECTOR-ACCESS-2026",
    {
      code: "RS-DIRECTOR-ACCESS-2026",
      role: "director",
      assigned_by: "director_office",
      expires_at: "2027-12-31T23:59:59.000Z",
      is_used: false,
      nda_context: "Right Signal Director NDA Test",
    },
  ],
  [
    "RS-MEMBER-SIGN-2026",
    {
      code: "RS-MEMBER-SIGN-2026",
      role: "member",
      assigned_by: "community_admin",
      expires_at: "2027-12-31T23:59:59.000Z",
      is_used: false,
      nda_context: "Right Signal Contributor Onboarding",
      party_b_name: "Voluntary Contributor",
      party_b_role: "Community Contributor",
    },
  ],
  [
    "RS-ADMIN-TEST-ALPHA",
    {
      code: "RS-ADMIN-TEST-ALPHA",
      role: "admin",
      assigned_by: "core_team",
      expires_at: "2027-12-31T23:59:59.000Z",
      is_used: false,
      nda_context: "Right Signal Admin QA Flow",
    },
  ],
  [
    "ADMINRS26",
    {
      code: "ADMINRS26",
      role: "core",
      assigned_by: "core_team",
      expires_at: "2027-12-31T23:59:59.000Z",
      is_used: false,
      nda_context: "Right Signal Core Team Secure Access",
    },
  ],
  [
    "RS-MEMBER-TEST-BETA",
    {
      code: "RS-MEMBER-TEST-BETA",
      role: "member",
      assigned_by: "community_admin",
      expires_at: "2027-12-31T23:59:59.000Z",
      is_used: false,
      nda_context: "Right Signal Contributor NDA Test",
      party_b_name: "Contributor Beta",
      party_b_role: "Voluntary Contributor",
    },
  ],
]);

const oneTimeCodesEnabled = String(process.env.NDA_ONE_TIME_CODES || "false").toLowerCase() === "true";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function parseFallbackCodes() {
  const raw = process.env.NDA_ACCESS_CODES;
  if (!raw) return new Map();

  // Format: CODE:role:assigned_by:expires_at
  const codes = new Map();
  raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry) => {
      const [code, role = "member", assigned_by = "system", expires_at = ""] = entry.split(":");
      if (!code) return;
      codes.set(code.toUpperCase(), {
        code: code.toUpperCase(),
        role: role.toLowerCase(),
        assigned_by,
        expires_at,
        is_used: false,
      });
    });

  return codes;
}

const fallbackCodes = parseFallbackCodes();

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

function isExpired(value) {
  if (!value) return false;
  const ts = new Date(value).getTime();
  if (Number.isNaN(ts)) return false;
  return ts <= Date.now();
}

function toResponse(row) {
  const role = String(row.role || "member").toLowerCase();
  const restricted = !adminRoles.has(role);

  const partyB = {
    name: row.party_b_name || row.party_b?.name || "",
    role: row.party_b_role || row.party_b?.role || "",
    email: row.party_b_email || row.party_b?.email || "",
    org: row.party_b_org || row.party_b?.org || "",
  };

  return {
    valid: true,
    code: row.code,
    role,
    restricted,
    assignedBy: row.assigned_by || "",
    partyB,
    context: row.nda_context || "Right Signal Community Onboarding",
  };
}

function getLocalCodeRow(code) {
  return fallbackCodes.get(code) || defaultTestCodes.get(code) || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method not allowed" });
  }

  const body = readBody(req);
  const code = String(body.code || "").trim().toUpperCase();
  if (!code) {
    return res.status(400).json({ valid: false, error: "Code is required" });
  }

  try {
    const supabase = getSupabaseClient();

    if (supabase) {
      const { data, error } = await supabase
        .from("access_codes")
        .select("*")
        .eq("code", code)
        .maybeSingle();

      if (error) {
        return res.status(500).json({ valid: false, error: "Failed to validate code" });
      }
      if (data && !data.is_used && !isExpired(data.expires_at)) {
        if (oneTimeCodesEnabled) {
          await supabase.from("access_codes").update({ is_used: true }).eq("code", code);
        }
        return res.status(200).json(toResponse(data));
      }
      // If not found/invalid in DB, still allow local test/fallback codes.
    }

    const row = getLocalCodeRow(code);
    if (!row || usedCodes.has(code) || row.is_used || isExpired(row.expires_at)) {
      return res.status(401).json({ valid: false, error: "Invalid or expired code" });
    }

    if (oneTimeCodesEnabled) {
      usedCodes.add(code);
    }
    return res.status(200).json(toResponse(row));
  } catch {
    return res.status(500).json({ valid: false, error: "Unexpected validation error" });
  }
}
