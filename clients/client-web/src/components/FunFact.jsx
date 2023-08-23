
import { Box, Button, Card } from '@mui/material';
import { useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import { getRandomJokeOrTrivia } from '../service/recipeApi';

function FunFact() {
  const [text, setText] = useState('');
  const [clicked, setClicked] = useState(false);

  const fetchFun = () => {
    setClicked(true);
    getRandomJokeOrTrivia()
      .then(data => setText(data));
  }

  const styles = {
    card: {
      fontFamily: 'monospace',
      maxWidth: '50vw',
      textAlign: 'center',
      backgroundColor: '#612D33',
      color: '#FEAE65',
      padding: text ? '10px' : 0,
      display: clicked && text ? 'block' : 'none'
    },
    box: {
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
    }
  }

  return (
    <Box pt={3} style={styles.box}>
      <Button
        variant='outlined' color='secondary'
        size='small' id='fetchButton'
        onClick={fetchFun} style={{ display: clicked ? 'none' : 'block' }} >
        Click Me!
      </Button>
      {!text && clicked && <CircleLoader color='#7CA65A' />}
      <Card style={styles.card}>
        {text}
      </Card>
    </Box>


  );
}

export default FunFact;