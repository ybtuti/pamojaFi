import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import CreateProposal from "../pages/CreateProposal";
import Community from "../pages/Community";
import Pending from "../pages/Pending";
import ProjectView from "../pages/ProjectView";
import ProposalDetail from "../components/app/proposal-details/Proposal";
import ErrorPage from "../pages/ErrorPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateProposal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/project" element={<ProjectView />} />
          <Route path="/proposals/:id" element={<ProposalDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
