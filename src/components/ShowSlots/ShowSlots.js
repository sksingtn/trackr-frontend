import React, { Fragment, useState, useEffect } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSwipeable } from "react-swipeable";

import {
  MainContainer,
  SearchResult,
  Carousel,
  WeekdayContainer,
  SlotContainer,
  Slot,
} from "./style";
import Dim from "../../baseUI/Dim";
import EditIcon from "@material-ui/icons/Edit";
import RoundedIconButton from "../../baseUI/RoundedIconButton";
import SearchBar from "../../baseUI/SearchBar";
import Tooltip from "../Utils/Tooltip/Tooltip";

//TODO: Animate additon/deletion of slots
//TODO: Move slot hover effects to click effects
//TODO: Determine if weekdayData needs to be processed first

function Weekday({ day, slotData, deleteClass, highlight }) {
  //Used to output individual week
  return (
    <WeekdayContainer highlight={highlight}>
      <div className="heading">
        <span className="weekday-name">{day}</span>
        <span className="count">{slotData.length} Classes</span>
      </div>

      <SlotContainer>
        {slotData.length === 0 && (
          <div className="empty">
            <i class="fas fa-sad-tear"></i>
            <span>Such empty!</span>
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
            <Slot key={id}>
              <span className="index">{index + 1}.</span>

              <div className="content">
                {/*Elements that disappear on hover*/}
                <div className="topbar detailsbar">
                  <span className="duration">{duration}</span>
                  <Dim>{created}</Dim>
                </div>

                {/*Elements that appear on hover*/}
                <div className="topbar managebar">
                  <button className="editslotbtn">
                    <span>Edit Slot</span>
                    <EditIcon style={{ fontSize: "1em" }} />
                  </button>

                  <RoundedIconButton color="red">
                    <i className="fas fa-trash"></i>
                  </RoundedIconButton>
                </div>

                <Tooltip maxLength={18}>
                  <span className="title">{title}</span>
                </Tooltip>

                <div className="secondary">
                  <div className="faculty">
                    <span>By </span>
                    <img src="https://images.unsplash.com/photo-1621349805296-d026d3d26d1f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
                    <Tooltip maxLength={24}>
                      <span>{facultyName}</span>
                    </Tooltip>
                  </div>

                  {/*<span className="batch">C.S.E 4th year</span>*/}
                </div>

                <div className="timing">
                  <i className="fa fa-hourglass-start"></i>
                  <span className="time">
                    {startTime.replace(" ", "")}
                    <Dim>-</Dim>
                    {endTime.replace(" ", "")}
                  </span>
                </div>
              </div>
            </Slot>
          );
        })}
      </SlotContainer>
    </WeekdayContainer>
  );
}

function Highlight({ pre, content, post }) {
  // Used to highlight the matched text after search in search results

  return (
    <Fragment>
      {pre}
      <span style={{ color: "white", background: "green" }}>{content}</span>
      {post}
    </Fragment>
  );
}

function ShowSlots({ style, clasName, weekdayData, deleteClass }) {
  const config = {
    delta: 10,
    preventDefaultTouchmoveEvent: false,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  };

  const handleLeft = (e) =>
    setCaraousel(
      position === 0
        ? {
            position: target.length - 1,
            direction: "left",
          }
        : {
            position: position - 1,
            direction: "left",
          }
    );

  const handleRight = (e) =>
    setCaraousel(
      position === target.length - 1
        ? {
            position: 0,
            direction: "right",
          }
        : {
            position: position + 1,
            direction: "right",
          }
    );

  const handlers = useSwipeable({
    onSwipedRight: handleLeft,
    onSwipedLeft: handleRight,
    ...config,
  });

  //Direction attribute is needed to decide the animation direction for the caraousel.
  const [caraousel, setCaraousel] = useState({
    position: 0,
    direction: "",
  });

  //For implementation of search with highlighted text feature.
  const defaultSearchState = {
    currentText: "",
    searchedText: "",
    searchData: null,
  };
  const [search, setSearch] = useState(defaultSearchState);
  const { currentText, searchedText, searchData } = search;

  const getSearchDataLength = () => {
    if (searchData === null) {
      return 0;
    } else {
      return searchData.reduce(
        (total, current) => total + current.data.length,
        0
      );
    }
  };

  useEffect(() => {
    //New Search operation should take place when searchedText changes or when there is a change in weekdayData prop
    // i.e when delete operation takes place from the search results.
    handleSearch();
  }, [searchedText, weekdayData]);

  const handleSearch = () => {
    // Used to get a subset of weekdayData by matching against 'searchedText'
    // If found  it returns the highlighted results.

    if (searchedText) {
      //deepcopy needed to overcome problem with mutation
      let subsetData = JSON.parse(JSON.stringify(weekdayData)).map(
        (weekday) => {
          let newData = [];

          for (let i = 0; i < weekday.data.length; i++) {
            let newWeekdayData = { ...weekday.data[i] };
            const { title, facultyName } = newWeekdayData;

            //Case insensitive match
            if (
              (title.toLowerCase() + "\n" + facultyName.toLowerCase()).includes(
                searchedText.toLowerCase()
              )
            ) {
              const changed = [title, facultyName].map((item) => {
                const index = item
                  .toLowerCase()
                  .indexOf(searchedText.toLowerCase());
                //If there is a match, return the element with highlighted text.
                if (index !== -1) {
                  return (
                    <Highlight
                      pre={item.slice(0, index)}
                      content={item.slice(index, index + searchedText.length)}
                      post={item.slice(index + searchedText.length)}
                    />
                  );
                } else {
                  return item;
                }
              });

              newWeekdayData.title = changed[0];
              newWeekdayData.facultyName = changed[1];
              newData.push(newWeekdayData);
            }
          }
          //Replace all the slots in a weekday with only matching slots.
          weekday.data = newData;

          return weekday;
        }
      );

      //Remove weekdays if they dont even have a single matching slot.
      subsetData = subsetData.filter(({ data }) => data.length !== 0);

      setSearch({ ...search, searchData: subsetData });
      //Reset the caraousel position
      setCaraousel({ ...caraousel, position: 0 });
    }
  };

  //Pagination Logic for cicular caraousel navigation.
  const { position, direction } = caraousel;
  const weekdayPerPage = 3;

  //Decide whether to show all slots or search results. Incase of 0 matched slots, all slots are shown.
  let target;
  if (getSearchDataLength() !== 0) {
    target = searchData;
  } else {
    target = weekdayData;
  }

  //Slcing to show paginated data.
  const pageData = target
    .slice(position, position + weekdayPerPage)
    .concat(
      target.slice(
        0,
        position + weekdayPerPage > target.length
          ? position + weekdayPerPage - target.length
          : 0
      )
    );

  return (
    <MainContainer style={style} clasName={clasName}>
      <SearchBar
        placeholder="Search for classes"
        style={{ width: "25em", marginLeft: "4em" }}
        value={currentText}
        onChange={(e) => setSearch({ ...search, currentText: e.target.value })}
        onSearch={() => setSearch({ ...search, searchedText: currentText })}
        onClear={() => setSearch(defaultSearchState)}
        showClear={searchData !== null}
      />

      <SearchResult show={searchData !== null}>
        {getSearchDataLength() === 0 ? (
          <span className="empty">
            No results found for '{searchedText}' . . .
          </span>
        ) : (
          <span className="found">
            Showing {getSearchDataLength()} classes matching '
            <span>{searchedText}</span>' . . .
          </span>
        )}
      </SearchResult>

      <Carousel {...handlers}>
        <RoundedIconButton size="2.5em" className="navbtn" onClick={handleLeft}>
          <i className="fas fa-chevron-left"></i>
        </RoundedIconButton>

        <TransitionGroup component={null} exit={false}>
          {pageData.map((item, index) => (
            <CSSTransition
              key={item.week}
              appear={true}
              timeout={500}
              classNames={direction}>
              <Weekday
                day={item.week}
                slotData={item.data}
                deleteClass={deleteClass}
                highlight={index === 1}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>

        <RoundedIconButton
          size="2.5em"
          className="navbtn"
          onClick={handleRight}>
          <i className="fas fa-chevron-right"></i>
        </RoundedIconButton>
      </Carousel>
    </MainContainer>
  );
}

export default ShowSlots;
