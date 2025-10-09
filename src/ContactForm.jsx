import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
    promo: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const VALID_PROMO = "5792"; // الكود الصحيح

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.promo !== VALID_PROMO) {
      setError("❌ Invalid promo code!");
      setLoading(false);
      return;
    }

    // هنا حط اللينك الجديد بتاع الـ Web App
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxto5ZFl5EgNT4mPUIEncz6eE3OpWBtYMVKf0kBtuZFlEiEv4wEwMlXGvjgkMe7SDwp/exec";

    try {
      const body = new URLSearchParams(form).toString();

      await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      setSent(true);
      setForm({ name: "", email: "", phone: "", language: "", promo: "" });
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Course registration
      </h2>

      {sent && (
        <div className="bg-green-100 text-green-800 border border-green-300 rounded p-3 text-sm text-center mb-4 shadow-md animate-bounce">
          ✅ Thank you for Registering
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 border border-red-300 rounded p-3 text-sm text-center mb-4 shadow-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Choose: Python or C++?</option>
          <option value="Python">Python</option>
          <option value="C++">C++</option>
        </select>

        <input
          type="number"
          name="promo"
          value={form.promo}
          onChange={handleChange}
          placeholder="Enter Promo Code"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}
