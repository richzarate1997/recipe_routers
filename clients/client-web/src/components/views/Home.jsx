import { Box } from '@mui/material'
import FunFact from '../FunFact';
import SearchBar from '../SearchBar';
import logo from '../../assets/logo.png';

function Home() {
  const styles = {
    box: {
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    logo: {
      maxWidth: '20%',
      minWidth: 220,
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  }

  return (
    <Box sx={{ height: '80vh' }}>
      <Box pt={8} style={styles.box}>
        <img src={logo} alt='hambuger logo' style={styles.logo} />
      </Box>
      <Box px={10} style={styles.box}>
        <SearchBar />
      </Box>
      <FunFact />
    </Box>
  );
}

export default Home;