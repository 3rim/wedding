// Envelope Opening Animation
document.addEventListener('DOMContentLoaded', function() {
  const envelope = document.getElementById('invitation-envelope');
  const seal = document.getElementById('opening-seal');
  
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
      
      // Second: conditional render - hide swan, show invitation
      setTimeout(() => {
        const swanSection = document.querySelector('.swan-section');
        const invitationSection = document.querySelector('.invitation-section');
        
        // Hide swan
        if (swanSection) {
          swanSection.classList.add('hidden');
        }
        
        // Show invitation
        if (invitationSection) {
          invitationSection.classList.add('show');
        }
        
        console.log('Conditional render: Swan versteckt, Einladung sichtbar');
      }, 2500); // Wait for envelope to fade out
    }, 1200); // Wait for flap animation to complete
  });
  
  // Touch support for mobile
  seal.addEventListener('touchstart', function(e) {
    e.preventDefault();
    seal.click();
  });
});
