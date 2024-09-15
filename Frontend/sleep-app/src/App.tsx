import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import SleepEfficiencyIntro from "./pages/SleepEfficiencyIntro";
import SleepGoal from "./pages/SleepGoal";
import SleepStruggle from "./pages/SleepStruggle";
import Bedtime from "./pages/Bedtime";
import WakeTime from "./pages/WakeTime";
import SleepHours from "./pages/SleepHours";
import SleepEfficiencyResult from "./pages/SleepEfficiencyResult/SleepEfficiencyResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sleep-efficiency" element={<SleepEfficiencyIntro />} />
        <Route path="/sleep-goal" element={<SleepGoal />} />
        <Route path="/sleep-struggle" element={<SleepStruggle />} />
        <Route path="/bedtime" element={<Bedtime />} />
        <Route path="/waketime" element={<WakeTime />} />
        <Route path="/sleep-hours" element={<SleepHours />} />
        <Route
          path="/sleep-efficiency-result"
          element={<SleepEfficiencyResult />}
        />
      </Routes>
    </Router>
  );
}

export default App;
