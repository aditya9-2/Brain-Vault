import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";

const App = () => {

  const routes = (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )


  return <>{routes}</>
}
export default App;