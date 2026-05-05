import anthropic
import json
import re
import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

app = FastAPI(title="AI-Powered Email Validator")

# Initialize Anthropic client
api_key = os.environ.get("ANTHROPIC_API_KEY")
client = None
if api_key:
    client = anthropic.Anthropic(api_key=api_key)

class EmailRequest(BaseModel):
    email: str

class ValidationResult(BaseModel):
    valid: bool
    score: int
    issues: List[str]
    suggestion: Optional[str] = None
    summary: str

def get_mock_validation(email: str) -> dict:
    """Generate a mock validation result for testing without API key."""
    is_valid = "@" in email and "." in email.split("@")[-1]
    score = 95 if is_valid else 20
    issues = []
    if not is_valid:
        issues.append("Invalid email format")
    
    suggestion = None
    if "gmial.com" in email:
        suggestion = email.replace("gmial.com", "gmail.com")
        issues.append("Possible typo in domain (gmial instead of gmail)")
    
    return {
        "valid": is_valid,
        "score": score,
        "issues": issues,
        "suggestion": suggestion,
        "summary": "Mock validation performed (No API Key provided)."
    }

@app.post("/validate", response_model=ValidationResult)
async def validate_email_endpoint(request: EmailRequest):
    email = request.email.strip()
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    if not client:
        return get_mock_validation(email)

    try:
        prompt = f"""You are an email validation expert. Analyze this email address: "{email}"

Respond ONLY with a JSON object (no markdown, no backticks) with these fields:
{{
  "valid": true or false,
  "score": 0-100 (confidence it is a real deliverable address),
  "issues": ["list", "of", "issues"] or [],
  "suggestion": "corrected email if there is a likely typo, else null",
  "summary": "One sentence explanation of the result"
}}

Check for: proper syntax, valid TLD, common typos (gmial, yahooo, hotmial, etc.), 
consecutive dots, missing @, invalid characters, disposable email domains."""

        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        raw = message.content[0].text.strip()
        clean = re.sub(r"```json|```", "", raw).strip()
        result = json.loads(clean)
        return result
    except Exception as e:
        print(f"Error calling Anthropic API: {e}")
        return get_mock_validation(email)

# Serve static files from current directory
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    print("Starting AI Email Validator on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
