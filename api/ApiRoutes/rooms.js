import express from "express"
import { createRoom, deleteRoom, getAllRooms, getHotelRooms, getRoom, updatedRoom, updatedRoomDates } from "../RoutesController/room.js";
import { verifyAdmin, verifyUser } from "../JWT_Token.js";

const router = express.Router()

//前面的url是/api/v1/rooms
//創建一個room 
router.post("/:hotelid",verifyAdmin,createRoom);
//更改room updatedRoom
router.put("/:id",verifyAdmin,updatedRoom)
//一樣是更新但我們只更新上傳unavailableDates的資料
router.put("/reservartiondates/:id",verifyUser,updatedRoomDates)
//刪除room
router.delete("/:hotelid/:id",verifyAdmin,deleteRoom)
//讀取單筆room 資料直接用id 不用hotelid
router.get("/:id",getRoom)
//抓取rooms所有資料
router.get("/",getAllRooms)
//抓取一個hotel 的rooms所有資料
router.get("/findHotel/:hotelid/",getHotelRooms)

export default router