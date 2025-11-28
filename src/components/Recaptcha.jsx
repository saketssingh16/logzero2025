import React, { useEffect, useRef } from 'react';

// Host-aware site key selection with env overrides
const DEFAULT_PROD_KEY = '6LdcgIcrAAAAAJV0b6w8_r1-5SivcsvljIvtlQr'; // real v2 checkbox key
const DEFAULT_LOCAL_TEST_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Google test key

function resolveSiteKey() {
  // Prefer env when available
  const envLocal = process.env.NEXT_PUBLIC_RECAPTCHA_LOCAL_SITE_KEY;
  const envProd = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (typeof window === 'undefined') {
    // SSR fallback — use prod env/default
    return envProd || DEFAULT_PROD_KEY;
  }
  const host = window.location?.hostname || '';
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  if (isLocal) return envLocal || DEFAULT_LOCAL_TEST_KEY;
  return envProd || DEFAULT_PROD_KEY;
}

const Recaptcha = ({ onVerify, theme = 'light' }) => {
  const recaptchaRef = useRef(null);
  const scriptLoaded = useRef(false);
  const widgetIdRef = useRef(null);

  // Load reCAPTCHA script once
  useEffect(() => {
    if (scriptLoaded.current || !recaptchaRef.current) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.onloadRecaptchaCallback = () => {
      if (recaptchaRef.current && window.grecaptcha) {
        try {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: resolveSiteKey(),
            theme: theme,
            callback: (token) => onVerify?.(token),
            'expired-callback': () => {
              // Clear token in parent and reset the widget to remove the error banner
              onVerify?.(null);
              try {
                if (widgetIdRef.current !== null) {
                  window.grecaptcha.reset(widgetIdRef.current);
                }
              } catch (e) {
                // noop: reset is best-effort
              }
            },
            'error-callback': () => {
              onVerify?.(null);
              try {
                if (widgetIdRef.current !== null) {
                  window.grecaptcha.reset(widgetIdRef.current);
                }
              } catch (e) {}
            },
          });
        } catch (e) {
          // Render could fail if script not fully ready yet
          console.error('Failed to render reCAPTCHA', e);
        }
      }
      scriptLoaded.current = true;
    };

    return () => {
      delete window.onloadRecaptchaCallback;
    };
  }, [onVerify, theme]);

  return <div ref={recaptchaRef} />;
};

export default Recaptcha;
