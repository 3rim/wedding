// Envelope Opening Animation
document.addEventListener('DOMContentLoaded', function() {
  const envelope = document.getElementById('invitation-envelope');
  const seal = document.getElementById('opening-seal');
  const introContainer = document.getElementById('intro-container');
  const mainContent = document.getElementById('main');
  
  if (!envelope || !seal) return;
  
  seal.addEventListener('click', function() {
    console.log('Siegel geklickt!');
    
    // Add opening class to start animation
    envelope.classList.add('is-open');
    console.log('is-open Klasse hinzugefügt');
    
    // After animation completes, add done class and reveal content
    setTimeout(() => {
      // First: envelope fades out
      envelope.classList.add('is-done');
      console.log('Envelope fadet aus');
      
      // Second: hide intro container and show main content
      setTimeout(() => {
        // Hide intro container completely
        if (introContainer) {
          introContainer.classList.add('hidden');
        }
        
        // Show main content
        if (mainContent) {
          mainContent.style.display = 'block';
        }
        
        // Show invitation section
        const invitationSection = document.getElementById('invitation-section');
        if (invitationSection) {
          invitationSection.classList.add('show');
          console.log('Invitation-section show Klasse hinzugefügt');
        }
        
        // Starte Audio (Swan Lake bis 0:44)
        const audio = document.getElementById('swan-audio');
        if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.3; // 30% Lautstärke
          audio.play().catch(e => console.log('Audio play failed:', e));
          
          // Stoppe bei 0:44 (44 Sekunden)
          audio.addEventListener('timeupdate', function stopAt44() {
            if (audio.currentTime >= 44) {
              audio.pause();
              audio.removeEventListener('timeupdate', stopAt44);
            }
          });
        }
        
        console.log('Intro versteckt, Main Content erscheint');
      }, 100); // Small delay for smooth transition
      
    }, 1200); // Wait for flap animation to complete
  });
  
  // Touch support for mobile
  seal.addEventListener('touchstart', function(e) {
    e.preventDefault();
    seal.click();
  });
});
