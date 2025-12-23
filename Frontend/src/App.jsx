import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import UploadCourse from "./pages/UploadCourse";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/uploads" element={<UploadCourse />} />
      </Routes>
    </>
  );
}
