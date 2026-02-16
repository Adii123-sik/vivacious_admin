import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import QueryList from "./Pages/QueryList";
import AddReview from "./Pages/AddReview";
import Reviews from "./Pages/Reviews";
import Team from "./Pages/Team";
import AddTeam from "./Pages/AddTeam";
import Projects from "./Pages/Projects";
import AddProject from "./Pages/AddProject";
import Blog from "./Pages/Blog";
import AddBlog from "./Pages/AddBlog";
import Pricing from "./Pages/Pricing";
import AddPricing from "./Pages/AddPricing";
import Partners from "./Pages/Partners"
import AddPartner from "./Pages/AddPartner";
import Settings from "./Pages/Settings";
import History from "./Pages/History"
import AddHistory from "./Pages/AddHistory";
import FAQ from "./Pages/FAQ";
import AddFAQ from "./Pages/AddFAQ";
import Services from "./Pages/Services";
import AddService from "./Pages/AddService";
import OurOfflineServices from "./Pages/OurOfflineServices";
import AddOfflineService from "./Pages/AddOfflineService";


export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/queries" element={<QueryList />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/edit-review/:id" element={<AddReview />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/add" element={<AddTeam />} />
        <Route path="/team/edit/:id" element={<AddTeam />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects/edit/:id" element={<AddProject />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/blogs/edit/:id" element={<AddBlog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/add" element={<AddPricing />} />
        <Route path="/pricing/edit/:id" element={<AddPricing />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/add" element={<AddPartner />} />
        <Route path="/partners/edit/:id" element={<AddPartner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/add" element={<AddHistory />} />
        <Route path="/history/edit/:id" element={<AddHistory />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq/add" element={<AddFAQ />} />
        <Route path="/faq/edit/:id" element={<AddFAQ />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/add" element={<AddService />} />
        <Route path="/services/edit/:slug" element={<AddService />} />
        <Route path="/offline-services" element={<OurOfflineServices/>}/>
        <Route path="/offline-services/add" element={<AddOfflineService/>}/>
        <Route path="/offline-services/edit/:id" element={<AddOfflineService/>}/>









        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
