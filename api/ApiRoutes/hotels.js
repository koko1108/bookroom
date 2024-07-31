import express from "express"
import { createHotel, deleteHotel, getAllHotels, getHotel, updatedHotel, amountOfCities, amountOfType } from "../RoutesController/hotels.js"
import { verifyAdmin } from "../JWT_Token.js"

//這邊前面的url是/api/v1/hotels
const router = express.Router()
//創建資料
router.post("/",verifyAdmin,createHotel)
//抓取一筆資料
router.get("/find/:id",getHotel)
//將一筆資料做修改
router.put("/:id",updatedHotel)
//刪除資料
router.delete("/:id",verifyAdmin,deleteHotel)
//抓取所有住宿資料
router.get("/",getAllHotels)

//要來做"依住宿類型瀏覽"的種類資料統計與分析
router.get("/amountoftype", amountOfType)
//要來做"依住宿城市瀏覽"的種類資料統計與分析
router.get("/amountofcities", amountOfCities)

export default router