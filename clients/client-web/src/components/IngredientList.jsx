import { useEffect, useState } from "react";
import {
  Button, Card, CardHeader,
  Checkbox, Divider, Grid,
  List, ListItem, ListItemIcon,
  ListItemText, TextField
} from '@mui/material';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const IngredientList = ({ allIngredients, recipeIngredients, handleIngredientsChanged }) => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(allIngredients.map(item => item.name));
  }, [allIngredients]);

  useEffect(() => {
    setRight(recipeIngredients.map(item => item.ingredient.name));
  }, [recipeIngredients])

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
        quantity: 1,
        unit: {
          id: 0,
          abbreviation: '',
          name: ''
        },
        ingredient: allIngredients.find((ing) => ing.name === i)
      }
    });
    const nextRecipeIngredients = [...recipeIngredients, ...newRecipeIngredients];
    handleIngredientsChanged(nextRecipeIngredients);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
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
          variant="outlined"
          size="small"
          placeholder="Filter…"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ margin: 2, width: 168 }}
        />
      )}
      <Divider />
      <List
        sx={{ width: 200, height: isSearchable ? 250 : 322, bgcolor: 'background.paper', overflow: 'auto' }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
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
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', filteredLeft, true)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  );
};

export default IngredientList;
