//import { Search } from "@material-ui/icons"; 
import React, { Fragment, useState ,useEffect} from "react";
import Tooltip from '../Utils/Tooltip/Tooltip';
import "./Slots.css";

//External Imports
import { CSSTransition, TransitionGroup } from "react-transition-group";


function ShowSlots({ day, slotData,deleteClass}) {
  //Used to output Individual slots

  return (
    <section className="weekday">
      <div className="weekday__title">
        <span>{day}</span>
        <span className="weekday__classCount">{slotData.length} Classes</span>
      </div>

      <div
        className={`weekday__slots ${
          slotData.length === 0 ? "weekday__slots--empty" : ""
        }`}
        id="style-1">
        {slotData.length === 0 && (
          <div className="weekday__empty">
            <span>No classes</span>
            <span>scheduled</span>
            <span>for today.</span>
          </div>
        )}
        {slotData.map((slot, index) => {
          const {
            id,
            created,
            duration,
            facultyName,
            title,
            startTime,
            endTime,
          } = slot;

          return (
            <div key={id} className="weekday_slotContainer">
              <span className="weekday_slotIndex">{index + 1}.</span>

              <label htmlFor={id}>
                <input
                  type="checkbox"
                  className="slotActivator"
                  name="slotGroup"
                  id={id}
                />
                <div className="slot">
                  {/*Elements that appear on Slot checked state*/}
                  <button className="slot__edit">
                    <i className="fa fa-pencil-square" aria-hidden="true"></i>
                    <p>Edit Slot</p>
                  </button>

                  <button id="slot__delete" onClick= {() => deleteClass(id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>

                  {/*Elements that disappear on Slot checked state*/}

                  <div className="slot__meta">
                    <span className="slot__duration">{duration}</span>
                    <span className="slot__lastActivity">{created}</span>
                  </div>

                  <Tooltip maxLength={18}>
                    <span className="slot__title">{title}</span>
                  </Tooltip>

                  <div className="slot__person">
                    <span id="by">By </span>
                    <Tooltip maxLength={24}>
                      <span className="slot__personName">{facultyName}</span>
                    </Tooltip>
                  </div>
                  <div className="slot__timing">
                    <i
                      className="fa fa-hourglass-start"
                      id="slot__icon"
                      aria-hidden="true"></i>
                    <div className="slot__startEnd">
                      <span className="slot__start">{startTime}</span>
                      <span className="slot__sep">-</span>
                      <span className="slot__end">{endTime}</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Highlight({pre,content,post}){

  // Used to highlight the matched text after search in search results

  return <Fragment>
          {pre}
      <span style={{color:'white',background:'green'}}>{content}</span>
          {post}
  </Fragment>
}



function Slots({ weekdayData ,deleteClass }) {

  
  
  //Direction attribute is needed to decide the animation direction for the caraousel.
  const [caraousel, setCaraousel] = useState({
    position: 0,
    direction: "right",
  });

  //For implementation of search with highlighted text feature.
  const [search, setSearch] = useState({currentText:"",searchedText:"",searchData:null});
  const {currentText,searchedText,searchData} = search;

  const getSearchDataLength = () => {
    if (searchData === null){
      return 0
    }
    else{
      return searchData.reduce((total,current) => total + current.data.length,0)
    }
    
  }

  useEffect(() => {
    //New Search operation should take place when searchedText changes or when there is a change in weekdayData prop
    // i.e when delete operation takes place from the search results.
    handleSearch()

  },[searchedText,weekdayData])

  

  const handleSearch = () => {
    // Used to get a subset of weekdayData by matching against 'searchedText'
    // If found  it returns the highlighted results.

    if (searchedText) {   
    //deepcopy needed to overcome problem with mutation
    let subsetData = JSON.parse(JSON.stringify(weekdayData)).map((weekday) => {

      let newData = [];

      for (let i = 0 ; i<weekday.data.length;i++) {

        let newWeekdayData = {...weekday.data[i]};
        const { title, facultyName } = newWeekdayData;
              
        //Case insensitive match
        if ((title.toLowerCase() + "\n" + facultyName.toLowerCase()).includes(searchedText.toLowerCase())) {
          
          const changed = [title,facultyName].map((item) => {

            const index = item.toLowerCase().indexOf(searchedText.toLowerCase())
            //If there is a match, return the element with highlighted text.
            if (index !== -1){
                return <Highlight pre={item.slice(0,index)} content = {item.slice(index,index+searchedText.length)} post={item.slice(index+searchedText.length)}/>
                
            }
            else{
              return item
            }
          })
          
          newWeekdayData.title = changed[0]
          newWeekdayData.facultyName = changed[1]
          newData.push(newWeekdayData)

        }        

      }     
      //Replace all the slots in a weekday with only matching slots.
      weekday.data = newData
      
      return weekday
    });

    //Remove weekdays if they dont even have a single matching slot.
    subsetData = subsetData.filter(({data}) => data.length !== 0)

    setSearch({...search,searchData:subsetData})
    //Reset the caraousel position
    setCaraousel({...caraousel,position:0})

  }
  };

  

  //Pagination Logic for cicular caraousel navigation.
  const { position, direction } = caraousel;
  const weekdayPerPage = 3;

  //Decide whether to show all slots or search results. Incase of 0 matched slots, all slots are shown.
  let target;
  if (getSearchDataLength() !== 0){
    target = searchData;
  }
  else{
    target = weekdayData;
    
  }

  //Slcing to show paginated data.
  const pageData = target
    .slice(position, position + weekdayPerPage)
    .concat(target.slice(0, position + weekdayPerPage > target.length ? position + weekdayPerPage - target.length : 0));

  return (
    <Fragment>
      <div className="showdata__search">
        <input
          type="text"
          name=""
          placeholder="Search For classes.."
          value={currentText}
          onChange = {(e) => setSearch({...search,currentText:e.target.value})}
        />

        <button className="showdata__searchButton" onClick={() => setSearch({...search,searchedText:currentText})}>
          <i className="fas fa-search"></i>
        </button>

        {searchData !== null && <button className="showdata__clearButton" onClick={() => setSearch({currentText:"",searchedText:"",searchData:null})} >
          <i class="fas fa-times-circle"></i>
        </button>}
      </div>

      {/*Search result */}
      {searchData !== null && <span className="showdata__searchStatus">
        {getSearchDataLength() === 0 ? <span style={{color:'red'}}> No results found for '{searchedText}' . . . </span>:
         <Fragment>Showing {getSearchDataLength()} classes matching '<span style={{color:'green'}}>{searchedText}</span>' . . .</Fragment> }
         </span>}

      <div className="weekdayContainer">
        <i
          className="fas fa-chevron-left"
          onClick={(e) =>
            setCaraousel(
              position === 0
                ? {//Circular list immplementation
                    position: target.length-1,
                    direction: "left",
                  }
                : {
                    position: position - 1,
                    direction: "left",
                  }
            )
          }></i>
        <TransitionGroup component={null} exit={false}>
          {pageData.map((item, index) => (
            // Key=Math.random() can be used to animate all 3 items
            <CSSTransition
              key={item.week}
              appear={true}
              timeout={300}
              classNames={direction}>
              <ShowSlots
                day={item.week}
                slotData={item.data}
                deleteClass = {deleteClass}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>

        <i
          className="fas fa-chevron-right"
          onClick={(e) =>
            setCaraousel(
              position === target.length-1
                ? {//Circular list immplementation
                    position: 0,
                    direction: "right",
                  }
                : {
                    position: position + 1,
                    direction: "right",
                  }
            )
          }></i>
      </div>
    </Fragment>
  );
}

export default Slots;
