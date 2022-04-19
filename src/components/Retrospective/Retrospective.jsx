import {useState} from "react"
import "./Retrospective.css"

function App({titleR="place holder", bgcR="rgba(1,1,1,1)", id=0, key=0, removeRetroR=null}){
	const [text, setText]=useState("notes");
	const [storageText, setStorageText]=useState();
	const [editing, setEditing]=useState('none');

	const [titleText, setTitleText]=useState(titleR);
	const [storageTextTitle, setStorageTextTitle]=useState();
	const [editingTitle, setEditingTitle]=useState('none');

	const [likes, setLikes]=useState();
	const [idp, setIdp]=useState(id)

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
	}

	const deleteButtonHandler = e =>{

		removeRetroR(idp)
	}

	return <>
	<div className="Retro" style={{backgroundColor:bgcR}} id={id}>
			<button className="ButtonOverride EditButton">
				<img className="Image" src="https://i.imgur.com/oLK7lrt.png" alt="my image" onClick={editTitleButton} />
			</button>		
			<button className="ButtonOverride AcceptButton" style={{display:editingTitle}} >
				<img className="Image" src="https://i.imgur.com/OmnHjTT.png" alt="my image" onClick={acceptTitleButton} />
			</button>
			<textarea style={{display:editingTitle}} autoFocus className="Input" onChange={editTitleText} name="inputField"/>
		<div className="Title">{titleText}
		</div>

		<button className="ButtonOverride EditButton">
			<img className="Image" src="https://i.imgur.com/oLK7lrt.png" alt="my image" onClick={editButton} />
		</button>
		
		<div className="Body">
			<button className="ButtonOverride AcceptButton" style={{display:editing}} >
				<img className="Image" src="https://i.imgur.com/OmnHjTT.png" alt="my image" onClick={acceptButton} />
			</button>
			<textarea style={{display:editing}} autoFocus className="Input" onChange={editText} name="inputField"/>
			<div>{text}</div>
		</div>

		<div className="Footer">
			<button className="ButtonOverride SendLeft">
				<img className="Image" src="https://i.imgur.com/TPMNwcz.png" alt="my image" />
			</button>

			<button className="ButtonOverride DeleteButton">
				<img className="Image" src="https://i.imgur.com/PFrUuVP.png" alt="my image" onClick={deleteButtonHandler}/>
			</button>
			
			<button className="ButtonOverride SendRight">
				<img className="Image" src="https://i.imgur.com/OkWyZrG.png" alt="my image" />
			</button>
		</div>
	</div></>
}

export default App;