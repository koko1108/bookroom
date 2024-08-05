import Hotel from "../models/Hotel.js";
import { errorMessage } from "../errorMessage.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(errorMessage(500, "資料上傳錯誤請確認格式", error));
  }
};
export const getHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getHotel = await Hotel.findById(id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(errorMessage(500, "找不到資料，請檢查使否有此id", error)); //後來我們想要客製化的
  }
};
export const updatedHotel = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(
      errorMessage(
        500,
        "修改失敗，請確認是否有其id與是否欄位輸入格式正確",
        error
      )
    );
  }
};
export const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("刪除資料成功");
  } catch (error) {
    next(errorMessage(500, "刪除失敗，請確認是否有其id", error));
  }
};
export const getAllHotels = async (req, res, next) => {
  const {lowestPrice,highestPrice,...withQuery} = req.query;
  try{
      const hotelsList = await Hotel.find(
          {
            ...withQuery,
            cheapestPrice:{$gt:lowestPrice || 0,
            $lt:highestPrice || 9999} //這邊一定要這樣打因為涉及到兩個fetch 如果沒有填｜｜會出現沒有值的問題
          }
      ).limit(7) //讓他回傳資料最多就七個
      res.status(200).json(hotelsList)
  }catch(error){
      next(errorMessage(500,"無法抓取所有飯店資料",error)) 
  }
};
//來統計各個type的種數
export const amountOfType = async(req,res,next)=>{
  const type = req.query.type.split(",")
  try{
      const list= await Promise.all(type.map(type=>{
          return Hotel.countDocuments({type:type})
      }))
      res.status(200).json(list)
  } catch (error) {
      next(errorMessage(500,"無法抓取住宿種類",error)) 
  }
}
//來統計各個cities的種數
export const amountOfCities = async(req,res,next)=>{
  const cities = req.query.cities.split(",")
  try{
      const list= await Promise.all(cities.map(city=>{
          return Hotel.countDocuments({city:city})
      }))
      res.status(200).json(list)
  } catch (error) {
      next(errorMessage(500,"無法統計各個城市的提供住宿的數量",error)) 
  }
}