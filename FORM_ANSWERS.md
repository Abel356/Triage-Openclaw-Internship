Hey — heads up, I'm doing a hard pivot. I went deep on the bug-bounty and governance ideas and honestly couldn't find an edge the incumbents can't just build (Immunefi already ships AI triage, governance sims are basically solved). So I moved to something with a real gap and a deadline pushing people toward it right now.

New idea: Triage — a crypto-tax reconciliation agent.

What it is: you hand it your wallets, exchange exports and 1099-DAs, and it rebuilds your cost basis across every chain — matching your own wallet-to-wallet transfers, tracing basis through bridges and LPs, and flagging what it genuinely can't recover. Out comes a clean, cited, Form 8949-ready workpaper for a CPA to sign.

Who pays: crypto CPA firms (they do this by hand today for $1.5–5k a client and can't scale it), and DeFi-heavy individuals with messy histories and real money. We sit under the accountant, not in place of them.

The problem: every crypto trade is taxable, and the IRS now forces wallet-by-wallet basis tracking. Tools like Koinly import the data but botch transfers and DeFi — same portfolio ran through two of them once came out $28k apart, both wrong. Fixing that is manual, slow, and expensive.

Why now: first 1099-DA filing season + the new wallet-by-wallet rule = a wave of people who legally have to reconcile and literally can't.

Where AI is the whole thing: the hard part isn't math, it's judgment on messy, incomplete data — figuring out which transfers are just you moving your own coins, tracing basis across chains, and being honest about what can't be reconstructed. Strip the AI out and you're back to either the broken tools or a human doing it by hand for days.

x402 + GOAT fit: reports are paid for over x402 in USDC/USDT, and it doubles as an agent-to-agent flow (a firm's tooling agent pays for a reconciliation and gets structured data back). Registered via ERC-8004, and every workpaper is hash-attested so no one can quietly alter it after the fact.

The safety angle that makes it real: it never files, never gives tax advice, never touches funds, only reads. If it can't prove a number it says so instead of guessing — because "defensible" is the entire product.

Demo I'm building: a deliberately messy wallet history where a consumer tool spits out phantom gains, and Triage produces the correct, fully-cited version with the one unrecoverable lot flagged honestly.

Would love your gut check on this one.
