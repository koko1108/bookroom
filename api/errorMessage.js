export const errorMessage=(status, message,err)=>{
    const error = new Error();
    const orignalErr = err?.message || "條件錯誤"; 
    error.status= status;
    error.message=message+`錯誤詳細描述: `+orignalErr;
    return error; 
}