import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);

      await fetch(
        "https://script.google.com/macros/s/AKfycbxto5ZFl5EgNT4mPUIEncz6eE3OpWBtYMVKf0kBtuZFlEiEv4wEwMlXGvjgkMe7SDwp/exec",
        {
          method: "POST",
          mode: "no-cors", // ضروري
          body: formData, // ✅ مش JSON
        }
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Feedback about Bahaa Shahein 
      </h2>

      {sent && (
        <div className="bg-green-100 text-green-800 border border-green-300 rounded p-3 text-sm text-center mb-4 shadow-md animate-bounce">
          شكرا علي رأيك يا عسول💙✨
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
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Send Your message"
          required
          className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
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
