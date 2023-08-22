import {
  Button, Card, CardHeader,
  Checkbox, Divider, Grid,
  List, ListItem, ListItemIcon,
  ListItemText, TextField,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const IngredientList = ({ allIngredients, recipe, handleIngredientsChanged }) => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(allIngredients.filter(i1 => !recipe.ingredients.filter(i2 => i2.ingredient.name === i1.name).length).map(item => item.name));
  }, [allIngredients, recipe.ingredients]);

  useEffect(() => {
    setRight(recipe.ingredients.map(i => i.ingredient.name));
  }, [recipe.ingredients])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    const newRecipeIngredients = leftChecked.map(i => {
      return {
        recipeId: recipe.id,
        quantity: 0,
        unit: {
          id: 0,
          abbreviation: '',
          name: ''
        },
        ingredient: allIngredients.find((ing) => ing.name === i)
      }
    });
    const nextRecipeIngredients = [...recipe.ingredients, ...newRecipeIngredients];
    handleIngredientsChanged(nextRecipeIngredients);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const nextRight = not(right, rightChecked);
    handleIngredientsChanged(recipe.ingredients.filter(i => nextRight.includes(i.ingredient.name)));
    setLeft(left.concat(rightChecked));
    setRight(nextRight);
    setChecked(not(checked, rightChecked));
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredLeft = left.filter(item => item.includes(searchTerm));

  const customList = (title, items, isSearchable = false) => (
    <Card sx={{ minHeight: 400 }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      {isSearchable && (
        <TextField
          variant='outlined'
          size='small'
          placeholder='Filter…'
          value={searchTerm}
          onChange={handleSearch}
          sx={{ margin: 2, width: 168 }}
        />
      )}
      <Divider />
      <List
        sx={{ width: 200, height: isSearchable ? 250 : 322, overflow: 'auto' }}
        dense
        component='div'
        role='list'
      >
        {items.map((value, idx) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={idx}
              role='listitem'
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={10} sm={5}>{customList('Choices', filteredLeft, true)}</Grid>
      <Grid item>
        <Grid container
          direction={useMediaQuery(theme.breakpoints.down('sm')) ? 'row' : 'column'}
          alignItems='center'
        >
          <Button
            sx={{ my: 0.5, mx: useMediaQuery(theme.breakpoints.down('sm')) ? 1 : 0 }}
            variant='contained'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected to chosen'
          >
            { useMediaQuery(theme.breakpoints.down('sm')) ? '↓' : '→'}
          </Button>
          <Button
            sx={{ my: 0.5, mx: useMediaQuery(theme.breakpoints.down('sm')) ? 1 : 0 }}
            variant='contained'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected to choices'
          >
            { useMediaQuery(theme.breakpoints.down('sm')) ? '↑' : '←'}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10} sm={5}>{customList('Chosen', right)}</Grid>
    </Grid>
  );
};

export default IngredientList;
