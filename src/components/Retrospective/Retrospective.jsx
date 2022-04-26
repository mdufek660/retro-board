import {useState, useEffect} from "react"
import "./Retrospective.css"

function App({titleR="place holder", bodyR="notes", bgcR="rgba(1,1,1,1)", id=0, currentCat=0, removeRetroR=null, retroShifter=null, like=0, dislike=0}){
	const [text, setText]=useState(bodyR);
	const [storageText, setStorageText]=useState("");
	const [editing, setEditing]=useState('none');

	const [titleText, setTitleText]=useState(titleR);
	const [storageTextTitle, setStorageTextTitle]=useState("");
	const [editingTitle, setEditingTitle]=useState('none');

	const [likes, setLikes]=useState(like);
	const [dislikes, setDislikes]=useState(dislike);
	const [idp, setIdp]=useState(id);
	const [newLine, setNewLine]=useState("\n")

	

	const editButton = e =>{
		if(editing=='none'){
			setEditing('block')
			setStorageText(text)
		}
		else{
			setEditing('none')
		}
	}

	const editText = e =>{
		setStorageText(e.target.value)
	}

	const acceptButton = e =>{
		setText(storageText);
		setStorageText("")
		setEditing('none')
	}

	const editTitleButton = e =>{
		if(editingTitle=='none'){
			setEditingTitle('block')
			setStorageTextTitle(titleText)
		}
		else{
			setEditingTitle('none')
		}
	}

	const editTitleText = e =>{
		setStorageTextTitle(e.target.value)
	}

	const acceptTitleButton = e =>{
		setEditingTitle('none')
		setTitleText(storageTextTitle);
		setStorageTextTitle("")
	}

	const deleteButtonHandler = () =>{
		removeRetroR(idp)
	}

	const retroToObject = () =>{

		return {titleR:titleText, bodyR:text, key:id, rid:id, like:likes, dislike:dislikes}
	}

	const leftButtonHandler = () =>{
		retroShifter(retroToObject(), false)
	}

	const rightButtonHandler= () =>{
		retroShifter(retroToObject(), true)
	}

	const likeButtonHandler = (e) =>{
		if(e.ctrlKey){setLikes(likes+10)}
		else{setLikes(likes+1)}
	}

	const dislikeButtonHandler = (e) =>{
		if(e.ctrlKey){setDislikes(dislikes+10)}
		else{setDislikes(dislikes+1)}
	}

	return <>
	<div className="Retro" style={{backgroundColor:bgcR}} id={id} key={id}>
			<button className="ButtonOverride EditButton">
				<img className="Image" src="https://i.imgur.com/oLK7lrt.png" alt="my image" onClick={editTitleButton} />
			</button>		
			<button className="ButtonOverride AcceptButton" style={{display:editingTitle}} >
				<img className="Image" src="https://i.imgur.com/OmnHjTT.png" alt="my image" onClick={acceptTitleButton} />
			</button>
			<textarea style={{display:editingTitle}} autoFocus className="Input" onChange={editTitleText} name="inputField"/>
		<div className="Title TextBox">{titleText}
		</div>

		<button className="ButtonOverride EditButton">
			<img className="Image" src="https://i.imgur.com/oLK7lrt.png" alt="my image" onClick={editButton} />
		</button>
		
		<div className="Body">
			<button className="ButtonOverride AcceptButton" style={{display:editing}} >
				<img className="Image" src="https://i.imgur.com/OmnHjTT.png" alt="my image" onClick={acceptButton} />
			</button>
			<textarea style={{display:editing}} autoFocus className="Input" onChange={editText} name="inputField"/>
			<div className="TextBox">{text}</div>
		</div>

		<div className="FooterRetro">

			<div className="BarDiv">
				<button className="ButtonOverride SendLeft">
					<img className="Image" src="https://i.imgur.com/ENZXL0V.png" alt="like" onClick={likeButtonHandler}/>
				</button>

				<button className="SendMid">Importance: {likes-dislikes}
				</button>

				<button className="ButtonOverride SendRight">
					<img className="Image" src="https://i.imgur.com/6pV2by9.png" alt="dislike" onClick={dislikeButtonHandler}/>
				</button>
			</div>
		</div>

		<div className="FooterRetro">


			<div className="BarDiv">
				<button className="ButtonOverride SendLeft">
					<img className="Image" src="https://i.imgur.com/TPMNwcz.png" alt="left" onClick={leftButtonHandler}/>
				</button>

				<button className="ButtonOverride SendMid">
					<img className="Image" src="https://i.imgur.com/PFrUuVP.png" alt="delete" onClick={deleteButtonHandler}/>
				</button>
				

				<button className="ButtonOverride SendRight">
					<img className="Image" src="https://i.imgur.com/OkWyZrG.png" alt="right" onClick={rightButtonHandler}/>
				</button>
			</div>
		</div>
	</div></>
}

export default App;