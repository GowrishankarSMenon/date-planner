// Core variables
const intro = document.getElementById('intro');
const container = document.getElementById('container');
const options = document.querySelectorAll('.option');
const submitBtn = document.getElementById('submit');
const successMessage = document.getElementById('successMessage');
let currentIndex = 0;

// Initialize date input with today's date as minimum
const dateInput = document.getElementById('dateSelect');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Handle intro animation
setTimeout(() => {
  document.querySelector('.intro-animation').style.display = 'none';
}, 2000);

// Start button click handler
document.getElementById('start').onclick = () => {
  intro.classList.add('animate__fadeOut');
  setTimeout(() => {
    intro.style.display = 'none';
    container.style.display = 'block';
    options[0].classList.add('animate__animated', 'animate__fadeInUp');
  }, 500);
};

// Handle "other" option in dropdowns
function handleOther(select, inputId) {
  const input = document.getElementById(inputId);
  input.style.display = select.value === 'other' ? 'block' : 'none';
}

// Show specific option
function showOption(index) {
  options.forEach((option, i) => {
    if (i === index) {
      option.classList.add('active');
      option.classList.add('animate__animated', 'animate__fadeInUp');
    } else {
      option.classList.remove('active');
      option.classList.remove('animate__animated', 'animate__fadeInUp');
    }
  });

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  // Handle button visibility
  prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';

  if (index === options.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  }
}

// Navigation functions
function next() {
  if (currentIndex < options.length - 1) {
    if (validateCurrentStep()) {
      currentIndex++;
      showOption(currentIndex);
    }
  }
}

function prev() {
  if (currentIndex > 0) {
    currentIndex--;
    showOption(currentIndex);
  }
}

// Validation function for each step
function validateCurrentStep() {
  switch (currentIndex) {
    case 0: // Date validation
      if (!dateInput.value) {
        alert('Please select a date bestie! ✨');
        return false;
      }
      break;
    case 1: // Time validation
      if (!document.getElementById('timeSelect').value) {
        alert('Don\'t forget to pick your moment! ⌛');
        return false;
      }
      break;
    case 2: // Location validation
      const locationSelect = document.getElementById('locationSelect');
      const vibeOther = document.getElementById('vibeOther');
      if (!locationSelect.value || (locationSelect.value === 'other' && !vibeOther.value)) {
        alert('Where are we heading bestie? 📍');
        return false;
      }
      break;
    case 3: // Activity validation
      const activitySelect = document.getElementById('activitySelect');
      const activityOther = document.getElementById('activityOther');
      if (!activitySelect.value || (activitySelect.value === 'other' && !activityOther.value)) {
        alert('What\'s the move? 🌟');
        return false;
      }
      break;
  }
  return true;
}
// Confetti effect
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.opacity = Math.random();
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => confetti.remove(), 5000);
  }
}
// --------------------------------------------------------EMAILJS--------------------------------------------------------
// EmailJS code
const submitButton = `<button type="button" id="submit" onclick="submitPlan()">it's giving perfect energy ✨</button>`;
function submitPlan() {
  if (!validateCurrentStep()) return;

  // Collect all data
  const planData = {
    date: document.getElementById('dateSelect').value,
    time: document.getElementById('timeSelect').value,
    location: document.getElementById('locationSelect').value === 'other' ? 
      document.getElementById('vibeOther').value : 
      document.getElementById('locationSelect').value,
    activity: document.getElementById('activitySelect').value === 'other' ? 
      document.getElementById('activityOther').value : 
      document.getElementById('activitySelect').value,
    thoughts: document.getElementById('thoughts').value,
    name: document.getElementById('name').value
  };

  // Log the data to verify it's being collected
  console.log("Submitting plan data:", planData);

  // Use EmailJS to send the data
  emailjs.init("D0Mm0cf4AVMp-MT-W"); // Make sure to replace with your actual EmailJS user ID
  
  emailjs.send("service_4uaaxar", "template_5eqvf8s", {
    date: planData.date,
    time: planData.time, // Ensure this is included
    location: planData.location,
    activity: planData.activity,
    thoughts: planData.thoughts,
    name: planData.name
  })
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      
      // Hide form elements only after successful submission
      options.forEach(option => option.style.display = 'none');
      document.querySelector('.nav-buttons').style.display = 'none';
      submitBtn.style.display = 'none';

      // Show success message with animation
      successMessage.style.display = 'block';

      // Create confetti effect
      createConfetti();
    })
    .catch(function(error) {
      console.log("FAILED...", error);
      alert("Oops! Something went wrong. Please try again!");
    });
}

// Add final validation function to ensure all required fields are filled
function validateFinalSubmission() {
  const requiredFields = {
    date: dateInput.value,
    time: document.getElementById('timeSelect').value,
    location: document.getElementById('locationSelect').value,
    activity: document.getElementById('activitySelect').value,
    name: document.getElementById('name').value
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      alert(`Please fill in your ${field}!`);
      return false;
    }
  }

  // Additional validation for "other" options
  if (document.getElementById('locationSelect').value === 'other' && 
      !document.getElementById('vibeOther').value) {
    alert('Please specify your location!');
    return false;
  }

  if (document.getElementById('activitySelect').value === 'other' && 
      !document.getElementById('activityOther').value) {
    alert('Please specify your activity!');
    return false;
  }

  return true;
}

// const submitButton = document.getElementById('submit'); // Removed duplicate declaration

function setSubmitButtonState(isSubmitting) {
  if (isSubmitting) {
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...✨';
  } else {
    submitButton.disabled = false;
    submitButton.textContent = "it's giving perfect energy ✨";
  }
}

