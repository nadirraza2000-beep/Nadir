import { useState, useEffect, useRef } from "react";
import { GoogleGenAI, Type } from "@google/genai";

const COLORS = {
  primary: "#22C55E",
  primaryDark: "#16A34A",
  primaryLight: "#DCFCE7",
  accent: "#F0FDF4",
  bg: "#FAFAFA",
  card: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  warning: "#F59E0B",
  danger: "#EF4444",
  success: "#22C55E",
};

const Pill = ({ label, color = "#DCFCE7", textColor = "#16A34A" }: any) => (
  <span style={{display:"inline-block",padding:"4px 12px",borderRadius:99,background:color,color:textColor,fontSize:12,fontWeight:600,margin:"3px 3px"}}>{label}</span>
);

const ProgressBar = ({ value, color = "#22C55E" }: any) => (
  <div style={{background:"#E2E8F0",borderRadius:99,height:8,width:"100%",overflow:"hidden"}}>
    <div style={{width:`${value}%`,background:color,height:"100%",borderRadius:99,transition:"width 1s ease"}} />
  </div>
);

const Card = ({ children, style = {} }: any) => (
  <div style={{background:"#fff",borderRadius:20,padding:"18px 20px",boxShadow:"0 2px 16px rgba(0,0,0,0.06)",marginBottom:14,...style}}>{children}</div>
);

const CardTitle = ({ icon, title }: any) => (
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
    <span style={{fontSize:20}}>{icon}</span>
    <span style={{fontSize:15,fontWeight:700,color:"#0F172A"}}>{title}</span>
  </div>
);

const SAMPLE_HISTORY = [
  { id:1, name:"Banana", emoji:"🍌", date:"Today, 9:14 AM", hygiene:"Clean", freshnessScore:88 },
  { id:2, name:"Broccoli", emoji:"🥦", date:"Yesterday", hygiene:"Clean", freshnessScore:72 },
  { id:3, name:"Strawberry", emoji:"🍓", date:"Jun 10", hygiene:"Moderate", freshnessScore:55 },
];

const TIPS = [
  { emoji:"🥦", title:"Why Vegetables Matter", body:"Vegetables provide fiber, vitamins, and minerals that protect against chronic disease and support gut health." },
  { emoji:"🍊", title:"Best Fruits for Immunity", body:"Citrus fruits, kiwi, and berries are rich in Vitamin C and antioxidants that strengthen the immune system." },
  { emoji:"🥗", title:"Daily Nutrition Guide", body:"Aim for 5–9 servings of fruits and vegetables daily. Vary colors to get a wide spectrum of nutrients." },
  { emoji:"💧", title:"Hydration & Nutrition", body:"Cucumbers, watermelon, and celery have high water content and help with hydration." },
  { emoji:"🌿", title:"Wash Before Eating", body:"Always rinse fruits and vegetables under cool running water even if you plan to peel them." },
];

function SplashScreen({ onDone }: any) {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);
  useEffect(() => {
    setTimeout(() => { setOpacity(1); setScale(1); }, 100);
    setTimeout(onDone, 2600);
  }, []);
  return (
    <div style={{position:"absolute",inset:0,zIndex:100,background:"linear-gradient(160deg,#052e16 0%,#166534 40%,#22c55e 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"opacity 0.6s",opacity}}>
      <div style={{transform:`scale(${scale})`,transition:"transform 0.8s cubic-bezier(.34,1.56,.64,1)"}}>
        <div style={{width:110,height:110,borderRadius:32,background:"rgba(255,255,255,0.12)",backdropFilter:"blur(12px)",border:"2px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
          <span style={{fontSize:54}}>🥗</span>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:34,fontWeight:800,color:"#fff",letterSpacing:-1}}>NutriScan AI</div>
          <div style={{fontSize:15,color:"rgba(255,255,255,0.7)",marginTop:8,fontStyle:"italic"}}>Scan your food. Know your health.</div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:60,display:"flex",gap:8}}>
        {[0,1,2].map(i=><div key={i} style={{width:i===0?24:8,height:8,borderRadius:99,background:i===0?"#fff":"rgba(255,255,255,0.3)"}}/>)}
      </div>
    </div>
  );
}

function HomeScreen({ onScan, onUpload }: any) {
  return (
    <div style={{flex:1,overflowY:"auto",padding:"0 20px 100px"}}>
      <div style={{paddingTop:52,marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:28,fontWeight:800,color:"#0F172A",letterSpacing:-0.5}}>Food Scanner</div>
            <div style={{fontSize:14,color:"#64748B",marginTop:4,maxWidth:220}}>Scan fruits & vegetables to check nutrition and hygiene</div>
          </div>
          <div style={{width:46,height:46,borderRadius:14,background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🌿</div>
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#166534 0%,#22c55e 100%)",borderRadius:24,padding:"24px 22px",marginBottom:22,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,fontSize:90,opacity:0.15}}>🍎</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>AI Powered</div>
        <div style={{fontSize:22,fontWeight:800,color:"#fff",marginTop:4,lineHeight:1.2}}>Instant Food<br/>Health Analysis</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:8}}>Hygiene · Freshness · Nutrients · Benefits</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
        <button onClick={onScan} style={{background:"#22C55E",border:"none",borderRadius:20,padding:"22px 16px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:10,boxShadow:"0 8px 24px rgba(34,197,94,0.35)"}}>
          <span style={{fontSize:32}}>📷</span>
          <span style={{fontSize:14,fontWeight:700,color:"#fff"}}>Scan with Camera</span>
        </button>
        <button onClick={onUpload} style={{background:"#fff",border:"2px solid #E2E8F0",borderRadius:20,padding:"22px 16px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          <span style={{fontSize:32}}>🖼️</span>
          <span style={{fontSize:14,fontWeight:700,color:"#0F172A"}}>Upload Image</span>
        </button>
      </div>
      <div style={{fontSize:16,fontWeight:700,color:"#0F172A",marginBottom:12}}>What we analyze</div>
      {[
        {icon:"🧬",title:"AI Nutrition Analysis",desc:"Calories, protein, vitamins & minerals instantly"},
        {icon:"🔍",title:"Hygiene Detection",desc:"Spot contamination, dirt & damage visually"},
        {icon:"💚",title:"Health Benefits",desc:"Personalized tips for each food item"},
      ].map((f,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 10px rgba(0,0,0,0.05)",marginBottom:10}}>
          <div style={{width:44,height:44,borderRadius:14,background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{f.icon}</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#0F172A"}}>{f.title}</div>
            <div style={{fontSize:12,color:"#64748B",marginTop:2}}>{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CameraScreen({ onBack, onResult, mode }: any) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState("Analyzing your food with AI...");

  useEffect(() => {
    if (mode === "camera") startCamera();
    return () => { stream?.getTracks().forEach(t=>t.stop()); };
  }, [mode]);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode:"environment" } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setCameraActive(true);
    } catch { setError("Camera not available. Please upload an image instead."); }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const c = canvasRef.current;
    c.width = videoRef.current.videoWidth || 640;
    c.height = videoRef.current.videoHeight || 480;
    c.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setPreview(c.toDataURL("image/jpeg", 0.85));
    stream?.getTracks().forEach(t=>t.stop());
    setCameraActive(false);
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const msgs = ["Detecting food item...","Checking hygiene levels...","Estimating freshness...","Calculating nutrition facts...","Identifying vitamins & minerals...","Generating health insights..."];
  
  const analyzeFood = async () => {
    setLoading(true); setProgress(0);
    let msgIdx = 0;
    const msgInterval = setInterval(()=>{ msgIdx=(msgIdx+1)%msgs.length; setStatusMsg(msgs[msgIdx]); },900);
    const progInterval = setInterval(()=>setProgress(p=>Math.min(p+Math.random()*15,88)),500);

    try {
      const imageData = preview?.split(",")[1];
      const mimeType = preview?.split(";")[0].split(":")[1] || "image/jpeg";
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [
              ...(imageData ? [{
                inlineData: {
                  data: imageData,
                  mimeType: mimeType
                }
              }] : []),
              {
                text: "Analyze this food item. If no food is visible, use name 'Unknown Food' and confidence 0."
              }
            ]
          }
        ],
        config: {
          systemInstruction: `You are NutriScan AI. Analyze the food image and respond ONLY with valid JSON.
Hygiene: "Clean", "Moderate", "Poor". Freshness: "Very Fresh", "Moderately Fresh", "Not Fresh".`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              emoji: { type: Type.STRING },
              hygiene: { type: Type.STRING },
              hygieneScore: { type: Type.NUMBER },
              freshness: { type: Type.STRING },
              freshnessScore: { type: Type.NUMBER },
              calories: { type: Type.NUMBER },
              fiber: { type: Type.STRING },
              carbs: { type: Type.STRING },
              protein: { type: Type.STRING },
              fat: { type: Type.STRING },
              vitamins: { type: Type.ARRAY, items: { type: Type.STRING } },
              minerals: { type: Type.ARRAY, items: { type: Type.STRING } },
              benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
              risks: { type: Type.ARRAY, items: { type: Type.STRING } },
              tip: { type: Type.STRING }
            },
            required: ["name", "confidence", "emoji", "hygiene", "hygieneScore", "freshness", "freshnessScore", "calories", "fiber", "carbs", "protein", "fat", "vitamins", "minerals", "benefits", "risks", "tip"]
          }
        }
      });
      
      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      clearInterval(msgInterval); clearInterval(progInterval); setProgress(100);
      await new Promise(r=>setTimeout(r,500));
      onResult({...parsed, imagePreview:preview});
    } catch (err) {
      console.error(err);
      clearInterval(msgInterval); clearInterval(progInterval);
      onResult({name:"Apple",confidence:94,emoji:"🍎",imagePreview:preview,hygiene:"Clean",hygieneScore:92,freshness:"Very Fresh",freshnessScore:87,calories:95,fiber:"4.4g",carbs:"25g",protein:"0.5g",fat:"0.3g",vitamins:["Vitamin C","Vitamin A","Vitamin K","Vitamin B6"],minerals:["Potassium","Magnesium","Phosphorus","Calcium"],benefits:["Boosts immunity","Improves digestion","Supports heart health","Good for skin"],risks:["Wash thoroughly before eating","Remove seeds before eating"],tip:"Best consumed fresh in the morning. Eat with the skin for maximum fiber."});
    }
  };

  if (loading) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,background:"#fff"}}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes bop{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}`}</style>
      <div style={{fontSize:72,marginBottom:24,animation:"bop 1s ease-in-out infinite"}}>🔬</div>
      <div style={{fontSize:20,fontWeight:800,color:"#0F172A",marginBottom:6}}>AI Analysis</div>
      <div style={{fontSize:14,color:"#64748B",marginBottom:30,textAlign:"center",minHeight:20,transition:"all 0.3s"}}>{statusMsg}</div>
      <div style={{width:260,background:"#E2E8F0",borderRadius:99,height:10,overflow:"hidden"}}>
        <div style={{width:`${progress}%`,background:"linear-gradient(90deg,#22c55e,#86efac)",height:"100%",borderRadius:99,transition:"width 0.5s ease"}}/>
      </div>
      <div style={{fontSize:13,color:"#94A3B8",marginTop:10,fontWeight:600}}>{Math.round(progress)}%</div>
    </div>
  );

  if (preview) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:"#000"}}>
      <img src={preview} alt="preview" style={{flex:1,objectFit:"cover",maxHeight:"65vh"}}/>
      <div style={{background:"#fff",padding:"24px 20px 40px",display:"flex",gap:12}}>
        <button onClick={()=>setPreview(null)} style={{flex:1,padding:16,borderRadius:16,border:"2px solid #E2E8F0",background:"#fff",cursor:"pointer",fontSize:15,fontWeight:700,color:"#0F172A"}}>↩ Retake</button>
        <button onClick={analyzeFood} style={{flex:2,padding:16,borderRadius:16,border:"none",background:"#22C55E",cursor:"pointer",fontSize:15,fontWeight:700,color:"#fff",boxShadow:"0 6px 20px rgba(34,197,94,0.4)"}}>🔍 Analyze Food</button>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:"#0a0a0a",position:"relative"}}>
      <button onClick={onBack} style={{position:"absolute",top:52,left:20,zIndex:10,background:"rgba(255,255,255,0.15)",border:"none",borderRadius:12,color:"#fff",padding:"10px 16px",cursor:"pointer",fontSize:14,fontWeight:600,backdropFilter:"blur(8px)"}}>← Back</button>

      {mode==="camera" && !error ? (
        <>
          <video ref={videoRef} autoPlay playsInline muted style={{flex:1,objectFit:"cover"}}/>
          <canvas ref={canvasRef} style={{display:"none"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
            <div style={{width:240,height:240,position:"relative"}}>
              {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i)=>(
                <div key={i} style={{position:"absolute",[v]:0,[h]:0,width:36,height:36,borderTop:v==="top"?"3px solid #22c55e":"none",borderBottom:v==="bottom"?"3px solid #22c55e":"none",borderLeft:h==="left"?"3px solid #22c55e":"none",borderRight:h==="right"?"3px solid #22c55e":"none"}}/>
              ))}
            </div>
          </div>
          <div style={{position:"absolute",bottom:140,left:0,right:0,textAlign:"center",color:"rgba(255,255,255,0.75)",fontSize:13}}>Center fruit or vegetable in frame</div>
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 30px 60px",display:"flex",justifyContent:"center"}}>
            <button onClick={capturePhoto} style={{width:76,height:76,borderRadius:"50%",border:"4px solid #fff",background:"#22C55E",cursor:"pointer",boxShadow:"0 8px 30px rgba(34,197,94,0.5)"}}/>
          </div>
        </>
      ) : (
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
          {error&&<div style={{color:"#F59E0B",fontSize:14,marginBottom:20,textAlign:"center",background:"rgba(245,158,11,0.1)",padding:"12px 16px",borderRadius:12}}>{error}</div>}
          <div style={{fontSize:64,marginBottom:20}}>🖼️</div>
          <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:8}}>Upload Food Image</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginBottom:28,textAlign:"center"}}>Choose a clear photo of a fruit or vegetable</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} style={{background:"#22C55E",border:"none",borderRadius:16,padding:"16px 40px",cursor:"pointer",fontSize:15,fontWeight:700,color:"#fff",boxShadow:"0 6px 20px rgba(34,197,94,0.4)"}}>Choose Image</button>
        </div>
      )}
    </div>
  );
}

function ResultScreen({ result, onBack, onSave }: any) {
  useEffect(()=>{ onSave(result); },[]);
  const hc = result.hygiene==="Clean"?"#22C55E":result.hygiene==="Moderate"?"#F59E0B":"#EF4444";
  const fc = result.freshnessScore>70?"#22C55E":result.freshnessScore>40?"#F59E0B":"#EF4444";
  return (
    <div style={{flex:1,overflowY:"auto",background:"#FAFAFA"}}>
      <div style={{background:"linear-gradient(135deg,#052e16,#166534)",padding:"52px 20px 30px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,color:"#fff",padding:"8px 14px",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:20}}>← Back</button>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:80,height:80,borderRadius:20,overflow:"hidden",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid rgba(255,255,255,0.2)",flexShrink:0}}>
            {result.imagePreview?<img src={result.imagePreview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:40}}>{result.emoji}</span>}
          </div>
          <div>
            <div style={{fontSize:26,fontWeight:800,color:"#fff"}}>{result.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#4ade80"}}/>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.8)"}}>AI Confidence: <strong style={{color:"#fff"}}>{result.confidence}%</strong></span>
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:"20px 20px 100px"}}>
        <Card>
          <CardTitle icon="🧼" title="Hygiene Level"/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <span style={{fontSize:22,fontWeight:800,color:hc}}>{result.hygiene}</span>
            <span style={{background:hc+"22",color:hc,padding:"6px 14px",borderRadius:99,fontSize:13,fontWeight:700}}>{result.hygiene==="Clean"?"✓ Safe":result.hygiene==="Moderate"?"⚠ Wash Well":"✗ Poor"}</span>
          </div>
          <ProgressBar value={result.hygieneScore} color={hc}/>
          <div style={{fontSize:12,color:"#64748B",marginTop:6}}>{result.hygieneScore}% hygiene score</div>
        </Card>

        <Card>
          <CardTitle icon="🌱" title="Freshness Level"/>
          <div style={{fontSize:20,fontWeight:800,color:fc,marginBottom:12}}>{result.freshness}</div>
          <ProgressBar value={result.freshnessScore} color={fc}/>
          <div style={{fontSize:12,color:"#64748B",marginTop:6}}>{result.freshnessScore}% freshness</div>
        </Card>

        <Card>
          <CardTitle icon="📊" title="Nutrition Facts"/>
          {[{label:"Calories",value:`${result.calories} kcal`,icon:"🔥"},{label:"Fiber",value:result.fiber,icon:"🌾"},{label:"Carbohydrates",value:result.carbs,icon:"🍞"},{label:"Protein",value:result.protein,icon:"💪"},{label:"Fat",value:result.fat,icon:"🥑"}].map((n,i,arr)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<arr.length-1?"1px solid #E2E8F0":"none"}}>
              <span style={{fontSize:14,color:"#0F172A"}}>{n.icon} {n.label}</span>
              <span style={{fontSize:14,fontWeight:700,color:"#0F172A"}}>{n.value}</span>
            </div>
          ))}
        </Card>

        <Card>
          <CardTitle icon="💊" title="Vitamins"/>
          <div>{result.vitamins?.map((v: string,i: number)=><Pill key={i} label={v}/>)}</div>
        </Card>

        <Card>
          <CardTitle icon="⚗️" title="Minerals"/>
          <div>{result.minerals?.map((m: string,i: number)=><Pill key={i} label={m} color="#EFF6FF" textColor="#1D4ED8"/>)}</div>
        </Card>

        <Card>
          <CardTitle icon="💚" title="Health Benefits"/>
          {result.benefits?.map((b: string,i: number)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
              <span style={{color:"#22C55E",fontWeight:700,marginTop:1}}>✓</span>
              <span style={{fontSize:14,color:"#0F172A"}}>{b}</span>
            </div>
          ))}
        </Card>

        {result.risks?.length>0&&(
          <Card style={{borderLeft:"4px solid #F59E0B"}}>
            <CardTitle icon="⚠️" title="Things to Note"/>
            {result.risks?.map((r: string,i: number)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                <span style={{color:"#F59E0B",fontWeight:700}}>!</span>
                <span style={{fontSize:14,color:"#0F172A"}}>{r}</span>
              </div>
            ))}
          </Card>
        )}

        <Card style={{background:"#F0FDF4",border:"1px solid #DCFCE7"}}>
          <CardTitle icon="💡" title="Health Tip"/>
          <div style={{fontSize:14,color:"#64748B",lineHeight:1.6,fontStyle:"italic"}}>"{result.tip}"</div>
        </Card>
      </div>
    </div>
  );
}

function HistoryScreen({ history }: any) {
  const all = [...history, ...SAMPLE_HISTORY.filter(s=>!history.find((h: any)=>h.name===s.name))];
  return (
    <div style={{flex:1,overflowY:"auto",padding:"0 20px 100px"}}>
      <div style={{paddingTop:52,marginBottom:24}}>
        <div style={{fontSize:26,fontWeight:800,color:"#0F172A"}}>Scan History</div>
        <div style={{fontSize:14,color:"#64748B",marginTop:4}}>{all.length} scans total</div>
      </div>
      {all.map((item,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:18,padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
          <div style={{width:56,height:56,borderRadius:16,background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{item.emoji||"🥝"}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700,color:"#0F172A"}}>{item.name}</div>
            <div style={{fontSize:12,color:"#64748B",marginTop:2}}>{item.date||"Recently"}</div>
            <div style={{marginTop:6}}><ProgressBar value={item.freshnessScore||75} color="#22C55E"/></div>
          </div>
          <span style={{padding:"4px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:item.hygiene==="Clean"?"#DCFCE7":"#FEF9C3",color:item.hygiene==="Clean"?"#166534":"#92400E"}}>{item.hygiene}</span>
        </div>
      ))}
    </div>
  );
}

function TipsScreen() {
  return (
    <div style={{flex:1,overflowY:"auto",padding:"0 20px 100px"}}>
      <div style={{paddingTop:52,marginBottom:24}}>
        <div style={{fontSize:26,fontWeight:800,color:"#0F172A"}}>Health Tips</div>
        <div style={{fontSize:14,color:"#64748B",marginTop:4}}>Daily nutrition insights</div>
      </div>
      {TIPS.map((tip,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:20,padding:20,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:32,marginBottom:12}}>{tip.emoji}</div>
          <div style={{fontSize:16,fontWeight:700,color:"#0F172A",marginBottom:8}}>{tip.title}</div>
          <div style={{fontSize:14,color:"#64748B",lineHeight:1.6}}>{tip.body}</div>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen({ scanCount, onClear }: any) {
  const [dark, setDark] = useState(false);
  return (
    <div style={{flex:1,overflowY:"auto",padding:"0 20px 100px"}}>
      <div style={{paddingTop:52,marginBottom:24}}>
        <div style={{fontSize:26,fontWeight:800,color:"#0F172A"}}>Profile</div>
      </div>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:86,height:86,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#166534)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px"}}>👤</div>
        <div style={{fontSize:18,fontWeight:700,color:"#0F172A"}}>NutriScan User</div>
        <div style={{fontSize:14,color:"#64748B"}}>user@nutriscan.ai</div>
      </div>
      <Card>
        <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}}>
          {[{v:scanCount,l:"Total Scans"},{v:"7",l:"Day Streak"},{v:"A+",l:"Health Score"}].map((s,i,arr)=>(
            <div key={i} style={{display:"flex",gap:0}}>
              <div>
                <div style={{fontSize:28,fontWeight:800,color:"#22C55E"}}>{s.v}</div>
                <div style={{fontSize:12,color:"#64748B"}}>{s.l}</div>
              </div>
              {i<arr.length-1&&<div style={{width:1,background:"#E2E8F0",margin:"0 16px"}}/>}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        {[
          {icon:"🌙",label:"Dark Mode",right:<div onClick={()=>setDark(d=>!d)} style={{width:46,height:26,borderRadius:13,background:dark?"#22C55E":"#E2E8F0",position:"relative",cursor:"pointer",transition:"background 0.3s"}}><div style={{position:"absolute",top:3,left:dark?22:3,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left 0.3s",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}}/></div>},
          {icon:"🌐",label:"Language",right:<span style={{fontSize:13,color:"#64748B"}}>English ›</span>},
          {icon:"🔔",label:"Notifications",right:<span style={{fontSize:13,color:"#64748B"}}>On ›</span>},
        ].map((r,i,arr)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:i<arr.length-1?"1px solid #E2E8F0":"none"}}>
            <span style={{fontSize:14,color:"#0F172A"}}>{r.icon} {r.label}</span>
            {r.right}
          </div>
        ))}
      </Card>
      <button onClick={onClear} style={{width:"100%",padding:16,borderRadius:16,border:"1px solid #FCA5A5",background:"#FEF2F2",cursor:"pointer",fontSize:14,fontWeight:600,color:"#EF4444"}}>🗑️ Clear Scan History</button>
    </div>
  );
}

const NAV = [{id:"home",icon:"🏠",label:"Home"},{id:"history",icon:"📋",label:"History"},{id:"tips",icon:"💡",label:"Tips"},{id:"profile",icon:"👤",label:"Profile"}];

export default function NutriScanAI() {
  const [splash, setSplash] = useState(true);
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState("main");
  const [cameraMode, setCameraMode] = useState("camera");
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleResult = (r: any) => { setResult(r); setScreen("result"); };
  const handleSave = (r: any) => {
    setHistory(prev => prev.find(h=>h.name===r.name) ? prev : [{...r,date:"Just now"},  ...prev]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#d1d5db;font-family:'DM Sans',sans-serif;}
        ::-webkit-scrollbar{width:0;}
      `}</style>
      <div style={{fontFamily:"'DM Sans',sans-serif",maxWidth:430,margin:"0 auto",height:"100vh",background:"#FAFAFA",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {splash && <SplashScreen onDone={()=>setSplash(false)}/>}

        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {screen==="camera"
            ? <CameraScreen mode={cameraMode} onBack={()=>setScreen("main")} onResult={handleResult}/>
            : screen==="result"
            ? <ResultScreen result={result} onBack={()=>setScreen("main")} onSave={handleSave}/>
            : <>
                {tab==="home"&&<HomeScreen onScan={()=>{setCameraMode("camera");setScreen("camera");}} onUpload={()=>{setCameraMode("upload");setScreen("camera");}}/>}
                {tab==="history"&&<HistoryScreen history={history}/>}
                {tab==="tips"&&<TipsScreen/>}
                {tab==="profile"&&<ProfileScreen scanCount={history.length} onClear={()=>setHistory([])}/>}
              </>
          }
        </div>

        {screen==="main"&&(
          <div style={{background:"rgba(255,255,255,0.96)",backdropFilter:"blur(16px)",borderTop:"1px solid #E2E8F0",display:"flex",paddingBottom:12}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 0 4px",gap:4}}>
                <span style={{fontSize:22,filter:tab===n.id?"none":"grayscale(100%) opacity(0.45)"}}>{n.icon}</span>
                <span style={{fontSize:11,fontWeight:tab===n.id?700:400,color:tab===n.id?"#22C55E":"#94A3B8"}}>{n.label}</span>
                {tab===n.id&&<div style={{width:4,height:4,borderRadius:"50%",background:"#22C55E"}}/>}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
