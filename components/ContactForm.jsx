const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdplyiycVzvKNsoa24rAN3w3vqr_RQl5srWJSif3hY0qvnGZg/viewform";

export default function ContactForm() {
  return (
    <div className="google-form-shell">
      <iframe
        className="google-form-embed"
        src={`${GOOGLE_FORM_URL}?embedded=true`}
        title="Sri School of Art enquiry form"
        width="640"
        height="1160"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        loading="lazy"
      >
        Loading…
      </iframe>
      <p className="google-form-fallback">
        Having trouble viewing the form?{" "}
        <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
