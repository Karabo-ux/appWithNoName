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

      alert('Profile submitted successfully!');
      form.reset();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Submission failed. Check the console.');
    }
  });
});
