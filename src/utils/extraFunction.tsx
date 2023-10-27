import jwt_decode from "jwt-decode";
import { UserType } from "../redux/api/authentication.api";

export type StyleTpe = {
  style?: {
    [Key: string]: string;
  };
};

export const createExternalStyle = (props: StyleTpe) => {
  let styles = "";
  if (props.style) {
    const all_keys = Object.keys(props.style);
    all_keys.map((key) => {
      if (props.style) {
        styles = styles + ` ${key}:${props.style[key]}`;
      }
      return key;
    });
  }
  return styles;
};

export const getUser = (): UserType | null => {
  try {
    let data: any = localStorage.getItem("user");
    const logged_in_user: UserType = jwt_decode(JSON.parse(data)?.access);
    return logged_in_user;
  } catch (err: any) {
    return null;
  }
};
export const setUser = (data: { refresh: string; access: string }) => {
  localStorage.setItem("user", JSON.stringify(data));

  return getUser();
};
export const removeUserCred = (): void => {
  localStorage.removeItem("user");
};

export const colorDeterminer = (value: string) => {
  if (value === "selected") {
    return "green";
  } else if (value === "in_view") {
    return "yellow";
  } else if (value === "not_selected") {
    return "red";
  } else if (value === "idle") {
    return "#FCBE2B";
  } else {
    return "black";
  }
};


export const parseBackendError =(error:any)=>{
// for e,g {job_id error:'you',"name_error":"you"} we going to pass it to one string "1. you, 2.) you"

  const keys = Object.keys(error)
  let errorMessage = ''
  keys.map((key,index)=>{
    errorMessage+=`${index+1}) ${error[key]}, `
  })

  return errorMessage
}

export const isCorrectUrl = (url:string)=>{

  try{
    new URL(url)
    return true
  }catch(err:any){
    return false
  }

}