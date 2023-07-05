import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import { Grid } from "@mui/material";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit}>
        <Grid container pt={2} style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center"
        }}>
            <Grid item xs={6} xl={11} md={9} sm={8} style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <TextField
                    fullWidth
                    id="search-bar"
                    className="text"
                    onChange={handleChange}
                    value={searchQuery}
                    label="Search for a recipe"
                    variant="outlined"
                    placeholder="example: pasta"
                    size="small"
                />
            </Grid>
            <Grid item xs={1} >
                <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "#CA5953" }} />
                </IconButton>
            </Grid>
        </Grid>
    </form>
    );
}

export default SearchBar;