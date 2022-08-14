import './ConfirmationModal.scss';

function ConfirmationModal({
    show,
    onClose,
    onSave,
    toBeDeleted,
    name
}) {
    const modal = (
        <div className="ConfirmationModal">
            <p>Are you sure you want to delete your {toBeDeleted == 'recipe' ? 'recipe' : 'account,'}</p>
            <p>{toBeDeleted == 'recipe' ? 'for ' : ''}<span className="name">{name}</span>?</p>
            <button className="naked-btn button" onClick={onClose}>Cancel</button>
            <button className="delete-btn button" onClick={onSave}> Delete < i className="fa fa-trash" ></i ></button >
        </div>
    );

    return show && modal;
}

export default ConfirmationModal;