import Sidebar from '../components/Dashboard/Sidebar'; // Import the Sidebar component
import Header from '../components/Dashboard/Header'; // Import the Header component
import MainContent from '../components/Dashboard/MainContent'; // Import the MainContent component
import Footer from '../components/Dashboard/Footer'; // Import the Footer component


export default function Dashboard() {

  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row">
          <Sidebar/> {/* Render the Sidebar component */}
          <div className="col-lg-10 offset-lg-2 p-4 card-section">
            <Header /> {/* Render the Header component */}
            <MainContent /> {/* Render the MainContent component */}
            <Footer /> {/* Render the Footer component */}
          </div>
        </div>
      </div>
    </>
  );
}