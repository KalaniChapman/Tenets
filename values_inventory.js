// Load data from JSON
let inventoryData = null;
let draggedElement = null;
let responses = {};

// Load data on initialization
async function loadInventoryData() {
    try {
        const response = await fetch('valuesInventoryData.json');
        inventoryData = await response.json();
    } catch (error) {
        console.error('Failed to load inventory data:', error);
    }
}

// Helper function for bi-directional lookup
function getProfileLookup(dataObject, quality1, quality2, fallback = null) {
    const key1 = `${quality1}-${quality2}`;
    const key2 = `${quality2}-${quality1}`;
    return dataObject[key1] || dataObject[key2] || fallback;
}

// Initialize drag and drop with both mouse and touch support
function initializeDragAndDrop() {
    const allCards = document.querySelectorAll('.option-card');
    
    allCards.forEach(card => {
        // Mouse events
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
        
        // Touch events for mobile
        card.addEventListener('touchstart', handleTouchStart, { passive: false });
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
        card.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
}

// Mouse drag handlers
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedElement !== this) {
        const rankingArea = this.closest('.ranking-area');
        const allCards = Array.from(rankingArea.querySelectorAll('.option-card'));
        const draggedIndex = allCards.indexOf(draggedElement);
        const targetIndex = allCards.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
        
        updateRankLabels(rankingArea);
    }
    
    return false;
}

// Touch drag handlers for mobile
let touchStartY = 0;
let touchStartElement = null;
let clonedElement = null;

function handleTouchStart(e) {
    touchStartElement = this;
    touchStartY = e.touches[0].clientY;
    
    clonedElement = this.cloneNode(true);
    clonedElement.style.position = 'fixed';
    clonedElement.style.width = this.offsetWidth + 'px';
    clonedElement.style.opacity = '0.8';
    clonedElement.style.zIndex = '1000';
    clonedElement.style.pointerEvents = 'none';
    clonedElement.style.left = this.getBoundingClientRect().left + 'px';
    clonedElement.style.top = e.touches[0].clientY + 'px';
    document.body.appendChild(clonedElement);
    
    this.style.opacity = '0.3';
}

function handleTouchMove(e) {
    e.preventDefault();
    
    if (!clonedElement || !touchStartElement) return;
    
    clonedElement.style.top = e.touches[0].clientY + 'px';
    
    const touch = e.touches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetCard = elementUnderTouch?.closest('.option-card');
    
    document.querySelectorAll('.option-card').forEach(card => {
        if (card !== touchStartElement) {
            card.classList.remove('drag-over');
        }
    });
    
    if (targetCard && targetCard !== touchStartElement) {
        targetCard.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    if (!clonedElement || !touchStartElement) return;
    
    const touch = e.changedTouches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetCard = elementUnderTouch?.closest('.option-card');
    
    document.body.removeChild(clonedElement);
    clonedElement = null;
    
    touchStartElement.style.opacity = '1';
    
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('drag-over');
    });
    
    if (targetCard && targetCard !== touchStartElement) {
        const rankingArea = touchStartElement.closest('.ranking-area');
        const allCards = Array.from(rankingArea.querySelectorAll('.option-card'));
        const draggedIndex = allCards.indexOf(touchStartElement);
        const targetIndex = allCards.indexOf(targetCard);
        
        if (draggedIndex < targetIndex) {
            targetCard.parentNode.insertBefore(touchStartElement, targetCard.nextSibling);
        } else {
            targetCard.parentNode.insertBefore(touchStartElement, targetCard);
        }
        
        updateRankLabels(rankingArea);
    }
    
    touchStartElement = null;
}

function updateRankLabels(rankingArea) {
    const cards = rankingArea.querySelectorAll('.option-card');
    const questionNum = rankingArea.dataset.question;
    const labels = ['Most important', '2nd priority', 'Least important'];
    
    responses[questionNum] = {};
    
    cards.forEach((card, index) => {
        const label = card.querySelector('.rank-label');
        label.textContent = labels[index];
        card.classList.add('ranked');
        
        const value = card.dataset.value;
        responses[questionNum][value] = 3 - index;
    });
    
    checkAllQuestionsAnswered();
}

function checkAllQuestionsAnswered() {
    const totalQuestions = 24;
    const answeredQuestions = Object.keys(responses).length;
    const submitBtn = document.getElementById('submit-btn');
    
    if (answeredQuestions === totalQuestions) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'See My Results';
    } else {
        submitBtn.disabled = true;
        submitBtn.textContent = `Complete all rankings to see results (${answeredQuestions}/${totalQuestions})`;
    }
}

// Keep current order function for "Keep Order" button
function keepCurrentOrder(questionNum) {
    const rankingArea = document.querySelector(`.ranking-area[data-question="${questionNum}"]`);
    updateRankLabels(rankingArea);
}

// Calculate scores
function calculateScores() {
    const scores = {
        reverence: 0,
        humility: 0,
        discernment: 0,
        acceptance: 0,
        equanimity: 0,
        compassion: 0,
        stewardship: 0,
        integrity: 0,
        synthesis: 0,
        purpose: 0,
        dialogue: 0,
        advocacy: 0
    };

    Object.values(responses).forEach(questionResponses => {
        Object.entries(questionResponses).forEach(([quality, points]) => {
            scores[quality] += points;
        });
    });

    return scores;
}

// Statistical analysis functions
function calculateStatistics(scores) {
    const values = Object.values(scores);
    const n = values.length;
    
    // Mean
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    
    // Standard deviation
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Coefficient of variation
    const cv = stdDev / mean;
    
    // Calculate z-scores for each quality
    const zScores = {};
    Object.entries(scores).forEach(([quality, score]) => {
        zScores[quality] = (score - mean) / stdDev;
    });
    
    return { mean, stdDev, cv, zScores };
}

function analyzeDistribution(scores, stats) {
    const sorted = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([quality, score]) => ({ quality, score, zScore: stats.zScores[quality] }));
    
    // Gap analysis - find largest gaps between adjacent scores
    const gaps = [];
    for (let i = 0; i < sorted.length - 1; i++) {
        gaps.push({
            index: i,
            gap: sorted[i].score - sorted[i + 1].score
        });
    }
    const maxGap = Math.max(...gaps.map(g => g.gap));
    const largeGaps = gaps.filter(g => g.gap >= 3);
    
    // Quartile analysis
    const q1End = 3;  // Top 3
    const q4Start = 9; // Bottom 3
    const topQuartileSum = sorted.slice(0, q1End).reduce((sum, item) => sum + item.score, 0);
    const bottomQuartileSum = sorted.slice(q4Start).reduce((sum, item) => sum + item.score, 0);
    const quartileRatio = bottomQuartileSum === 0 ? Infinity : topQuartileSum / bottomQuartileSum;
    
    // Determine distribution pattern
    let pattern;
    let patternIntensity;
    
    if (stats.cv > 0.25 && sorted[0].zScore > 1.5) {
        pattern = 'sharp-focus';
        patternIntensity = sorted[0].zScore > 2.0 ? 'very-sharp' : 'sharp';
    } else if (stats.cv > 0.20 && largeGaps.length >= 1) {
        pattern = 'clustered';
        patternIntensity = largeGaps.length >= 2 ? 'multi-cluster' : 'dual-cluster';
    } else if (stats.cv > 0.15) {
        pattern = 'moderate-preference';
        patternIntensity = quartileRatio > 2 ? 'clear' : 'mild';
    } else if (stats.cv > 0.10) {
        pattern = 'balanced-variation';
        patternIntensity = 'balanced';
    } else {
        pattern = 'even-spread';
        patternIntensity = 'very-even';
    }
    
    return {
        sorted,
        pattern,
        patternIntensity,
        maxGap,
        largeGaps,
        quartileRatio,
        topQualities: sorted.slice(0, 3).map(item => item.quality),
        bottomQualities: sorted.slice(-2).map(item => item.quality)
    };
}

function getOrientation(scores) {
    const inner = ['reverence', 'humility', 'discernment', 'acceptance', 'equanimity', 'compassion'];
    const outer = ['stewardship', 'integrity', 'synthesis', 'purpose', 'dialogue', 'advocacy'];
    
    const innerSum = inner.reduce((sum, q) => sum + scores[q], 0);
    const outerSum = outer.reduce((sum, q) => sum + scores[q], 0);
    const total = innerSum + outerSum;
    
    const innerPercent = (innerSum / total * 100).toFixed(0);
    const outerPercent = (outerSum / total * 100).toFixed(0);
    
    let orientation;
    const difference = Math.abs(innerSum - outerSum);
    
    if (difference < 6) {
        orientation = 'Balanced';
    } else if (difference < 12) {
        orientation = innerSum > outerSum ? 'Inner-leaning' : 'Outer-leaning';
    } else {
        orientation = innerSum > outerSum ? 'Inner-oriented' : 'Outer-oriented';
    }
    
    return { orientation, innerPercent, outerPercent, innerSum, outerSum };
}

function generateProfileName(distribution, orientation) {
    const top2 = distribution.topQualities.slice(0, 2);
    
    // Look up in profileNames data using bi-directional helper
    const profileName = getProfileLookup(
        inventoryData.profileNames, 
        top2[0], 
        top2[1],
        `The ${inventoryData.qualityData[top2[0]].name}-${inventoryData.qualityData[top2[1]].name} Engager`
    );
    
    return profileName;
}

function displayResults(scores) {
    const stats = calculateStatistics(scores);
    const distribution = analyzeDistribution(scores, stats);
    const orientation = getOrientation(scores);
    
    const profileName = generateProfileName(distribution, orientation);
    
    // Determine orientation intensity descriptor
    const orientationDiff = Math.abs(orientation.innerSum - orientation.outerSum);
    let orientationDescriptor;
    let orientationDirection = orientation.innerSum > orientation.outerSum ? 'inwardly' : 'outwardly';
    
    if (orientationDiff < 8) {
        orientationDescriptor = 'evenly balanced between inner and outer';
        orientationDirection = '';
    } else if (orientationDiff < 16) {
        orientationDescriptor = 'slightly';
    } else if (orientationDiff < 24) {
        orientationDescriptor = 'moderately';
    } else {
        orientationDescriptor = 'strongly';
    }
    
// Build orientation text with quality count instead of percentages
let orientationText = '';
if (orientationDirection) {
    // Count how many of top 6 qualities are from the dominant orientation
    const top6Qualities = distribution.sorted.slice(0, 6).map(item => item.quality);
    const innerQualities = ['reverence', 'humility', 'discernment', 'acceptance', 'equanimity', 'compassion'];
    const outerQualities = ['stewardship', 'integrity', 'synthesis', 'purpose', 'dialogue', 'advocacy'];
    
    const innerCount = top6Qualities.filter(q => innerQualities.includes(q)).length;
    const outerCount = top6Qualities.filter(q => outerQualities.includes(q)).length;
    const dominantCount = Math.max(innerCount, outerCount);
    const dominantPercent = orientationDirection === 'inwardly' ? orientation.innerPercent : orientation.outerPercent;
    
    let countText = '';
    if (dominantCount === 4) {
        countText = ` (${dominantPercent}%—but four of your six top qualities)`;
    } else if (dominantCount === 5) {
        countText = ` (${dominantPercent}%—but five of your six top qualities!)`;
    } else if (dominantCount === 6) {
        countText = ` (${dominantPercent}%—but all of your top qualities!)`;
    }
    
    orientationText = `You are ${orientationDescriptor} ${orientationDirection} focused${countText}`;
} else {
    orientationText = `You are ${orientationDescriptor}`;
}
    
    // Identify secondary qualities (positions 4-6)
    const secondaryQualities = distribution.sorted.slice(3, 6)
        .map(item => inventoryData.qualityData[item.quality].name);
    let secondaryText = '';
    if (secondaryQualities.length >= 3) {
        const formattedSecondary = `${secondaryQualities[0]}, ${secondaryQualities[1]}, and ${secondaryQualities[2]}`;
        
        // Get profile name for top 2 secondary qualities using bi-directional helper
        const sec1 = distribution.sorted[3].quality;
        const sec2 = distribution.sorted[4].quality;
        const secondaryProfileName = getProfileLookup(
            inventoryData.profileNames,
            sec1,
            sec2,
            'Balanced Engager'
        );
        
        // Get third secondary quality phrase
        const sec3Phrase = inventoryData.qualityPhrases[distribution.sorted[5].quality];
        
        secondaryText = ` Your supporting qualities include ${formattedSecondary}, giving you an affinity to the ${secondaryProfileName} profile, supported by your capacity to ${sec3Phrase}.`;
    }
    
    // Find highest quality from opposite orientation
    const inner = ['reverence', 'humility', 'discernment', 'acceptance', 'equanimity', 'compassion'];
    const outer = ['stewardship', 'integrity', 'synthesis', 'purpose', 'dialogue', 'advocacy'];
    const isInnerOriented = orientation.innerSum > orientation.outerSum;
    const oppositeQualities = isInnerOriented ? outer : inner;
    
	// Cross-orientation text
	let crossOrientationText = '';
	const highestOpposite = distribution.sorted.find(item => 
		oppositeQualities.includes(item.quality)
	);
	if (highestOpposite) {
		const oppositeName = inventoryData.qualityData[highestOpposite.quality].name;
		const oppositePhrase = inventoryData.qualityPhrases[highestOpposite.quality];
		const sideLabel = isInnerOriented ? 'outer practice' : 'inner quality';
		
		// Check if this quality's phrase was already used (positions 3 or 6)
		const isPosition3 = highestOpposite.quality === distribution.sorted[2].quality;
		const isPosition6 = highestOpposite.quality === distribution.sorted[5].quality;
		
		if (isPosition3 || isPosition6) {
			crossOrientationText = `, with your top ${sideLabel} being ${oppositeName}.`;
		} else {
			crossOrientationText = `. Your top ${sideLabel} is ${oppositeName}, suggesting you ${oppositePhrase}.`;
		}
	}
    
    // Build top qualities text with profile phrase
    const topQualityNames = distribution.topQualities.map(q => inventoryData.qualityData[q].name);
    const topQualitiesText = topQualityNames.length === 1 
        ? topQualityNames[0]
        : topQualityNames.length === 2
        ? topQualityNames.join(' and ')
        : topQualityNames.slice(0, -1).join(', ') + ', and ' + topQualityNames[topQualityNames.length - 1];
    
    // Get profile phrase for primary qualities using bi-directional helper
    const top2 = distribution.topQualities.slice(0, 2);
    const profilePhrase = getProfileLookup(
        inventoryData.profilePhrases,
        top2[0],
        top2[1],
        'a balanced engager'
    );
    
    // Build pattern description using profile phrase and third quality influence
    const thirdQualityPhrase = inventoryData.qualityPhrases[distribution.topQualities[2]];
    const patternDescription = `${profilePhrase}, influenced by your capacity to ${thirdQualityPhrase}`;
    
    // Build excess warnings as bullet list
    const excessList = distribution.topQualities.slice(0, 2).map(q => {
        const excessName = inventoryData.qualityData[q].excess;
        const excessDesc = inventoryData.excessDescriptions[excessName];
        return `<li><strong>${excessName}:</strong> ${excessDesc}</li>`;
    }).join('');
    
    let excessWarnings = `<h4>Possible Excesses</h4><p>With ${topQualityNames[0]} and ${topQualityNames[1]} as primary strengths, be mindful of:</p><ul>${excessList}</ul>`;
    
    // Build shadow warnings as bullet list
    const bottomQualityNames = distribution.bottomQualities.map(q => inventoryData.qualityData[q].name);
    const shadowList = distribution.bottomQualities.map(q => {
        const shadowName = inventoryData.qualityData[q].shadow;
        const shadowDesc = inventoryData.shadowDescriptions[shadowName];
        return `<li><strong>${shadowName}:</strong> ${shadowDesc}</li>`;
    }).join('');
    
    let shadowWarnings = `<h4>Potential Blind Spots</h4><p>Your lower emphasis on ${bottomQualityNames[0]} and ${bottomQualityNames[1]} may create vulnerability to:</p><ul>${shadowList}</ul>`;
    
    let profileHTML = `
        <h3>${profileName}</h3>
        <p>Your most important qualities are ${topQualitiesText}, indicating ${patternDescription}.${secondaryText} ${orientationText}${crossOrientationText}</p>
        ${excessWarnings}
        ${shadowWarnings}
    `;
    
    document.getElementById('profile-content').innerHTML = profileHTML;
    
    // Display all scores with z-scores
    let scoresHTML = '';
    distribution.sorted.forEach(({ quality, score, zScore }) => {
        const zScoreText = zScore > 1.5 ? ' (distinctively high)' : zScore < -1.5 ? ' (distinctively low)' : '';
        scoresHTML += `
            <div class="score-item">
                <strong>${inventoryData.qualityData[quality].name}:</strong> ${score}${zScoreText}
            </div>
        `;
    });
    
    document.getElementById('scores-display').innerHTML = scoresHTML;
    
    document.getElementById('results').classList.add('show');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    // Track inventory completion anonymously via iframe instead
	const trackingFrame = document.createElement('iframe');
	trackingFrame.style.display = 'none';
	trackingFrame.src = 'https://docs.google.com/forms/d/e/1FAIpQLSeaKOSaB50Po8EEsA7IWKlOVvWzvjFTAn_GpQhvmlTtKtPRMA/formResponse?entry.2081342474=inventory_completed&submit=Submit';
	document.body.appendChild(trackingFrame);
}

// Form submission
document.getElementById('values-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const scores = calculateScores();
    displayResults(scores);
});

// Initialize
loadInventoryData().then(() => {
    initializeDragAndDrop();
    checkAllQuestionsAnswered();
});
