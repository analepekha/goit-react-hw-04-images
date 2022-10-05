import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from "./Modal.styled";


const modalRoot = document.getElementById('modal-root');

export class Modal extends Component{

    componentDidMount() {
        document.addEventListener('keydown', this.closeModal)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = ({ target, currentTarget, code }) => {
        // console.log(code);
        if (target === currentTarget || code === "Escape") {
          this.props.onClose()
        }
    }

    render() {
        const { children, content } = this.props;
        const { closeModal } = this;
        return createPortal(
            <Overlay onClick={closeModal}>
                <ModalWindow>
                    <img src={content} alt="" />
                    {children}
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.object.isRequired,
}