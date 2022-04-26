import {useState, useEffect} from "react";
import "./Category.css";
import Retrospective from "../Retrospective/Retrospective"


function App({title = "default", bgc="rgba(100,150,0,1)", column=0, widthIn="20%", marginIn="1%", catId=0, 
				deleter=null, retroMover=null, childFunc}){



	const [divList, setDivList] = useState([]);

	const [deleterV, setDeleterV]=useState();
	const [bgColor, setBgColor]=useState(bgc)
	const [retroTitle, setRetroTitle]=useState(title)
	const [editingTitle, setEditingTitle]=useState('none')
	const [titleStorage, setTitleStorage]=useState("")

	const [editingColor, setEditingColor]=useState('none')
	const [redRGB, setRedRGB]=useState(0)
	const [blueRGB, setBlueRGB]=useState(0)
	const [greenRGB, setGreenRGB]=useState(0)

	useEffect(()=>{childFunc.current=refHandler;}, [divList, bgColor, retroTitle])

	const refHandler = (input) =>{
		addExistingRetro(input);
	}

	const inputHandler=e=>{setDeleterV(e.target.value)}

	const removeRetro=(rid)=>{
		let tempArray=[];
		for(let entry of divList){
			if(entry.key!=rid){tempArray.push(entry)}
		}

		setDivList(tempArray)
	}

	const addExistingRetro=(input)=>{
		let retrobgc=bgColor.replace(".5","1")
		let retroid=Date.now()
		console.log("input", input)
		let existingRetro={titleR: input.titleR, bodyR:input.bodyR, bgcR: retrobgc, rid: retroid, key: retroid, 
							columnR:column, currentCat:catId, like:input.like, dislike:input.dislike}
							
		console.log("retro", existingRetro)
		setDivList([...divList, existingRetro])
	}

	const addNewRetro= e =>{
		let retrobgc=bgColor.replace(".5","1")
		let retroid=Date.now()
		let newRetroEntry = {titleR: retroTitle, bodyR: "notes", bgcR: retrobgc, rid: retroid, key: retroid, 
								columnR:column, currentCat:catId, like:0, dislike:0, imp:0}
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
		if(titleStorage==""){alert("please enter a title!"); return}
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
		let alertMessage="";
		let badValue=false;
		if(isNaN(redRGB) || redRGB%1!=0 || redRGB<0 || redRGB>255){
			alertMessage+="Red RGB Value must be an int between 0 and 255\n"
			badValue=true;
		}
		if(isNaN(greenRGB) || greenRGB%1!=0 || greenRGB<0 || greenRGB>255){
			alertMessage+="Green RGB Value must be an int between 0 and 255\n"
			badValue=true;
		}		
		if(isNaN(blueRGB) || blueRGB%1!=0 || blueRGB<0 || blueRGB>255){
			alertMessage+="Blue RGB Value must be an int between 0 and 255\n"
			badValue=true;
		}

		if(badValue){
			alert(alertMessage)
			return
		}
		colorString = colorString+redRGB+","+greenRGB+","+blueRGB+",0.5)"
		setBgColor(colorString)
		setEditingColor('none')
	}

	const retroShift=(retroObject, leftOrRight)=>{
		retroMover(retroObject, catId, leftOrRight)
		removeRetro(retroObject.rid)
	}

	const deleteButtonHandler = e =>{
		
		deleter(catId)
	}

	return <><div className="Container" style={{backgroundColor:bgColor, width:widthIn, margin:marginIn}}>

		<div className="TitleBox">

			<button className="ButtonOverride DeleteButton">
				<img className="Image" src="https://i.imgur.com/PFrUuVP.png" alt="my image" onClick={deleteButtonHandler}/>
			</button>

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
		<div>{
			divList.map((retro, indx)=>{
			return <Retrospective  titleR={retro.titleR} bgcR={retro.bgcR} id={retro.rid} key={retro.key} bodyR={retro.bodyR}  
			currentCat={retro.catId} removeRetroR={removeRetro} retroShifter={retroShift}/>
		})}</div> 
		{/*map*/}
	</div></>
}

export default App;