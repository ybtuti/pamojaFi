import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import CreateProposal from "../pages/CreateProposal";
import Community from "../pages/Community";
import Pending from "../pages/Pending";
import ProjectView from "../pages/ProjectView";

function App() {
  return (
    <div className="max-w-[1190px] mx-auto my-0 py-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateProposal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/project" element={<ProjectView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
