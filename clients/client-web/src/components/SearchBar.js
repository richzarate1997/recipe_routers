import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import { Box } from "@mui/material";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");


    const SearchBar = () => (
        <form>
            <TextField
                fullWidth
                id="search-bar"
                className="text"
                onChange={handleChangeSearch}
                label="Search for a recipe"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
            <IconButton type="submit" aria-label="search" onSubmit={handleSubmitSearch}>
                <SearchIcon style={{ fill: "#CA5953" }} />
            </IconButton>
        </form>
    );

    const handleChangeSearch = (event) => {
        console.log(event.target.value);
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    };

    return (
        <Box
            style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: 50
            }}
        >
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
        </Box>

    );
}

export default SearchBar;