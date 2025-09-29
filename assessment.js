// Virtue descriptions for reference
const virtueDescriptions = {
    reverence: "You naturally seek deeper meaning and wisdom in life's experiences. You're drawn to reflection and understanding the bigger picture.",
    humility: "You approach life with genuine openness, readily acknowledging what you don't know and learning from mistakes without ego.",
    discernment: "You have a gift for seeing clearly - distinguishing between what's real and what's assumption, what's helpful and what's not.",
    acceptance: "You're skilled at making peace with reality as it is, which gives you a solid foundation for responding wisely rather than reactively.",
    equanimity: "You maintain inner stability and calm, especially in challenging situations. Your steady presence is a gift to others.",
    compassion: "You're naturally attuned to others' experiences and genuinely care about their wellbeing. Your empathy creates connection and healing."
};

// Excess and shadow warnings
const excessWarnings = {
    reverence: "adoration",
    humility: "self-deprecation",
    discernment: "becoming judgmental",
    acceptance: "passivity",
    equanimity: "detachment",
    compassion: "hyper-empathy"
};

const shadowWarnings = {
    reverence: "contempt",
    humility: "arrogance",
    discernment: "delusion",
    acceptance: "denial",
    equanimity: "reactivity",
    compassion: "cruelty"
};

// Complete profile descriptions (28 profiles)
const profileDescriptions = {
    'dual': {
        'acceptance-compassion': {
            name: 'The Tender Realist',
            description: 'You accept reality while staying emotionally connected to those affected by it. You can hold both "this is how it is" and genuine care for others. Your strength is in compassionate realism—you face truth without losing your heart.',
            strengths: 'Acceptance and Compassion',
            growth: ''
        },
        'acceptance-discernment': {
            name: 'The Realistic Analyst',
            description: 'You think clearly about what actually is, not what you wish were true. You combine analytical rigor with practical acceptance. Your strength is in clear-eyed realism—you see situations accurately and work with them as they are.',
            strengths: 'Discernment and Acceptance',
            growth: ''
        },
        'acceptance-equanimity': {
            name: 'The Peaceful Realist',
            description: 'You make peace with reality while maintaining emotional calm. You can face what is without either fighting it or becoming destabilized by it. Your strength lies in serene acceptance—you combine practical realism with inner stability.',
            strengths: 'Acceptance and Equanimity',
            growth: ''
        },
        'acceptance-humility': {
            name: 'The Grounded Learner',
            description: 'You stay open to growth while accepting reality as it is. You can learn from circumstances without fighting against them. Your strength lies in realistic development—you work with what is rather than insisting things should be different before you can learn.',
            strengths: 'Humility and Acceptance',
            growth: ''
        },
        'acceptance-reverence': {
            name: 'The Accepting Mystic',
            description: 'You seek profound meaning while making peace with reality as it is. You can hold both the vision of what could be meaningful and acceptance of what actually is. Your strength lies in grounded spirituality—pursuing purpose without fighting against constraints.',
            strengths: 'Reverence and Acceptance',
            growth: ''
        },
        'compassion-discernment': {
            name: 'The Empathic Analyst',
            description: 'You think clearly while staying emotionally connected to others. You can be both analytical and caring. Your strength is in thoughtful compassion—you bring both head and heart to understanding situations.',
            strengths: 'Discernment and Compassion',
            growth: ''
        },
        'compassion-equanimity': {
            name: 'The Balanced Heart',
            description: 'You combine emotional stability with genuine warmth. You can care deeply for others without becoming overwhelmed or destabilized. Your strength lies in steady compassion—you bring both calm and caring to relationships.',
            strengths: 'Equanimity and Compassion',
            growth: ''
        },
        'compassion-humility': {
            name: 'The Caring Learner',
            description: 'You grow through emotional connection and stay open to what others can teach you. You combine self-awareness with warmth toward others. Your strength lies in relational learning—you understand that growth often happens through genuine connection.',
            strengths: 'Humility and Compassion',
            growth: ''
        },
        'compassion-reverence': {
            name: 'The Compassionate Contemplative',
            description: 'You find meaning through heartfelt connection with others. You seek purpose while staying emotionally attuned to people around you. Your strength lies in meaning-making through relationship—understanding that what truly matters often involves how we care for one another.',
            strengths: 'Reverence and Compassion',
            growth: ''
        },
        'discernment-equanimity': {
            name: 'The Calm Thinker',
            description: 'You analyze situations with emotional stability. You can think through complex problems without becoming anxious or reactive. Your strength lies in steady clarity—you maintain both intellectual rigor and inner calm.',
            strengths: 'Discernment and Equanimity',
            growth: ''
        },
        'discernment-humility': {
            name: 'The Learning Analyst',
            description: 'You think clearly while remaining intellectually humble. You analyze situations carefully but stay open to being wrong or learning something new. Your strength is in honest, rigorous thinking—you pursue truth without pretending you already possess it.',
            strengths: 'Humility and Discernment',
            growth: ''
        },
        'discernment-reverence': {
            name: 'The Contemplative Analyst',
            description: 'You combine the search for deeper meaning with sharp analytical clarity. You naturally reflect on what truly matters while thinking through situations carefully. Your strength is in meaning-making through clear reasoning—you don\'t just ask "what matters?" but also "what\'s actually true here?"',
            strengths: 'Reverence and Discernment',
            growth: ''
        },
        'equanimity-humility': {
            name: 'The Steady Student',
            description: 'You learn and grow with emotional balance. You can receive feedback or face your limitations without becoming destabilized. Your strength is in calm, continuous development—you remain open to growth without the turbulence that often accompanies self-awareness.',
            strengths: 'Humility and Equanimity',
            growth: ''
        },
        'equanimity-reverence': {
            name: 'The Centered Seeker',
            description: 'You pursue deeper purpose with remarkable emotional stability. You can contemplate life\'s big questions without becoming anxious or reactive. Your strength is in calm wisdom-seeking—you find meaning without being destabilized by what you discover.',
            strengths: 'Reverence and Equanimity',
            growth: ''
        },
        'humility-reverence': {
            name: 'The Humble Seeker',
            description: 'You consistently pursue deeper meaning and purpose while maintaining openness to learning and acknowledging your limitations. Your strength lies in seeking wisdom with intellectual honesty. You combine the capacity to ask profound questions with the humility to recognize you don\'t have all the answers.',
            strengths: 'Reverence and Humility',
            growth: ''
        }
    },
    'single-fave': {
        'reverence': {
            name: 'The Meaning-Maker',
            description: 'Your life is organized around deeper purpose and significance. You consistently ask "what really matters here?" and orient toward what feels most meaningful. This gives you depth and vision—you\'re unlikely to waste time on the trivial or lose sight of what\'s truly important. While you engage with other qualities moderately, your compass always points toward the profound and purposeful.',
            strengths: 'Reverence',
            growth: ''
        },
        'humility': {
            name: 'The Perpetual Student',
            description: 'Your life is organized around continuous learning and growth. You consistently acknowledge what you don\'t know and remain open to new understanding. This gives you genuine wisdom and adaptability—you\'re able to evolve your thinking and unlikely to be trapped by false certainty. While you engage with other qualities moderately, intellectual honesty is your North Star.',
            strengths: 'Humility',
            growth: ''
        },
        'discernment': {
            name: 'The Clear Thinker',
            description: 'Your life is organized around analytical clarity and understanding. You consistently seek to think through situations carefully and distinguish truth from assumption. This gives you valuable insight and problem-solving ability—you cut through confusion and see what\'s actually happening. While you engage with other qualities moderately, clear reasoning guides you.',
            strengths: 'Discernment',
            growth: ''
        },
        'acceptance': {
            name: 'The Realist',
            description: 'Your life is organized around accepting what is and working with reality. You consistently make peace with circumstances rather than fighting against them. This gives you groundedness and resilience—you don\'t waste energy on battles that can\'t be won and can work effectively within constraints. While you engage with other qualities moderately, practical acceptance anchors you.',
            strengths: 'Acceptance',
            growth: ''
        },
        'equanimity': {
            name: 'The Calm Presence',
            description: 'Your life is organized around emotional stability and centeredness. You consistently maintain equilibrium regardless of external circumstances. This gives you remarkable steadiness and reliability—others can count on you not to become reactive or destabilized. While you engage with other qualities moderately, inner calm is your foundation.',
            strengths: 'Equanimity',
            growth: ''
        },
        'compassion': {
            name: 'The Heart-Led',
            description: 'Your life is organized around emotional connection and care for others. You consistently respond with empathy and warmth to those around you. This gives you deep relational capacity and kindness—you create genuine connection and make others feel seen and valued. While you engage with other qualities moderately, emotional attunement guides you.',
            strengths: 'Compassion',
            growth: ''
        }
    },
    'balanced-majority': {
        'reverence': {
            name: 'The Grounded Pragmatist',
            description: 'You function well across most inner qualities but consistently avoid deeper questions of meaning and purpose. You prefer to stay focused on practical, immediate concerns rather than contemplating life\'s bigger questions. Questions about ultimate meaning or deeper purpose feel abstract or ungrounding to you. Your strength is in getting things done without getting lost in existential reflection.',
            strengths: '',
            growth: 'Reverence—learning to ask "what really matters?" without feeling unmoored from practical reality',
            shadow: 'contempt'
        },
        'humility': {
            name: 'The Self-Assured',
            description: 'You engage well with most inner qualities but consistently avoid acknowledging limitations or staying genuinely open to being wrong. You prefer to rely on your existing knowledge and capabilities. Admitting "I don\'t know" feels like weakness rather than wisdom. Your strength is in confidence and decisiveness.',
            strengths: '',
            growth: 'Humility—learning to say "I don\'t know" or "I was wrong" without experiencing it as personal failure',
            shadow: 'arrogance'
        },
        'discernment': {
            name: 'The Intuitive',
            description: 'You connect well across most inner qualities but consistently avoid careful analytical thinking. You prefer to respond from feeling, instinct, or faith rather than reasoned evaluation. Critical analysis feels cold or disconnecting to you. Your strength is in immediate responsiveness and holistic perception.',
            strengths: '',
            growth: 'Discernment—learning to analyze situations critically without losing your intuitive wisdom',
            shadow: 'delusion'
        },
        'acceptance': {
            name: 'The Persistent Idealist',
            description: 'You function well across most inner qualities but consistently avoid making peace with difficult realities. You struggle to accept circumstances as they are and prefer to focus on changing or improving them. Accepting things as they are feels like giving up. Your strength is in refusing to settle or become complacent.',
            strengths: '',
            growth: 'Acceptance—learning that making peace with some realities doesn\'t mean abandoning all hope for change',
            shadow: 'denial'
        },
        'equanimity': {
            name: 'The Intense Engager',
            description: 'You engage well with most inner qualities but consistently avoid emotional calm and centeredness. You tend toward emotional intensity rather than stable equilibrium. Emotional stability feels like disconnection or suppression to you. Your strength is in passionate, fully-felt engagement with life.',
            strengths: '',
            growth: 'Equanimity—learning to stay present and responsive without being swept away by the intensity of your feelings',
            shadow: 'reactivity'
        },
        'compassion': {
            name: 'The Detached Processor',
            description: 'You function well across most inner qualities but consistently avoid emotional connection with others\' experiences. You maintain analytical or philosophical distance and prefer intellectual engagement over empathetic response. Emotional engagement feels overwhelming or compromising to your objectivity. Your strength is in clear-sightedness and non-reactivity to others\' emotions.',
            strengths: '',
            growth: 'Compassion—learning to connect emotionally with others without losing your capacity for clear thinking',
            shadow: 'cruelty'
        }
    },
    'even-spread': {
        name: 'The Integrator',
        description: 'Your responses suggest relatively balanced engagement across all inner qualities without strong directional preferences. This pattern could indicate several things: You may have genuinely developed across all these dimensions and don\'t experience strong pulls toward particular approaches when facing choices. You may be highly context-dependent, choosing different qualities based on specific situations rather than consistent personal tendencies. Or you may still be discovering your preferences and find value in multiple approaches. Your strength is in flexibility and seeing merit across different ways of engaging with life. You\'re unlikely to be rigidly committed to one approach or blind to entire dimensions of inner development.',
        strengths: '',
        growth: 'clarifying your directional focus. Sometimes having strong preferences and directional focus allows for depth and distinctive contribution that balanced engagement doesn\'t provide. Consider whether your balance represents genuine integration or whether clarifying your priorities might serve you better'
    }
};

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
    const zeros = sortedVirtues.filter(([,score]) => score === 0).map(([v]) => v);
    
    return {
        type: profileType,
        virtues3: threes,
        virtues0: zeros,
        sortedVirtues: sortedVirtues
    };
}

function getProfile(profileData) {
    const { type, virtues3, virtues0 } = profileData;
    
    if (type === 'even-spread') {
        return profileDescriptions['even-spread'];
    }
    
    if (type === 'balanced-majority' && virtues0.length === 1) {
        return profileDescriptions['balanced-majority'][virtues0[0]];
    }
    
    if (type === 'single-fave' && virtues3.length === 1) {
        return profileDescriptions['single-fave'][virtues3[0]];
    }
    
    if (type === 'dual' && virtues3.length === 2) {
        const key = virtues3.sort().join('-');
        return profileDescriptions['dual'][key];
    }
    
    return profileDescriptions['even-spread'];
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
    
    const profileData = getProfileData(scores);
    const sortedVirtues = profileData.sortedVirtues;
    const profile = getProfile(profileData);
    
    scoresDiv.innerHTML = sortedVirtues.map(([virtue, score]) => `
        <div class="virtue-score">
            <span class="virtue-name">${virtue.charAt(0).toUpperCase() + virtue.slice(1)}</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(score/3)*100}%"></div>
            </div>
            <span class="virtue-points">${score}/3</span>
        </div>
    `).join('');
    
    let profileHTML = `<h3>${profile.name}</h3><div class="virtue-description">`;
    profileHTML += `<p>${profile.description}</p>`;
    
    if (profile.strengths) {
        profileHTML += `<p><strong>Your primary ${profileData.type === 'dual' ? 'strengths are' : 'strength is'}:</strong> ${profile.strengths}.</p>`;
    }
    
    if (profile.growth) {
        profileHTML += `<p><strong>Your growth edge is developing comfort with</strong> ${profile.growth}.</p>`;
    }
    
    // Build contextual warnings
    const scoreValues = Object.values(scores).sort((a, b) => b - a);
    const scoreString = scoreValues.join('');
    
    let warningsIntro = '';
    let warningsList = [];
    
    if (profileData.virtues3.length > 0 || profileData.virtues0.length > 0) {
        warningsIntro = '<p>Every quality has both a healthy expression and potential pitfalls. ';
        
        if (profileData.virtues3.length > 0 && profileData.virtues0.length > 0) {
            warningsIntro += 'Your strongest qualities, when taken to excess, can become liabilities. Similarly, the qualities you score lowest in represent potential blind spots.';
        } else if (profileData.virtues3.length > 0) {
            warningsIntro += 'Your strongest qualities, when taken to excess, can become liabilities.';
        } else {
            warningsIntro += 'The qualities you score lowest in represent potential blind spots.';
        }
        
        warningsIntro += '</p><p><strong>Watch for:</strong></p><ul style="margin-left: 30px; line-height: 1.8;">';
        
        if (profileData.virtues3.length > 0) {
            profileData.virtues3.forEach(v => {
                const virtueCapitalized = v.charAt(0).toUpperCase() + v.slice(1);
                warningsList.push(`<li><em>${excessWarnings[v].charAt(0).toUpperCase() + excessWarnings[v].slice(1)}</em> - when ${virtueCapitalized} becomes excessive</li>`);
            });
        }
        
        if (profileData.virtues0.length > 0) {
            profileData.virtues0.forEach(v => {
                const virtueCapitalized = v.charAt(0).toUpperCase() + v.slice(1);
                warningsList.push(`<li><em>${shadowWarnings[v].charAt(0).toUpperCase() + shadowWarnings[v].slice(1)}</em> - when ${virtueCapitalized} is underdeveloped</li>`);
            });
        }
        
        profileHTML += warningsIntro + warningsList.join('') + '</ul>';
    }
    
    if (scoreString === '321111') {
        profileHTML += '<p>You show relatively balanced engagement across five of the six qualities.</p>';
    }
    
    profileHTML += `</div>`;
    topVirtuesDiv.innerHTML = profileHTML;
    resultsDiv.style.display = 'block';
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