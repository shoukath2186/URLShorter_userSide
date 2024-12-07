import api from "./axiosApi"


export const register = async (data) => {
  const resposnse = await api.post('/user/register', { userName: data.username, email: data.email, password: data.password })
  return resposnse
}
export const loginUs = async (data) => {
  const resposnse = await api.post('/user/login', { email: data.email, password: data.password })
  return resposnse
}
export const logout = async () => {
  const resposnse = await api.post('/user/logout');
  return resposnse
}
export const saveURL = async (data,Qrcode) => {
 console.log(111,data,222,Qrcode); 
  const resposnse = await api.post('/user/createLink',{
    title:data.title,
    longUrl:data.originalLink,
    customUrl:data.customLink?data.customLink:undefined,
    qrCode:Qrcode
  });
  return resposnse
}
export const userLinks = async () => {
  const resposnse = await api.get('/user/getLinks');
  return resposnse
}
export const deleteLinks = async (linkId) => {
  const resposnse = await api.delete(`/user/${linkId}`)
  return resposnse
}