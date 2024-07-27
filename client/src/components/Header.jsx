import React, { useState } from "react";
import {
  faBed,
  faCalendar,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { zhTW } from "date-fns/locale"; // 直接從 date-fns 引入
import format from "date-fns/format"; // 日期格式
import { useNavigate } from 'react-router-dom';
import "./header.scss";

const Header = () => {
  const navigate=useNavigate();
  const [openConditions, setOpenConditions] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(), //new Date() 是 JavaScript 中的 Date 物件構造函數，用於創建一個新的日期物件。
      key: "selection",
    },
  ]);
  const [conditions, setConditions] = useState({
    adult: 1, // 初始人數,房間數為一
    children: 0, // 可以不一定要有小孩
    room: 1,
  });

  const handleCounter = (name, sign) => {
    //name 是要修改的條件名稱，比如 "adult"、"children" 或 "room"。
    //sign 是增減操作的標識符，值為 "increase" 或 "decrease"。
    //prev 是當前的條件狀態。
    setConditions((prev) => ({
      ...prev, 
      [name]: sign === "increase" ? conditions[name] + 1 : conditions[name] - 1,
    }));
  };
  
  const handleSearchBarSubmit =()=>{
    navigate("/hotelsList", {state:{destination,dates,conditions}})
  }

  return (
    <div className="header">
      <div className="headerContainer">
        <h1 className="headerTitle">尋找下趟住宿</h1>
        <p className="headerDes">搜尋飯店、民宿及其他住宿類型的優惠…</p>
        <div className="headerSearchBar">
          <div className="SearchBarItem">
            <FontAwesomeIcon icon={faBed} />
            <input
              type="text"
              placeholder="你要去哪裡？"
              className="SearchInput"
              onChange={(e)=>setDestination(e.target.value)}
            />
          </div>
          <div className="SearchBarItem">
            <FontAwesomeIcon
              icon={faCalendar}
              onClick={() => setOpenCalendar(!openCalendar)}
            />
            <span
              className="SearchText"
              onClick={() => setOpenCalendar(!openCalendar)}
            >
              {format(dates[0].startDate, "MM/dd/yyyy")} -{" "}
              {format(dates[0].endDate, "MM/dd/yyyy")}
            </span>
            {openCalendar && (
              <DateRange
                editableDateInputs={true} // 允許用戶直接編輯日期輸入框
                onChange={(item) => setDates([item.selection])} // 當用戶選擇新日期範圍時，更新日期狀態
                moveRangeOnFirstSelection={false} // 如果只選擇一個日期，不自動選擇一個範圍
                className="calendar" // 添加自定義的 CSS 類名，以便樣式定義
                ranges={dates} // 設定選擇的日期範圍，使用 dates 狀態變數
                minDate={new Date()} // 設定可選擇的最小日期，這裡設定為當前日期
                locale={zhTW} // 設定本地化為繁體中文
              />
            )}
          </div>
          <div className="SearchBarItem">
            <FontAwesomeIcon
              icon={faPeopleGroup}
              onClick={() => setOpenConditions(!openConditions)}
            />
            <span
              className="SearchText"
              onClick={() => setOpenConditions(!openConditions)}
            >
              {conditions.adult}位成人 · {conditions.children} 位小孩 ·{" "}
              {conditions.room} 間房
            </span>
            {openConditions && (
              <div className="ConditionsContainer">
                <div className="condition">
                  成人
                  <div className="conditionCounter">
                    <button
                      className="conditionCounterButton"
                      disabled={conditions.adult <= 1}
                      onClick={() => handleCounter("adult", "decrease")}
                    >
                      -
                    </button>
                    <span className="number">{conditions.adult}</span>
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("adult", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="condition">
                  <span>
                    小孩
                    <p>0-17 歲</p>
                  </span>
                  <div className="conditionCounter">
                    <button
                      className="conditionCounterButton"
                      disabled={conditions.children <= 0}
                      onClick={() => handleCounter("children", "decrease")}
                    >
                      -
                    </button>
                    <span className="number">{conditions.children}</span>
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("children", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="condition">
                  房間
                  <div className="conditionCounter">
                    <button
                      className="conditionCounterButton"
                      disabled={conditions.room <= 1}
                      onClick={() => handleCounter("room", "decrease")}
                    >
                      -
                    </button>
                    <span className="number">{conditions.room}</span>
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("room", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="SearchBarBtn" onClick={handleSearchBarSubmit}>搜尋</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
