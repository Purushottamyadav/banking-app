import { useNavigate } from "react-router-dom";
import './Home.css'
function HomePage() {
    const navigate = useNavigate();
  
    return (
    <>
            
        <div className="main-container">
            <h1>Welcome To Net Banking Solution</h1>
            <div ><button  onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Register</button></div>  
        </div>
        
    </>
    );
  }
  export default HomePage;
  