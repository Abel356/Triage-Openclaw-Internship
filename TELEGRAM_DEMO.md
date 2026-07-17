# Live Telegram Demo

## Bot

- Name: TriageBot
- Username: `@jeenahoyaabot`
- URL: [https://t.me/jeenahoyaabot](https://t.me/jeenahoyaabot)

## Getting Started

1. Open the Telegram bot.
2. Tap **Start** or send `/start`.
3. Paste the complete demo prompt below into the chat.
4. Allow the agent a few moments to retrieve and analyze public blockchain activity.

## Demonstration Wallet

`0x7679E1f285335addBADE42fd44559F51c4B42123`

Network: GOAT Network mainnet

Chain ID: `2345`

## Complete Demo Prompt

```text
Perform a READ-ONLY crypto forensic analysis of this publicly documented demo wallet:

Wallet: 0x7679E1f285335addBADE42fd44559F51c4B42123
Network: GOAT Network mainnet
Chain ID: 2345

Do not sign transactions, transfer funds, approve spending, expose secrets, or perform any on-chain write.

Retrieve and analyze all available wallet activity. Identify:

1. Native-token and ERC-20 balances.
2. Incoming and outgoing transfers.
3. USDC or USDC.e payments.
4. Contract interactions.
5. ERC-8004 registration activity.
6. x402 payments.
7. AgentKit or gift-card-related activity, if available.

For every finding, include available transaction hashes or explorer evidence. Clearly distinguish verified findings, assumptions, and unavailable information.

End with a short explanation of what the wallet appears to have been used for.
```

## Supported Capabilities

- Inspect public wallet balances and activity.
- Identify incoming and outgoing transfers.
- Identify payments and contract interactions.
- Detect potential ERC-8004, x402, and AgentKit-related activity.
- Cite available transaction hashes or explorer evidence.
- Label verified findings, assumptions, and unavailable information.

## Safety Boundaries

- Submit public wallet addresses only.
- Never submit private keys, seed phrases, passwords, API keys, exchange credentials, or payment credentials.
- The demo does not sign transactions, move funds, approve spending, perform on-chain writes, file tax returns, or provide tax advice.
- A qualified human professional remains responsible for tax conclusions and filing.

## Known Limitations

This is a public wallet-triage demonstration. Full multi-wallet cost-basis reconciliation may require wallet ownership information, exchange CSV files, historical pricing data, complete RPC or explorer coverage, and human CPA review.

## Troubleshooting

### What should I do if the bot does not respond?

Confirm that you opened `@jeenahoyaabot` and sent `/start`. Allow the agent a few moments to retrieve blockchain activity. Do not repeatedly submit the same request while an analysis is running.

### Can I test my own wallet?

Yes. Replace the demonstration address with a public wallet address you control or have permission to analyze. Never provide a private key or seed phrase.

### Does Triage file my taxes?

No. Triage reconstructs and documents wallet activity for review. A qualified human professional remains responsible for tax conclusions and filing.
