import { createContext } from "react";

export const LogContext = createContext(null);


// https://stackoverflow.com/questions/62504525/persistence-with-localstorage-with-usestate-and-usecontext-react-hooks

// const [user, setUser] = useState(()=> getLocalStorage("user", initialState))
// const setLocalStorage = (key, value) => {
//   try{
//     localStorage.setItem(key, JSON.stringify(value))
//   } catch (error){
//     console.log(error)
//   }
// }
// const getLocalStorage = (key, initialValue) => {
//   try {
//     const value = window.localStorage.getItem(key);
//     return value ? JSON.parse(value) : initialValue;
//   } catch (error) {
//     // if error, return initial value
//     return initialValue;
//   }
// }
