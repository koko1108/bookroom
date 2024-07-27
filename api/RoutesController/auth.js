import bcrypt from "bcryptjs";
import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  const registerData = req.body;
  try {
    const registerWrong =
      (await User.findOne({ username: registerData.username })) ||
      (await User.findOne({ email: registerData.email }));
    if (registerWrong)
      return next(errorMessage(400, "錯誤，此帳號或信箱已被註冊"));
    const salt = bcrypt.genSaltSync(10);
    //單獨利用到password分離並加密
    const hash = bcrypt.hashSync(registerData.password, salt);
    const newUser = new User({
      username: registerData.username,
      email: registerData.email,
      password: hash,
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    next(errorMessage(500, "註冊失敗", error));
  }
};

//account number 張號可以輸入 信箱與使用者姓名
export const login = async (req, res, next) => {
  const loginData = req.body;
  try {
    const userData =
      (await User.findOne({ username: loginData.account })) ||
      (await User.findOne({ email: loginData.account }));
    if (!userData) return next(errorMessage(404, "沒有此使用者"));
    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      userData.password
    );
    if (!isPasswordCorrect) return next(errorMessage(404, "輸入密碼錯誤"));
    //這邊雖然知道是密碼錯誤、但也可以輸入為 "輸入帳號密碼錯誤" 來防止有心人破解密碼
    res.status(200).json(`${userData.username}登入成功`);
  } catch (error) {
    next(errorMessage(500, "登入失敗", error));
  }
};
