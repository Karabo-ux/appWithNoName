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
