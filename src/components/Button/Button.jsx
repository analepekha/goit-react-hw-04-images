import PropTypes from 'prop-types';
import { Button } from './Button.styled';

export const BtnLoadMore = ({onClick}) => {
    return (
        <Button type='button' onClick={onClick}>Load more</Button>
    )
}

BtnLoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
}
