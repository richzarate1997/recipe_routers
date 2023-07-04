import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import { Box, Grid } from "@mui/material";
import logo from "../assets/logo.png";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");


    const SearchBar = () => (
        <form>
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
                        onChange={handleChangeSearch}
                        label="Search for a recipe"
                        variant="outlined"
                        placeholder="example: pasta"
                        size="small"
                    />
                </Grid>
                <Grid item xs={1} style={{
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    flexDirection: "column"

                }}>
                    <IconButton type="submit" aria-label="search" onSubmit={handleSubmitSearch}>
                        <SearchIcon style={{ fill: "#CA5953" }} />
                    </IconButton>
                </Grid>

            </Grid>

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
        <Box>
            <Box pt={8} style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
            <img src={logo} alt="hambuger logo" style={{
                    maxWidth: '20%',
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }} />
            </Box>
                

            <Box px={10}
                style={{
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    flexDirection: "column"

                }}
            >
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Box>
        </Box>



    );
}

export default SearchBar;