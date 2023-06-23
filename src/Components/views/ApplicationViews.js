import { CustomerView } from "./CustomerView";
import { EmployeeView } from "./EmployeeView"


export const ApplicationViews = () => {
    const localEasyUser = localStorage.getItem("easy_user")
    const EasyUserObject = JSON.parse(localEasyUser)
    //eslint-disable-next-line
     {return EasyUserObject.staff? <EmployeeView /> : <CustomerView />; }
  }
  