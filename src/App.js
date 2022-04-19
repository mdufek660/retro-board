import logo from './logo.svg';
import './App.css';
import Category from "./components/Category/Category";

function App() {
  return (
    <div className="App">
      <Category title="Went well" bgc="rgba(100,175,100,.5)"/>
      <Category title="To Improve" bgc="rgba(175,100,100,.5)"/>
      <Category title="Action Items" bgc="rgba(175,175,100,.5)"/>
    </div>
  );
}

export default App;
