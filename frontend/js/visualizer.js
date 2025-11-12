let audioContext;
let analyser;
let dataArray;
let source;
let canvas;
let canvasContext;
let animationId;

// Initialize visualizer
window.startVisualizer = function() {
    canvas = document.getElementById('visualizer');
    canvasContext = canvas.getContext('2d');
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Connect audio element to analyser
        if (!source) {
            source = audioContext.createMediaElementSource(audioPlayer);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
        }
    }
    
    draw();
};

function draw() {
    animationId = requestAnimationFrame(draw);
    
    analyser.getByteFrequencyData(dataArray);
    
    canvasContext.fillStyle = '#1a1a1a';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Create gradient for bars
        const gradient = canvasContext.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, `hsl(${i * 2}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${i * 2 + 60}, 100%, 30%)`);
        
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
    }
    
    // Add circular visualizer in center
    drawCircularVisualizer();
}

function drawCircularVisualizer() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    canvasContext.strokeStyle = '#ff6b6b';
    canvasContext.lineWidth = 3;
    canvasContext.beginPath();
    
    for (let i = 0; i < dataArray.length; i++) {
        const angle = (i / dataArray.length) * Math.PI * 2;
        const amplitude = (dataArray[i] / 255) * 50;
        
        const x = centerX + Math.cos(angle) * (radius + amplitude);
        const y = centerY + Math.sin(angle) * (radius + amplitude);
        
        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }
    }
    
    canvasContext.closePath();
    canvasContext.stroke();
    
    // Add pulsing center circle
    const avgAmplitude = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const pulseRadius = 20 + (avgAmplitude / 255) * 30;
    
    const centerGradient = canvasContext.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
    centerGradient.addColorStop(0, 'rgba(78, 205, 196, 0.8)');
    centerGradient.addColorStop(1, 'rgba(78, 205, 196, 0.1)');
    
    canvasContext.fillStyle = centerGradient;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    canvasContext.fill();
}

// Stop visualizer
function stopVisualizer() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

// Resume audio context on user interaction
document.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
});