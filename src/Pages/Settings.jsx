import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { getSettings, updateSettings } from "../services/settingService";
import { API_BASE_URL } from "../config/apiConfig";


const Settings = () => {
  const [form, setForm] = useState({});
   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* LOAD SETTINGS */
  useEffect(() => {
    getSettings()
      .then((data) => setForm(data || {}))
      .catch(() => toast.error("Failed to load settings"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (key, file) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateSettings(form);
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />


        <main className="pt-20 px-4 md:px-8 max-w-7xl">
          <h1 className="text-2xl font-semibold mb-6">Website Settings</h1>

          {/* ================= META ================= */}
          <Section title="Meta Information">
            <Input label="Meta Title" name="meta_title" value={form.meta_title || ""} onChange={handleChange} />
            <Input label="Meta Keyword" name="meta_keyword" value={form.meta_keyword || ""} onChange={handleChange} />
            <Textarea label="Meta Description" name="meta_description" value={form.meta_description || ""} onChange={handleChange} />
          </Section>

          {/* ================= CONTACT ================= */}
          <Section title="Contact Information">
            <Input label="Contact Number" name="contact_number" value={form.contact_number || ""} onChange={handleChange} />
            <Input label="Whatsapp Number" name="whatsapp_number" value={form.whatsapp_number || ""} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email || ""} onChange={handleChange} />
            <Input label="Opening Time" name="opening_time" value={form.opening_time || ""} onChange={handleChange} />
            <Textarea label="Address" name="address" value={form.address || ""} onChange={handleChange} />
          </Section>

          {/* ================= SOCIAL ================= */}
          <Section title="Social Links">
            <Input label="Facebook" name="facebook_link" value={form.facebook_link || ""} onChange={handleChange} />
            <Input label="Twitter / X" name="twitter_link" value={form.twitter_link || ""} onChange={handleChange} />
            <Input label="Instagram" name="instagram_link" value={form.instagram_link || ""} onChange={handleChange} />
            <Input label="YouTube" name="youtube_link" value={form.youtube_link || ""} onChange={handleChange} />
            <Input label="LinkedIn" name="linkedin_link" value={form.linkedin_link || ""} onChange={handleChange} />
          </Section>

          {/* ================= COUNTERS ================= */}
          <Section title="Counter Area">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <Input label={`Counter ${i}`} name={`point${i}`} value={form[`point${i}`] || ""} onChange={handleChange} />
                <Input label={`Counter ${i} Label`} name={`value${i}`} value={form[`value${i}`] || ""} onChange={handleChange} />
              </React.Fragment>
            ))}
          </Section>

          {/* ================= WHY CHOOSE US ================= */}
          <Section title="Why Choose Us">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <React.Fragment key={i}>
                <Input
                  label={`Point ${i}`}
                  name={`why_point${i}`}
                  value={form[`why_point${i}`] || ""}
                  onChange={handleChange}
                />
                <Textarea
                  label={`Description ${i}`}
                  name={`why_value${i}`}
                  value={form[`why_value${i}`] || ""}
                  onChange={handleChange}
                />
              </React.Fragment>
            ))}
          </Section>

          {/* ================= ABOUT US ================= */}
          <Section title="About Us Content">

            <Input
              name="about_subtitle"
              label="Subtitle"
              placeholder="About Vivacious Solutions"
              value={form.about_subtitle || ""}
              onChange={handleChange}
            />

            <Input
              name="about_heading"
              label="Heading"
              placeholder="Grow Your Business with Smart Digital Marketing"
              value={form.about_heading || ""}
              onChange={handleChange}
            />

            <Textarea
              name="about_description_top"
              label="Top Description"
              placeholder="First paragraph of About Us"
              value={form.about_description_top || ""}
              onChange={handleChange}
            />

            <Textarea
              name="about_description_bottom"
              label="Bottom Description"
              placeholder="Second paragraph of About Us"
              value={form.about_description_bottom || ""}
              onChange={handleChange}
            />

            <hr />

            <h3 className="font-semibold mb-2">About Us Feature List</h3>

            <Input
              name="about_feature1_title"
              label="Feature 1 Title"
              placeholder="Trusted"
              value={form.about_feature1_title || ""}
              onChange={handleChange}
            />
            <Input
              name="about_feature1_desc"
              label="Feature 1 Description"
              placeholder="Digital partner"
              value={form.about_feature1_desc || ""}
              onChange={handleChange}
            />

            <Input
              name="about_feature2_title"
              label="Feature 2 Title"
              placeholder="Creative"
              value={form.about_feature2_title || ""}
              onChange={handleChange}
            />
            <Input
              name="about_feature2_desc"
              label="Feature 2 Description"
              placeholder="Marketing & design"
              value={form.about_feature2_desc || ""}
              onChange={handleChange}
            />

            <Input
              name="about_feature3_title"
              label="Feature 3 Title"
              placeholder="Results"
              value={form.about_feature3_title || ""}
              onChange={handleChange}
            />
            <Input
              name="about_feature3_desc"
              label="Feature 3 Description"
              placeholder="Leads & sales growth"
              value={form.about_feature3_desc || ""}
              onChange={handleChange}
            />

            <Input
              name="about_feature4_title"
              label="Feature 4 Title"
              placeholder="Support"
              value={form.about_feature4_title || ""}
              onChange={handleChange}
            />
            <Input
              name="about_feature4_desc"
              label="Feature 4 Description"
              placeholder="Consulting & service"
              value={form.about_feature4_desc || ""}
              onChange={handleChange}
            />

          </Section>


          {/* ================= PRIVACY POLICY ================= */}
          <Section title="Privacy Policy">
            <Input name="privacy_last_updated" label="Last Updated" value={form.privacy_last_updated || ""} onChange={handleChange} />
            <Textarea name="privacy_intro" label="Intro" value={form.privacy_intro || ""} onChange={handleChange} />
            <Textarea name="privacy_info_direct" label="Info Collected (Direct)" value={form.privacy_info_direct || ""} onChange={handleChange} />
            <Textarea name="privacy_info_automatic" label="Info Collected (Automatic)" value={form.privacy_info_automatic || ""} onChange={handleChange} />
            <Textarea name="privacy_info_third_party" label="Info from Third Parties" value={form.privacy_info_third_party || ""} onChange={handleChange} />
            <Textarea name="privacy_usage" label="How We Use Info" value={form.privacy_usage || ""} onChange={handleChange} />
            <Textarea name="privacy_sharing" label="Sharing of Info" value={form.privacy_sharing || ""} onChange={handleChange} />
            <Textarea name="privacy_user_rights" label="User Rights" value={form.privacy_user_rights || ""} onChange={handleChange} />
          </Section>

          {/* ================= TERMS ================= */}
          <Section title="Terms & Conditions">

            <Input
              label="Last Updated"
              name="terms_last_updated"
              placeholder="Last Updated: 8/2/2026"
              value={form.terms_last_updated || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Acceptance of Terms"
              name="terms_acceptance"
              placeholder="Acceptance of terms content"
              value={form.terms_acceptance || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Authority to Bind"
              name="terms_authority"
              placeholder="Authority to bind content"
              value={form.terms_authority || ""}
              onChange={handleChange}
            />

            {/* ===== DEFINITIONS (SPLIT FIELDS – DB MATCHED) ===== */}
            <Textarea
              label="Definitions – Client"
              name="terms_definitions_client"
              placeholder="Any person or entity using the Site..."
              value={form.terms_definitions_client || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Definitions – Deliverables"
              name="terms_definitions_deliverables"
              placeholder="Work product we produce..."
              value={form.terms_definitions_deliverables || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Definitions – Proposal / SOW"
              name="terms_definitions_proposal"
              placeholder="Any quotation, estimate, scope of work..."
              value={form.terms_definitions_proposal || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Definitions – Third Party Platforms"
              name="terms_definitions_third_party"
              placeholder="Tools or services not owned by us..."
              value={form.terms_definitions_third_party || ""}
              onChange={handleChange}
            />

            {/* ===== USING THE SITE ===== */}
            <Textarea
              label="Using the Site – Intro"
              name="terms_site_usage_intro"
              placeholder="You may browse the Site for lawful purposes only."
              value={form.terms_site_usage_intro || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Using the Site – Restrictions"
              name="terms_site_usage_restrictions"
              placeholder="Copy, scrape, reverse engineer..."
              value={form.terms_site_usage_restrictions || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Using the Site – Notice"
              name="terms_site_usage_notice"
              placeholder="We may update or suspend Site access..."
              value={form.terms_site_usage_notice || ""}
              onChange={handleChange}
            />

            {/* ===== SERVICES ===== */}
            <Textarea
              label="Services & Deliverables"
              name="terms_services"
              placeholder="Services will be provided as agreed..."
              value={form.terms_services || ""}
              onChange={handleChange}
            />

            {/* ===== THIRD PARTY PLATFORMS ===== */}
            <Textarea
              label="Third Party Platforms"
              name="terms_third_party_platforms"
              placeholder="Some services depend on third-party platforms..."
              value={form.terms_third_party_platforms || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Changes to Terms"
              name="terms_changes"
              placeholder="We may update these Terms from time to time..."
              value={form.terms_changes || ""}
              onChange={handleChange}
            />

            <Textarea
              label="Contact (Terms)"
              name="terms_contact"
              placeholder="Contact details for terms"
              value={form.terms_contact || ""}
              onChange={handleChange}
            />

          </Section>

          {/* ================= IMAGES ================= */}
          <Section title="Images">
            <ImagePreview file={form.why_image} />
            <input type="file" onChange={(e) => handleFile("why_image", e.target.files[0])} />

            <ImagePreview file={form.logo_image} />
            <input type="file" onChange={(e) => handleFile("logo_image", e.target.files[0])} />
          </Section>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Settings"}
          </button>
        </main>
      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow mb-6">
    <h2 className="font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <>
    <label className="text-sm font-medium">{label}</label>
    <input className="w-full border p-2 rounded mb-3" {...props} />
  </>
);

const Textarea = ({ label, ...props }) => (
  <>
    <label className="text-sm font-medium">{label}</label>
    <textarea rows="3" className="w-full border p-2 rounded mb-3" {...props} />
  </>
);

const ImagePreview = ({ file }) => {
  if (!file) return null;

  const src =
    typeof file === "string"
      ? file // ✅ Cloudinary URL direct
      : URL.createObjectURL(file);

  return (
    <img
      src={src}
      alt="preview"
      className="w-full max-w-sm mb-3 border rounded"
    />
  );
};


export default Settings;

