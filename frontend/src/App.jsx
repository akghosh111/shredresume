import "./App.css";
import Hero from "./components/Hero";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="container">
          <div className="item-container">
            <Hero />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
