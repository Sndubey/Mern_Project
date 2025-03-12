import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

//provider function.
export const AuthProvider = ({children}) => {

    const API = import.meta.env.VITE_APP_URI_API;

    const [token, setToken] = useState(localStorage.getItem('token'));  //this token is get for handling login logout functionality. If token is there then user is logged in else logout.
    const [user, setUser] = useState(null);  //for handling user data for userAuthentication function.
    const [isLoading, setIsLoading] = useState(true);  //this state is used to show loading spinner when user is logged in. for securing admin route.
    const [services,setServices] = useState([]);  //use here empty array bcz if not then .map function in services.jsx will throw error if it found data type other than array, first empty array is rendered (bcz of useEffect hook), then data is loaded second time in this array useState variable.
    const authorizationToken = `Bearer ${token}`;  //this var holds token value.

    //tackling login functionality
    const storeTokenInLS = (servertoken) => {   //servertoken will come from Login and register file from res_data.token, it stores token value into LS and in state variable.
        setToken(servertoken);
        return localStorage.setItem('token',servertoken)
    }

    // tackling logout functionality
    let isLoggedIn = !!token;  // if token is there then isLogedIn will be true else false, here token var is useState var.
    // console.log("is logged in",isLoggedIn);

    const LogoutUser = () => {
        setToken("");  //updating token var so that program/we knows that user is logged out.
        return localStorage.removeItem('token');
    }

    //JWT AUTHENTICATION - to get currently logged in user data.
    const userAuthentication = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${API}/api/auth/user`, {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setUser(data.userData);
            setIsLoading(false);
          } else {
            console.error("Error fetching in data:", response.status, response.statusText);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    
    //userAuthentication function will be run automatically when user logged in/token is generated.
    useEffect(() => {
      getServices();
        if (token) {
            userAuthentication();
        }
    }, [token]); 
    
    //service page
    const getServices = async () => {
      try {
        const response = await fetch(`${API}/api/data/service`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setServices(data.msg); 
        } else {
          console.error("Error fetching services:", response.status, response.statusText);
        }
      } catch (error) {
        console.log(`services frontend error ${error}`);
      }
    }

    // useEffect(()=>{
    //   getServices();
    // },[]);

    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading}}>
        {children}
    </AuthContext.Provider>
}

//creating custom hook, start with use word. its like exporting the function.
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return authContextValue;
}



//this function can be used by any file directly using contextAPI (like a global function).