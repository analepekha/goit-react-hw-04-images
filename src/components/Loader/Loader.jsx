import { BallTriangle } from 'react-loader-spinner';
import { Container } from './Loader.styled';


export const Loader = () => {
    return (
        <Container>
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#3f51b5"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
            />
            </Container>
    )
}
