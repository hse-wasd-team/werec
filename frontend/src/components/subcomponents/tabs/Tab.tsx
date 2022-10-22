import { Link } from "react-router-dom";
import * as React from "react";
import {useAppSelector} from "../../../globalState/hooks"

interface TabProps{
    name: string;
     url: string
}

function Tab(props: TabProps) {
    let currentTabID = useAppSelector(state => state.currentTabItem.id)

    const words = props.name.split("_")

    let header = ""

    for (let index = 0; index < words.length; index++) {
        const element = words[index];
        header += element + " "
    }
    header = header.slice(0, header.length-1)

    if(currentTabID === props.name){
        return (
            <li className="nav-item">
              <Link className="nav-link active custom-tab active-custom" aria-current="page" to={props.url}>
                {header}
              </Link>
            </li>
          );
    }
    else{
        return (
            <li className="nav-item">
              <Link className="nav-link custom-tab" to={props.url}>
                {header}
              </Link>
            </li>
          );
    }

}

export default Tab;
