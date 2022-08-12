import './ConfirmationModal.scss';

function ConfirmationModal({
    show,
    onClose,
    onSave,
    toBeDeleted,
    name
}) {
    return (
        show
            ? (
                <div className="ConfirmationModal">
                    <p>Are you sure you want to delete your {toBeDeleted == 'recipe' ? 'recipe' : 'account,'}</p>
                    <p>{toBeDeleted == 'recipe' ? 'for ' : ''}<span className="name">{name}</span>?</p>
                    <button className="button" onClick={onClose}>Cancel</button>
                    <button className="delete-btn button" onClick={onSave}> Delete < i className="fa fa-trash" ></i ></button >
                </div>
            )
            : <></>
    );
}

export default ConfirmationModal;