/*This is a project for FreeCodeCamp entitled "Drum Machine".
This Javascript File uses Stateless React.
This Approach is similar to Landon Schlangen work.
Reference:https://www.youtube.com/watch?v=HTTaO1IjjlM*/

const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Q',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'W',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3E',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'A',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'S',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Z",      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'X',      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'C',      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

function App(){
    const [volume,setVolume] =React.useState(1);
    const [recording, setRecording] = React.useState("");
    const [speed, setSpeed] = React.useState(0.5);
    const playRecording = () =>{
      let index =0;
      let recordArray = recording.split(" ");
      const interval = setInterval(()=>{
        const audioTag = document.getElementById(recordArray[index]);

        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        index++;
      },speed*600);
      setTimeout(() => clearInterval(interval),600*speed*recordArray.length-1);
    };

    return(
        <div id="display" className="bg-info min-vh-100 text-white">
          
            <div className="text-center">
            <h2>Drum Machine</h2>
                {audioClips.map((clip) =>(
                    <Pad key={clip.id} clip={clip} volume ={volume} setRecording={setRecording}/>
                ))}
                <br/>
                <h4>Volume</h4>
                <input 
                  type="range" 
                  step="0.001" 
                  onChange={(e)=> setVolume(e.target.value)}
                  value={volume} 
                  max="1" 
                  min="0" 
                  className="w-50"
                />
                <h3>{recording}</h3>
                {recording && (
                  <>
                  <button onClick={playRecording} className="btn btn-success">play</button>
                  <button onClick={() => setRecording("")}className="btn btn-danger">clear</button>
                  
                <h4>Speed</h4>
                <input 
                  type="range" 
                  step="0.001" 
                  onChange={(e)=> setSpeed(e.target.value)}
                  value={speed} 
                  max="1" 
                  min="0" 
                  className="w-50"
                />
                </>
                )}
            </div>
        </div>
    );
}

function Pad({clip,volume,setRecording}){

    const [active, setActive]=React.useState(false);
    
    React.useEffect(() =>{
    /*key press Handler*/
      document.addEventListener('keydown', handleKeyPress);
      return () =>{
        document.removeEventListener('keydown', handleKeyPress);
      }
    }, []);

    const handleKeyPress = (e) =>{
      if(e.keyCode === clip.keyCode){
        playSound();
      }
    };
    const playSound = () =>{
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(()=> setActive(false), 200)
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setRecording(prev => prev+clip.keyTrigger + " ");
    };

    return(
        <div onClick={playSound} id="drum-pad" className={`drum-pad btn btn-secondary p-4 m-3 ${active && "drum-pad btn-warning"}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
            {clip.keyTrigger}
        </div>
    );

}

ReactDOM.render(<App/>,document.getElementById("drum-machine"));