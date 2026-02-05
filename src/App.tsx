import { useState, useRef } from "react";
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
  "https://tenor.com/view/crying-cat-sad-kitty-sad-sad-cat-cat-tearing-up-meme-gif-18116533612288367470.gif",
  "https://tenor.com/view/guy-crying-meme-guy-crying-crying-guy-sad-upset-gif-729576816667693567.gif",
  "https://tenor.com/view/bubu-dudu-sseeyall-gif-1555753298461515374.gif",
  "https://tenor.com/view/lonzo-ball-gif-18200502533676043549.gif"
];
const startImage = "https://tenor.com/view/wow-gif-9634284945825419576.gif";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPos, setNoPos] = useState({ top: 0, left: 0 });
  const [currentNoImage, setCurrentNoImage] = useState<string | null>(startImage);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [bounce, setBounce] = useState(false);

  const yesSize = 16 + noCount * 18;
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // No-knappens logik: flyttar men stannar inom fönstret
  const handleNoClick = () => {
    setNoCount(noCount + 1);

    const btnWidth = noButtonRef.current?.offsetWidth || 120;
    const btnHeight = noButtonRef.current?.offsetHeight || 50;

    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    setNoPos({
      left: Math.random() * maxX,
      top: Math.random() * maxY,
    });

    setBounce(true);
    setTimeout(() => setBounce(false), 500);

    const randomIndex = Math.floor(Math.random() * noImages.length);
    setCurrentNoImage(noImages[randomIndex]);
  };

  // Hjärtan på musen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.clientX;
    const y = e.clientY;

    const newHeart = { id: Date.now() + Math.random(), x, y };
    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
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
    overflow: "hidden",
  };

  const startImageStyle = { width: '400px', height: 'auto', display: 'block', margin: '0 auto' };
  const noImageStyle = { width: '200px', height: 'auto', display: 'block', margin: '0 auto' };

  if (yesPressed) {
    return (
      <div style={containerStyle} onMouseMove={handleMouseMove}>
        <img src={yesImage} alt="love" style={{ width: 300, height: 'auto', margin: '0 auto' }} />
        <h1>YAAAAY 💖</h1>

        {hearts.map(h => (
          <div key={h.id} className="heart" style={{ left: h.x, top: h.y }}>
            ❤️
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={containerStyle} onMouseMove={handleMouseMove}>
      <img
        src={currentNoImage!}
        alt="reaction"
        style={currentNoImage === startImage ? startImageStyle : noImageStyle}
      />
      <h2>Will you be my Valentine? 💌</h2>

      <div style={{ position: 'relative', width: '100%', height: '100px' }}>
        <button
          className="yesButton"
          style={{ fontSize: `${yesSize}px` }}
          onClick={() => setYesPressed(true)}
        >
          Yes
        </button>

        <button
  ref={noButtonRef}
  className={`noButton ${bounce ? 'bounce' : ''}`}
  style={{ position: 'fixed', left: `${noPos.left}px`, top: `${noPos.top}px` }}
  onClick={handleNoClick}
>
  {phrases[Math.min(noCount, phrases.length - 1)]}
</button>
      </div>

      {hearts.map(h => (
        <div key={h.id} className="heart" style={{ left: h.x, top: h.y }}>
          ❤️
        </div>
      ))}
    </div>
  );
}

export default App;
