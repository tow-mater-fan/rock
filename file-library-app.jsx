import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";

const SUPABASE_URL = "https://dccmbigxygasrrjldzbo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjY21iaWd4eWdhc3JyamxkemJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDM1OTIsImV4cCI6MjEwNDAxOTU5Mn0.74NnERhsh33u0RGl_l3DhWXhkbbzOL2_mnzu8xEQx3s";

async function sb(path,{method="GET",body,token,headers:extra}={}){const h={apikey:SUPABASE_KEY,"Content-Type":"application/json",...extra};if(token)h.Authorization=`Bearer ${token}`;const res=await fetch(`${SUPABASE_URL}${path}`,{method,headers:h,body:body?JSON.stringify(body):undefined});if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.message||e.msg||res.statusText)}const text=await res.text();return text?JSON.parse(text):null}
async function sbUpload(path,file,token){const res=await fetch(`${SUPABASE_URL}/storage/v1/object/library-files/${path}`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`},body:file});if(!res.ok)throw new Error("Upload failed");return res.json()}
function sbDownloadUrl(path,token){return`${SUPABASE_URL}/storage/v1/object/authenticated/library-files/${path}?token=${token}`}

const AppCtx=createContext();

/* ═══════════════════════════════════════════════════════════
   SVG PLANT ILLUSTRATIONS
   ═══════════════════════════════════════════════════════════ */

const Monstera = ({size=120,style:s})=>(
  <svg width={size} height={size} viewBox="0 0 120 120" style={s}>
    <path d="M60 115V55" stroke="#4a7c59" strokeWidth="3" fill="none"/>
    <path d="M60 55C45 45 25 30 30 15C35 5 50 10 55 20C50 15 42 18 45 28C48 35 55 40 60 45C65 40 72 35 75 28C78 18 70 15 65 20C70 10 85 5 90 15C95 30 75 45 60 55Z" fill="#4a7c59"/>
    <path d="M60 55C55 48 50 40 52 32" stroke="#3a6349" strokeWidth="1.5" fill="none"/>
    <path d="M60 55C65 48 70 40 68 32" stroke="#3a6349" strokeWidth="1.5" fill="none"/>
    <ellipse cx="60" cy="115" rx="18" ry="5" fill="#c67a4a"/>
    <ellipse cx="60" cy="112" rx="16" ry="4" fill="#d4845a"/>
  </svg>
);

const SnakePlant = ({size=120,style:s})=>(
  <svg width={size} height={size} viewBox="0 0 120 130" style={s}>
    <ellipse cx="60" cy="125" rx="22" ry="6" fill="#c67a4a"/>
    <ellipse cx="60" cy="122" rx="20" ry="5" fill="#d4845a"/>
    <path d="M45 122C44 90 40 60 42 35C43 25 47 20 50 25C53 35 48 70 47 122" fill="#4a7c59" stroke="#3a6349" strokeWidth="0.5"/>
    <path d="M55 122C54 85 50 50 53 28C54 18 58 14 61 20C63 30 58 65 57 122" fill="#5a8f69" stroke="#4a7c59" strokeWidth="0.5"/>
    <path d="M65 122C64 80 62 45 65 22C66 12 70 10 72 16C74 26 68 60 67 122" fill="#4a7c59" stroke="#3a6349" strokeWidth="0.5"/>
    <path d="M75 122C74 95 72 65 74 40C75 30 78 28 80 33C82 43 78 75 77 122" fill="#5a8f69" stroke="#4a7c59" strokeWidth="0.5"/>
    <path d="M47 50C49 48 46 42 44 44" stroke="#6b9f7a" strokeWidth="1" fill="none" opacity=".5"/>
    <path d="M66 35C68 33 65 27 63 29" stroke="#6b9f7a" strokeWidth="1" fill="none" opacity=".5"/>
  </svg>
);

const Succulent = ({size=90,style:s})=>(
  <svg width={size} height={size} viewBox="0 0 90 90" style={s}>
    <ellipse cx="45" cy="82" rx="18" ry="5" fill="#c67a4a"/>
    <ellipse cx="45" cy="80" rx="16" ry="4" fill="#d4845a"/>
    <ellipse cx="45" cy="65" rx="22" ry="16" fill="#6b8f71"/>
    <ellipse cx="45" cy="60" rx="16" ry="12" fill="#7da882"/>
    <ellipse cx="45" cy="56" rx="10" ry="8" fill="#8fbc96"/>
    <ellipse cx="45" cy="53" rx="5" ry="4" fill="#a5d4ac"/>
  </svg>
);

const HangingPothos = ({size=140,style:s})=>(
  <svg width={size} height={size} viewBox="0 0 140 160" style={s}>
    <line x1="70" y1="0" x2="70" y2="15" stroke="#8b7355" strokeWidth="2"/>
    <ellipse cx="70" cy="22" rx="20" ry="8" fill="#c67a4a"/>
    <ellipse cx="70" cy="20" rx="18" ry="6" fill="#d4845a"/>
    <path d="M55 22C50 40 40 55 30 75" stroke="#4a7c59" strokeWidth="2" fill="none"/>
    <path d="M65 22C62 45 55 65 45 90" stroke="#5a8f69" strokeWidth="2" fill="none"/>
    <path d="M75 22C78 45 85 65 95 90" stroke="#4a7c59" strokeWidth="2" fill="none"/>
    <path d="M85 22C90 40 100 55 110 75" stroke="#5a8f69" strokeWidth="2" fill="none"/>
    {[[28,72],[38,88],[93,88],[108,72],[45,55],[60,70],[80,55],[95,55]].map(([x,y],i)=>(
      <ellipse key={i} cx={x} cy={y} rx="7" ry="5" fill={i%2===0?"#4a7c59":"#5a8f69"} transform={`rotate(${(i*30)-60} ${x} ${y})`}/>
    ))}
  </svg>
);

// THE SECRET WILTING FLOWER — this is the one they need to water
const WiltingFlower = ({size=130,wilted=true,watering=false,bloomed=false,style:s,onClick})=>(
  <svg width={size} height={size} viewBox="0 0 130 140" style={{...s,cursor:"pointer",transition:"transform .3s"}} onClick={onClick}>
    <ellipse cx="65" cy="135" rx="20" ry="5" fill="#c67a4a"/>
    <ellipse cx="65" cy="132" rx="18" ry="4" fill="#d4845a"/>
    {/* stem */}
    <path d={wilted&&!bloomed?"M65 132C65 110 60 90 55 70":"M65 132C65 110 65 90 65 60"} stroke="#4a7c59" strokeWidth="3" fill="none" style={{transition:"d 1.5s ease-out"}}/>
    {/* leaves on stem */}
    <path d={wilted&&!bloomed?"M58 95C48 90 42 85 48 80C54 78 58 85 58 95":"M65 95C55 85 48 78 55 72C62 70 65 80 65 95"} fill="#5a8f69" style={{transition:"d 1.5s ease-out"}}/>
    <path d={wilted&&!bloomed?"M56 80C66 78 72 72 66 68C60 66 55 72 56 80":"M65 75C75 68 82 62 76 56C70 54 65 62 65 75"} fill="#4a7c59" style={{transition:"d 1.5s ease-out"}}/>
    {/* flower head */}
    <g style={{transform:wilted&&!bloomed?"rotate(35deg)":"rotate(0deg)",transformOrigin:bloomed?"65px 50px":"55px 60px",transition:"transform 1.5s ease-out"}}>
      {bloomed?<>
        {[0,60,120,180,240,300].map(r=><ellipse key={r} cx="65" cy="38" rx="8" ry="14" fill="#e8a0bf" transform={`rotate(${r} 65 50)`} style={{animation:`petalGrow 1s ease-out ${r/400}s both`}}/>)}
        <circle cx="65" cy="50" r="8" fill="#f0c85a"/>
      </>:<>
        {[0,72,144,216,288].map(r=><ellipse key={r} cx={wilted?"55":"65"} cy={wilted?"55":"42"} rx="6" ry={wilted?"10":"12"} fill={wilted?"#c4887a":"#e8a0bf"} opacity={wilted?.6:1} transform={`rotate(${r} ${wilted?55:65} ${wilted?62:50})`} style={{transition:"all 1.5s ease-out"}}/>)}
        <circle cx={wilted?"55":"65"} cy={wilted?"62":"50"} r="6" fill={wilted?"#c4a44a":"#f0c85a"} style={{transition:"all 1.5s ease-out"}}/>
      </>}
    </g>
    {/* water drops animation */}
    {watering&&<>
      {[0,1,2,3,4,5,6,7].map(i=>(
        <circle key={i} cx={55+Math.random()*20} cy="40" r="2" fill="#7ab8d4" opacity=".8">
          <animate attributeName="cy" from={30+Math.random()*20} to="132" dur={`${0.6+Math.random()*0.4}s`} begin={`${i*0.15}s`} repeatCount="3" fill="freeze"/>
          <animate attributeName="opacity" from=".8" to="0" dur={`${0.6+Math.random()*0.4}s`} begin={`${i*0.15}s`} repeatCount="3" fill="freeze"/>
        </circle>
      ))}
    </>}
    {/* soil gets darker when watered */}
    {(watering||bloomed)&&<ellipse cx="65" cy="130" rx="14" ry="3" fill="rgba(60,40,20,.3)"/>}
  </svg>
);

const WateringCan = ({size=50,active=false,style:s,...props})=>(
  <svg width={size} height={size} viewBox="0 0 50 50" style={{...s,cursor:"pointer",filter:active?"drop-shadow(0 0 8px rgba(122,184,212,.6))":""}} {...props}>
    <path d="M12 22H38C40 22 42 24 42 26V38C42 40 40 42 38 42H12C10 42 8 40 8 38V26C8 24 10 22 12 22Z" fill={active?"#5a9ab5":"#8b8b8b"} stroke={active?"#7ab8d4":"#6b6b6b"} strokeWidth="1.5"/>
    <path d="M32 22V16C32 14 30 12 28 12H22" stroke={active?"#5a9ab5":"#8b8b8b"} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M8 30L2 25" stroke={active?"#5a9ab5":"#8b8b8b"} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="1" cy="24" r="1.5" fill={active?"#7ab8d4":"#999"}/>
    {active&&<>
      <circle cx="2" cy="20" r="1" fill="#7ab8d4" opacity=".6"><animate attributeName="cy" from="20" to="26" dur=".8s" repeatCount="indefinite"/><animate attributeName="opacity" from=".6" to="0" dur=".8s" repeatCount="indefinite"/></circle>
      <circle cx="0" cy="21" r="1" fill="#7ab8d4" opacity=".5"><animate attributeName="cy" from="21" to="27" dur=".7s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" from=".5" to="0" dur=".7s" begin=".3s" repeatCount="indefinite"/></circle>
    </>}
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   COVER WEBSITE — "Bloom & Soil" artisan plant shop
   ═══════════════════════════════════════════════════════════ */

function CoverSite({ onUnlock }) {
  const [canActive, setCanActive] = useState(false);
  const [watering, setWatering] = useState(false);
  const [bloomed, setBloomed] = useState(false);
  const [typed, setTyped] = useState("");

  // Backup secret: type "bloom"
  useEffect(() => {
    const handler = (e) => {
      setTyped(prev => {
        const next = (prev + e.key.toLowerCase()).slice(-5);
        if (next === "bloom") setTimeout(() => onUnlock(), 400);
        return next;
      });
    };
    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, [onUnlock]);

  const handleCanClick = () => {
    setCanActive(true);
  };

  const handleFlowerClick = () => {
    if (!canActive) return;
    setWatering(true);
    setTimeout(() => { setWatering(false); setBloomed(true); }, 2800);
    setTimeout(() => onUnlock(), 4800);
  };

  const g = {
    forest:"#1a4d2e", leaf:"#4a7c59", sage:"#6b8f71", mint:"#8fbc96",
    cream:"#faf8f2", warm:"#f5f0e6", terra:"#c67a4a", earth:"#8b6f47",
    text:"#2c3e2d", textLight:"#5a6e5b", brown:"#4a3728", gold:"#c9a84c",
    white:"#ffffff", pink:"#e8a0bf",
  };

  return (
    <div style={{ fontFamily:"'Georgia','Times New Roman',serif", color:g.text, background:g.cream, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=Caveat:wght@500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}body{background:${g.cream}}
        @keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes petalGrow{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes vineGrow{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
        @keyframes gentlePulse{0%,100%{opacity:.4}50%{opacity:.8}}
        .bl-sway{animation:sway 4s ease-in-out infinite}
        .bl-float{animation:float 3s ease-in-out infinite}
        .bl-nav{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(250,248,242,.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(74,55,40,.08)}
        .bl-nav-inner{max-width:1160px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;padding:16px 40px}
        .bl-logo{font-family:'DM Serif Display',serif;font-size:24px;color:${g.forest};cursor:default}
        .bl-logo span{color:${g.sage}}
        .bl-links{display:flex;gap:28px}
        .bl-links a{color:${g.textLight};text-decoration:none;font-family:'Inter',sans-serif;font-size:13px;letter-spacing:.03em;transition:color .2s}
        .bl-links a:hover{color:${g.forest}}
        .bl-hero{padding:130px 40px 80px;text-align:center;position:relative;overflow:hidden}
        .bl-hero-bg{position:absolute;inset:0;background:linear-gradient(180deg,${g.cream} 0%,${g.warm} 100%)}
        .bl-hero-content{position:relative;z-index:1}
        .bl-hero h1{font-family:'DM Serif Display',serif;font-size:56px;color:${g.forest};line-height:1.15;margin-bottom:16px}
        .bl-hero h1 em{font-style:italic;color:${g.leaf}}
        .bl-hero p{font-family:'Inter',sans-serif;font-size:17px;color:${g.textLight};max-width:480px;margin:0 auto 32px;line-height:1.7}
        .bl-btn{display:inline-block;padding:14px 32px;background:${g.forest};color:${g.cream};font-family:'Inter',sans-serif;font-size:13px;letter-spacing:.05em;border:none;border-radius:40px;cursor:pointer;text-decoration:none;transition:all .25s}
        .bl-btn:hover{background:${g.leaf};transform:translateY(-1px)}
        .bl-plants-row{display:flex;justify-content:center;align-items:flex-end;gap:20px;margin-top:40px;flex-wrap:wrap;position:relative;z-index:1}
        .bl-sec{max-width:1100px;margin:0 auto;padding:80px 40px}
        .bl-sec h2{font-family:'DM Serif Display',serif;font-size:36px;color:${g.forest};margin-bottom:10px}
        .bl-sub{font-family:'Inter',sans-serif;font-size:15px;color:${g.textLight};margin-bottom:40px;line-height:1.7;max-width:500px}
        .bl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .bl-card{background:${g.white};border-radius:16px;padding:32px;border:1px solid rgba(74,55,40,.06);transition:transform .2s,box-shadow .2s}
        .bl-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(26,77,46,.06)}
        .bl-card h3{font-family:'DM Serif Display',serif;font-size:20px;color:${g.forest};margin-bottom:8px}
        .bl-card p{font-family:'Inter',sans-serif;font-size:14px;color:${g.textLight};line-height:1.7}
        .bl-card-icon{width:48px;height:48px;border-radius:12px;background:${g.warm};display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .bl-quote{background:${g.forest};color:${g.cream};padding:80px 40px;text-align:center;border-radius:0}
        .bl-quote blockquote{font-family:'DM Serif Display',serif;font-size:28px;font-style:italic;max-width:600px;margin:0 auto 16px;line-height:1.5}
        .bl-quote cite{font-family:'Inter',sans-serif;font-size:13px;color:${g.sage};font-style:normal}
        .bl-garden{background:${g.warm};padding:80px 40px;text-align:center}
        .bl-garden h2{font-family:'DM Serif Display',serif;font-size:36px;color:${g.forest};margin-bottom:8px}
        .bl-garden .bl-sub{margin:0 auto 30px;text-align:center}
        .bl-garden-hint{font-family:'Caveat',cursive;font-size:18px;color:${g.sage};margin-top:16px;animation:gentlePulse 3s ease-in-out infinite}
        .bl-ft{background:${g.brown};color:${g.sage};padding:50px 40px 30px}
        .bl-ft-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap}
        .bl-ft-col h4{font-family:'DM Serif Display',serif;font-size:16px;color:${g.cream};margin-bottom:14px}
        .bl-ft-col p,.bl-ft-col a{font-family:'Inter',sans-serif;font-size:13px;color:${g.sage};line-height:2;text-decoration:none;display:block}
        .bl-ft-col a:hover{color:${g.cream}}
        .bl-ft-bottom{max-width:1100px;margin:30px auto 0;padding-top:20px;border-top:1px solid rgba(107,143,113,.15);font-family:'Inter',sans-serif;font-size:11px;color:rgba(107,143,113,.5);display:flex;justify-content:space-between}
        @media(max-width:800px){.bl-grid{grid-template-columns:1fr}.bl-hero h1{font-size:34px}.bl-links{display:none}.bl-ft-inner{flex-direction:column}.bl-plants-row{gap:10px}}
      `}</style>

      {/* NAV */}
      <nav className="bl-nav"><div className="bl-nav-inner">
        <div className="bl-logo">Bloom <span>&</span> Soil</div>
        <div className="bl-links"><a href="#shop">Shop</a><a href="#care">Plant Care</a><a href="#garden">Garden</a><a href="#about">About</a></div>
      </div></nav>

      {/* HERO */}
      <section className="bl-hero">
        <div className="bl-hero-bg"/>
        <div className="bl-hero-content">
          <h1>Bring Nature <em>Home</em></h1>
          <p>Hand-selected plants for every corner of your space. From resilient succulents to statement tropicals, we grow what we love.</p>
          <a className="bl-btn" href="#shop">Browse Collection</a>
          <div className="bl-plants-row">
            <div className="bl-sway" style={{animationDelay:"0s"}}><Monstera size={110}/></div>
            <div className="bl-sway" style={{animationDelay:".5s"}}><SnakePlant size={120}/></div>
            <div className="bl-sway" style={{animationDelay:"1s"}}><Succulent size={85}/></div>
            <div className="bl-float"><HangingPothos size={120}/></div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className="bl-sec" id="shop">
        <h2>Curated for Your Space</h2>
        <p className="bl-sub">Every plant ships in a hand-thrown ceramic pot, rooted in our signature soil blend. Ready to thrive.</p>
        <div className="bl-grid">
          {[
            {icon:"🪴",name:"Monstera Deliciosa",desc:"The classic statement plant. Iconic split leaves that grow larger as the plant matures. Thrives in bright indirect light with weekly watering."},
            {icon:"🌿",name:"Snake Plant 'Zeylanica'",desc:"Nearly impossible to kill. Tolerates low light and infrequent watering. Perfect for beginners, bedrooms, and offices."},
            {icon:"🌱",name:"Pothos 'Golden'",desc:"A trailing vine that purifies your air while looking stunning. Grows fast in almost any light condition. Great for shelves and hanging baskets."},
          ].map(p=>(
            <div className="bl-card" key={p.name}>
              <div className="bl-card-icon"><span style={{fontSize:24}}>{p.icon}</span></div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARE GUIDES */}
      <section className="bl-quote" id="care">
        <blockquote>"The best time to plant a tree was twenty years ago. The second best time is now."</blockquote>
        <cite>— Chinese Proverb</cite>
      </section>

      <section className="bl-sec">
        <h2>Care Guides</h2>
        <p className="bl-sub">Simple, tested routines to keep your plants lush. Written by growers, not marketers.</p>
        <div className="bl-grid">
          {[
            {icon:"💧",name:"Watering Basics",desc:"Learn the soak-and-dry method, how to read your soil, and why overwatering kills more plants than neglect ever will."},
            {icon:"☀️",name:"Light & Placement",desc:"Direct, indirect, low — understand what your windows actually provide and match your plants to the right spot."},
            {icon:"🌡️",name:"Seasonal Rhythms",desc:"Plants slow down in winter and sprint in summer. Adjust your care routine with the seasons for healthier growth year-round."},
          ].map(p=>(
            <div className="bl-card" key={p.name}>
              <div className="bl-card-icon"><span style={{fontSize:24}}>{p.icon}</span></div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE SECRET GARDEN — this is where the magic happens ═══ */}
      <section className="bl-garden" id="garden">
        <h2>The Secret Garden</h2>
        <p className="bl-sub" style={{textAlign:"center"}}>Every garden has its secrets. Some flowers just need a little extra care to reveal what's hidden inside.</p>

        <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:30,flexWrap:"wrap",marginTop:20}}>
          <div className="bl-sway" style={{animationDelay:".2s"}}><Succulent size={75}/></div>

          {/* THE WILTING FLOWER — click after picking up watering can */}
          <div style={{position:"relative"}}>
            <WiltingFlower
              size={140}
              wilted={!bloomed}
              watering={watering}
              bloomed={bloomed}
              onClick={handleFlowerClick}
              style={{transform:canActive&&!bloomed?"scale(1.05)":"scale(1)"}}
            />
            {canActive && !watering && !bloomed && (
              <div style={{
                position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)",
                fontFamily:"'Caveat',cursive", fontSize:15, color:g.leaf,
                background:"rgba(255,255,255,.85)", padding:"4px 12px", borderRadius:20,
                whiteSpace:"nowrap", animation:"gentlePulse 1.5s ease-in-out infinite"
              }}>tap to water me</div>
            )}
            {bloomed && (
              <div style={{
                position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)",
                fontFamily:"'Caveat',cursive", fontSize:18, color:g.pink,
                whiteSpace:"nowrap", animation:"fadeUp .8s ease-out"
              }}>✨ something's opening...</div>
            )}
          </div>

          <div className="bl-sway" style={{animationDelay:".8s"}}><SnakePlant size={100}/></div>
        </div>

        {/* THE WATERING CAN — hidden as a "decorative" element */}
        <div style={{marginTop:30,display:"flex",justifyContent:"center",alignItems:"center",gap:12}}>
          <WateringCan size={44} active={canActive} onClick={handleCanClick}/>
          {!canActive && (
            <span style={{fontFamily:"'Caveat',cursive",fontSize:15,color:g.sage,opacity:.5}}>
              a gardener's favorite tool
            </span>
          )}
          {canActive && !watering && !bloomed && (
            <span style={{fontFamily:"'Caveat',cursive",fontSize:15,color:g.leaf}}>
              picked up! now find a thirsty friend...
            </span>
          )}
        </div>

        {bloomed && <p className="bl-garden-hint" style={{marginTop:20,fontSize:22,color:g.forest}}>The garden reveals its secret...</p>}
      </section>

      {/* ABOUT */}
      <section className="bl-sec" id="about">
        <h2>Rooted in Care</h2>
        <p className="bl-sub">Bloom & Soil started in a Brooklyn apartment with three cuttings and a grow light. Today we ship nationwide from our greenhouse in upstate New York. Every plant is grown by our team, potted by hand, and shipped with a care card written for your specific light conditions.</p>
        <div style={{display:"flex",gap:40,flexWrap:"wrap",marginTop:20}}>
          {[
            {n:"12,000+",l:"Plants shipped"},
            {n:"98%",l:"Arrive healthy"},
            {n:"45",l:"Species in rotation"},
            {n:"3",l:"Growing seasons deep"},
          ].map(s=>(
            <div key={s.l} style={{textAlign:"center",flex:"1 1 120px"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32,color:g.forest}}>{s.n}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:g.textLight,letterSpacing:".05em",marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bl-ft"><div className="bl-ft-inner">
        <div className="bl-ft-col"><h4>Bloom & Soil</h4><p>Artisan plants, delivered.</p></div>
        <div className="bl-ft-col"><h4>Shop</h4><a href="#shop">All Plants</a><a href="#shop">Pots & Planters</a><a href="#shop">Gift Cards</a></div>
        <div className="bl-ft-col"><h4>Learn</h4><a href="#care">Care Guides</a><a href="#care">Journal</a><a href="#garden">Secret Garden</a></div>
        <div className="bl-ft-col"><h4>Company</h4><a href="#about">Our Story</a><a href="#">Careers</a><a href="#">Contact</a></div>
      </div><div className="bl-ft-bottom">
        <span>© 2026 Bloom & Soil LLC. All rights reserved.</span>
        <span>Made with 🌱 in Brooklyn</span>
      </div></footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   UNLOCK TRANSITION — vines growing across screen
   ═══════════════════════════════════════════════════════════ */

function UnlockTransition({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1=setTimeout(()=>setPhase(1),200);
    const t2=setTimeout(()=>setPhase(2),1600);
    const t3=setTimeout(()=>setPhase(3),2800);
    const t4=setTimeout(()=>onDone(),4000);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4)};
  }, [onDone]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"#0a120a",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",overflow:"hidden"}}>
      <style>{`
        @keyframes vineA{from{stroke-dashoffset:2000}to{stroke-dashoffset:0}}
        @keyframes leafPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes textFade{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.4)}}
      `}</style>

      {/* Growing vines */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 1000 600" preserveAspectRatio="none">
        {phase>=0&&<>
          <path d="M0 300C100 280 200 200 350 220C500 240 400 350 500 300C600 250 700 180 850 200C950 210 1000 280 1000 300" stroke="#1a4d2e" strokeWidth="3" fill="none" strokeDasharray="2000" style={{animation:"vineA 2s ease-out forwards"}}/>
          <path d="M0 350C150 320 250 400 400 360C550 320 600 420 750 380C850 350 950 400 1000 380" stroke="#2a5d3e" strokeWidth="2" fill="none" strokeDasharray="2000" style={{animation:"vineA 2.2s ease-out .3s forwards",strokeDashoffset:2000}}/>
          <path d="M0 250C100 230 300 150 450 180C600 210 700 130 850 160C950 175 1000 200 1000 220" stroke="#3a6d4e" strokeWidth="2" fill="none" strokeDasharray="2000" style={{animation:"vineA 2s ease-out .5s forwards",strokeDashoffset:2000}}/>
        </>}
        {phase>=1&&[
          [200,195],[350,215],[500,295],[650,250],[800,190],
          [150,345],[400,355],[600,415],[750,375],[900,395],
          [250,170],[450,175],[700,135],[850,155],
        ].map(([x,y],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="8" ry="5" fill={i%3===0?"#4a7c59":i%3===1?"#5a8f69":"#6b9f7a"} style={{animation:`leafPop .4s ease-out ${1.2+i*0.08}s both`}} transform={`rotate(${i*25} ${x} ${y})`}/>
        ))}
      </svg>

      <div style={{position:"relative",zIndex:1,textAlign:"center"}}>
        {phase>=2&&(
          <div style={{animation:"textFade .6s ease-out forwards"}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"#4ade80",letterSpacing:".12em",marginBottom:16}}>CLEARANCE VERIFIED</div>
            <div style={{fontFamily:"'Georgia',serif",fontSize:28,color:"#e2e4ea",fontWeight:"bold",letterSpacing:".08em",animation:"glowPulse 1.5s ease-in-out infinite"}}>WELCOME, AGENT</div>
          </div>
        )}
        {phase>=3&&(
          <div style={{animation:"textFade .5s ease-out forwards",fontFamily:"'Courier New',monospace",fontSize:13,color:"#7c8198",marginTop:16}}>
            Opening classified archives...
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCHOOL FILE LIBRARY (the real app — unchanged)
   ═══════════════════════════════════════════════════════════ */

const p={bg:"#0b0d14",surface:"#12151e",surfaceHover:"#181c28",border:"#222738",accent:"#6c8cff",accentBg:"rgba(108,140,255,.07)",text:"#dfe1e9",textDim:"#7c8198",textMuted:"#484d62",green:"#4ade80",red:"#f87171",orange:"#fb923c"};
const inputSt={width:"100%",padding:"10px 13px",background:p.bg,border:`1px solid ${p.border}`,borderRadius:8,color:p.text,fontSize:14,marginBottom:12,outline:"none",fontFamily:"'Inter',sans-serif"};
const btnP={padding:"10px 18px",background:p.accent,color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"};
const btnG={padding:"7px 13px",background:"transparent",color:p.textDim,border:`1px solid ${p.border}`,borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:"'Inter',sans-serif"};
const lblSt={display:"block",fontSize:13,color:p.textDim,marginBottom:5,fontWeight:500};
const rowSt={display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:`1px solid ${p.border}`,fontSize:14};
const cardSt={display:"flex",alignItems:"center",gap:14,padding:"15px 17px",background:p.surface,border:`1px solid ${p.border}`,borderRadius:10,transition:"all .15s"};

const Ic=({d,size=18,...props})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d={d}/></svg>;
const I={folder:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",lock:"M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",upload:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",chevron:"M9 18l6-6-6-6",x:"M18 6L6 18M6 6l12 12",logout:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",search:"M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",home:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",settings:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",check:"M20 6L9 17l-5-5",exit:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"};

const LABELS={test:"Exam",answer_key:"Answer Key",original:"Study Material"};
const COLORS={test:"#6c8cff",answer_key:"#4ade80",original:"#fb923c"};
function TypeBadge({type}){const c=COLORS[type]||p.textDim;return<span style={{fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:4,background:`${c}18`,color:c,letterSpacing:".04em"}}>{LABELS[type]||type}</span>}

function AuthScreen({onAuth}){
  const[mode,setMode]=useState("login");const[email,setEmail]=useState("");const[pass,setPass]=useState("");const[name,setName]=useState("");const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const submit=async(e)=>{e.preventDefault();setErr("");setLoading(true);try{const endpoint=mode==="login"?"/auth/v1/token?grant_type=password":"/auth/v1/signup";const body=mode==="login"?{email,password:pass}:{email,password:pass,data:{full_name:name}};const data=await sb(endpoint,{method:"POST",body});if(data.access_token){localStorage.setItem("sb_token",data.access_token);localStorage.setItem("sb_refresh",data.refresh_token);onAuth(data)}else if(data.id){setErr("Check your email to confirm, then sign in.");setMode("login")}}catch(ex){setErr(ex.message)}setLoading(false)};
  const googleLogin=()=>{window.location.href=`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin+window.location.pathname)}`};
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:p.bg,padding:20,fontFamily:"'Inter',sans-serif"}}>
      <div style={{width:"100%",maxWidth:380,background:p.surface,borderRadius:14,border:`1px solid ${p.border}`,padding:36}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:12,letterSpacing:".12em",color:p.accent,marginBottom:8,fontWeight:600}}>CLASSIFIED</div>
          <div style={{fontSize:24,fontWeight:700,letterSpacing:"-.02em"}}>Agent Login</div>
          <div style={{color:p.textDim,fontSize:13,marginTop:4}}>{mode==="login"?"Authenticate to access archives":"Register a new agent profile"}</div>
        </div>
        <button onClick={googleLogin} style={{width:"100%",padding:11,background:"#fff",color:"#333",border:"none",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:18}}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12,margin:"16px 0",color:p.textMuted,fontSize:12}}><div style={{flex:1,height:1,background:p.border}}/> or <div style={{flex:1,height:1,background:p.border}}/></div>
        <form onSubmit={submit}>
          {mode==="signup"&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={inputSt}/>}
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required style={inputSt}/>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" required minLength={6} style={inputSt}/>
          {err&&<div style={{color:p.red,fontSize:13,marginBottom:10}}>{err}</div>}
          <button type="submit" disabled={loading} style={{...btnP,width:"100%",opacity:loading?.6:1}}>{loading?"...":mode==="login"?"Sign in":"Create account"}</button>
        </form>
        <div style={{textAlign:"center",marginTop:16,fontSize:13,color:p.textDim}}>{mode==="login"?"New agent? ":"Already registered? "}<span onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("")}} style={{color:p.accent,cursor:"pointer"}}>{mode==="login"?"Register":"Sign in"}</span></div>
      </div>
    </div>
  );
}

function Sidebar({active,onNav,profile,onExit}){
  const items=[{id:"browse",icon:I.home,label:"Archives"},{id:"upload",icon:I.upload,label:"Upload"}];
  if(profile?.role==="admin"){items.push({id:"manage",icon:I.settings,label:"Manage"});items.push({id:"users",icon:I.users,label:"Staff"})}
  return(
    <div style={{width:210,minHeight:"100vh",background:p.surface,borderRight:`1px solid ${p.border}`,display:"flex",flexDirection:"column",padding:"18px 0",flexShrink:0,fontFamily:"'Inter',sans-serif"}}>
      <div style={{padding:"0 18px 20px"}}><div style={{fontSize:11,letterSpacing:".1em",color:p.accent,fontWeight:600,marginBottom:2}}>CLASSIFIED</div><div style={{fontSize:17,fontWeight:700,letterSpacing:"-.01em"}}>School Archives</div></div>
      <nav style={{flex:1}}>{items.map(it=><div key={it.id} onClick={()=>onNav(it.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 18px",cursor:"pointer",background:active===it.id?p.accentBg:"transparent",color:active===it.id?p.accent:p.textDim,borderRight:active===it.id?`2px solid ${p.accent}`:"2px solid transparent",fontSize:13,fontWeight:active===it.id?600:400,transition:"all .15s"}}><Ic d={it.icon} size={17}/>{it.label}</div>)}</nav>
      <div style={{padding:"10px 18px",borderTop:`1px solid ${p.border}`}}>
        <div style={{fontSize:13,fontWeight:500,color:p.text,marginBottom:1}}>{profile?.full_name||profile?.email}</div>
        <div style={{fontSize:11,color:p.accent,letterSpacing:".05em",marginBottom:10}}>{profile?.role?.toUpperCase()}</div>
        <button onClick={onExit} style={{...btnG,width:"100%",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:p.orange,borderColor:p.orange}}><Ic d={I.exit} size={14}/>Exit to Cover</button>
      </div>
    </div>
  );
}

function PasswordModal({file,onUnlock,onClose}){const[pw,setPw]=useState("");const[err,setErr]=useState("");return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,fontFamily:"'Inter',sans-serif"}} onClick={onClose}><div onClick={e=>e.stopPropagation()} style={{background:p.surface,borderRadius:14,border:`1px solid ${p.border}`,padding:28,width:340}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><Ic d={I.lock} style={{color:p.orange}}/><span style={{fontWeight:600,fontSize:15}}>Restricted File</span></div><p style={{fontSize:13,color:p.textDim,marginBottom:14}}>Enter password for <strong style={{color:p.text}}>{file.file_name}</strong></p><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="File password" style={inputSt} onKeyDown={e=>{if(e.key==="Enter"){pw===file.file_password?onUnlock(file):setErr("Incorrect")}}}/>{err&&<div style={{color:p.red,fontSize:12,marginBottom:8}}>{err}</div>}<div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><button onClick={onClose} style={btnG}>Cancel</button><button onClick={()=>{pw===file.file_password?onUnlock(file):setErr("Incorrect")}} style={btnP}>Unlock</button></div></div></div>)}

function PreviewModal({file,token,onClose}){const url=sbDownloadUrl(file.storage_path,token);const isPdf=file.mime_type==="application/pdf"||file.file_name?.endsWith(".pdf");const isImg=file.mime_type?.startsWith("image/");return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,fontFamily:"'Inter',sans-serif"}} onClick={onClose}><div onClick={e=>e.stopPropagation()} style={{background:p.surface,borderRadius:14,border:`1px solid ${p.border}`,width:"90%",maxWidth:880,maxHeight:"90vh",display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:`1px solid ${p.border}`}}><div style={{display:"flex",alignItems:"center",gap:10}}><TypeBadge type={file.file_type}/><span style={{fontWeight:600,fontSize:14}}>{file.file_name}</span></div><div style={{display:"flex",gap:8}}><a href={url} download style={{...btnG,textDecoration:"none",color:p.accent}}>Download</a><button onClick={onClose} style={{...btnG,padding:"7px 9px"}}><Ic d={I.x} size={15}/></button></div></div><div style={{flex:1,overflow:"auto",padding:18,minHeight:380,display:"flex",alignItems:"center",justifyContent:"center"}}>{isPdf?<iframe src={url} style={{width:"100%",height:560,border:"none",borderRadius:8}} title="preview"/>:isImg?<img src={url} alt={file.file_name} style={{maxWidth:"100%",maxHeight:560,borderRadius:8}}/>:<div style={{textAlign:"center",color:p.textDim}}><Ic d={I.file} size={44} style={{marginBottom:10,opacity:.4}}/><p style={{marginBottom:10}}>No preview available</p><a href={url} download style={{color:p.accent}}>Download to view</a></div>}</div></div></div>)}

function BrowseView(){
  const{token,departments,years,semesters,teachers,units,files}=useContext(AppCtx);
  const[selDept,setSelDept]=useState(null);const[selYear,setSelYear]=useState(null);const[selSem,setSelSem]=useState(null);const[selTeacher,setSelTeacher]=useState(null);const[selUnit,setSelUnit]=useState(null);const[search,setSearch]=useState("");const[pwModal,setPwModal]=useState(null);const[preview,setPreview]=useState(null);
  const fSem=semesters.filter(s=>!selYear||s.academic_year_id===selYear);const fTch=teachers.filter(t=>!selDept||t.department_id===selDept);const fUni=units.filter(u=>(!selSem||u.semester_id===selSem)&&(!selTeacher||u.teacher_id===selTeacher));
  const fFiles=files.filter(f=>{if(selUnit)return f.unit_id===selUnit;if(search)return f.file_name.toLowerCase().includes(search.toLowerCase());return fUni.map(u=>u.id).includes(f.unit_id)});
  const handleFile=f=>{f.is_confidential&&f.file_password?setPwModal(f):setPreview(f)};
  const bc=[];if(selDept)bc.push({label:departments.find(d=>d.id===selDept)?.name,clear:()=>{setSelDept(null);setSelTeacher(null);setSelUnit(null)}});if(selYear)bc.push({label:years.find(y=>y.id===selYear)?.label,clear:()=>{setSelYear(null);setSelSem(null);setSelUnit(null)}});if(selSem)bc.push({label:semesters.find(s=>s.id===selSem)?.label,clear:()=>{setSelSem(null);setSelUnit(null)}});if(selTeacher)bc.push({label:fTch.find(t=>t.id===selTeacher)?.full_name,clear:()=>{setSelTeacher(null);setSelUnit(null)}});if(selUnit)bc.push({label:units.find(u=>u.id===selUnit)?.unit_name,clear:()=>setSelUnit(null)});
  return(
    <div style={{padding:26,fontFamily:"'Inter',sans-serif"}}>
      <div style={{display:"flex",gap:12,marginBottom:22}}><div style={{position:"relative",flex:1,maxWidth:400}}><Ic d={I.search} size={15} style={{position:"absolute",left:11,top:11,color:p.textMuted}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search files..." style={{...inputSt,paddingLeft:34,marginBottom:0}}/></div></div>
      {bc.length>0&&<div style={{display:"flex",alignItems:"center",gap:4,marginBottom:18,flexWrap:"wrap"}}><span onClick={()=>{setSelDept(null);setSelYear(null);setSelSem(null);setSelTeacher(null);setSelUnit(null)}} style={{fontSize:13,color:p.accent,cursor:"pointer"}}>All</span>{bc.map((b,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:4}}><Ic d={I.chevron} size={12} style={{color:p.textMuted}}/><span onClick={b.clear} style={{fontSize:13,color:i===bc.length-1?p.text:p.accent,cursor:"pointer",fontWeight:i===bc.length-1?600:400}}>{b.label}</span></span>)}</div>}
      {!selDept&&!selYear&&!search&&<><h2 style={{fontSize:19,fontWeight:700,marginBottom:14}}>Departments</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:11,marginBottom:28}}>{departments.map(d=><div key={d.id} onClick={()=>setSelDept(d.id)} style={{...cardSt,cursor:"pointer"}}><Ic d={I.folder} size={20} style={{color:p.accent}}/><div><div style={{fontWeight:600,fontSize:14}}>{d.name}</div><div style={{fontSize:12,color:p.textDim}}>{teachers.filter(t=>t.department_id===d.id).length} teachers · Head: {teachers.find(t=>t.department_id===d.id&&t.is_department_head)?.full_name||"—"}</div></div></div>)}</div><h2 style={{fontSize:19,fontWeight:700,marginBottom:14}}>School Years</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:11}}>{years.map(y=><div key={y.id} onClick={()=>setSelYear(y.id)} style={{...cardSt,cursor:"pointer"}}><div><div style={{fontWeight:600,fontSize:14}}>{y.label}</div><div style={{fontSize:12,color:p.textDim}}>{semesters.filter(s=>s.academic_year_id===y.id).length} semesters</div></div></div>)}</div></>}
      {selDept&&!selTeacher&&!selUnit&&<><h2 style={{fontSize:17,fontWeight:700,marginBottom:14}}>Teachers — {departments.find(d=>d.id===selDept)?.name}</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:11,marginBottom:24}}>{fTch.map(t=><div key={t.id} onClick={()=>setSelTeacher(t.id)} style={{...cardSt,cursor:"pointer"}}><div style={{width:34,height:34,borderRadius:"50%",background:p.accentBg,display:"flex",alignItems:"center",justifyContent:"center",color:p.accent,fontWeight:700,fontSize:13,flexShrink:0}}>{t.full_name.split(" ").map(n=>n[0]).join("")}</div><div><div style={{fontWeight:600,fontSize:13,display:"flex",alignItems:"center",gap:5}}>{t.full_name}{t.is_department_head&&<span style={{fontSize:10,background:p.accent,color:"#fff",padding:"1px 5px",borderRadius:3,fontWeight:700}}>HEAD</span>}</div><div style={{fontSize:12,color:p.textDim}}>{units.filter(u=>u.teacher_id===t.id).length} units</div></div></div>)}</div>{!selYear&&<><h2 style={{fontSize:17,fontWeight:700,marginBottom:14}}>Select a School Year</h2><div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{years.map(y=><div key={y.id} onClick={()=>setSelYear(y.id)} style={{...cardSt,cursor:"pointer",minWidth:130}}><span style={{fontWeight:600}}>{y.label}</span></div>)}</div></>}</>}
      {selYear&&!selSem&&!selUnit&&<><h2 style={{fontSize:17,fontWeight:700,marginBottom:14}}>Semesters — {years.find(y=>y.id===selYear)?.label}</h2><div style={{display:"flex",gap:11,flexWrap:"wrap"}}>{fSem.map(s=><div key={s.id} onClick={()=>setSelSem(s.id)} style={{...cardSt,cursor:"pointer",minWidth:190}}><div><div style={{fontWeight:600,fontSize:14}}>{s.label||`Semester ${s.semester_number}`}</div><div style={{fontSize:12,color:p.textDim}}>{units.filter(u=>u.semester_id===s.id).length} units</div></div></div>)}</div></>}
      {(selTeacher||selSem)&&!selUnit&&<><h2 style={{fontSize:17,fontWeight:700,marginBottom:14,marginTop:24}}>Units</h2>{fUni.length===0?<p style={{color:p.textDim,fontSize:13}}>No units found.</p>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:11}}>{fUni.map(u=>{const uf=files.filter(f=>f.unit_id===u.id);const t=teachers.find(t2=>t2.id===u.teacher_id);return(<div key={u.id} onClick={()=>setSelUnit(u.id)} style={{...cardSt,cursor:"pointer",flexDirection:"column",alignItems:"flex-start",gap:7}}><div style={{display:"flex",alignItems:"center",gap:7,width:"100%"}}><Ic d={I.folder} size={16} style={{color:p.accent}}/><span style={{fontWeight:600,fontSize:13}}>Unit {u.unit_number}: {u.unit_name}</span></div><div style={{fontSize:12,color:p.textDim}}>{t?.full_name} · {uf.length} files</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{uf.map(f=><TypeBadge key={f.id} type={f.file_type}/>)}</div></div>)})}</div>}</>}
      {(selUnit||search)&&<>{selUnit&&<h2 style={{fontSize:17,fontWeight:700,marginBottom:14,marginTop:24}}>Files — {units.find(u=>u.id===selUnit)?.unit_name}</h2>}{search&&<h2 style={{fontSize:17,fontWeight:700,marginBottom:14}}>Results for "{search}"</h2>}{fFiles.length===0?<p style={{color:p.textDim,fontSize:13}}>No files found.</p>:<div style={{display:"flex",flexDirection:"column",gap:7}}>{fFiles.map(f=>{const u=units.find(u2=>u2.id===f.unit_id);return(<div key={f.id} onClick={()=>handleFile(f)} style={{display:"flex",alignItems:"center",gap:13,padding:"13px 16px",background:p.surface,border:`1px solid ${p.border}`,borderRadius:10,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=p.surfaceHover} onMouseLeave={e=>e.currentTarget.style.background=p.surface}><Ic d={f.is_confidential?I.lock:I.file} size={18} style={{color:f.is_confidential?p.orange:p.textDim,flexShrink:0}}/><div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.file_name}</div>{search&&u&&<div style={{fontSize:11,color:p.textDim}}>Unit {u.unit_number}: {u.unit_name}</div>}</div><TypeBadge type={f.file_type}/><Ic d={I.eye} size={15} style={{color:p.textMuted}}/></div>)})}</div>}</>}
      {pwModal&&<PasswordModal file={pwModal} onClose={()=>setPwModal(null)} onUnlock={f=>{setPwModal(null);setPreview(f)}}/>}
      {preview&&<PreviewModal file={preview} token={token} onClose={()=>setPreview(null)}/>}
    </div>
  );
}

function UploadView(){
  const{token,departments,years,semesters,teachers,units,reload}=useContext(AppCtx);const[dept,setDept]=useState("");const[year,setYear]=useState("");const[sem,setSem]=useState("");const[teacher,setTeacher]=useState("");const[unit,setUnit]=useState("");const[fileType,setFileType]=useState("test");const[confidential,setConfidential]=useState(false);const[filePw,setFilePw]=useState("");const[file,setFile]=useState(null);const[uploading,setUploading]=useState(false);const[msg,setMsg]=useState("");
  const fTch=teachers.filter(t=>!dept||t.department_id===dept);const fSem=semesters.filter(s=>!year||s.academic_year_id===year);const fUni=units.filter(u=>(!sem||u.semester_id===sem)&&(!teacher||u.teacher_id===teacher));
  const upload=async()=>{if(!unit||!file){setMsg("Select a unit and file");return}setUploading(true);setMsg("");try{const path=`${dept||"g"}/${year||"u"}/${sem||"u"}/${unit}/${Date.now()}_${file.name}`;await sbUpload(path,file,token);const body={unit_id:unit,file_type:fileType,file_name:file.name,storage_path:path,mime_type:file.type,file_size:file.size,is_confidential:confidential};if(confidential&&filePw)body.file_password=filePw;await sb("/rest/v1/files",{method:"POST",body,token,headers:{Prefer:"return=minimal"}});setMsg("Uploaded!");setFile(null);reload()}catch(ex){setMsg(`Error: ${ex.message}`)}setUploading(false)};
  return(
    <div style={{padding:26,maxWidth:520,fontFamily:"'Inter',sans-serif"}}>
      <h2 style={{fontSize:19,fontWeight:700,marginBottom:18}}>Upload a File</h2>
      <label style={lblSt}>Department</label><select value={dept} onChange={e=>{setDept(e.target.value);setTeacher("");setUnit("")}} style={inputSt}><option value="">All</option>{departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select>
      <label style={lblSt}>Teacher</label><select value={teacher} onChange={e=>{setTeacher(e.target.value);setUnit("")}} style={inputSt}><option value="">Select</option>{fTch.map(t=><option key={t.id} value={t.id}>{t.full_name}</option>)}</select>
      <label style={lblSt}>School Year</label><select value={year} onChange={e=>{setYear(e.target.value);setSem("");setUnit("")}} style={inputSt}><option value="">Select</option>{years.map(y=><option key={y.id} value={y.id}>{y.label}</option>)}</select>
      <label style={lblSt}>Semester</label><select value={sem} onChange={e=>{setSem(e.target.value);setUnit("")}} style={inputSt}><option value="">Select</option>{fSem.map(s=><option key={s.id} value={s.id}>{s.label||`Semester ${s.semester_number}`}</option>)}</select>
      <label style={lblSt}>Unit</label><select value={unit} onChange={e=>setUnit(e.target.value)} style={inputSt}><option value="">Select</option>{fUni.map(u=><option key={u.id} value={u.id}>Unit {u.unit_number}: {u.unit_name}</option>)}</select>
      <label style={lblSt}>File Type</label><select value={fileType} onChange={e=>setFileType(e.target.value)} style={inputSt}><option value="test">Exam</option><option value="answer_key">Answer Key</option><option value="original">Study Material</option></select>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><input type="checkbox" id="conf" checked={confidential} onChange={e=>setConfidential(e.target.checked)}/><label htmlFor="conf" style={{fontSize:13,color:p.text,cursor:"pointer"}}>Restricted (password-protected)</label></div>
      {confidential&&<input value={filePw} onChange={e=>setFilePw(e.target.value)} placeholder="Set file password" type="password" style={inputSt}/>}
      <div style={{border:`2px dashed ${p.border}`,borderRadius:10,padding:24,textAlign:"center",marginBottom:14,background:file?p.accentBg:"transparent",cursor:"pointer"}} onClick={()=>document.getElementById("fi").click()}>
        <input id="fi" type="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
        {file?<div><Ic d={I.check} size={18} style={{color:p.green}}/><div style={{marginTop:4,fontWeight:500,fontSize:14}}>{file.name}</div><div style={{fontSize:12,color:p.textDim}}>{(file.size/1024).toFixed(0)} KB</div></div>:<div><Ic d={I.upload} size={26} style={{color:p.textMuted,marginBottom:4}}/><div style={{color:p.textDim,fontSize:13}}>Click to select a file</div></div>}
      </div>
      <button onClick={upload} disabled={uploading} style={{...btnP,width:"100%",opacity:uploading?.6:1}}>{uploading?"Uploading...":"Upload"}</button>
      {msg&&<div style={{marginTop:10,fontSize:13,color:msg.startsWith("Error")?p.red:p.green}}>{msg}</div>}
    </div>
  );
}

function ManageView(){
  const{token,departments,years,semesters,teachers,units,reload}=useContext(AppCtx);const[tab,setTab]=useState("departments");const[form,setForm]=useState({});const[msg,setMsg]=useState("");
  const post=async(table,body)=>{setMsg("");try{await sb(`/rest/v1/${table}`,{method:"POST",body,token,headers:{Prefer:"return=minimal"}});setMsg("Created!");setForm({});reload()}catch(ex){setMsg(`Error: ${ex.message}`)}};
  const del=async(table,id)=>{if(!confirm("Delete?"))return;try{await sb(`/rest/v1/${table}?id=eq.${id}`,{method:"DELETE",token});reload()}catch(ex){setMsg(`Error: ${ex.message}`)}};
  const tabs=["departments","years","semesters","teachers","units"];
  return(
    <div style={{padding:26,fontFamily:"'Inter',sans-serif"}}>
      <h2 style={{fontSize:19,fontWeight:700,marginBottom:18}}>Manage School Data</h2>
      <div style={{display:"flex",gap:4,marginBottom:22,overflowX:"auto"}}>{tabs.map(t=><button key={t} onClick={()=>{setTab(t);setForm({});setMsg("")}} style={{...btnG,background:tab===t?p.accentBg:"transparent",color:tab===t?p.accent:p.textDim,borderColor:tab===t?p.accent:p.border,textTransform:"capitalize",fontWeight:tab===t?600:400,whiteSpace:"nowrap"}}>{t}</button>)}</div>
      {msg&&<div style={{fontSize:13,marginBottom:10,color:msg.startsWith("Error")?p.red:p.green}}>{msg}</div>}
      {tab==="departments"&&<div><div style={{display:"flex",gap:8,marginBottom:14}}><input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Department name" style={{...inputSt,marginBottom:0,flex:1}}/><button onClick={()=>post("departments",{name:form.name})} style={btnP}>Add</button></div>{departments.map(d=><div key={d.id} style={rowSt}><span style={{fontWeight:500}}>{d.name}</span><button onClick={()=>del("departments",d.id)} style={{...btnG,color:p.red,borderColor:p.red,padding:"3px 9px",fontSize:12}}>Delete</button></div>)}</div>}
      {tab==="years"&&<div><div style={{display:"flex",gap:8,marginBottom:14}}><input value={form.label||""} onChange={e=>setForm({...form,label:e.target.value})} placeholder="e.g. 2025-2026" style={{...inputSt,marginBottom:0,flex:1}}/><button onClick={()=>post("academic_years",{label:form.label})} style={btnP}>Add</button></div>{years.map(y=><div key={y.id} style={rowSt}><span style={{fontWeight:500}}>{y.label}</span><button onClick={()=>del("academic_years",y.id)} style={{...btnG,color:p.red,borderColor:p.red,padding:"3px 9px",fontSize:12}}>Delete</button></div>)}</div>}
      {tab==="semesters"&&<div><div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><select value={form.academic_year_id||""} onChange={e=>setForm({...form,academic_year_id:e.target.value})} style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}><option value="">Year</option>{years.map(y=><option key={y.id} value={y.id}>{y.label}</option>)}</select><select value={form.semester_number||""} onChange={e=>setForm({...form,semester_number:parseInt(e.target.value)})} style={{...inputSt,marginBottom:0,width:90}}><option value="">Sem#</option><option value="1">1</option><option value="2">2</option></select><input value={form.label||""} onChange={e=>setForm({...form,label:e.target.value})} placeholder="e.g. Fall 2025" style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}/><button onClick={()=>post("semesters",{academic_year_id:form.academic_year_id,semester_number:form.semester_number,label:form.label})} style={btnP}>Add</button></div>{semesters.map(s=>{const y=years.find(y2=>y2.id===s.academic_year_id);return<div key={s.id} style={rowSt}><span style={{fontWeight:500}}>{s.label||`Semester ${s.semester_number}`} <span style={{color:p.textDim,fontWeight:400}}>({y?.label})</span></span><button onClick={()=>del("semesters",s.id)} style={{...btnG,color:p.red,borderColor:p.red,padding:"3px 9px",fontSize:12}}>Delete</button></div>})}</div>}
      {tab==="teachers"&&<div><div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><input value={form.full_name||""} onChange={e=>setForm({...form,full_name:e.target.value})} placeholder="Full name" style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}/><input value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}/><select value={form.department_id||""} onChange={e=>setForm({...form,department_id:e.target.value})} style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}><option value="">Dept</option>{departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select><label style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:p.textDim}}><input type="checkbox" checked={form.is_department_head||false} onChange={e=>setForm({...form,is_department_head:e.target.checked})}/>Head</label><button onClick={()=>post("teachers",{full_name:form.full_name,email:form.email,department_id:form.department_id,is_department_head:form.is_department_head||false})} style={btnP}>Add</button></div>{teachers.map(t=>{const d=departments.find(d2=>d2.id===t.department_id);return<div key={t.id} style={rowSt}><span style={{fontWeight:500}}>{t.full_name}{t.is_department_head&&<span style={{fontSize:10,background:p.accent,color:"#fff",padding:"1px 5px",borderRadius:3,fontWeight:700,marginLeft:6}}>HEAD</span>} <span style={{color:p.textDim,fontWeight:400}}>— {d?.name}</span></span><button onClick={()=>del("teachers",t.id)} style={{...btnG,color:p.red,borderColor:p.red,padding:"3px 9px",fontSize:12}}>Delete</button></div>})}</div>}
      {tab==="units"&&<div><div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><select value={form.semester_id||""} onChange={e=>setForm({...form,semester_id:e.target.value})} style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}><option value="">Semester</option>{semesters.map(s=><option key={s.id} value={s.id}>{s.label||`Sem ${s.semester_number}`} ({years.find(y=>y.id===s.academic_year_id)?.label})</option>)}</select><select value={form.teacher_id||""} onChange={e=>setForm({...form,teacher_id:e.target.value})} style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}><option value="">Teacher</option>{teachers.map(t=><option key={t.id} value={t.id}>{t.full_name}</option>)}</select><input type="number" value={form.unit_number||""} onChange={e=>setForm({...form,unit_number:parseInt(e.target.value)})} placeholder="#" style={{...inputSt,marginBottom:0,width:60}}/><input value={form.unit_name||""} onChange={e=>setForm({...form,unit_name:e.target.value})} placeholder="Unit name" style={{...inputSt,marginBottom:0,flex:1,minWidth:130}}/><button onClick={()=>post("units",{semester_id:form.semester_id,teacher_id:form.teacher_id,unit_number:form.unit_number,unit_name:form.unit_name})} style={btnP}>Add</button></div>{units.map(u=>{const t=teachers.find(t2=>t2.id===u.teacher_id);return<div key={u.id} style={rowSt}><span style={{fontWeight:500}}>Unit {u.unit_number}: {u.unit_name} <span style={{color:p.textDim,fontWeight:400}}>— {t?.full_name}</span></span><button onClick={()=>del("units",u.id)} style={{...btnG,color:p.red,borderColor:p.red,padding:"3px 9px",fontSize:12}}>Delete</button></div>})}</div>}
    </div>
  );
}

function UsersView(){
  const{token}=useContext(AppCtx);const[profiles,setProfiles]=useState([]);const[msg,setMsg]=useState("");
  useEffect(()=>{sb("/rest/v1/user_profiles?select=*&order=created_at.desc",{token}).then(setProfiles).catch(()=>{})},[token]);
  const updateRole=async(id,role)=>{try{await sb(`/rest/v1/user_profiles?id=eq.${id}`,{method:"PATCH",body:{role},token});setProfiles(ps=>ps.map(q=>q.id===id?{...q,role}:q));setMsg("Updated")}catch(ex){setMsg(`Error: ${ex.message}`)}};
  return(
    <div style={{padding:26,fontFamily:"'Inter',sans-serif"}}>
      <h2 style={{fontSize:19,fontWeight:700,marginBottom:18}}>Staff Management</h2>
      {msg&&<div style={{fontSize:13,marginBottom:10,color:msg.startsWith("Error")?p.red:p.green}}>{msg}</div>}
      <div style={{border:`1px solid ${p.border}`,borderRadius:10,overflow:"hidden"}}>{profiles.map((q,i)=><div key={q.id} style={{...rowSt,borderBottom:i<profiles.length-1?`1px solid ${p.border}`:"none",padding:"13px 16px"}}><div><div style={{fontWeight:500,fontSize:14}}>{q.full_name||"—"}</div><div style={{fontSize:12,color:p.textDim}}>{q.email}</div></div><select value={q.role} onChange={e=>updateRole(q.id,e.target.value)} style={{...inputSt,marginBottom:0,width:105,fontSize:13}}><option value="viewer">Viewer</option><option value="teacher">Teacher</option><option value="admin">Admin</option></select></div>)}{profiles.length===0&&<div style={{padding:18,textAlign:"center",color:p.textDim}}>No users found</div>}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════ */

export default function App(){
  const[phase,setPhase]=useState("cover");const[session,setSession]=useState(null);const[profile,setProfile]=useState(null);const[page,setPage]=useState("browse");const[loading,setLoading]=useState(true);
  const[departments,setDepartments]=useState([]);const[years,setYears]=useState([]);const[semesters,setSemesters]=useState([]);const[teachers,setTeachers]=useState([]);const[units,setUnits]=useState([]);const[files,setFiles]=useState([]);
  const token=session?.access_token;
  const loadData=useCallback(async(t)=>{if(!t)return;try{const[d,y,s,te,u,f]=await Promise.all([sb("/rest/v1/departments?select=*&order=name",{token:t}),sb("/rest/v1/academic_years?select=*&order=label",{token:t}),sb("/rest/v1/semesters?select=*&order=semester_number",{token:t}),sb("/rest/v1/teachers?select=*&order=full_name",{token:t}),sb("/rest/v1/units?select=*&order=unit_number",{token:t}),sb("/rest/v1/files?select=*&order=created_at.desc",{token:t})]);setDepartments(d);setYears(y);setSemesters(s);setTeachers(te);setUnits(u);setFiles(f)}catch(ex){console.error(ex)}},[]);
  const reload=()=>loadData(token);
  useEffect(()=>{(async()=>{const hash=window.location.hash;if(hash.includes("access_token")){const params=new URLSearchParams(hash.substring(1));const at=params.get("access_token"),rt=params.get("refresh_token");if(at){localStorage.setItem("sb_token",at);localStorage.setItem("sb_refresh",rt);setSession({access_token:at,refresh_token:rt});window.history.replaceState(null,"",window.location.pathname);const user=await sb("/auth/v1/user",{token:at}).catch(()=>null);if(user){const prof=await sb(`/rest/v1/user_profiles?id=eq.${user.id}&select=*`,{token:at}).catch(()=>[]);if(prof?.[0])setProfile(prof[0])}await loadData(at);setPhase("library");setLoading(false);return}}const stored=localStorage.getItem("sb_token");if(stored){try{const user=await sb("/auth/v1/user",{token:stored});if(user?.id){setSession({access_token:stored,refresh_token:localStorage.getItem("sb_refresh")});const prof=await sb(`/rest/v1/user_profiles?id=eq.${user.id}&select=*`,{token:stored});if(prof?.[0])setProfile(prof[0]);await loadData(stored)}}catch{localStorage.removeItem("sb_token");localStorage.removeItem("sb_refresh")}}setLoading(false)})()},[loadData]);
  const handleAuth=async(data)=>{setSession(data);const user=await sb("/auth/v1/user",{token:data.access_token}).catch(()=>null);if(user?.id){const prof=await sb(`/rest/v1/user_profiles?id=eq.${user.id}&select=*`,{token:data.access_token}).catch(()=>[]);if(prof?.[0])setProfile(prof[0])}await loadData(data.access_token)};
  const logout=()=>{localStorage.removeItem("sb_token");localStorage.removeItem("sb_refresh");setSession(null);setProfile(null)};
  const handleUnlock=useCallback(()=>{if(phase==="cover")setPhase("transition")},[phase]);
  const handleTransitionDone=useCallback(()=>setPhase("library"),[]);
  if(phase==="cover")return<CoverSite onUnlock={handleUnlock}/>;
  if(phase==="transition")return<UnlockTransition onDone={handleTransitionDone}/>;
  if(loading)return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:p.bg,fontFamily:"'Inter',sans-serif"}}><div style={{color:p.textDim}}>Loading...</div></div>;
  if(!session)return<AuthScreen onAuth={handleAuth}/>;
  return(
    <AppCtx.Provider value={{token,profile,departments,years,semesters,teachers,units,files,reload}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');*{margin:0;padding:0;box-sizing:border-box}body{background:${p.bg};color:${p.text};font-family:'Inter',sans-serif}input,select,button,textarea{font-family:inherit}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${p.border};border-radius:3px}`}</style>
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar active={page} onNav={setPage} profile={profile} onExit={()=>setPhase("cover")}/>
        <div style={{flex:1,overflow:"auto"}}>
          <div style={{display:"flex",justifyContent:"flex-end",padding:"12px 22px",borderBottom:`1px solid ${p.border}`}}><button onClick={logout} style={{...btnG,display:"flex",alignItems:"center",gap:6,fontSize:12}}><Ic d={I.logout} size={14}/>Sign out</button></div>
          {page==="browse"&&<BrowseView/>}{page==="upload"&&<UploadView/>}{page==="manage"&&<ManageView/>}{page==="users"&&<UsersView/>}
        </div>
      </div>
    </AppCtx.Provider>
  );
}
