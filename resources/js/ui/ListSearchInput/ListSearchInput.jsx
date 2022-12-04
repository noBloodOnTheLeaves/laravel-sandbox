import React, {useCallback, useEffect, useState} from 'react';
import {Box, debounce, InputAdornment, TextField} from "@mui/material";
import {SearchRounded} from "@mui/icons-material";

/**
 * @param props.onValueChange Функция, выполняемая при вводе в поле поиска
 * @param props.tooltipText Текст подзаголовка
 * @param props.tooltipPosition Соответствует пропсу 'placement' компонента Tooltip (MUI) ('right', 'left', ...)
 * @param props.clear boolean для очистки поля
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ListSearchInput = props => {
    const [value, setValue] = useState('');
    const handleChange = (value) => setValue(value);

    useEffect(() => {
        if (props.clear) handleChange('')
    }, [props.clear])

    const onSearchDebounced = useCallback(
        debounce((searchString) => props.onValueChange(searchString), 700), []
    );


    return (
        <Box display="flex" alignItems="center">
            <TextField
                value={value}
                label='Поиск'
                size='small'
                onChange={str => {
                    onSearchDebounced(str.target.value)
                    handleChange(str.target.value)
                }}
                variant='outlined'
                InputProps={{
                    style: { 'width': 308 },
                    endAdornment: <InputAdornment position="end"><SearchRounded/></InputAdornment>,
                }}
            />
        </Box>
    );
};

export default ListSearchInput;
