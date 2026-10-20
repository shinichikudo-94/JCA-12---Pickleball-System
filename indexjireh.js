const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIrx2AIui7yOusL5pfH-EjUMtuc-LSudvD3YaY7bVwrv05BCG9RDs7t7KJ01np4SQ/exec';

const form = document.querySelector('form');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Enter your name"]').value.trim();
  const grade = document.querySelector('input[placeholder="Enter your grade & section"]').value.trim();
  const email = document.querySelector('input[placeholder="Enter your email"]').value.trim();
  const contact = document.querySelector('input[placeholder="Enter your contact number"]').value.trim();
  const password = document.querySelector('input[placeholder="Enter your password"]').value;
  const confirmPassword = document.querySelector('input[placeholder="Confirm your password"]').value;

  const roleRadio = document.querySelector('input[name="role"]:checked');
  const role = roleRadio ? roleRadio.value : "";

  const genderRadio = document.querySelector('input[name="gender"]:checked');
  const gender = genderRadio ? genderRadio.value : "";

  if (!name || !grade || !email || !contact || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }
  if (!role) { alert("Please select Student or Admin."); return; }
  if (!gender) { alert("Please select your gender."); return; }
  if (password !== confirmPassword) { alert("Passwords do not match."); return; }
  if (password.length < 6) { alert("Password should be at least 6 characters."); return; }

  const params = new URLSearchParams({
    action: 'register',
    name, grade, email, contact, password, gender, role
  });

  try {
    const res = await fetch(WEB_APP_URL + '?' + params.toString());
    const result = await res.json();

    if (result.success) {
      alert("Registered successfully!");
      // Redirect based on role
      if (role === 'student') {
        window.location.href = 'reservationbody.html';
      } else if (role === 'admin') {
        window.location.href = 'Reservation_Admin.html';
      }
    } else {
      alert(result.message || "Registration failed");
    }
  } catch (err) {
    alert("Error connecting to server.");
    console.error(err);
  }
});
