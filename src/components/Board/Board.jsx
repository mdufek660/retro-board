import {useState} from "react";
import Category from "../Category/Category";
import "./Board.css"

function App(){
	const [numCategories, setNumCategories] = useState(3)
	const [catWidth, setCatWidth] = useState("31%")
	const [marginWidth, setMarginWidth] = useState("1%")
	const [addedCategories, setAddedCategories] = useState([])

	const incCatCount = () =>{
		setNumCategories(numCategories+1); 
		setCatWidth(""+Math.round(90/(numCategories+2))+"%")
		setMarginWidth(""+Math.round(5/(numCategories+2))+"%")
		console.log("Width: "+Math.round(90/(numCategories+1))+"%")
		console.log("Margin: "+Math.round(5/(numCategories+2))+"%")
		console.log("Total: "+((numCategories+1)*Math.round(90/(numCategories+1))+(numCategories+1)*Math.round(5/(numCategories+2))))
	}

	const decCatCount = () =>{
		setNumCategories(numCategories-1); 
		if(numCategories==0){setNumCategories(1)}
		setCatWidth(""+Math.round(95/(numCategories+1))+"%")
		setMarginWidth(""+Math.round(5/(numCategories+2))+"%")
	}

	const addNewCategory = () =>{
		let temp={titleC:"Place Holder", bgcC:"rgba(100,100,100,.5)", widthInC:catWidth, marginInC:marginWidth, key:Date.now()}
		setAddedCategories([...addedCategories, temp])
		incCatCount();
	}


	return <>
		<div><button onClick={addNewCategory}>Add new Category</button></div>
		
		<div style={{width:"100%"}}>
    		<Category title="Went well" bgc="rgba(100,175,100,.5)" widthIn={catWidth} marginIn={marginWidth} key={1}/>
    		<Category title="To Improve" bgc="rgba(175,100,100,.5)" widthIn={catWidth} marginIn={marginWidth} key={2}/>
    		<Category title="Action Items" bgc="rgba(175,175,100,.5)" widthIn={catWidth} marginIn={marginWidth} key={3}/>
    		{addedCategories.map((cat, indx)=>{
			return <Category  title={cat.titleC} bgc={cat.bgcC} widthIn={catWidth} marginIn={marginWidth} key={cat.key}/>
			})}
		</div>
	</>
}

export default App;