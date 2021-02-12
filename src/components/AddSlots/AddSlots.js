import React, { useState ,useEffect,Fragment} from "react";
import Tooltip from '../Utils/Tooltip/Tooltip'
import "./AddSlots.css";

//External Imports
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";



const sampleData = [
    {
      id: 1,
      name: "Amit Maurya",
      img: "http://unsplash.it/1000/1501",
      status: "UNVERIFIED",
    },
    {
      id: 2,
      name: "Ramjeet Yadav",
      img: "http://unsplash.it/1000/1502",
      status: "INVITED",
    },
    {
      id: 3,
      name: "Arvind Singh",
      img: "http://unsplash.it/1000/1503",
      status: "UNVERIFIED",
    },
    {
      id: 4,
      name: "Pradeep Kumar",
      img: "http://unsplash.it/1000/1504",
      status: "VERIFIED",
    },
    {
      id: 5,
      name: "Utkarsh Singh",
      img: "http://unsplash.it/1000/1505",
      status: "UNVERIFIED",
    },
  ];

function SkeletonLoader({children,loading}){

  if (loading){
    return <Skeleton id="skeleton" >{children}</Skeleton>
  }
  else {
    return <Fragment>{children}</Fragment>
  }
}



function AddSlots({createClass}) {

  //To Handle the TAB changes between search section & add section
  const [tab, setTab] = useState(0);

  //To Handle the API data
  const [faculty,setFaculty] = useState({'count':0,'next':null,'previous':null,'results':sampleData,'loading':false,'isSearch':false});

  //To handle Form Changes 
  const [form,setForm] = useState({'title':'','startTime':'','endTime':'','weekdayChoice':"0",'facultyChoice':undefined})

  let selectStyle = {}
  if (form.weekdayChoice === "0"){
    selectStyle = {fontWeight:400,color:'rgb(93, 92, 92)'}
  }
 
  
  //To handle form changes in Add faculty section
  const [invite,setInvite] = useState({'name':'','email':''})
 

  //To Handler Faculty Search Bar
  const [facultySearch,setFacultySearch] = useState("");


  const handleInvite = async () => {
    const postData = {'name':invite.name}
    const email = invite.email
    if (email){
      postData['email'] = email
    }
    console.log(postData)

    const newFacultyResponse = await axios.post(`http://localhost:8000/api/admin-faculty/`,postData,{headers: {
    'Authorization': 'Token 7529b12f6d032b6779a34679d07ada6759caf5ee'
  }}).then(res => res.data)

  console.log(newFacultyResponse)
  setInvite({'name':'','email':''})

  }

  useEffect(() => {
    //Load new faculty data on component load & Tab Change
    handlePagination(`http://localhost:8000/api/admin-faculty/`)

  }, [tab])



  const handleSave = () => {
    createClass(form)
    setForm({'title':'','startTime':'','endTime':'','weekdayChoice':"0",'facultyChoice':undefined})
  }



  const handlePagination = async (url,isSearch=false) => {

    setFaculty({...faculty,loading:true})
    const facultydData = await axios.get(url,{headers: {
    'Authorization': 'Token 7529b12f6d032b6779a34679d07ada6759caf5ee'
  }}).then(res => res.data) 
    setTimeout(() => setFaculty({...facultydData,loading:false,isSearch:isSearch}),1000)
    
  }



  const handleFacultySearch = () => {
    if (facultySearch){
      handlePagination(`http://localhost:8000/api/admin-faculty/?q=${facultySearch}`,true)
    }
  }

  const handleTimeInput = (e) => {
    //Function Used to control the input of time so that only valid entries are possible.

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    const prevValue = form[e.target.name]
    
    // Incase of deletion
    if (e.target.value.length < prevValue.length){
      let stringValue = e.target.value

      //When deleting the Full Colon , the second value is also deleted.
      if (stringValue.length === 2){
        stringValue = stringValue.slice(0,-1)
      }
      setForm({...form,[e.target.name]:stringValue})
      
    }
    else{

    let curValue = e.target.value.slice(-1)
    let finalValue = false

    // Only Allow Numeric Values on Input
    if (isNumeric(curValue)){

      curValue = parseInt(curValue)

      switch(prevValue.length){

      case 0:
        // Only 0,1,2 can be valid value for 1st index of HH:MM
        if ([0,1,2].includes(curValue)){
          finalValue = curValue.toString()
        }
        else{
          //Autocomplete the value if the provided value cant be in first index of HH:MM, ex 6 become 06:
          finalValue = `0${curValue}:`
        }
        break    

      case 1:
        // Making sure that hours doesnt exceed 23
        if (parseInt(`${prevValue.slice(-1)}${curValue}`) <= 23){
          finalValue = `${curValue}:`
        }       
        break
      

      case 3:
        // Only 0-6 can be valid value for 3rd index of HH:MM
        if ([0,1,2,3,4,5].includes(curValue)){
          finalValue = curValue.toString()
        }
        break
      
      case 4:
        //Making sure that minutes dont exceed 59 (Maybe redundant, test and remove)
        if (parseInt(`${prevValue.slice(-1)}${curValue}`) <= 59){
          finalValue = curValue.toString()
        }
        break
      
      }

      //Update on valid entries.
      if (finalValue){
      setForm({...form,[e.target.name]:prevValue+finalValue})
    }


    }

  }  
    
  }


  
  return (
    <div className="editDeck">
      <div className="editDeck__statusBar">
        <span className="editDeck__statusText">Add a New Class</span>
      </div>
      <hr id="divider" />
      <input
        type="text"
        name=""
        id="editDeck__title"
        placeholder="Title for the class..."
        value={form.title}
        onChange = {(e) => setForm({...form,'title':e.target.value})}
      />

      <div className="editDeck__timingControls">
        <div className="editDeck__weekday">
          <select  value={form.weekdayChoice} style={selectStyle} onChange = {(e)=> setForm({...form,'weekdayChoice':e.target.value})}>
            <option value="0">Choose a weekday</option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
          <div className="editDeck__dropdown">
            <i className="fas fa-caret-down fa-2x"></i>
          </div>
        </div>
      </div>

      <div className="editDeck__time">
        <div className="editDeck__startTime">
          <div className="editDeck__iconContainer">
            <i className="fas fa-clock"></i> 
          </div>

          <input type="text" name="startTime" id="" placeholder="From HH:MM" value={form.startTime} onChange = {handleTimeInput}/>
        </div>

        <div className="editDeck__endTime">
          <div className="editDeck__iconContainer">
            <i className="fas fa-clock"></i>
          </div>
          <input type="text" name="endTime" id="" placeholder="To HH:MM" value={form.endTime}  onChange = {handleTimeInput} />
        </div>
      </div>

      <hr id="divider" />

      {/*Tabs*/}
      <div className="editDeck__tabs">
        <Button
          className={`editDeck__tab ${tab === 0 && "editDeck__tab--active"}`}
          onClick={(e) => setTab(0)}
          disableElevation
          style={{ borderRadius: 0, boxSizing: "border-box" }}
          variant="contained">
          <i className="fas fa-list"></i>
          <span style={{ textTransform: "capitalize" }}>Select</span>
        </Button>
        <Button
          className={`editDeck__tab ${tab === 1 && "editDeck__tab--active"}`}
          onClick={(e) => setTab(1)}
          disableElevation
          style={{ borderRadius: 0 }}
          variant="contained">
          <i className="fas fa-user-plus"></i>
          <span style={{ textTransform: "capitalize" }}>Invite</span>
        </Button>
      </div>

      {/*Search Faculties Section*/}
      <section className="selectFaculties" hidden={tab !== 0}>
        <div className="editDeck__searchFaculty">
          <input type="text" placeholder= {`Search in ${faculty.count} faculties...`} value={facultySearch} onChange={(e) => setFacultySearch(e.target.value)}/>

          {faculty.isSearch && 
          <button className="editDeck__searchClearButton" onClick = {() => {
    
            handlePagination(`http://localhost:8000/api/admin-faculty/`)
            setTimeout(() => setFacultySearch(""),500)
            
            }}>

            <i class="fas fa-times"></i>
          </button>}

          <button className="editDeck__searchButton" onClick = {handleFacultySearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        
        {faculty.results.length === 0 &&
        <span className="editDeck_facultyEmpty"> No Faculties Found! </span>}

        <ul className="editDeck__items">
          {faculty.results.map((item,count) => {
            const { id, name, image, status ,index} = item;

            return (
              <li id={id} key={id}>
                
                <SkeletonLoader loading={faculty.loading} >
                <label
                  
                  htmlFor={name}
                  className={`editDeck__item ${
                    id === form.facultyChoice ? "editDeck__item--checked" : ""
                  }`}>
                  <input
                    type="radio"
                    name="facultyList"
                    id={name}
                    checked={id === form.facultyChoice}
                    onChange={() => setForm({...form,'facultyChoice':id})}
                  />
                  <div className="actualradio"></div>

                  <span className="editDeck__index">{index}.</span>
                  <div className="editDeck__faculty">
                    <img className="editDeck__image" src={sampleData[count].img} alt="" />
                    <Tooltip maxLength={16}>
                      <span>{name}</span>
                    </Tooltip>
                  </div>

                  
                  <span className={`editDeck__status ${status === "UNVERIFIED" ? "editDeck__status--failed" : ""}`}>
                    {status}
                  </span>
                  
                </label>
                </SkeletonLoader>
                
                
              </li>
            );
          })}
        </ul>

        <div className="editDeck__controls">
          <button id="editDeck__previous" className={faculty.previous===null?'editDeck__button--disabled':''} onClick={() => handlePagination(faculty.previous,faculty.isSearch)}>
            <i className="fas fa-backward"></i>
            <span>Previous</span>
          </button>

          <button id='editDeck__next' className={faculty.next===null?'editDeck__button--disabled':''} onClick={() => handlePagination(faculty.next,faculty.isSearch)}>
            <span>Next</span>
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </section>

      {tab === 1 && (
        <section className="addFaculties" hidden={tab !== 1}>
          <TextField

            value={invite.name}
            onChange = {(e) => setInvite({...invite,'name':e.target.value})}
            id="outlined-basic"
            label="Faculty Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    style={{ color: "#b6244f" }}
                    color="secondary"
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField

            value={invite.email}
            onChange = {(e) => setInvite({...invite,'email':e.target.value})}
            id="outlined-basic"
            label="Email (Optional)"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: "#b6244f" }} color="secondary" />
                </InputAdornment>
              ),
            }}
          />

          <span className="addFaculties__note">
            Note:An Email Invite would be sent, if its provided.
          </span>
          <Button id="addFacultyButton" variant="contained" color="primary" onClick={handleInvite}>
            <i className="fas fa-user-plus"></i>
            <span>Add Faculty</span>
          </Button >
        </section>
      )}

      <hr id="divider" />

      <Button id="save" variant="contained" onClick={handleSave}>
        <i className="fas fa-plus-square"></i>
        <span>CREATE CLASS</span>
      </Button>
    </div>
  );
}

export default AddSlots;
