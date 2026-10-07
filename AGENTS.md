# Architecture rules

- MedEd Workspace's route gate validates the password and signed, expiring access tokens in an edge function; never embed the password or trust a client-only unlock flag. This keeps access checks out of the public client bundle.
- This is a display gate for a client-rendered portfolio, not confidential document storage; truly sensitive content must be served by an authorized backend rather than bundled client code.
- Keep the supplied MedEd Workspace student prototype unchanged as a public standalone HTML document; mount its iframe only after a desktop visitor clicks to load it, avoiding an automatic large download.