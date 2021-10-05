import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FamilySelect = (props) => {
  const classes = useStyles();

  const [selectValue, setSelectValue] = useState('');

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    props.setFamily(e.target.value);
  };
  console.log(selectValue);
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Семейство</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          onChange={handleSelect}
          value={selectValue}
        >
          <MenuItem value='Декоративные'>Декоративные</MenuItem>
          <MenuItem value='Зерновые'>Зерновые</MenuItem>
          <MenuItem value='Бобовые'>Бобовые</MenuItem>
          <MenuItem value='Крахмалоносные'>Крахмалоносные</MenuItem>
          <MenuItem value='Сахароносные'>Сахароносные</MenuItem>
          <MenuItem value='Масличные'>Масличные</MenuItem>
          <MenuItem value='Волокнистые'>Волокнистые</MenuItem>
          <MenuItem value='Бахчевые'>Бахчевые</MenuItem>
          <MenuItem value='Плодовые'>Плодовые</MenuItem>
          <MenuItem value='Стимулирующие'>Стимулирующие</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FamilySelect;
