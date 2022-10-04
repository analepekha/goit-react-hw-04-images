import { Component } from 'react';
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
        console.log(code);
        if (target === currentTarget || code === "Escape") {
          this.props.onClose()
        }
    }

    render() {
        const { children, content } = this.props;
        return createPortal(
            <Overlay onClick={this.closeModal}>
                <ModalWindow>
                    <img src={content} alt="" />
                    {children}
                </ModalWindow>  
            </Overlay>,
            modalRoot
    )
    }
    
}