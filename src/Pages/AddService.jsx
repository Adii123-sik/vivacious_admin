import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

/* SECTION TITLE COMPONENT */
const Section = ({ title }) => (
  <h2 className="text-lg font-semibold mt-10 mb-4 border-b pb-2">
    {title}
  </h2>
);

const AddService = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
 const isEdit = Boolean(slug);

  const fileRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [preview, setPreview] = useState(null);


  /* AUTO SLUG GENERATOR */
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};


  const [form, setForm] = useState({
    service_name: "",
    category: "",
    service_icon: "",
    service_description: "",
    slug: "",

    intro_heading: "",
    intro_content: "",

    include_heading: "",
    include_content: "",

    include_card1_icon: "",
    include_card1_heading: "",
    include_card1_description: "",

    include_card2_icon: "",
    include_card2_heading: "",
    include_card2_description: "",

    include_card3_icon: "",
    include_card3_heading: "",
    include_card3_description: "",

    deliverables_content: "",
    how_we_work_content: "",

    result_expect_heading: "",
    result_expect_content: "",

    industry_1: "",
    industry_2: "",
    industry_3: "",
    industry_4: "",
    industry_5: "",
    industry_6: "",

    tool_1: "",
    tool_2: "",
    tool_3: "",
    tool_4: "",
    tool_5: "",
    tool_6: "",

    final_result: "",
    is_active: 1,
  });

  /* LOAD DATA FOR EDIT */
  useEffect(() => {
    if (!isEdit) return;

    const loadService = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/services/${slug}`
        );
        setForm(prev => ({ ...prev, ...data }));


        if (data.service_banner_image) {
          setPreview(data.service_banner_image);
        }
      } catch {
        toast.error("Failed to load service");
      }
    };

    loadService();
    // eslint-disable-next-line
  }, [slug]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "service_name" && !isEdit) {
    setForm({
      ...form,
      service_name: value,
      slug: generateSlug(value),
    });
  } else {
    setForm({
      ...form,
      [name]: value,
    });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.service_name || !form.slug) {
      toast.error("Service Name & Slug are required");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();

      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (bannerFile) fd.append("service_banner_image", bannerFile);

      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/services/${slug}`,
          fd
        );
        toast.success("Service updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/services`,
          fd
        );
        toast.success("Service added");
      }

      navigate("/services");
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="pt-20 px-4 md:px-10">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? "Edit Service" : "Add Service"}
          </h1>

          <div className="max-w-5xl bg-white rounded-xl shadow p-6">
            {/* BANNER IMAGE */}
            <div
              onClick={() => fileRef.current.click()}
              className="w-full h-48 border-2 border-dashed rounded-lg
              flex items-center justify-center cursor-pointer
              overflow-hidden bg-gray-50 mb-6"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">
                  Click to upload banner image
                </span>
              )}
            </div>

            <input
              type="file"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={(e) => {
                setBannerFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <form onSubmit={handleSubmit}>

              <Section title="Basic Service Information" />
              <input name="service_name" placeholder="Service Name" value={form.service_name} onChange={handleChange} className="input" />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="input" />
              <input name="service_icon" placeholder="Service Icon (bx class)" value={form.service_icon} onChange={handleChange} className="input" />
              <textarea name="service_description" placeholder="Service Description" value={form.service_description} onChange={handleChange} className="input" rows="3" />
              <input name="slug" placeholder="Slug (web-designing)" value={form.slug} onChange={handleChange} className="input" />

              <Section title="Intro Section" />
              <input name="intro_heading" placeholder="Intro Heading" value={form.intro_heading} onChange={handleChange} className="input" />
              <textarea name="intro_content" placeholder="Intro Content" value={form.intro_content} onChange={handleChange} className="input" rows="3" />

              <Section title="What’s Included" />
              <input name="include_heading" placeholder="Include Heading" value={form.include_heading} onChange={handleChange} className="input" />
              <textarea name="include_content" placeholder="Include points (one per line)" value={form.include_content} onChange={handleChange} className="input" rows="4" />

              <Section title="Include Cards (3)" />
              <input name="include_card1_icon" placeholder="Card 1 Icon" value={form.include_card1_icon} onChange={handleChange} className="input" />
              <input name="include_card1_heading" placeholder="Card 1 Heading" value={form.include_card1_heading} onChange={handleChange} className="input" />
              <textarea name="include_card1_description" placeholder="Card 1 Description" value={form.include_card1_description} onChange={handleChange} className="input" rows="2" />

              <input name="include_card2_icon" placeholder="Card 2 Icon" value={form.include_card2_icon} onChange={handleChange} className="input" />
              <input name="include_card2_heading" placeholder="Card 2 Heading" value={form.include_card2_heading} onChange={handleChange} className="input" />
              <textarea name="include_card2_description" placeholder="Card 2 Description" value={form.include_card2_description} onChange={handleChange} className="input" rows="2" />

              <input name="include_card3_icon" placeholder="Card 3 Icon" value={form.include_card3_icon} onChange={handleChange} className="input" />
              <input name="include_card3_heading" placeholder="Card 3 Heading" value={form.include_card3_heading} onChange={handleChange} className="input" />
              <textarea name="include_card3_description" placeholder="Card 3 Description" value={form.include_card3_description} onChange={handleChange} className="input" rows="2" />

              <Section title="Deliverables" />
              <textarea name="deliverables_content" placeholder="Deliverables (one per line)" value={form.deliverables_content} onChange={handleChange} className="input" rows="4" />

              <Section title="How We Work" />
              <textarea name="how_we_work_content" placeholder="Steps (one per line)" value={form.how_we_work_content} onChange={handleChange} className="input" rows="4" />

              <Section title="Result Expectation" />
              <input name="result_expect_heading" placeholder="Result Expect Heading" value={form.result_expect_heading} onChange={handleChange} className="input" />
              <textarea name="result_expect_content" placeholder="Result Expect Content" value={form.result_expect_content} onChange={handleChange} className="input" rows="3" />

              <Section title="Industries We Serve" />
              <input name="industry_1" placeholder="Industry 1" value={form.industry_1} onChange={handleChange} className="input" />
              <input name="industry_2" placeholder="Industry 2" value={form.industry_2} onChange={handleChange} className="input" />
              <input name="industry_3" placeholder="Industry 3" value={form.industry_3} onChange={handleChange} className="input" />
              <input name="industry_4" placeholder="Industry 4" value={form.industry_4} onChange={handleChange} className="input" />
              <input name="industry_5" placeholder="Industry 5" value={form.industry_5} onChange={handleChange} className="input" />
              <input name="industry_6" placeholder="Industry 6" value={form.industry_6} onChange={handleChange} className="input" />

              <Section title="Tools & Technology" />
              <input name="tool_1" placeholder="Tool 1" value={form.tool_1} onChange={handleChange} className="input" />
              <input name="tool_2" placeholder="Tool 2" value={form.tool_2} onChange={handleChange} className="input" />
              <input name="tool_3" placeholder="Tool 3" value={form.tool_3} onChange={handleChange} className="input" />
              <input name="tool_4" placeholder="Tool 4" value={form.tool_4} onChange={handleChange} className="input" />
              <input name="tool_5" placeholder="Tool 5" value={form.tool_5} onChange={handleChange} className="input" />
              <input name="tool_6" placeholder="Tool 6" value={form.tool_6} onChange={handleChange} className="input" />

              <Section title="Final Result" />
              <textarea name="final_result" placeholder="Final Result Content" value={form.final_result} onChange={handleChange} className="input" rows="3" />

              <button
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded mt-8"
              >
                {loading ? "Saving..." : "Save Service"}
              </button>

            </form>
          </div>
        </main>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #cbd5e1;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default AddService;
