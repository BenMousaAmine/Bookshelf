import {Typography} from "@material-tailwind/react";
import CustomTabBarButton from "../component/CustomTabBarButton.tsx";
import openBook from "../assets/images/open-book-outline.png";


const Library = () => {
    return (
        <>
            <Typography variant="h2">
                Your library
            </Typography>
            <div className="flex-col 	items-center justify-center">
              <img
                        src={openBook}
                        alt="Logo"
                        style={{width: '50%'}}
                    />

                    <Typography variant="h5">
                        You don’t have any book in your library yet.
                    </Typography>
                    <Typography variant="small">
                        Discover books in the homepage or get custom suggestions.
                    </Typography>
            </div>
            <CustomTabBarButton/>
        </>
    )
}

export default Library;


const NoBookComponent = () => {
    return (
        <div>
            <Typography variant="h3">
                No books
            </Typography>
        </div>
    )
}