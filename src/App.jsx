import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mixer from "./pages/Mixer";
import Theory from "./pages/Theory";
import Workshop from "./pages/Workshop";
import WorkshopProject from "./pages/WorkshopProject";
import SessionForm from "./pages/SessionForm";
import CustomMixer from "./pages/CustomMixer";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path={routes.mixer} element={<Mixer />} />
        <Route path={routes.theory} element={<Theory />} />
        <Route path={routes.workshop} element={<Workshop />} />
        <Route path={routes.workshopProject} element={<WorkshopProject />} />
        <Route path={routes.sessionForm} element={<SessionForm />} />
        <Route path={routes.sessionMixer} element={<CustomMixer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
