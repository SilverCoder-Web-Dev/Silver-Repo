import React, { useState } from "react";

const App: React.FC = () => {
  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // ✅ Error State
  const [errors, setErrors] = useState<string[]>([]);

  // ✅ Handle input changes (text, email, password)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation checks
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      newErrors.push("All fields are required.");
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match.");
    }
    if (!formData.acceptTerms) {
      newErrors.push("You must accept the terms & conditions.");
    }

    setErrors(newErrors);

    // If no errors, display values
    if (newErrors.length === 0) {
      alert(
        `✅ Form Submitted!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}\nAccepted Terms: ${formData.acceptTerms}`
      );
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 400 }}>
      <h2>Sign Up Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>
            Name: <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Email */}
        <div>
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Password */}
        <div>
          <label>
            Password: <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Confirm Password */}
        <div>
          <label>
            Confirm Password: <br />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Checkbox */}
        <div>
          <label>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            I accept terms & conditions
          </label>
        </div>

        {/* Submit */}
        <button type="submit">Sign Up</button>
      </form>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{ marginTop: 10, color: "red" }}>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;