import './App.css';
import LanguageSelector from './components/LanguageSelector';
import BooksTable from './components/BooksTable';
import SeedInput from './components/SeedInput';
import LikeSlider from './components/LikesSlider';
import ReviewInput from './components/ReviewsInput';

function App() {
  return (
    <div className="App container mt-5">
      <div className="row mb-4">
        <div className="col-md-3">
          <LanguageSelector />
        </div>
        <div className="col-md-3">
          <SeedInput />
        </div>
        <div className="col-md-3">
          <LikeSlider />
        </div>
        <div className="col-md-3">
          <ReviewInput />
        </div>
      </div>
      <BooksTable />
    </div>
  );
}

export default App;
