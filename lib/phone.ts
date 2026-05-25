/**
 * Ecuadorian phone validation + normalisation.
 *
 * Accepts the three common ways an Ecuadorian writes their number and
 * normalises everything to a single canonical pair:
 *
 *   "0997506117"        → national "0997506117" + e164 "+593997506117"
 *   "+593 99 750 6117"  → same as above
 *   "593-997-506-117"   → same as above
 *
 * Country code: +593. National format: 10 digits, leading 0.
 * Mobile prefix: 09. Landlines: 02 / 03 / 04 / 05 / 06 / 07.
 */

export type EcuadorPhone = { national: string; e164: string; pretty: string };

/** Strip everything that isn't a digit, then evaluate against the
 *  three accepted shapes. Returns null when the number is not a valid
 *  Ecuadorian phone. */
export function parseEcuadorPhone(raw: string): EcuadorPhone | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw.replace(/[^\d]/g, "");

  let nationalDigits: string | null = null;

  if (/^0\d{9}$/.test(cleaned)) {
    // National format: 0XXXXXXXXX
    nationalDigits = cleaned;
  } else if (/^593\d{9}$/.test(cleaned)) {
    // International without leading 0: 593XXXXXXXXX
    nationalDigits = "0" + cleaned.slice(3);
  }

  if (!nationalDigits) return null;

  // Validate the area / mobile prefix is a real Ecuadorian one.
  const prefix = nationalDigits.slice(0, 2);
  if (!/^0[2-79]$/.test(prefix)) return null;

  const e164 = "+593" + nationalDigits.slice(1);
  // Pretty: "+593 99 750 6117" (mobile) or "+593 2 234 5678" (landline)
  const subscriber = nationalDigits.slice(2);
  const pretty =
    prefix === "09"
      ? `+593 ${subscriber.slice(0, 2)} ${subscriber.slice(2, 5)} ${subscriber.slice(5)}`
      : `+593 ${prefix.slice(1)} ${subscriber.slice(0, 3)} ${subscriber.slice(3)}`;

  return { national: nationalDigits, e164, pretty };
}

export function isValidEcuadorPhone(raw: string): boolean {
  return parseEcuadorPhone(raw) !== null;
}
