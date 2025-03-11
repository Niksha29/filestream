import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUploader from "./components/FileUploader";
import FileDownloader from "./components/FileDownloader";
import FileAccess from "./components/FileAccess";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<FileUploader />} />
          <Route path="/download/:id" element={<FileAccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
