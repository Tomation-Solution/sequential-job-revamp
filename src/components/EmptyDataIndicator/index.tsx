import {ReactNode} from "react";
import {EmptyDataIndicatorContainer} from "./index.style";


type EmptyDataIndicatorProps = {
    children: ReactNode;
    isDataEmpty: boolean;
    height?: string;
}

export function EmptyDataIndicator(props: EmptyDataIndicatorProps) {

    return (
        <EmptyDataIndicatorContainer height={props.height} >
            {props.isDataEmpty && (
                <p style={{color: "#999"}} >No data to display!</p>
            )}
            {!props.isDataEmpty && props.children}
        </EmptyDataIndicatorContainer>
    )
}