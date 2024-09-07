import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Footer from "./components/navbar/footer";
import Blog from "./components/blog/blog";
import Dashboard from "./components/dashboard/dashboard";
import CreateBlog from "./components/create&editblog/createBlog";
import EditBlog from "./components/create&editblog/editBlog";
import Login from "./components/login/login";
import UserRegistration from "./components/login/userRegistration";
import Message from "./components/message/message";

function App() {
  return (
    <div className="App">
      <Message />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userRegistration" element={<UserRegistration />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
