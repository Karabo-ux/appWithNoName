// Store all worker profiles in-memory for now
const workerProfiles = [];

// Handle image preview for profile picture
document.getElementById('profilePic').addEventListener('change', function (event) {
  const preview = document.getElementById('profilePreview');
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.width = '100px';
      preview.style.height = '100px';
      preview.style.objectFit = 'cover';
      preview.style.marginTop = '10px';
    };
    reader.readAsDataURL(file);
  }
});

// Handle form submission
document.getElementById('workerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const profession = document.getElementById('profession').value;
  const bio = document.getElementById('bio').value;
  const location = document.getElementById('location').value;
  const contact = document.getElementById('contact').value;

  const profilePic = document.getElementById('profilePic').files[0];
  const proofImages = Array.from(document.getElementById('proof').files);

  // Prepare a worker object
  const worker = {
    name,
    profession,
    bio,
    location,
    contact,
    profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
    proofs: proofImages.map(file => URL.createObjectURL(file))
  };

  // Save to memory (in a real app, you'd send this to a backend)
  workerProfiles.push(worker);

  alert("Profile submitted successfully!");

  // Reset form
  document.getElementById('workerForm').reset();
  document.getElementById('profilePreview').src = '';
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const profession = document.getElementById("searchProfession").value.trim();
    const location = document.getElementById("searchLocation").value.trim();

    if (!profession || !location) {
      alert("Please select both a profession and location.");
      return;
    }

    // Redirect with query parameters
    const redirectUrl = `results.html?profession=${encodeURIComponent(profession)}&location=${encodeURIComponent(location)}`;
    window.location.href = redirectUrl;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("searchLocation");
  const professionSelect = document.getElementById("searchProfession");
  const resultsDiv = document.getElementById("workerResults");

  async function fetchWorkers() {
    const location = locationInput.value.trim();
    const profession = professionSelect.value;

    let query = `?`;
    if (location) query += `location=${encodeURIComponent(location)}&`;
    if (profession) query += `profession=${encodeURIComponent(profession)}`;

    const res = await fetch(`/api/workers${query}`);
    const data = await res.json();

    resultsDiv.innerHTML = data.length
      ? data.map(worker => `
          <div class="bg-white shadow p-4 rounded">
            <h3 class="text-xl font-bold text-green-700">${worker.name}</h3>
            <p><strong>Profession:</strong> ${worker.profession}</p>
            <p><strong>Location:</strong> ${worker.location}</p>
            <p><strong>Contact:</strong> ${worker.contact}</p>
            <p><strong>Bio:</strong> ${worker.bio}</p>
            <img src="${worker.profilePicUrl}" class="w-32 mt-2 rounded shadow" />
          </div>
        `).join("")
      : `<p class="text-gray-600 text-center">No workers found for that criteria.</p>`;
  }

  locationInput.addEventListener("input", fetchWorkers);
  professionSelect.addEventListener("change", fetchWorkers);
});

document.addEventListener('DOMContentLoaded', () => {
  const locationInput = document.getElementById('searchLocation');
  const skillSelect = document.getElementById('searchProfession');
  const workerResults = document.getElementById('workerResults');

  // Create a submit button dynamically or you can add it in your HTML if you haven't
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Search';
  submitBtn.className = 'bg-green-600 text-white rounded-xl px-5 py-3 font-semibold hover:bg-green-700 transition';
  submitBtn.type = 'button';

  // Insert submit button below inputs (assuming inputs are wrapped in a container)
  const inputsContainer = locationInput.parentElement;
  inputsContainer.appendChild(submitBtn);

  submitBtn.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    const skill = skillSelect.value;

    // Clear previous results
    workerResults.innerHTML = '<p class="text-green-700 font-semibold">Loading...</p>';

    try {
      const query = new URLSearchParams();
      if(location) query.append('location', location);
      if(skill) query.append('skill', skill);

      const response = await fetch(`/workers?${query.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const workers = await response.json();

      if (workers.length === 0) {
        workerResults.innerHTML = '<p class="text-green-700 font-semibold">No workers found for the specified criteria.</p>';
        return;
      }

      // Render worker cards
      workerResults.innerHTML = workers.map(worker => `
        <div class="border border-green-300 rounded-lg p-4 shadow-sm bg-white">
          <h4 class="text-lg font-bold text-green-700 mb-1">${worker.name}</h4>
          <p><strong>Skill:</strong> ${worker.skill}</p>
          <p><strong>Location:</strong> ${worker.location}</p>
          <p><strong>Contact:</strong> <a href="tel:${worker.phone}" class="text-green-600 hover:underline">${worker.phone}</a></p>
        </div>
      `).join('');

    } catch (error) {
      console.error('Error fetching workers:', error);
      workerResults.innerHTML = '<p class="text-red-600 font-semibold">Failed to load workers. Please try again later.</p>';
    }
  });
});
