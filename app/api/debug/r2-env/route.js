import { NextResponse } from "next/server";

export async function GET() {
  const values = {
    R2_ENDPOINT: process.env.R2_ENDPOINT || null,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || null,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ? "set" : null,
    R2_BUCKET: process.env.R2_BUCKET || null,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL || null,
    CLOUDFLARE_R2_ENDPOINT: process.env.CLOUDFLARE_R2_ENDPOINT || null,
    CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || null,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ? "set" : null,
    CLOUDFLARE_R2_BUCKET: process.env.CLOUDFLARE_R2_BUCKET || null,
    CLOUDFLARE_R2_PUBLIC_URL: process.env.CLOUDFLARE_R2_PUBLIC_URL || null,
    VERCEL: process.env.VERCEL || null,
  };

  return NextResponse.json({
    ok: true,
    values,
    note: "This route is for debugging only. It does not expose secret values.",
  });
}
