import React from 'react';
import { Container} from "@mui/material";

export default function Authenticated({ children }) {
    //const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen" >
            <Container >
                    {children}
            </Container>
        </div>
    );
}
