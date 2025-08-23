document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('workerForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const workerData = {
      name: document.getElementById('name').value,
      profession: document.getElementById('profession').value,
      location: document.getElementById('location').value,
      bio: document.getElementById('bio').value,
      contact: document.getElementById('contact').value
    };

    try {
      const res = await fetch('/api/workers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workerData)
      });

      if (!res.ok) throw new Error('Failed to submit');

      // alert('Profile submitted successfully!');
      form.reset();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Submission failed. Check the console.');
    }
  });
});

document.getElementById("workerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent actual form submission

  const toast = document.getElementById("toast");
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 3000);

  // Optional: Reset the form
  this.reset();
  document.getElementById("profilePreview").src = "";
});


