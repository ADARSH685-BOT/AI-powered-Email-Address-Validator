document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('emailInput');
    const validateBtn = document.getElementById('validateBtn');
    const loader = document.getElementById('loader');
    const btnText = document.querySelector('.btn-text');
    const results = document.getElementById('results');
    const scorePath = document.getElementById('scorePath');
    const scoreText = document.getElementById('scoreText');
    const statusTitle = document.getElementById('statusTitle');
    const summaryText = document.getElementById('summaryText');
    const issuesList = document.getElementById('issuesList');
    const issuesSection = document.getElementById('issuesSection');
    const suggestionSection = document.getElementById('suggestionSection');
    const suggestionText = document.getElementById('suggestionText');

    const setStatus = (score) => {
        results.classList.remove('state-success', 'state-warning', 'state-error');
        if (score >= 80) {
            results.classList.add('state-success');
            return "Highly Reliable";
        } else if (score >= 40) {
            results.classList.add('state-warning');
            return "Needs Attention";
        } else {
            results.classList.add('state-error');
            return "Invalid / Risky";
        }
    };

    const validateEmail = async () => {
        const email = emailInput.value.trim();
        if (!email) return;

        // Reset UI
        results.classList.add('hidden');
        validateBtn.disabled = true;
        loader.style.display = 'block';
        btnText.style.display = 'none';

        try {
            const response = await fetch('/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error('Validation failed');

            const data = await response.json();

            // Update UI with results
            const statusLabel = setStatus(data.score);
            statusTitle.textContent = data.valid ? statusLabel : "Validation Failed";
            summaryText.textContent = data.summary;
            
            // Animate score ring
            const dashArray = `${data.score}, 100`;
            scorePath.setAttribute('stroke-dasharray', dashArray);
            scoreText.textContent = `${data.score}%`;

            // Issues
            issuesList.innerHTML = '';
            if (data.issues && data.issues.length > 0) {
                data.issues.forEach(issue => {
                    const li = document.createElement('li');
                    li.textContent = issue;
                    issuesList.appendChild(li);
                });
                issuesSection.classList.remove('hidden');
            } else {
                const li = document.createElement('li');
                li.textContent = "No technical issues detected.";
                issuesList.appendChild(li);
            }

            // Suggestion
            if (data.suggestion) {
                suggestionText.textContent = data.suggestion;
                suggestionSection.classList.remove('hidden');
            } else {
                suggestionSection.classList.add('hidden');
            }

            results.classList.remove('hidden');
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            validateBtn.disabled = false;
            loader.style.display = 'none';
            btnText.style.display = 'block';
        }
    };

    validateBtn.addEventListener('click', validateEmail);
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validateEmail();
    });
});
