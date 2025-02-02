import { useState, useEffect, useRef } from "react";
import { evaluate, simplify } from "mathjs";

export default function HeartGame() {
  const [fx, setFx] = useState("");
  const [gx, setGx] = useState("");
  const [hx, setHx] = useState("");
  const [ix, setIx] = useState("");
  const [isValid, setIsValid] = useState({ fx: true, gx: true, hx: true, ix: true });
  const [showMessage, setShowMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    validateInputs();
    drawGraph();
  }, [fx, gx, hx, ix, showMessage]);

  const validateInputs = () => {
    const validFx = fx.replace(/\s+/g, "") === "sqrt(-((-2+x)x))" || fx.replace(/\s+/g, "") === "sqrt(-((-2+x)*x))";
    const validGx = gx.replace(/\s+/g, "") === "sqrt(-((2+x)x))" || gx.replace(/\s+/g, "") === "sqrt(-((2+x)*x))";
    const validHx = hx.replace(/\s+/g, "") === "-x-2" || hx.replace(/\s+/g, "") === "-2-x";
    const validIx = ix.replace(/\s+/g, "") === "x-2" || ix.replace(/\s+/g, "") === "-2+x";
    setIsValid({ fx: validFx, gx: validGx, hx: validHx, ix: validIx });
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 200);
    ctx.lineTo(600, 200);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.stroke();

    const drawCurve = (expr, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      for (let x = -10; x <= 10; x += 0.5) {
        try {
          const y = evaluate(expr, { x });
          if (!isNaN(y)) {
            const canvasX = 300 + x * 30;
            const canvasY = 200 - y * 30;
            if (x === -10) {
              ctx.moveTo(canvasX, canvasY);
            } else {
              ctx.lineTo(canvasX, canvasY);
            }
          }
        } catch {}
      }
      ctx.stroke();
    };

    drawCurve(fx, "red");
    drawCurve(gx, "blue");
    drawCurve(hx, "green");
    drawCurve(ix, "purple");
    if (showMessage && Object.values(isValid).every(Boolean)) {
      ctx.fillStyle = "pink";
    
      ctx.beginPath();
      for (let x = -10; x <= 0; x += 0.5) {
        try {
          const yTop = evaluate(gx, { x });
          const yBottom = evaluate(hx, { x });
          if (!isNaN(yTop) && !isNaN(yBottom)) {
            const canvasX = 300 + x * 30;
            const canvasYTop = 200 - yTop * 30;
            const canvasYBottom = 200 - yBottom * 30;
            ctx.lineTo(canvasX, canvasYTop);
          }
        } catch {}
      }
      for (let x = 0; x >= -10; x -= 0.5) {
        try {
          const yBottom = evaluate(hx, { x });
          if (!isNaN(yBottom)) {
            const canvasX = 300 + x * 30;
            const canvasYBottom = 200 - yBottom * 30;
            ctx.lineTo(canvasX, canvasYBottom);
          }
        } catch {}
      }
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= 10; x += 0.5) {
        try {
          const yTop = evaluate(fx, { x }); 
          const yBottom = evaluate(ix, { x }); 
          if (!isNaN(yTop) && !isNaN(yBottom)) {
            const canvasX = 300 + x * 30;
            const canvasYTop = 200 - yTop * 30;
            const canvasYBottom = 200 - yBottom * 30;
            ctx.lineTo(canvasX, canvasYTop);
          }
        } catch {}
      }
      for (let x = 10; x >= 0; x -= 0.5) {
        try {
          const yBottom = evaluate(ix, { x });
          if (!isNaN(yBottom)) {
            const canvasX = 300 + x * 30;
            const canvasYBottom = 200 - yBottom * 30;
            ctx.lineTo(canvasX, canvasYBottom);
          }
        } catch {}
      }
      ctx.closePath();
      ctx.fill();
    }
    
  };

  const handleSubmit = () => {
    if (Object.values(isValid).every(Boolean)) {
      setShowMessage(true);
      setSubmitted(true);
    } else {
      alert("msh ad yg salahh. pake hintny aj sygg (or text me if ur stuck LOL)");
    }
  };

  return (
    <div>
      {submitted ? (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <h1>will u b my valentine?</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={() => (window.location.href  = "/valentines.html")} style={{ marginRight: "10px" }}>
            yaaaa
          </button>
          <button onClick={() => (window.location.href = "https://www.youtube.com/watch?v=m7XHmIe0u-0&t=8s")}>FUCK no !!!!</button>
        </div>
      </div>
      
      ) : (
        <div>
          <h1>hy cantik :p click submit 2 check ur answerss</h1>
          <div className="input-container" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              value={fx}
              onChange={(e) => setFx(e.target.value)}
              placeholder="Integrate -(-1 + x)/sqrt(-((-2 + x) x))"
              style={{ border: isValid.fx ? "1px solid black" : "2px solid red", flex: 1 }}
            />
            <button onClick={() => alert("pake wolfram alpha ajaa")} style={{ marginLeft: "10px" }}>?</button>
          </div>
          <div className="input-container" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              value={gx}
              onChange={(e) => setGx(e.target.value)}
              placeholder="Mirror the function above^^"
              style={{ border: isValid.gx ? "1px solid black" : "2px solid red", flex: 1 }}
            />
            <button onClick={() => alert("change one of the + signs to a -. not telling which *eyeroll emoji*")} style={{ marginLeft: "10px" }}>?</button>
          </div>
          <div className="input-container" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              value={hx}
              onChange={(e) => setHx(e.target.value)}
              placeholder="|x| - 2, if x < 0"
              style={{ border: isValid.hx ? "1px solid black" : "2px solid red", flex: 1 }}
            />
            <button onClick={() => alert("an absolute variable should always be positive !")} style={{ marginLeft: "10px" }}>?</button>
          </div>
          <div className="input-container" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              value={ix}
              onChange={(e) => setIx(e.target.value)}
              placeholder="|x| - 2, if x >= 0"
              style={{ border: isValid.ix ? "1px solid black" : "2px solid red", flex: 1 }}
            />
            <button onClick={() => alert("an absolute variable should always be positive !")} style={{ marginLeft: "10px" }}>?</button>
          </div>
          <button onClick={handleSubmit} style={{ marginBottom: "10px" }}>Submit</button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid black", marginTop: "10px" }}
      ></canvas>
    </div>
  );
}