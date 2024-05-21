import { fcumsum } from "d3";

export function toNote({str, setstr})
{
    console.log(str);
    
    if (str[0].endsWith("&N")) {
        // 如果是，去掉最后两个字符
        setstr([str[0].slice(0, -2)]);
    
      }
      console.log("toNote After:" ,str);
}

export function toRef({str, setstr})
{
    console.log(str);
    if (!str[0].endsWith("&N")) {
        // 如果不是，添加"&N"到字符串末尾
        setstr([str[0] + "&N"]);
      }
      console.log("toRef After:" ,str);
}


// export function linktoNote({str, se})