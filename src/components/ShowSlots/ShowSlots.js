import React, { Fragment, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSwipeable } from "react-swipeable";
import { useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";

import {
  MainContainer,
  SearchResult,
  Carousel,
  WeekdayContainer,
  SlotContainer,
  Slot,
} from "./style";
import Dim from "../../baseUI/Dim";
import RoundedIconButton from "../../baseUI/RoundedIconButton";
import SearchBar from "../../baseUI/SearchBar";
import Tooltip from "../Utils/Tooltip/Tooltip";
import { adminSlotRetriveUpdateDeleteUrl } from '../urls';
import axiosInstance from "../axios";
import { setToastSuccess, setToastError } from "../Utils/Toast/toastSlice";
import { removeSlot, setSelectedSlot } from '../AdminDashboard/adminDashboardSlice'
import { WEEKDAYS } from '../constants';



//Used to output individual week
function Weekday({ day, slotData, highlight, selectedSlot, selectedBatch, readOnly, loading }) {

  const dispatch = useDispatch();

  //Sorts slot on the basis of start time.
  const timeSort = (a, b) => {

    const getDate = (slot) => {
      let hours = parseInt(slot.startTime.substring(0, 2))
      const minutes = parseInt(slot.startTime.substring(3, 5))
      const identifier = slot.startTime.substring(5, 7)

      if (hours === 12 && identifier === "AM") {
        hours = 0
      }
      else if (hours < 12 && identifier === "PM") {
        hours += 12
      }

      return new Date(1999, 0, 1, hours, minutes)
    }
    const t1 = getDate(a);
    const t2 = getDate(b);

    if (t1 < t2) {
      return -1
    }
    else {
      return 1
    }
  }


  const handleSlotDelete = async (slotId, weekday, batch) => {
    if (slotId === selectedSlot) {
      dispatch(setToastError("Slot is currently being edited!"))
      return
    }

    try {
      const response = await axiosInstance.delete(adminSlotRetriveUpdateDeleteUrl(slotId))
      if (response.data?.data === slotId) {
        dispatch(removeSlot({ slotId, weekday, batch }))
        dispatch(setToastSuccess("Slot deleted successfully!"))
      }
      else {
        throw new Error()
      }
    }
    catch (err) {
      dispatch(setToastError("Something went wrong!"))
    }
  }

  //Show 3 skeleton slots in loading state .
  if (loading) {
    return (
      <WeekdayContainer>
        <div className="heading">
          <span className="weekday-name">{day}</span>
          <span className="count">0 Classes</span>
        </div>
        <SlotContainer>
          {slotData.map((_, index) => {
            return (
              <Slot>
                <span className="index">{index + 1}.</span>
                <div className="box skeleton">
                  {[null, null, null].map(_ =>
                    <Skeleton animation="wave" width="100%" height="30%" />)}
                </div>
              </Slot>
            )
          })}
        </SlotContainer>
      </WeekdayContainer>)
  }

  const sortedSlots = slotData.slice().sort(timeSort)

  return (
    <WeekdayContainer highlight={highlight}>
      <div className="heading">
        <span className="weekday-name">{day}</span>
        <span className="count">{sortedSlots.length} Classes</span>
      </div>

      <SlotContainer>
        {sortedSlots.length === 0 && (
          <div className="empty">
            <i class="fas fa-sad-tear"></i>
            <span>Such empty!</span>
          </div>
        )}
        {sortedSlots.map((slot, index) => {
          const {
            id,
            lastModified,
            duration,
            faculty,
            batch,
            title,
            startTime,
            endTime,
          } = slot;


          return (
            <Slot key={id} selected={id === selectedSlot} readOnly={readOnly}>
              <span className="index">{index + 1}.</span>

              <div className="box content">
                {/*Elements that disappear on hover*/}
                <div className="topbar detailsbar">
                  <span className="duration">{duration}</span>
                  <Dim>{lastModified}</Dim>
                </div>

                {/*Elements that appear on hover*/}
                <div className="topbar managebar">
                  <button className="editslotbtn" onClick={() => dispatch(setSelectedSlot(id))}>
                    <span>Edit Slot</span>
                    <EditIcon style={{ fontSize: "1em" }} />
                  </button>

                  <RoundedIconButton color="red" onClick={() => handleSlotDelete(id, day, selectedBatch)}>
                    <i className="fas fa-trash"></i>
                  </RoundedIconButton>
                </div>

                <Tooltip maxLength={14}>
                  <span className="title">{title}</span>
                </Tooltip>

                <div className="secondary">
                  {faculty &&
                    <div className="faculty">
                      <span>By </span>
                      <img src="https://images.unsplash.com/photo-1621349805296-d026d3d26d1f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
                      <Tooltip maxLength={24}>
                        <span>{faculty.name}</span>
                      </Tooltip>
                    </div>}

                  {batch &&
                    <Tooltip maxLength={24}>
                      <span className="batch">{batch}</span>
                    </Tooltip>}
                </div>

                <div className="timing">
                  <i className="fa fa-hourglass-start"></i>
                  <span className="time">
                    {startTime}
                    <Dim>-</Dim>
                    {endTime}
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


function ShowSlots({ style, clasName, weekdayData, currentWeekday, selectedSlot,
  selectedBatch, readOnly = false, loading = false }) {

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

  const resetCarousel = () => {
    //Keep the current weekday at the middle of carousel.
    let caraouselState = {
      position: 0,
      direction: "",
    }

    if (currentWeekday && weekdayData) {
      let position = weekdayData.findIndex((item) => item.weekday === currentWeekday)
      position = position === 0 ? weekdayData.length - 1 : position - 1
      caraouselState.position = position
    }

    setCaraousel(caraouselState)

  }

  useEffect(() => {
    resetCarousel()
  }, [currentWeekday])

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
            const { title, faculty, batch } = newWeekdayData;
            const secondaryText = faculty ? faculty.name : batch;

            //Case insensitive match
            //newline to make sure match is independent between title & faculty
            if (
              (title.toLowerCase() + "\n" + secondaryText.toLowerCase()).includes(
                searchedText.toLowerCase()
              )
            ) {
              const changed = [title, secondaryText].map((item) => {
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
              if (faculty) {
                newWeekdayData.faculty.name = changed[1];
              }
              else {
                newWeekdayData.batch = changed[1];
              }
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

  const handleSearchClear = () => {
    setSearch(defaultSearchState)
    resetCarousel()
  }

  //Pagination Logic for cicular caraousel navigation.
  const { position, direction } = caraousel;
  const weekdayPerPage = 3;

  //Decide whether to show all slots or search results. Incase of 0 matched slots, all slots are shown.
  //In case of loading, show dummy skeleton slots.
  let target;
  if (getSearchDataLength() !== 0) {
    target = searchData;
  } else {
    if (loading) {
      target = WEEKDAYS.map(weekday => {
        return { weekday, data: [{}, {}, {}] }
      })
    }
    else {
      target = weekdayData;
    }
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
        onClear={handleSearchClear}
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
          {pageData.map((item) => (
            <CSSTransition
              key={item.weekday}
              appear={true}
              timeout={500}
              classNames={direction}>
              <Weekday
                day={item.weekday}
                slotData={item.data}
                highlight={item.weekday === currentWeekday}
                selectedSlot={selectedSlot}
                selectedBatch={selectedBatch}
                readOnly={readOnly}
                loading={loading}
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
