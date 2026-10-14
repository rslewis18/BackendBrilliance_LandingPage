// Same-origin proxy for the live demo pipeline board (/demo-pipeline).
// The board runs on phones and networks that sometimes can't reach api.vapi.ai
// directly, so the browser sends Ryan's own Vapi key (kept in his browser's
// localStorage, never in the repo or bundle) to this endpoint, and the
// function forwards the call-list request to Vapi from the edge.
// No key is ever stored here — without a caller-supplied key this 401s.

const ASSISTANT_ID = "b02dc46f-e6d9-4a2f-ba64-ef3d9887897b";
const PAGE_SIZE = 12;

type PagesContext = {
  request: Request;
};

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });

export const onRequestGet = async ({ request }: PagesContext) => {
  const key = request.headers.get("x-vapi-key")?.trim();
  if (!key) {
    return json({ error: "Missing Vapi key." }, { status: 401 });
  }

  let vapiRes: Response;
  try {
    vapiRes = await fetch(
      `https://api.vapi.ai/call?assistantId=${ASSISTANT_ID}&limit=${PAGE_SIZE}`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
  } catch {
    return json(
      { error: "Could not reach Vapi from the server. Trying again…" },
      { status: 502 }
    );
  }

  const body = await vapiRes.text();
  if (vapiRes.status === 401 || vapiRes.status === 403) {
    return json(
      { error: "That key was rejected by Vapi. Double-check it and try again." },
      { status: 401 }
    );
  }
  return new Response(body, {
    status: vapiRes.status,
    headers: { "Content-Type": "application/json" },
  });
};
