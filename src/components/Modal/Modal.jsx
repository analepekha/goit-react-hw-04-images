import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from "./Modal.styled";
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, largeImage }) => {

    const closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            onClose()
        }
    };

    useEffect(() => {
            
        document.addEventListener('keydown', closeModal);

        return () => {
            document.removeEventListener('keydown', closeModal);
        }
    });

        return createPortal(
            <Overlay onClick={closeModal}>
                <ModalWindow>
                    <img src={largeImage} alt="" loading="lazy"/>
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
}
    
Modal.propTypes = {
    largeImage:PropTypes.string.isRequired,
    onClose: PropTypes.func,
}
