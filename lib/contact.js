export const WHATSAPP_DISPLAY = "+91 99761 46493";
export const WHATSAPP_NUMBER = "919976146493";
export const WHATSAPP_URL =
  "https://wa.me/919976146493?text=Hello%20Sri%20School%20of%20Art%2C%20I%27d%20like%20to%20know%20more%20about%20your%20classes.";

export function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
