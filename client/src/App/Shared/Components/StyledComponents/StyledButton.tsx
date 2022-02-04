import { Fade, IconButton, Menu, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { LightGreen, Red, Yellow } from '../../Styles/colors';

const TextButtonStyle = styled(Button)({
  textTransform: 'capitalize',
  padding: '8px 15px',

  fontSize: 12,
  fontWeight: 500,
  width: '100%',
});

const EditButtonStyle = styled(Button)({
  textTransform: 'capitalize',
  padding: '8px 12px',
  margin: 5,

  fontSize: 14,
  fontWeight: 500,
  width: '10%',
});

const DeleteButtonStyle = styled(IconButton)({
  width: 30,
  '&:hover': {
    background: Red,
    color: 'White',
  },
  '&:focus': {
    outline: 'none',
  },
});

const GreenButton = styled(Button)({
  background: LightGreen,
  color: 'White',
  textTransform: 'capitalize',

  margin: 5,
  marginTop: 20,
  fontSize: 14,
  fontWeight: 500,
  width: '100%',
  '&:hover': {
    background: Yellow,
    color: 'White',
  },
  '&:focus': {
    outline: 'none',
  },
});

const GreenActionsButton = styled(Button)({
  background: LightGreen,
  color: 'White',
  textTransform: 'capitalize',
  margin: 5,
  fontSize: 14,
  fontWeight: 500,
  width: '100%',
  '&:hover': {
    background: Yellow,
    color: 'White',
  },
  '&:focus': {
    outline: 'none',
  },
});

const GreenCallToActionButton = styled(Button)({
  background: `linear-gradient(45deg, ${LightGreen} 30%, #43a278 90%)`,
  color: 'White',
  textTransform: 'capitalize',
  padding: '8px 15px',
  margin: 5,
  marginTop: 20,
  marginBottom: 20,
  fontSize: 24,
  fontWeight: 500,
  width: '100%',
  maxWidth: '40vh',
  '&:hover': {
    background: `linear-gradient(45deg, #43a278 30%, ${LightGreen} 90%)`,
    color: 'White',
  },
  '&:focus': {
    outline: 'none',
  },
  borderRadius: 10,
});

const GreenLinkButton = styled(Button)({
  color: LightGreen,
  textTransform: 'capitalize',
  width: '100%',
  '&:hover': {
    textDecoration: 'none',
  },
  '&:focus': {
    outline: 'none',
  },
});

const GreenTextButton = styled(Button)({
  color: LightGreen,
  textTransform: 'capitalize',
  padding: '8px 15px',
  margin: 5,
  marginTop: 20,
  fontSize: 14,
  fontWeight: 500,
  width: '100%',
  '&:hover': {
    background: Yellow,
    color: 'White',
  },
  '&:focus': {
    outline: 'none',
  },
});

export function TextButton(props) {
  return (
    <TextButtonStyle {...props} variant='outlined'>
      {props.children}
    </TextButtonStyle>
  );
}

export function GreenActionButton(props) {
  return (
    <GreenCallToActionButton {...props} variant='contained' color='primary'>
      {props.children}
    </GreenCallToActionButton>
  );
}

export function GreenSubmitButton(props) {
  return (
    <GreenButton {...props} variant='contained' color='primary'>
      {props.children}
    </GreenButton>
  );
}

export function ActionsButton({ items, handleSelectItem }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <GreenActionsButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        variant='contained'
        color='primary'
        onClick={handleClick}
      >
        Actions
        <ExpandMoreIcon />
      </GreenActionsButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                handleSelectItem(item);
                handleClose();
              }}
            >
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export const AddOneButton = (props) => {
  return (
    <Button
      {...props}
      variant='outlined'
      style={{ zIndex: '4px' }}
      startIcon={<AddIcon />}
    >
      {props.children}
    </Button>
  );
};

export const EditButton = (props) => {
  return (
    <EditButtonStyle {...props} variant='outlined' startIcon={<EditIcon />}>
      Edit
    </EditButtonStyle>
  );
};
