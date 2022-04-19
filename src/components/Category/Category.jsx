import {useState} from "react";
import "./Category.css";
import Retrospective from "../Retrospective/Retrospective"
import Retro from "../Retrospective/Retrospective.css"


function App({title = "default", bgc="rgba(100,150,0,1)"}){

	const [divList, setDivList] = useState([]);
	const [deleterV, setDeleterV]=useState();

	console.log("Div list:", divList)

	const inputHandler=e=>{setDeleterV(e.target.value)}

	const deleter = e =>{
		console.log(e.target.value)
		removeRetro(divList[deleterV-1].key)
	}

	const removeRetro=(rid)=>{
		let tempArray=[];
		console.log("rid: "+rid)
		console.log(divList)

		for(let entry of divList){
			console.log(entry.key)
			if(entry.key!=rid){tempArray.push(entry)}
		}

		console.log("\n\n\n\n\n\n")

		setDivList(tempArray)
	}

	const addNewRetro= e =>{
		/*
			create a collection of objects
		*/
		let retroTitle=title+"-" + (divList.length+1)
		let retrobgc=bgc.replace(".5","1")
		let retroid=Date.now()
		console.log("Generating at: "+retroid)
		setDivList([...divList, <Retrospective titleR={retroTitle} bgcR={retrobgc} id= {retroid} key={retroid} removeRetroR={removeRetro}/>])
		console.log(divList)
	}

	

	return <><div className="Container" style={{backgroundColor:bgc}}>
		<input onChange={inputHandler}/>
		<button onClick={deleter}> GARBAGE </button>
		<div className="TitleBox">{title}</div>
		<button onClick={addNewRetro}>add new retro</button>
		<div>{divList}</div> 
		{/*map*/}
	</div></>
}

export default App;