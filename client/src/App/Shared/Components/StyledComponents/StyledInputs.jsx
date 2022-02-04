import {
  FormControlLabel,
  makeStyles,
  MenuItem,
  Switch,
  TextField as MuiTextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import MuiPhoneNumber from 'material-ui-phone-number';
import * as React from 'react';
import { useState } from 'react';
import NumberFormat from 'react-number-format';

const styles = makeStyles({
  messageField: {
    width: '100%',
    marginBottom: 20,
    '& .Mui-focused:not(.Mui-error) fieldset': {
      borderColor: '#5FC698 !important',
    },
    '& label.Mui-focused:not(.Mui-error)': {
      color: '#5FC698 !important',
    },
    '& label:not(.Mui-focused):not(.Mui-error)': {
      color: '#A3A9B5 !important',
    },
    '& label:not(.Mui-focused)': {
      fontSize: 14,
    },
  },
  inputRoot: {
    '&:hover:not(.Mui-error) fieldset': {
      border: '1px solid #E4E7EB',
      boxShadow: '0 1px 2px #E4E7EB',
    },
  },
  inputField: {
    fontSize: 13,
  },
  inputOutline: {
    borderColor: '#E4E7EB',
  },
});

export interface ITextField {
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

const SharedField = (props) => {
  const classes = styles();
  return (
    <Field
      {...props}
      disabled={props.disabled}
      component={TextField}
      type={props.type}
      label={props.label}
      name={props.name}
      variant='outlined'
      InputProps={{
        classes: {
          input: classes.inputField,
          notchedOutline: classes.inputOutline,
          root: classes.inputRoot,
        },
      }}
      className={classes.messageField}
    />
  );
};

export const TextArea = ({ name, label }) => {
  const classes = styles();
  return (
    <Field
      multiline={true}
      rows={3}
      component={TextField}
      type='text'
      label={label}
      name={name}
      variant='outlined'
      InputProps={{
        classes: {
          input: classes.inputField,
          notchedOutline: classes.inputOutline,
          root: classes.inputRoot,
        },
      }}
      className={classes.messageField}
    />
  );
};

const PhoneNumberInput = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPhoneNumber
      defaultCountry={'us'}
      onlyCountries={['us']}
      disableAreaCodes={true}
      disableCountryCode={true}
      name={field.name}
      value={field.value}
      error={Boolean(currentError)}
      helperText={currentError}
      disabled={form.isSubmitting}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
      onError={(error) => {
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      {...other}
    />
  );
};

export const PhoneNumber = ({ name, label }) => {
  const classes = styles();
  return (
    <Field
      name={name}
      label={label}
      component={PhoneNumberInput}
      InputProps={{
        classes: {
          input: classes.inputField,
          notchedOutline: classes.inputOutline,
          root: classes.inputRoot,
        },
      }}
      className={classes.messageField}
      variant='outlined'
    />
  );
};

export const Select = (props: ITextField & any) => {
  const classes = styles();
  const [selectedOption, setSelectedOption] = useState(props.value);

  return (
    <MuiTextField
      onChange={(e) => {
        props.handleChange(e);
        setSelectedOption(e.target.value);
      }}
      value={selectedOption}
      label={props.label}
      variant='outlined'
      name={props.name}
      disabled={props.disabled ? true : false}
      select
      className={classes.messageField}
      InputProps={{
        classes: {
          input: classes.inputField,
        },
      }}
    >
      {props &&
        props.selectOptions &&
        props.selectOptions.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
    </MuiTextField>
  );
};

export const StyledTextField = (props: ITextField) => {
  return <SharedField {...props} type='text' />;
};

export const DateField = (props: ITextField) => {
  const [type, setType] = useState('text');
  return (
    <SharedField
      {...props}
      type={type}
      onFocus={() => {
        setType('date');
      }}
      onBlur={() => {
        setType('text');
      }}
    />
  );
};

export const DateTimeField = (props: ITextField) => {
  const [type, setType] = useState('text');
  return (
    <SharedField
      {...props}
      type={type}
      onBlur={() => {
        setType('text');
      }}
      onFocus={() => {
        setType('datetime-local');
      }}
    />
  );
};

export const PasswordField = (props: ITextField) => {
  return <SharedField {...props} type='password' />;
};

export default function currencyFormatter(value) {
  if (!Number(value)) return '$0.0';

  const amount = new Intl.NumberFormat('usd', {
    style: 'currency',
    currency: 'usd',
  }).format(value / 100);

  return `${amount}`;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
export function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format={currencyFormatter}
      fixedDecimalScale
      thousandSeparator
      isNumericString
      prefix='$'
    />
  );
}

export const CurrencyField = ({ label, name }) => {
  const classes = styles();
  return (
    <Field
      component={TextField}
      type='text'
      label={label}
      name={name}
      variant='outlined'
      InputProps={{
        inputComponent: NumberFormatCustom,
        classes: {
          input: classes.inputField,
          notchedOutline: classes.inputOutline,
          root: classes.inputRoot,
        },
      }}
      className={classes.messageField}
    />
  );
};

export const YellowSwitch = withStyles({
  inputField: {
    fontSize: 13,
  },
  switchBase: {
    color: '#083E54',
    '&$checked': {
      color: '#FCB606',
    },
    '&$checked + $track': {
      backgroundColor: '#FCB606',
    },
  },
  checked: {},
  track: {},
})(Switch);

export const ControlledSwitch = ({
  label,

  value,
  handleChange,
}) => {
  return (
    <FormControlLabel
      style={{ fontSize: 13 }}
      label={<Typography style={{ fontSize: 13 }}>{label}</Typography>}
      control={<YellowSwitch onChange={handleChange} checked={value} />}
    />
  );
};
