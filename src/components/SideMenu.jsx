import * as React from 'react';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function NestedList() {
  const [selected, setSelected] = React.useState('');

  const handleClick = (listItemId) => () => {
    setSelected(listItemId)
  };

  return (
    <Box
      sx={{minWidth: 300}}
    >
      <List
        sx={{ bgcolor: 'background.paper' }}
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            color='primary'
            sx={{
              fontSize: '1em'
            }}
          >
            Фотоуслуги
          </ListSubheader>
        }
      >
        <ListItemButton sx={{ backgroundColor: selected === 'li1' ? 'primary.main' : 'inherit'}} onClick={handleClick('li1')}>
          <ListItemText primary="Печать фотографий" />
        </ListItemButton>
        <ListItemButton sx={{ backgroundColor: selected === 'li2' ? 'primary.main' : 'inherit'}} onClick={handleClick('li2')}>
          <ListItemText primary="Печать на кружкаж" />
        </ListItemButton>
        <ListItemButton sx={{ backgroundColor: selected === 'li3' ? 'primary.main' : 'inherit'}} onClick={handleClick('li3')}>
          <ListItemText primary="Широкоформатная печать" />
        </ListItemButton>
        <ListItemButton sx={{ backgroundColor: selected === 'li4' ? 'primary.main' : 'inherit'}} onClick={handleClick('li4')}>
          <ListItemText primary="Реставрация фотографий" />
        </ListItemButton>
      </List>
      <List
      sx={{ minWidth: 300, bgcolor: 'background.paper' }}
      component="nav"
      subheader={
        <ListSubheader
          component="div"
          color='primary'
          sx={{
            fontSize: '1em'
          }}
        >
          Услуги типографии
        </ListSubheader>
      }
    >
      <ListItemButton sx={{ backgroundColor: selected === 'li5' ? 'primary.main' : 'inherit'}} onClick={handleClick('li5')}>
        <ListItemText primary="Переплет книг" />
      </ListItemButton>
      <ListItemButton sx={{ backgroundColor: selected === 'li6' ? 'primary.main' : 'inherit'}} onClick={handleClick('li6')}>
        <ListItemText primary="Изготовление визиток" />
      </ListItemButton>
      <ListItemButton sx={{ backgroundColor: selected === 'li7' ? 'primary.main' : 'inherit'}} onClick={handleClick('li7')}>
        <ListItemText primary="Фотокнига" />
      </ListItemButton>
    </List>
  </Box>
  );
}
