// Load profile data from JSON
let profileData = null;

// Initialize by loading the JSON data
async function loadProfileData() {
    try {
        const response = await fetch('profileData.json');
        profileData = await response.json();
    } catch (error) {
        console.error('Failed to load profile data:', error);
    }
}

// Load data when script runs
loadProfileData();

// Helper function to capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to format virtue list
function formatVirtueList(virtues) {
    if (virtues.length === 1) return capitalize(virtues[0]);
    if (virtues.length === 2) return `${capitalize(virtues[0])} and ${capitalize(virtues[1])}`;
    
    const capitalized = virtues.map(v => capitalize(v));
    return capitalized.slice(0, -1).join(', ') + ', and ' + capitalized[capitalized.length - 1];
}

// Profile type detection
function getProfileType(scores) {
    const scoreValues = Object.values(scores).sort((a, b) => b - a);
    const scoreString = scoreValues.join('');
    
    if (scoreString === '332100') return 'dual';
    if (scoreString === '331110') return 'dual';
    if (scoreString === '322200') return 'single-fave';
    if (scoreString === '322110') return 'single-fave';
    if (scoreString === '321111') return 'single-fave';
    if (scoreString === '222210') return 'balanced-majority';
    if (scoreString === '222111') return 'even-spread';
    
    return 'even-spread';
}

function getProfileData(scores) {
    const sortedVirtues = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const profileType = getProfileType(scores);
    
    const threes = sortedVirtues.filter(([,score]) => score === 3).map(([v]) => v);
    const twos = sortedVirtues.filter(([,score]) => score === 2).map(([v]) => v);
    const ones = sortedVirtues.filter(([,score]) => score === 1).map(([v]) => v);
    const zeros = sortedVirtues.filter(([,score]) => score === 0).map(([v]) => v);
    
    return {
        type: profileType,
        virtues3: threes,
        virtues2: twos,
        virtues1: ones,
        virtues0: zeros,
        sortedVirtues: sortedVirtues
    };
}

function getProfile(data) {
    const { type, virtues3, virtues2, virtues1, virtues0 } = data;
    
    // Dual profile (two virtues at 3)
    if (type === 'dual' && virtues3.length === 2) {
        const key = virtues3.sort().join('-');
        const profile = profileData.dualProfiles[key];
        return {
            name: profile.name,
            description: profile.description,
            strengths: profile.strengths,
            growth: ''
        };
    }
    
    // Single-fave profile (one virtue at 3)
    if (type === 'single-fave' && virtues3.length === 1) {
        const profile = profileData.singleFaveProfiles[virtues3[0]];
        return {
            name: profile.name,
            description: profile.description,
            strengths: profile.strengths,
            growth: ''
        };
    }
    
    // Balanced-majority profile (one virtue at 0)
    if (type === 'balanced-majority' && virtues0.length === 1) {
        const profile = profileData.balancedMajorityProfiles[virtues0[0]];
        return {
            name: profile.name,
            description: profile.description,
            strengths: '',
            growth: profile.growth
        };
    }
    
    // Even-spread 222111 pattern
    if (type === 'even-spread' && virtues2.length === 3) {
        const key = virtues2.sort().join('-');
        const name = profileData.evenSpreadNames[key] || profileData.evenSpreadProfile.name;
        
        // Build dynamic description
        const base = profileData.evenSpreadProfile;
        const focusText = base.focusTemplate.replace('{virtues}', formatVirtueList(virtues2));
        const emergingText = base.emergingTemplate.replace('{virtues}', formatVirtueList(virtues1));
        
        return {
            name: name,
            description: base.baseDescription + focusText + emergingText + base.closingText,
            strengths: formatVirtueList(virtues2),
            growth: ''
        };
    }
    
    // Generic even-spread fallback
    return {
        name: profileData.evenSpreadProfile.name,
        description: profileData.evenSpreadProfile.baseDescription + profileData.evenSpreadProfile.closingText,
        strengths: '',
        growth: profileData.evenSpreadProfile.growth
    };
}

// Form submission
document.getElementById('virtue-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const answers = {};
    
    for (let i = 1; i <= 9; i++) {
        const answer = formData.get(`q${i}`);
        if (!answer) {
            alert(`Please answer question ${i} before submitting.`);
            return;
        }
        answers[`q${i}`] = answer;
    }
    
    const scores = {
        reverence: 0,
        humility: 0,
        discernment: 0,
        acceptance: 0,
        equanimity: 0,
        compassion: 0
    };
    
    Object.values(answers).forEach(virtue => {
        scores[virtue]++;
    });
    
    displayResults(scores);
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

function displayResults(scores) {
    const resultsDiv = document.getElementById('results');
    const scoresDiv = document.getElementById('virtue-scores');
    const topVirtuesDiv = document.getElementById('top-virtues');
    
    const data = getProfileData(scores);
    const sortedVirtues = data.sortedVirtues;
    const profile = getProfile(data);
    
    // Display score bars
    scoresDiv.innerHTML = sortedVirtues.map(([virtue, score]) => `
        <div class="virtue-score">
            <span class="virtue-name">${capitalize(virtue)}</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(score/3)*100}%"></div>
            </div>
            <span class="virtue-points">${score}/3</span>
        </div>
    `).join('');
    
    // Build profile HTML
    let profileHTML = `<h3>${profile.name}</h3><div class="virtue-description">`;
    profileHTML += `<p>${profile.description}</p>`;
    
    if (profile.strengths) {
        const plural = data.type === 'dual' || data.type === 'even-spread';
        profileHTML += `<p><strong>Your primary ${plural ? 'strengths are' : 'strength is'}:</strong> ${profile.strengths}.</p>`;
    }
    
    if (profile.growth) {
        profileHTML += `<p><strong>Your growth edge is developing comfort with</strong> ${profile.growth}.</p>`;
    }
    
    // Add warnings for excess and shadow
    if (data.virtues3.length > 0 || data.virtues0.length > 0) {
        let warningsIntro = '<p>Every quality has both a healthy expression and potential pitfalls. ';
        
        if (data.virtues3.length > 0 && data.virtues0.length > 0) {
            warningsIntro += 'Your strongest qualities, when taken to excess, can become liabilities. Similarly, the qualities you score lowest in represent potential blind spots.';
        } else if (data.virtues3.length > 0) {
            warningsIntro += 'Your strongest qualities, when taken to excess, can become liabilities.';
        } else {
            warningsIntro += 'The qualities you score lowest in represent potential blind spots.';
        }
        
        warningsIntro += '</p><p><strong>Watch for:</strong></p><ul style="margin-left: 30px; line-height: 1.8;">';
        
        let warningsList = [];
        
        if (data.virtues3.length > 0) {
            data.virtues3.forEach(v => {
                const excess = profileData.excessWarnings[v];
                warningsList.push(`<li><em>${capitalize(excess)}</em> - when ${capitalize(v)} becomes excessive</li>`);
            });
        }
        
        if (data.virtues0.length > 0) {
            data.virtues0.forEach(v => {
                const shadow = profileData.shadowWarnings[v];
                warningsList.push(`<li><em>${capitalize(shadow)}</em> - when ${capitalize(v)} is underdeveloped</li>`);
            });
        }
        
        profileHTML += warningsIntro + warningsList.join('') + '</ul>';
    }
    
    // Note for 321111 pattern
    const scoreValues = Object.values(scores).sort((a, b) => b - a);
    const scoreString = scoreValues.join('');
    if (scoreString === '321111') {
        profileHTML += '<p>You show relatively balanced engagement across five of the six qualities.</p>';
    }
    
    profileHTML += `</div>`;
    topVirtuesDiv.innerHTML = profileHTML;
    resultsDiv.style.display = 'block';
    
    // Track quiz completion anonymously via invisible iframe
    const trackingFrame = document.createElement('iframe');
    trackingFrame.style.display = 'none';
    trackingFrame.src = 'https://docs.google.com/forms/d/e/1FAIpQLSeaKOSaB50Po8EEsA7IWKlOVvWzvjFTAn_GpQhvmlTtKtPRMA/formResponse?entry.583824345=completed&submit=Submit';
    document.body.appendChild(trackingFrame);
}

// Email signup
function handleSignup() {
    const email = document.getElementById('signup-email').value;
    const messageDiv = document.getElementById('signup-message');
    
    if (!email) {
        messageDiv.innerHTML = '<span style="color: #8B4513;">Please enter your email address.</span>';
        return;
    }
    
    if (!email.includes('@')) {
        messageDiv.innerHTML = '<span style="color: #8B4513;">Please enter a valid email address.</span>';
        return;
    }
    
    // Submit to Google Form
    const FORM_ID = '1FAIpQLSd36cuH25UF18HGp5eYC3u5gVgRM4YxOe6uxsIXjjH732e0sw';
    const ENTRY_ID = 'entry.583824345';
    
    fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `${ENTRY_ID}=${encodeURIComponent(email)}`
    });
    
    messageDiv.innerHTML = '<span style="color: #556B2F;">✓ Thanks! We\'ll notify you about new assessments.</span>';
    document.getElementById('signup-email').value = '';
}