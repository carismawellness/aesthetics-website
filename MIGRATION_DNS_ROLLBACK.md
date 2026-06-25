# DNS ROLLBACK — Carisma Aesthetics (carismaaesthetics.com)

> **PURPOSE: RESTORE THESE EXACT RECORDS TO ROLL BACK TO WIX.**
> If the Vercel cutover fails, recreate the records below verbatim in the Wix DNS
> zone to return the domain to the live Wix site.
>
> **Captured:** 2026-06-25 (live snapshot via `dig`, immediately before Wix→Vercel cutover)
> **Captured by:** Claude (GSC re-verify + sitemap task, Aesthetics cutover)

---

## Where DNS lives
DNS is hosted **AT WIX nameservers**. Registrar: Wix.com Ltd.

### Nameservers (NS) — RESTORE FIRST IF CHANGED
```
carismaaesthetics.com.   NS   ns12.wixdns.net.
carismaaesthetics.com.   NS   ns13.wixdns.net.
```

### SOA (reference — auto-managed by Wix)
```
carismaaesthetics.com. IN SOA ns12.wixdns.net. support.wix.com. 2023040608 10800 3600 1209600 3600
```

---

## EXACT RECORDS AS LIVE ON 2026-06-25 (pre-cutover)

### Apex A records (carismaaesthetics.com) — Wix hosting IPs
```
carismaaesthetics.com.   A   185.230.63.107
carismaaesthetics.com.   A   185.230.63.171
carismaaesthetics.com.   A   185.230.63.186
```

### www CNAME (www.carismaaesthetics.com) — Wix CDN  ← THE RECORD BEING CHANGED
```
www.carismaaesthetics.com.   CNAME   cdn1.wixdns.net.
```
(Resolution chain: `www → cdn1.wixdns.net → td-ccm-neg-87-45.wixdns.net → 34.149.87.45`)

**CUTOVER CHANGE:** `www` CNAME repointed to `cname.vercel-dns.com.` (Vercel).
**ROLLBACK:** set `www` CNAME back to `cdn1.wixdns.net.`

### MX records (Google Workspace email) — DO NOT TOUCH DURING CUTOVER
```
carismaaesthetics.com.   MX   10 aspmx.l.google.com.
carismaaesthetics.com.   MX   20 alt1.aspmx.l.google.com.
carismaaesthetics.com.   MX   30 alt2.aspmx.l.google.com.
carismaaesthetics.com.   MX   40 alt3.aspmx.l.google.com.
carismaaesthetics.com.   MX   50 alt4.aspmx.l.google.com.
```

### TXT records — preserve verbatim (SPF + verifications) — DO NOT TOUCH
```
carismaaesthetics.com. TXT "v=spf1 include:eu.zcsend.net include:eu-sender.zohosubscriptions.com ~all"
carismaaesthetics.com. TXT "google-site-verification=eawrb38y7eot_nihkfarnzgwa6c3vq_plf_sz8wvacq"
carismaaesthetics.com. TXT "google-site-verification=H9BagSDGriJx2Qg_Ca67oPFmTKp8PPoVEisTlri6pjE"
carismaaesthetics.com. TXT "google-site-verification=uA32h69hG30WFM5AVAcqgZT7AUeoohLU4jTI5WtFmmQ"
carismaaesthetics.com. TXT "klaviyo-site-verification=XvCJDh"
```
> The three `google-site-verification` TXT records keep the GSC domain property
> (`sc-domain:carismaaesthetics.com`) verified independent of host. Keep them.

### CAA records
```
(none present — dig CAA returned no records on 2026-06-25)
```

---

## ROLLBACK PROCEDURE
1. In the Wix DNS zone, set `www.carismaaesthetics.com` CNAME back to `cdn1.wixdns.net.`
2. Verify: `dig www.carismaaesthetics.com CNAME` returns `cdn1.wixdns.net.`
3. Verify live: `curl -sIL https://www.carismaaesthetics.com` serves `server: Pepyaka` (Wix), HTTP 200.
4. Verify email unaffected: `dig carismaaesthetics.com MX` returns the 5 Google MX.
