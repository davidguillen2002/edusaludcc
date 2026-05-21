/**
 * Inline shimmer placeholder for next/image.
 *
 * Pre-rendered SVG → base64 → data URL. Cheaper than a real
 * blurDataURL because it's the same for every image and Tailwind
 * already painted the brand mesh underneath, so the user never sees
 * a blank box during paint.
 */

function shimmerSvg(w: number, h: number) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    w +
    " " +
    h +
    '"><defs><linearGradient id="g"><stop offset="0%" stop-color="#e2e8f0"/><stop offset="50%" stop-color="#f1f5f9"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient></defs><rect width="' +
    w +
    '" height="' +
    h +
    '" fill="#e2e8f0"/><rect width="' +
    w +
    '" height="' +
    h +
    '" fill="url(#g)" opacity="0.6"/></svg>'
  );
}

function toBase64(str: string) {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

export function shimmer(width = 16, height = 10) {
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg(width, height))}`;
}
