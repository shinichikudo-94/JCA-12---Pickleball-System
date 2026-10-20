const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Enter your name"]').value.trim();
  const grade = document.querySelector('input[placeholder="Enter your grade & section"]').value.trim();
  const email = document.querySelector('input[placeholder="Enter your email"]').value.trim();
  const contact = document.querySelector('input[placeholder="Enter your contact number"]').value.trim();
  const password = document.querySelector('input[placeholder="Enter your password"]').value;
  const confirmPassword = document.querySelector('input[placeholder="Confirm your password"]').value;

  // Role
  const roleRadio = document.querySelector('input[name="role"]:checked');
  const role = roleRadio ? roleRadio.value : "";

  // Gender
  const genderRadio = document.querySelector('input[name="gender"]:checked');
  const gender = genderRadio ? genderRadio.value : "";

  // Validation
  if (!name || !grade || !email || !contact || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (!role) {
    alert("Please select Student or Admin.");
    return;
  }

  if (!gender) {
    alert("Please select your gender.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    alert("Password should be at least 6 characters.");
    return;
  }

  // Success
  alert("Success!\nRole: " + role + "\nName: " + name);

  // Save (simple)
  const user = { name, grade, email, contact, password, gender, role };
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  form.reset();
});