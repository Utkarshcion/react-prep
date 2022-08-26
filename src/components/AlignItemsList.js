import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

export default function AlignItemsList(props) {
    const menu = useSelector((state) => {
        console.log('state : ', state);
        return state.menuSlice.menu;
    });

    const onClickRecordHandler = (event) => {
        console.log(' clicked ', event);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {menu.map((menuitem, index, arr) => {
                let showDivider = arr.length - 1 !== index;
                return (
                    <React.Fragment key={menuitem.id}>
                        <ListItem alignItems='flex-start' onClick={onClickRecordHandler.bind(null, menuitem)}>
                            <ListItemAvatar>
                                <Avatar alt='Utkarsh' src='/images/zushi.jpg' />
                            </ListItemAvatar>
                            <ListItemText
                                primary={menuitem.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline', marginRight: '1%' }}
                                            component='span'
                                            variant='body2'
                                            color='text.primary'
                                        >
                                            ${menuitem.price}
                                        </Typography>
                                        {menuitem.description}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {showDivider && <Divider variant='inset' component='li' />}
                    </React.Fragment>
                );
            })}
            {/* <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {" — Do you have Paris recommendations? Have you ever…"}
            </React.Fragment>
          }
        />
      </ListItem> */}
        </List>
    );
}
