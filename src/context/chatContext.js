import { createContext, useContext, useReducer, } from "react";
import { AuthContext } from "./authContext";


export const chatContext = createContext();


export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    }
    
    const chatReduce = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid 
                    ? currentUser.uid + action.payload.uid 
                    : action.payload.uid + currentUser.uid,
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReduce, INITIAL_STATE);
    return (
        <chatContext.Provider value={{data: state, dispatch}}>
            {children}
        </chatContext.Provider>

    )
}