import "./css/styles.css";
import Travel from "./component/Travel";
import data from "./component/data";
import Navbar from "./component/Navbar";
import Meme from "./component/Meme";

export default function Page() {
  const cards = data.map((item) => {
    return <Travel key={item.id} {...item} />;
  });
  return (
    <div className="oss">
      <div className="warning">
        <p>This website is only visible from a computer</p>
      </div>
      <div className="bg">
        <Navbar />
        <Meme />
      </div>
    </div>
  );
}
