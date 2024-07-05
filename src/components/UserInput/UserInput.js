import React, { useEffect, memo } from "react";
import { css } from "@emotion/react";
import useInput from "../../hooks/useInput";
import useDebounce from "../../hooks/useDebounce";
import PropTypes from "prop-types";
import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';


const customStyles = css`
  & label.Mui-focused {
    color: #dee2e6;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #dee2e6;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #dee2e6;
    }
    &:hover fieldset {
      border-color: #dee2e6;
    }
    &.Mui-focused fieldset {
      border-color: #dee2e6;
    }
  }
`;

const CssTextField = styled(TextField)`
  ${customStyles}
`;

const UserInput = ({ updateSearchTerm }) => {
  const { value, onChange } = useInput("");
  const debouncedInput = useDebounce(value, 500);
  const label = (
    <Typography style={{ color: "#fff" }}>Search for a movie</Typography>
  );

  useEffect(() => {
    updateSearchTerm(debouncedInput);
  }, [updateSearchTerm, debouncedInput]);

  return <CssTextField label={label} value={value} onChange={onChange} />;
};

UserInput.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
};

const memoizedUserInput = memo(UserInput);

export default memoizedUserInput;
