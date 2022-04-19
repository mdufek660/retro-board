import {useState} from "react";
import "./Category.css";
import Retrospective from "../Retrospective/Retrospective"


function App({title = "default", bgc="rgba(100,150,0,1)", column=0, widthIn="20%", marginIn="1%"}){

	const [divList, setDivList] = useState([]);
	const [deleterV, setDeleterV]=useState();
	const [bgColor, setBgColor]=useState(bgc)
	const [retroTitle, setRetroTitle]=useState(title)
	const [editingTitle, setEditingTitle]=useState('none')
	const [titleStorage, setTitleStorage]=useState()

	const [editingColor, setEditingColor]=useState('none')
	const [redRGB, setRedRGB]=useState(0)
	const [blueRGB, setBlueRGB]=useState(0)
	const [greenRGB, setGreenRGB]=useState(0)


	const inputHandler=e=>{setDeleterV(e.target.value)}

	const removeRetro=(rid)=>{
		let tempArray=[];

		for(let entry of divList){
			if(entry.key!=rid){tempArray.push(entry)}
		}

		setDivList(tempArray)
	}

	const addNewRetro= e =>{
		/*
			create a collection of objects
		*/

		let retrobgc=bgColor.replace(".5","1")
		let retroid=Date.now()
		let newRetroEntry = {titleR: retroTitle, bgcR: retrobgc, id: retroid, key: retroid, columnR:column}
		setDivList([...divList, newRetroEntry])
	}

	const editCatName = e =>{
		if(editingTitle=='none'){
			setEditingTitle('block')
		}else{
			setEditingTitle('none')
		}
	}

	const editTitleText=e=>{
		setTitleStorage(e.target.value)
	}

	const acceptTitleButton = e =>{
		setEditingTitle('none')
		setRetroTitle(titleStorage)
	}
	
	const redHandler = e =>{setRedRGB(e.target.value)}
	const blueHandler = e =>{setBlueRGB(e.target.value)}
	const greenHandler = e =>{setGreenRGB(e.target.value)}

	const colorChanger = e =>{
		if(editingColor=='none'){
			setEditingColor('block');
		}
		else{
			setEditingColor('none');
		}
	}

	const acceptColorButton = e =>{
		let colorString="rgba("
		if(!isNaN(redRGB)){
			setRedRGB(Math.round(redRGB))
			if(redRGB<0){setRedRGB(0);}
			if(redRGB>255){setRedRGB(255);}
		}else{
			setRedRGB(150)
		}

		if(!isNaN(greenRGB)){
			setGreenRGB(Math.round(greenRGB))
			if(greenRGB<0){setGreenRGB(0);}
			if(greenRGB>255){setGreenRGB(255);}
		}else{
			setGreenRGB(150)
		}

		if(!isNaN(blueRGB)){
			setBlueRGB(Math.round(blueRGB))
			if(blueRGB<0){setBlueRGB(0);}
			if(blueRGB>255){setBlueRGB(255);}
		}else{
			setBlueRGB(150)
		}
		colorString = colorString+redRGB+","+greenRGB+","+blueRGB+",0.5)"
		setBgColor(colorString)
		setEditingColor('none')
	}

	return <><div className="Container" style={{backgroundColor:bgColor, width:widthIn, margin:marginIn}}>

		<div className="TitleBox">
			{/* Color handling */}
			<button className="ButtonOverride ColorButton">
				<img className="Image" src="https://i.imgur.com/UtSw22z.png" alt="My img" onClick={colorChanger} />
			</button>
			<button className="ButtonOverride AcceptButton" style={{display:editingColor}} >
				<img className="Image" src="https://i.imgur.com/OmnHjTT.png" alt="my image" onClick={acceptColorButton} />
			</button>
			<div className="ColorRow" style={{display:editingColor}}>
				<input className="ColorInput" id="red" onChange={redHandler} placeholder="red 0-255"/>
				<input className="ColorInput" id="green" onChange={greenHandler} placeholder="green 0-255"/>
				<input className="ColorInput" id="blue" onChange={blueHandler} placeholder="blue 0-255"/>
			</div>

			{/* Title handling */}
			<button className="ButtonOverride EditButton">
				<img className="Image" src="https://i.imgur.com/oLK7lrt.png" alt="my image" onClick={editCatName} />
			</button>
			<button className="ButtonOverride AcceptButton" style={{display:editingTitle}} >
				<img className="Image" src="https://i.imgur.com/OmnHjTT.png" alt="my image" onClick={acceptTitleButton} />
			</button>
			<textarea style={{display:editingTitle}} autoFocus className="Input" onChange={editTitleText} name="inputField"/>
			<div>{retroTitle}</div>
		</div>
		
		<button onClick={addNewRetro}>add new retro</button>
		<div>{divList.map((retro, indx)=>{
			console.log("\n\n Here is the retro: ", retro)
			return <Retrospective  titleR={retro.titleR} bgcR={retro.bgcR} id={retro.id} key={retro.key} removeRetroR={removeRetro}/>
		})}</div> 
		{/*map*/}
	</div></>
}

export default App;