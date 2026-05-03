import API from "./api";

export const signupUser = (data) => {
    return API.post("/signup", data);
};
export const loginUser =(data)=>{
    return API.post('/login',data)
}
