import { useState } from "react";
import "./App.css";

const phrases = [
  "No",
  "Är du säker? 🥺",
  "vill du verkligen inte ??????",
  "Pleaseee 💕",
  "Don’t do this to me 😭",
  "komigen elskliiiing",
  "Ajaj mitt härta 💔",
];

const yesImage = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
const noImages = [
  "https://tenor.com/view/sad-lonely-frog-little-frog-tear-gif-7707780315143387184.gif",
  "https://tenor.com/view/sad-spongebob-sad-reaction-meme-gif-1418144503451126279.gif",
  "https://tenor.com/view/sad-dog-sad-face-crying-crying-baby-gif-10103206880427503134.gif",
  "https://tenor.com/view/bubu-dudu-sseeyall-gif-1555753298461515374.gif",
  "https://tenor.com/view/crying-cat-sad-kitty-sad-sad-cat-cat-tearing-up-meme-gif-18116533612288367470.gif",
  "https://tenor.com/view/lonzo-ball-gif-18200502533676043549.gif",
  "https://tenor.com/view/cute-sad-gif-25924265.gif",
  "https://tenor.com/view/crying-sad-gif-2564501088571364363.gif",
  "https://tenor.com/view/sadhamstergirl-gif-4231717927828306245.gif",
  "https://tenor.com/view/guy-crying-meme-guy-crying-crying-guy-sad-upset-gif-729576816667693567.gif",
];

// Startbild innan någon knapp klickas
const startImage = "https://tenor.com/view/wow-gif-9634284945825419576.gif";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPos, setNoPos] = useState({ top: 0, left: 0 });
  const [currentNoImage, setCurrentNoImage] = useState<string | null>(startImage);

  const yesSize = 16 + noCount * 18;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 50;
    setNoPos({
      left: Math.random() * maxX,
      top: Math.random() * maxY,
    });
    const randomIndex = Math.floor(Math.random() * noImages.length);
    setCurrentNoImage(noImages[randomIndex]);
  };

  const containerStyle: React.CSSProperties = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#ff9a9e",
    fontFamily: "system-ui, sans-serif",
    textAlign: "center",
    padding: "0 20px",
    boxSizing: "border-box",
    position: "relative",
  };

  const startImageStyle: React.CSSProperties = {
    display: 'block',
    margin: '0 auto',
    width: '400px', // större bredd
    height: 'auto',
  };

  const noImageStyle: React.CSSProperties = {
    display: 'block',
    margin: '0 auto',
    width: '200px',
    height: 'auto',
  };

  if (yesPressed) {
    return (
      <div style={containerStyle}>
        <img src={yesImage} alt="love" style={{ display: 'block', margin: '0 auto', width: 300, height: 'auto' }} />
        <h1>YAAAAY 💖</h1>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <img src={currentNoImage!} alt="reaction" style={currentNoImage === startImage ? startImageStyle : noImageStyle} />
      <h2>Will you be my Valentine? 💌</h2>

      <div style={{ position: 'relative', width: '100%', height: '100px' }}>
        <button
          style={{ fontSize: `${yesSize}px` }}
          onClick={() => setYesPressed(true)}
        >
          Yes
        </button>

        <button
          style={{
            position: 'absolute',
            left: `${noPos.left}px`,
            top: `${noPos.top}px`,
          }}
          onClick={handleNoClick}
        >
          {phrases[Math.min(noCount, phrases.length - 1)]}
        </button>
      </div>
    </div>
  );
}

export default App;