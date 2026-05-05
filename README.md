<div align="center">

<img width="1155" height="897" alt="Screenshot 2026-05-06 025653" src="https://github.com/user-attachments/assets/5a480a7a-7f15-430f-a092-719163e9247f" />

███████╗███╗   ███╗ █████╗ ██╗██╗      ██╗   ██╗ █████╗ ██╗     ██╗██████╗  █████╗ ████████╗ ██████╗ ██████╗ 
██╔════╝████╗ ████║██╔══██╗██║██║      ██║   ██║██╔══██╗██║     ██║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
█████╗  ██╔████╔██║███████║██║██║      ██║   ██║███████║██║     ██║██║  ██║███████║   ██║   ██║   ██║██████╔╝
██╔══╝  ██║╚██╔╝██║██╔══██║██║██║      ╚██╗ ██╔╝██╔══██║██║     ██║██║  ██║██╔══██║   ██║   ██║   ██║██╔══██╗
███████╗██║ ╚═╝ ██║██║  ██║██║███████╗  ╚████╔╝ ██║  ██║███████╗██║██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║
╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
```

# 🤖 AI-Powered Email Address Validator

### *Validate emails with the intelligence of Claude AI — not just regex.*

<br/>

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Anthropic](https://img.shields.io/badge/Powered%20by-Claude%20AI-D97706?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-22C55E?style=for-the-badge)]()

<br/>

> **"Claude inside Claude"** — uses the Anthropic API to intelligently validate emails beyond simple pattern matching.  
> Detects typos, bad domains, suspicious patterns, and gives a confidence score.

<br/>

---

</div>

## ✨ What Makes This Different?

Most email validators just run a regex. This one **thinks**.

| Feature | Regex Validator | 🤖 This Project |
|---|---|---|
| Syntax check | ✅ | ✅ |
| Typo detection (`gmial.com`) | ❌ | ✅ |
| Smart suggestions | ❌ | ✅ |
| Confidence scoring | ❌ | ✅ |
| Disposable email detection | ❌ | ✅ |
| Human-readable explanation | ❌ | ✅ |

---

## 🖥️ Demo

```
🔍 AI-Powered Email Validator
Using Claude via Anthropic API

==================================================
Email: user@gmial.com
==================================================
Status : ❌ INVALID
Score  : 15/100
Summary: This email contains a common typo in the domain name.

Issues found:
  • Domain "gmial.com" appears to be a typo
  • Low deliverability confidence

💡 Did you mean: user@gmail.com

==================================================
Email: name+tag@company.io
==================================================
Status : ✅ VALID
Score  : 92/100
Summary: Well-formed email with a valid domain and proper use of plus-addressing.
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/ADARSH685-BOT/AI-powered-Email-Address-Validator.git
cd AI-powered-Email-Address-Validator
```

### 2. Install dependencies

```bash
pip install anthropic
```

### 3. Set your API key

```bash
# Linux / macOS
export ANTHROPIC_API_KEY=your_api_key_here

# Windows (Command Prompt)
set ANTHROPIC_API_KEY=your_api_key_here

# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="your_api_key_here"
```

> 🔑 Get your free API key at [console.anthropic.com](https://console.anthropic.com)

### 4. Run it

```bash
python email_validator.py
```

---

## 📁 Project Structure

```
AI-powered-Email-Address-Validator/
│
├── email_validator.py      # Main validator script
├── README.md               # You are here
└── requirements.txt        # Dependencies
```

---

## 🧠 How It Works

The magic is in the **prompt engineering**. Each email is sent to Claude with a carefully crafted instruction:

```python
prompt = f"""You are an email validation expert. Analyze: "{email}"

Return ONLY a JSON object:
{{
  "valid": true/false,
  "score": 0-100,
  "issues": ["list of problems"],
  "suggestion": "corrected email or null",
  "summary": "one sentence explanation"
}}
"""
```

Claude then checks for:

- 📌 **Syntax errors** — missing `@`, invalid characters, double dots
- 🌐 **Domain validity** — bad or non-existent TLDs
- ✍️ **Typo detection** — `gmial`, `yahooo`, `hotmial`, etc.
- 🗑️ **Disposable domains** — throwaway email services
- 💡 **Smart suggestions** — corrected email when a typo is found

---

## 🔧 Code Overview

```python
import anthropic
import json

client = anthropic.Anthropic()

def validate_email(email: str) -> dict:
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return json.loads(message.content[0].text)
```

The response is parsed into a clean Python dict and displayed with color-coded status:

| Score | Status |
|---|---|
| ≥ 70 & valid | ✅ VALID |
| 40–69 & valid | ⚠️ POSSIBLY VALID |
| < 40 or invalid | ❌ INVALID |

---

## 🧪 Test Emails Included

The script ships with 7 built-in test cases:

```python
test_emails = [
    "user@gmail.com",        # ✅ Clean valid email
    "invalid-email",         # ❌ Missing @ and domain
    "user@gmial.com",        # ❌ Typo → suggests gmail.com
    "test..user@domain.co",  # ❌ Consecutive dots
    "name+tag@company.io",   # ✅ Valid plus-addressing
    "missing@tld",           # ❌ No top-level domain
    "user@@double.com",      # ❌ Double @ symbol
]
```

---

## 💬 Interactive Mode

After the test cases, the script enters an **interactive loop**:

```
--- Interactive Mode ---
Enter an email to validate (or 'quit' to exit):

Email: hello@world.xyz
```

---

## 🌐 Web Version

Want a browser-based UI? Check the **HTML artifact version** — same Claude-powered validation, rendered as an interactive web app with live badges, example buttons, and "Did you mean?" suggestions.

---

## 📦 Requirements

```
anthropic>=0.20.0
```

Python 3.8 or higher required.

---

## 🤝 Contributing

Pull requests are welcome! Ideas for improvement:

- [ ] Batch validation from CSV file
- [ ] REST API wrapper with Flask/FastAPI
- [ ] DNS MX record verification
- [ ] Export results to JSON/CSV
- [ ] Rate limiting and caching

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

*

*If this helped you, please ⭐ star the repo!*

</div>
- **Icons**: Lucide Icons


## 📄 License
MIT License - Created with ❤️ by ADARSH
