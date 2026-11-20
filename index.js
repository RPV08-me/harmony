const urlParams = new URLSearchParams(window.location.search);
const practiceNumber = urlParams.get('practice');
        
if (practiceNumber) {
    if (practiceNumber >= 1 && practiceNumber <= 4) {
                
        setTimeout(() => {
            const targetPage = `pr${practiceNumber}.html`;
                console.log('Переход на:', targetPage);
                    window.location.href = targetPage;
        }, 5000);
    } 
} 