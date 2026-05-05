<img width="1155" height="897" alt="Screenshot 2026-05-06 025653" src="https://github.com/user-attachments/assets/2e7d2719-9136-4403-b717-83b7c2991c79" />

# AI-Powered Email Address Validator

A Python project that validates email addresses using Claude AI (Anthropic API). Instead of just checking syntax with regex, it uses AI to detect typos, bad domains, and give a confidence score.

## Features

- ✅ Syntax validation
- 🔍 Typo detection (e.g. `gmial.com` → suggests `gmail.com`)
- 📊 Confidence score (0–100)
- 💡 Smart correction suggestions
- 🗑️ Disposable email detection
- 💬 Interactive mode to test any email

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/ADARSH685-BOT/AI-powered-Email-Address-Validator.git
   cd AI-powered-Email-Address-Validator
   ```

2. **Install dependencies**
   ```bash
   pip install anthropic
   ```

3. **Set your API key**
   ```bash
   export ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run**
   ```bash
   python email_validator.py
   ```

## Example Output

```
Email: user@gmial.com
Status : ❌ INVALID
Score  : 15/100
Summary: Domain "gmial.com" appears to be a typo.
💡 Did you mean: user@gmail.com

Email: name+tag@company.io
Status : ✅ VALID
Score  : 92/100
Summary: Well-formed email with a valid domain.
```

## How It Works

Each email is sent to Claude AI with a structured prompt. Claude returns a JSON response with `valid`, `score`, `issues`, `suggestion`, and `summary` fields. The script parses and displays this in a readable format.

## Made By

**Adarsh** — [GitHub](https://github.com/ADARSH685-BOT)

---

⭐ Star the repo if you found it useful!




 
