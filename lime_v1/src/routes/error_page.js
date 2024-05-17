import { useRouteError } from "react-router";

export default function ErrorPage(){
    const error = useRouteError();

    console.error(error)

    return (
        <div id= "error_page">
            <h1>
                Opps!!!
            </h1>
            <p> Sorry, an unexpected error has occurred!</p>

            <p>
                <i> {error.stateText || error.message}</i>
            </p>
        </div>
    )
}