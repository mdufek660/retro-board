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

	useEffect(()=>{console.log("hello")}, [addedCategories, firstLoad])

	if(firstLoad){
		console.log("First load")
		setFirstLoad(false)
		let dummy=[{titleC:"Went well", bgcC:"rgba(100,175,100,.5)", widthIn:"30%", marginIn:"1%", id:1, ref:createRef()},
					{titleC:"To Improve", bgcC:"rgba(175,100,100,.5)", widthIn:"30%", marginIn:"1%", id:2, ref:createRef()},
					{titleC:"Action Items", bgcC:"rgba(175,175,100,.5)", widthIn:"30%", marginIn:"1%", id:3, ref:createRef()}]
		setAddedCategories([...addedCategories, ...dummy])
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
		let temp={titleC:"Place Holder", bgcC:"rgba(100,100,100,.5)", widthInC:catWidth, marginInC:marginWidth, id:tempDate, ref:createRef}
		setAddedCategories([...addedCategories, temp])
		incCatCount();
	}

	const removeCat = (cid) =>{
		let tempCatArray=[];
		let tempRefArray=[];
		let index=-1;
		let counter=0;
		for(let entry of addedCategories){
			if(entry.id!=cid){tempCatArray.push(entry); counter++}
			else{index=counter}
		}

		decCatCount()
		console.log("All categories before setting new array", addedCategories)
		console.log("Removing the id: "+cid)

		setAddedCategories(tempCatArray)
		console.log("All categories after setting new array", addedCategories)
	}

	const moveRetro = (retro, currentCat, leftOrRight) => {
		let arrayIndex=0;

		//Find the index of the category as assigned to avoid issues with adding/deleting categories
		for(let i=0; i<addedCategories.length; i++){
			if(addedCategories[i].id==currentCat){
				arrayIndex=i;
				break;
			}
		}

		//Determine the new category based on whether it is moving left or right. Checks added to prevent out of bounds
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

		//Get the ref needed for the call
		let neededRef=addedCategories[newArrayIndex].ref
		neededRef.current(retro)
	}

	return <>
		<div><button onClick={addNewCategory}>Add new Category</button></div>
		
		<div style={{width:"100%"}}>
			{addedCategories.map((cat, indx)=>{console.log(cat)})}
    		{addedCategories.map((cat, indx)=>{
			return <Category  title={cat.titleC} bgc={cat.bgcC} widthIn={catWidth} marginIn={marginWidth} catId={cat.id} 
								 deleter={removeCat} retroMover={moveRetro} childFunc={cat.ref}/>
			})}
		</div>
	</>
}

export default App;