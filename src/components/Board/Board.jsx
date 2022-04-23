import {useState, useEffect, useRef, createRef} from "react";
import * as ReactDOM from 'react-dom'
import Category from "../Category/Category";
import "./Board.css"

function App(){
	const [numCategories, setNumCategories] = useState(3)
	const [catWidth, setCatWidth] = useState("31%")
	const [marginWidth, setMarginWidth] = useState("1%")
	const [addedCategories, setAddedCategories] = useState([])
	const [firstLoad, setFirstLoad]=useState(true)
	const [refArray, setRefArray]=useState([])

	const newRef = createRef()
	console.log(newRef)
	if(firstLoad){
		console.log("First load")
		setFirstLoad(false)
		let tempRef1=createRef()
		let tempRef2=createRef()
		let tempRef3=createRef()
		let dummy=[{titleC:"Went well", bgcC:"rgba(100,175,100,.5)", widthIn:"30%", marginIn:"1%", id:1, ref:tempRef1},
					{titleC:"To Improve", bgcC:"rgba(175,100,100,.5)", widthIn:"30%", marginIn:"1%", id:2, ref:tempRef2},
					{titleC:"Action Items", bgcC:"rgba(175,175,100,.5)", widthIn:"30%", marginIn:"1%", id:3, ref:tempRef3}]
		setAddedCategories([...addedCategories, ...dummy])
		setRefArray([tempRef1, tempRef2, tempRef3])
	}


	const incCatCount = () =>{
		setNumCategories(numCategories+1); 
		setCatWidth(""+Math.round(95/(numCategories+2))+"%")
		setMarginWidth(""+Math.round(5/(numCategories+3))+"%")
	}

	const decCatCount = () =>{
		setNumCategories(numCategories-1); 
		if(numCategories<=0){setNumCategories(1)}
		setCatWidth(""+Math.round(95/(numCategories+0))+"%")
		setMarginWidth(""+Math.round(5/(numCategories+1))+"%")
	}

	const addNewCategory = () =>{
		let tempDate=Date.now()
		let newRefHere=newRef
		let temp={titleC:"Place Holder", bgcC:"rgba(100,100,100,.5)", widthInC:catWidth, marginInC:marginWidth, id:tempDate, ref:newRefHere}
		setAddedCategories([...addedCategories, temp])
		incCatCount();
		setRefArray([...refArray, newRefHere])
	}

	const removeCat = (cid) =>{
		let tempCatArray=[];
		let tempIdArray=[]
		for(let entry of addedCategories){
			if(entry.id!=cid){tempCatArray.push(entry); tempIdArray.push(entry.id)}
		}
		decCatCount()
		setAddedCategories(tempCatArray)
	}

	const moveRetro = (retro, currentCat, leftOrRight) => {
		let arrayIndex=0;
		for(let i=0; i<addedCategories.length; i++){
			if(addedCategories[i].id==currentCat){
				arrayIndex=i;
				break;
			}
		}
		let newArrayIndex = 0;
		if(leftOrRight){
			newArrayIndex=arrayIndex+1
			if(newArrayIndex>=addedCategories.length){
				newArrayIndex=0
			}
		}
		else{
			newArrayIndex=arrayIndex-1
			if(newArrayIndex<0){
				newArrayIndex=addedCategories.length-1
			}
		}
		let neededRef=refArray[newArrayIndex]
		console.log(neededRef.current)
		neededRef.current(retro)
	}

	return <>
		<div><button onClick={addNewCategory}>Add new Category</button></div>
		
		<div style={{width:"100%"}}>
			{addedCategories.map((cat, indx)=>{console.log(cat.ref)})}

    		{addedCategories.map((cat, indx)=>{
			return <Category  title={cat.titleC} bgc={cat.bgcC} widthIn={catWidth} marginIn={marginWidth} catId={cat.id} 
								 deleter={removeCat} retroMover={moveRetro} childFunc={cat.ref}/>
			})}
		</div>
	</>
}

export default App;