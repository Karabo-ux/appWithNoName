const form = document.getElementById('workerForm');
console.log("Script loaded");

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("Form submitted");

  const name = document.getElementById('name').value;
  const profession = document.getElementById('profession').value;
  const bio = document.getElementById('bio').value;
  const location = document.getElementById('location').value;
  const contact = document.getElementById('contact').value;

  const profilePicUrl = "https://via.placeholder.com/150";
  const proofs = [
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/201"
  ];

  const data = {
    name,
    profession,
    bio,
    location,
    contact,
    profilePicUrl,
    proofs
  };

  console.log("Sending data:", data);

  try {
    const response = await fetch('http://localhost:5000/api/workers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Response:", result);

    if (response.ok) {
      alert('Profile submitted successfully!');
      form.reset();
    } else {
      alert('Something went wrong.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit profile. Check console for details.');
  }
});
