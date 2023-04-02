//* Bootstrap CSS ve JS.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Candidate from "./components/Candidate";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>

      <Candidate />
    </Provider>
  
  );
}

export default App;
